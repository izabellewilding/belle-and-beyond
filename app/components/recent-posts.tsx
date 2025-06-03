"use client";

import { useEffect } from "react";
import { usePostsStore } from "../stores/usePostsStore";
import { ArticleCard } from "./article-card";

export const RecentPosts = () => {
  const { posts, loading, error, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section id="blog" className="py-42 px-4 flex justify-center min-h-screen">
      <div className="mx-auto max-w-[1400px] w-full">
        {/* <h2 className="text-4xl font-bold text-center mb-12">
          Recent Articles
        </h2> */}

        {loading && <p className="text-center">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
        <h2 className="text-xl md:text-2xl font-bold mb-16 text-center leading-tight text-gray-900 font-serif">
          Recent articles from the blog
        </h2>
        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
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
                showButton={true}
                className="max-w-none"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
