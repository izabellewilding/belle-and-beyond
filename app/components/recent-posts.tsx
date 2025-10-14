"use client";

import { useEffect } from "react";
import { usePostsStore } from "../stores/usePostsStore";
import { ArticleCard } from "./article-card";
import { Button } from "./button";

const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col h-full animate-pulse">
      {/* Image skeleton */}
      <div className="relative w-full aspect-[4/3] bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-3 flex-1">
        {/* Category pills skeleton */}
        <div className="flex gap-2 -mt-8 relative z-10">
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="mt-auto pt-4">
          <div className="h-10 bg-gray-200 rounded-full w-32"></div>
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
    <section id="blog" className="py-24 md:py-32 px-4">
      <div className="mx-auto max-w-[1400px] w-full">
        {/* <h2 className="text-4xl font-bold text-center mb-12">
          Recent Articles
        </h2> */}

        <div className="flex flex-row justify-between  mb-14 md:mb-24 md:mt-24">
        <div className="">
          <h2 className="text-4xl md:text-4xl mb-2 md:mb-8 text-[#757679] font-medium text-black">
            Featured Articles
          </h2>
          <p className="text-md md:text-xl text-gray-600">
            Discover our latest stories, travel guides, and local insights
          </p>
        </div>
          <Button text="View all articles" href="/blog" />

        </div>
      
        <div className="min-h-[600px]"> {/* Container with minimum height */}
          {loading && (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 h-full">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-500 ${
                    index === 1 ? "md:translate-y-[-16px]" : ""
                  }`}
                >
                  <PostSkeleton />
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="text-center text-gray-500">No posts found.</p>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 transform hover:scale-[0.99] transition-transform duration-300">
              {posts.map((post, index) => {return console.log(post.title), (
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
              )})}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
