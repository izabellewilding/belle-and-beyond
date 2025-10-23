"use client";

import { useEffect } from "react";
import { usePostsStore } from "../stores/usePostsStore";
import { ArticleCard } from "./article-card";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full aspect-[4/5] bg-gray-200 rounded-3xl" />
      <div className="mt-6 space-y-3">
        <div className="h-7 bg-gray-200 rounded w-3/4" />
        <div className="h-7 bg-gray-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
};

export const RecentPosts = () => {
  const { posts, loading, error, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section
      id="blog"
      className="bg-white py-24 md:py-32 px-4 md:px-10 lg:px-14 w-full"
    >
      {/* Header: top rule + large serif heading */}
      <div className="mb-12 md:mb-16">
        <div className="border-t border-neutral-400/70" />
        <h2 className="mt-8 text-5xl md:text-6xl font-serif text-neutral-900">
          Latest News
        </h2>
      </div>

      <div className="min-h-[600px]">
        {loading && (
          <div className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard
                key={post._id}
                post={{
                  _id: post._id,
                  title: post.title,
                  slug: post.slug,
                  mainImage: post.mainImage,
                  description: post.description,
                  categories: post.categories,
                }}
                showButton={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
