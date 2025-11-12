"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePostsStore } from "../stores/usePostsStore";
import { trackBlogPostClick } from "@/lib/gtag";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-gray-200 rounded-lg h-24 mb-4" />
      <div className="bg-gray-200 rounded-lg h-24 mb-4" />
      <div className="bg-gray-200 rounded-lg h-24 mb-4" />
    </div>
  );
};

export const RecentPostsAlternative = () => {
  const { posts, loading, error, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const formatDateShort = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <section
      id="news"
      className="bg-white pt-24 md:pt-20 pb-0 px-4 md:px-10 lg:px-14 w-full"
    >
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <div className="border-t border-neutral-400/70" />
              <div className="mt-8 space-y-4">
                <div className="h-12 bg-gray-200 rounded w-3/4" />
                <div className="h-24 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
            <div className="md:col-span-2">
              <PostSkeleton />
            </div>
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column - Header and CTA */}
            <div className="md:col-span-1">
              <div className="border-t border-neutral-400/70" />
              <h2 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-tight mb-6">
                Latest
                <br />
                News
              </h2>
              <p className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed">
                Here are our latest stories and experiences from around the
                world. Currently we are living and working from Costa Rica, high
                up in the mountains.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-orange-500 text-white px-8 py-4 text-base md:text-lg font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-lg"
              >
                View All News
              </Link>
            </div>

            {/* Right Column - News Cards */}
            <div className="md:col-span-2 space-y-4">
              {posts.map((post) => {
                const href = `/blog/${post.slug}`;
                const category = post.categories?.[0] || "TRAVEL";
                const date = formatDateShort(post.publishedAt);

                return (
                  <Link
                    key={post._id}
                    href={href}
                    onClick={() => trackBlogPostClick(post.title, post.slug)}
                    className="block bg-neutral-100 rounded-lg p-6 hover:bg-neutral-200 transition-colors duration-200 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Category and Date */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-orange-500 font-sans font-semibold text-sm uppercase tracking-wide">
                            {category}
                          </span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-500 font-sans text-sm">
                            {date}
                          </span>
                        </div>
                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-sans font-bold text-neutral-900 group-hover:underline transition-all">
                          {post.title}
                        </h3>
                      </div>
                      {/* Arrow Icon */}
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-neutral-400 group-hover:text-orange-500 transition-colors duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
