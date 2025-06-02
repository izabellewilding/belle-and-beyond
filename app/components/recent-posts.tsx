"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePostsStore } from "../stores/usePostsStore";
import { FaHeart } from "react-icons/fa"; // heart icon from react-icons

export const RecentPosts = () => {
  const { posts, loading, error, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const getPreviewText = (body) => {
    const firstBlock = body.find(
      (block) =>
        Array.isArray(block.children) &&
        block.children.some((child) => child.text.trim().length > 0)
    );
    if (!firstBlock) return "";
    const text = firstBlock.children[0].text;
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  return (
    <section id="blog" className="py-16 px-4">
      <div className="mx-auto max-w-[1400px]">
        {/* <h2 className="text-4xl font-bold text-center mb-12">
          Recent Articles
        </h2> */}

        {loading && <p className="text-center">Loading posts...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-sm text-gray-500">Belle & Beyond</div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    {getPreviewText(post.body)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4">
                    <span>5 views</span>
                    <FaHeart className="text-pink-500" />
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
