"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePostsStore } from "../stores/usePostsStore";
import { trackBlogPostClick } from "@/lib/gtag";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full max-w-[378px]">
      <div
        className="relative w-full bg-gray-200 rounded-none mb-4"
        style={{ aspectRatio: "1/1" }}
      />
      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  );
};

export const RecentPosts = () => {
  const { posts, loading, error, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section id="news" className="bg-[#FFFAF1] px-4 md:px-10 w-full">
      {/* Header: centered title */}
      <div className="pt-16 md:pt-24 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair text-[#8B6263] leading-tight">
            Latest Stories from our trips
            <br />
            and recent move to Costa Rica
          </h2>
        </motion.div>
      </div>

      {/* Cards container with centered layout and desktop padding */}
      <div className="max-w-7xl mx-auto px-0 lg:px-[125px]">
        {loading && (
          <div className="grid gap-6 md:gap-[27px] sm:grid-cols-1 md:grid-cols-3 justify-items-center">
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
          <>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="grid gap-6 md:gap-[27px] sm:grid-cols-1 md:grid-cols-3 justify-items-center"
            >
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="flex flex-col w-full max-w-[378px]"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => trackBlogPostClick(post.title, post.slug)}
                    className="group flex flex-col h-full"
                  >
                    {/* Image with square aspect ratio */}
                    <div
                      className="relative w-full overflow-hidden rounded-none mb-4"
                      style={{ aspectRatio: "1/1" }}
                    >
                      <Image
                        src={post.mainImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 378px, 100vw"
                        priority={false}
                        quality={85}
                        loading="lazy"
                      />
                    </div>
                    <p className="text-base md:text-lg text-neutral-700 font-sans leading-relaxed text-center">
                      {post.title}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
      {/* Bottom spacing */}
      <div className="pb-16 md:pb-24" />
    </section>
  );
};
