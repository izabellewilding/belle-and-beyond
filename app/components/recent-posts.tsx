"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePostsStore } from "../stores/usePostsStore";

export const RecentPosts = () => {
  const { posts, loading, error, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const getPreviewText = (body: any[]) => {
    const firstBlock = body.find(
      (block) =>
        Array.isArray(block.children) &&
        block.children.some((child) => child.text.trim().length > 0)
    );
    if (!firstBlock) return "";
    const text = firstBlock.children[0].text;
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  return (
    <section id="blog" className="py-16 px-4">
      <div className="mx-auto rounded-4xl p-8 bg-white rounded-xl py-32 max-w-[1600px] text-center">
        <h2 className="text-5xl font-semibold text-gray-900 mb-16">
          Most recent blog posts
        </h2>

        {loading && <p>Loading posts...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-gray-500">No posts found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-4 justify-center mt-10">
            {posts.map((post: any) => (
              <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-full"
            >
              {/* Card container with fixed height */}
              <div className="relative w-full h-[500px]"> {/* Adjust height as needed */}
                {/* Image fills the container */}
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                {/* Text in the top-left corner */}
                <div className="absolute top-12 left-4 z-10 max-w-[80%] text-left text-gray-700">
                  <h2 className="text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-md mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm md:text-base opacity-90 drop-shadow-sm">
                    {getPreviewText(post.body)}
                  </p>
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
