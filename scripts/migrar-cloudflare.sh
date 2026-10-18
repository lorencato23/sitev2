#!/usr/bin/env bash
# Termina a migração de drlorencato.com do Vercel para o Cloudflare Worker "sitev2".
#
#   1. publica o Worker com o export estático já compilado e testado (BUILD);
#   2. liga o proxy (nuvem laranja) nos CNAMEs do apex e do www, o que ativa as
#      rotas drlorencato.com/* e www.drlorencato.com/* já cadastradas na zona;
#   3. confere as páginas no ar.
#
# Credenciais vêm do secretctl (CLOUDFLARE_API_KEY = token de conta, CLOUDFLARE_ACCOUNTID).
# Nada é impresso. MX/SPF/DKIM do e-mail não são tocados.
#
# Uso:     bash scripts/migrar-cloudflare.sh
# Desfazer: bash scripts/migrar-cloudflare.sh --reverter   (volta os CNAMEs para "só DNS" → Vercel)
set -euo pipefail

BUILD="${BUILD:-/home/lorencato/.hermes/cache/scratch/sitev2-cf}"
MODO="${1:-}"

if [ -z "${CF_INNER:-}" ]; then
  exec secretctl run CLOUDFLARE_API_KEY -- secretctl run CLOUDFLARE_ACCOUNTID -- env CF_INNER=1 bash "$0" "$@"
fi
export CLOUDFLARE_API_TOKEN="$CLOUDFLARE_API_KEY" CLOUDFLARE_ACCOUNT_ID="$CLOUDFLARE_ACCOUNTID"
H="Authorization: Bearer $CLOUDFLARE_API_TOKEN"
api() { curl -sS -H "$H" -H "Content-Type: application/json" "$@"; }
falhar() { echo "ERRO: $*" >&2; exit 1; }

ZONE=$(api "https://api.cloudflare.com/client/v4/zones?name=drlorencato.com" \
  | python3 -c 'import json,sys;print(json.load(sys.stdin)["result"][0]["id"])')

proxy() {  # $1 = true|false
  for nome in drlorencato.com www.drlorencato.com; do
    id=$(api "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records?type=CNAME&name=$nome" \
      | python3 -c 'import json,sys;r=json.load(sys.stdin)["result"];print(r[0]["id"] if r else "")')
    [ -n "$id" ] || falhar "CNAME $nome não encontrado"
    ok=$(api -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records/$id" --data "{\"proxied\":$1}" \
      | python3 -c 'import json,sys;d=json.load(sys.stdin);print(d["success"],d["result"]["proxied"] if d.get("result") else d.get("errors"))')
    echo "  $nome proxied=$1 -> $ok"
  done
}

if [ "$MODO" = "--reverter" ]; then
  echo "=== Revertendo: CNAMEs voltam para só DNS (Vercel) ==="
  proxy false
  exit 0
fi

[ -f "$BUILD/out/index.html" ] || falhar "build não encontrado em $BUILD/out"

echo "=== 1/3 · Publicar o Worker sitev2 ==="
cd "$BUILD"
npx --no-install wrangler deploy 2>&1 | grep -E "Uploaded|Deployed|Current Version|ERROR|✘" || true

echo "=== 2/3 · Ligar o proxy nos CNAMEs ==="
proxy true

echo "=== 3/3 · Conferir no ar ==="
URLS=(
  "https://drlorencato.com/"
  "https://drlorencato.com/biblio"
  "https://drlorencato.com/biblio/handbook-premium/"
  "https://drlorencato.com/biblio/handbook-premium/content/NE08/NE08.html"
  "https://drlorencato.com/biblio/handbook-premium/content/RP02/RP02.html"
  "https://drlorencato.com/biblio/handbook-premium/content/CV04/CV04.html"
  "https://drlorencato.com/biblio/saude-mental/exame-do-estado-mental.html"
  "https://www.drlorencato.com/biblio/handbook-premium/content/NE08/NE08.html"
)
for tentativa in 1 2 3 4 5 6; do
  falhas=0
  for u in "${URLS[@]}"; do
    r=$(curl -sL -o /dev/null -w '%{http_code}' "$u")
    srv=$(curl -sI "$u" | grep -i '^server:' | tr -d '\r' | cut -d' ' -f2)
    echo "  $r $srv $u"
    { [ "$r" = "200" ] && [ "$srv" = "cloudflare" ]; } || falhas=$((falhas+1))
  done
  [ $falhas -eq 0 ] && { echo; echo "PRONTO: https://drlorencato.com/biblio/handbook-premium/"; exit 0; }
  echo "  tentativa $tentativa/6: $falhas pendente(s); aguardando 20s"; sleep 20
done
echo
echo "Algo não ficou 200 via Cloudflare. Para voltar ao Vercel: bash scripts/migrar-cloudflare.sh --reverter"
exit 1
