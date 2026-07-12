import Link from "next/link";
import { profile } from "@/lib/data";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4.5 w-4.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5" aria-hidden="true">
      <path d="M6.5 8.8v10.4H3.2V8.8h3.3ZM4.9 3.5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM20.8 13.4v5.8h-3.3v-5.4c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8v5.7H10.7s.1-9.3 0-10.4H14v1.5c.4-.7 1.2-1.7 3-1.7 2.2 0 3.8 1.4 3.8 4.8Z" />
    </svg>
  );
}

const items = [
  { label: "Instagram", href: profile.instagram, external: true, Icon: InstagramIcon },
  { label: "LinkedIn", href: profile.linkedin, external: true, Icon: LinkedInIcon },
];

export function SocialLinks() {
  return (
    <div className="flex gap-3">
      {items.map(({ label, href, external, Icon }) => (
        <Link
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener" : undefined}
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-signal hover:text-signal"
        >
          <Icon />
        </Link>
      ))}
    </div>
  );
}
