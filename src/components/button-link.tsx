import Link from "next/link";
import { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5";
  const styles =
    variant === "primary"
      ? "bg-ink text-paper shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)] hover:bg-signal hover:text-paper hover:shadow-[0_12px_28px_-10px_rgba(28,62,207,0.5)]"
      : "border border-line-strong bg-surface text-ink hover:border-signal hover:text-signal";

  return (
    <Link
      href={href}
      className={`${base} ${styles}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
    >
      {children}
    </Link>
  );
}
