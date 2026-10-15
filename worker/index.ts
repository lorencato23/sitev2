// Entry point of the Cloudflare Worker that serves the static export in ./out.
// Its only job besides serving files: send www to the canonical apex host,
// which is what metadataBase, the sitemap and robots.txt already declare.

const CANONICAL_HOST = "drlorencato.com";

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.hostname === `www.${CANONICAL_HOST}`) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
