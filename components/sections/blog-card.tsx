import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostCover } from "@/components/sections/post-cover";
import { formatDate } from "@/lib/utils";
import { readingTime, type Post } from "@/content/posts";
import { cn } from "@/lib/utils";

export function BlogCard({ post, className }: { post: Post; className?: string }) {
  return (
    <Card interactive className={cn("group relative flex h-full flex-col overflow-hidden", className)}>
      <PostCover variant={post.cover} className="h-36" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{post.category}</Badge>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
            <Clock className="size-3.5" aria-hidden="true" />
            {readingTime(post)} min read
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-navy-900 transition-colors group-hover:text-brand-800">
          <Link href={`/resources/${post.slug}`} className="before:absolute before:inset-0 before:content-['']">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <time dateTime={post.date} className="text-xs font-medium text-muted">
            {formatDate(post.date)}
          </time>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
            Read article
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Card>
  );
}
