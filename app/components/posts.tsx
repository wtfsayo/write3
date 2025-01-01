import Link from "next/link";
import { formatDate, getBlogPosts } from "lib/utils";
import { PostWithMetadata } from "lib/interfaces";

export function BlogPosts({ posts }: { posts: PostWithMetadata[] }) {
  return (
    <div>
      {posts
        .sort((a, b) => {
          if (a.metadata.publishedAt > b.metadata.publishedAt) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.metadata.hash}
            className="flex flex-col space-y-1 mb-4"
            href={`/${post.metadata.author}/${post.metadata.hash}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, true)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
