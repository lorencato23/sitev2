import Link from "next/link";
import { Tag } from "./tag";
import type { Post } from "@/lib/data";
import { formatDate } from "@/lib/format-date";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex w-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-signal hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)]"
    >
      <Tag>{post.tag}</Tag>
      <h3 className="mt-4 mb-3 font-display text-xl leading-snug text-ink transition-colors group-hover:text-signal">
        {post.title}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
      <div className="mt-auto flex items-center gap-3 font-mono text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">•</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}
