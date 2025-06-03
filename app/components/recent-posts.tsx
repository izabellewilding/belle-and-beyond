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
    <section id="blog" className="py-24 md:py-32 px-4">
      <div className="mx-auto max-w-[1400px] w-full">
        {/* <h2 className="text-4xl font-bold text-center mb-12">
          Recent Articles
        </h2> */}

        {loading && <p className="text-center">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts found.</p>
        )}

        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 font-serif text-[#757679]">
            Recent articles from the blog
          </h2>
          <p className="text-lg text-gray-600">
            Discover our latest stories, travel guides, and local insights
          </p>
        </div>

        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 transform hover:scale-[0.99] transition-transform duration-300">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className={`transform transition-all duration-500 hover:translate-y-[-8px] ${
                  index === 1 ? "md:translate-y-[-16px]" : ""
                }`}
              >
                <ArticleCard
                  post={{
                    _id: post._id,
                    title: post.title,
                    slug: post.slug,
                    mainImage: post.mainImage,
                    description: post.description,
                    categories: post.categories,
                  }}
                  showButton={true}
                  className="max-w-none h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
