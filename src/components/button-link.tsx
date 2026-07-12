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
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors";
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-signal"
      : "border border-line-strong text-ink hover:border-signal hover:text-signal";

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
