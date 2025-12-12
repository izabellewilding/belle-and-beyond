"use client";

import Image from "next/image";
import Link from "next/link";
import { usePostsStore, type Post } from "../stores/usePostsStore";
import { useEffect } from "react";

interface NewsItemProps {
  post: Post;
}

const NewsItem = ({ post }: NewsItemProps) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex gap-4 hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={post.mainImage}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
          {post.title}
        </h4>
        {post.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {post.description}
          </p>
        )}
        <span className="text-blue-600 text-sm font-medium hover:underline inline-block mt-1">
          Read more
        </span>
      </div>
    </Link>
  );
};

interface NewsSidebarProps {
  className?: string;
  maxPosts?: number;
}

export const NewsSidebar = ({
  className = "",
  maxPosts = 5,
}: NewsSidebarProps) => {
  const {
    posts,
    loading,
    error,
    fetchPosts,
  }: {
    posts: Post[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
  } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <div className={`space-y-6 md:pt-24 md:pb-24 ${className}`}>
        <h3 className="text-gray-300 text-sm pb-2">RECENT ARTICLES</h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-4 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-6 md:pt-24 md:pb-24 ${className}`}>
        <h3 className="text-gray-300 text-sm pb-2">RECENT ARTICLES</h3>
        <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  const displayPosts = posts.slice(0, maxPosts);

  if (displayPosts.length === 0) {
    return (
      <div className={`space-y-6 md:pt-24 md:pb-24 ${className}`}>
        <h3 className="text-gray-400 text-sm pb-5 font-serif">
          LATEST ARTICLES
        </h3>
        <div className="text-gray-500 text-sm">No recent articles found.</div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 md:pt-12 md:pb-24 ${className}`}>
      <h3 className="text-gray-400 text-sm pb-5 font-serif">LATEST ARTICLES</h3>
      <div className="space-y-4">
        {displayPosts.map((post: Post) => (
          <NewsItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
