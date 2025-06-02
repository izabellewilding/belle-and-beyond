"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePostsStore } from "../stores/usePostsStore";
import PostCarousel from "../components/carousel";

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
          // Instead of grid, show nothing here
          // We'll replace with carousel below
          <PostCarousel posts={posts} />
        )}
      </div>
    </section>
  );
};
