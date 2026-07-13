"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível — o link mailto ao lado ainda funciona
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-signal hover:text-signal"
      >
        {copied ? "Copiado ✓" : "Copiar e-mail"}
      </button>
      {/* Anúncio da confirmação para leitores de tela, sem alterar o
          nome acessível do próprio botão. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "E-mail copiado para a área de transferência" : ""}
      </span>
    </>
  );
}
