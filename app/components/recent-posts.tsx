"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePostsStore } from "../stores/usePostsStore";
import { trackBlogPostClick } from "@/lib/gtag";
import { RectangularButton } from "./rectangular-button";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col h-full w-full">
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
    <section id="news" className="bg-[#faf7fa] w-full">
      <div className="container-content">
        {/* Header: centered title */}
        <div className="pt-16 md:pt-24 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-playfair text-darkText leading-tight">
              Latest Stories
            </h2>
          </motion.div>
        </div>

        {/* Cards container with centered layout and desktop padding */}
        <div className="max-w-7xl mx-auto px-0 lg:px-8">
          {loading && (
            <div className="grid gap-8 md:gap-12 lg:gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
              {[1, 2, 3, 4].map((index) => (
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
                className="grid gap-8 md:gap-12 lg:gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
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
                    className="flex flex-col w-full"
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
                          sizes="(min-width: 768px) 50vw, (min-width: 1024px) 25vw, 100vw"
                          priority={false}
                          quality={85}
                          loading="lazy"
                        />
                      </div>
                      <p className="text-base md:text-lg text-darkText font-sans leading-relaxed text-center">
                        {post.title}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              {/* See All Posts Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="flex justify-center mt-12 md:mt-16"
              >
                <RectangularButton href="/blog" text="See all posts" />
              </motion.div>
            </>
          )}
        </div>
        {/* Bottom spacing */}
        <div className="pb-16 md:pb-24" />
      </div>
    </section>
  );
};
