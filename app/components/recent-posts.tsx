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
      <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-2xl mb-6 shadow-md" />
      <div className="flex-1 flex flex-col">
        <div className="h-7 bg-gray-200 rounded w-full mb-2" />
        <div className="h-7 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-5 bg-gray-200 rounded w-full mb-2" />
        <div className="h-5 bg-gray-200 rounded w-full mb-2" />
        <div className="h-5 bg-gray-200 rounded w-2/3" />
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
      id="news"
      className="w-full relative -mt-16 md:-mt-24 lg:-mt-32 z-20"
    >
      <div className="container-content">
        {/* White box container that covers just the cards */}
        <div className="w-full max-w-[2000px] mx-auto px-2 md:px-6 lg:px-8 xl:px-12">
          <div className="bg-[#faf7fa] rounded-3xl shadow-2xl px-4 md:px-10 lg:px-12 pt-8 pb-8 md:pt-12 md:pb-16 lg:pt-16 lg:pb-16">
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                {[1, 2, 3, 4, 5, 6].map((index) => (
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
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
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
                        onClick={() =>
                          trackBlogPostClick(post.title, post.slug)
                        }
                        className="group flex flex-col h-full transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src={post.mainImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            priority={false}
                            quality={85}
                            loading="lazy"
                          />
                          {/* Subtle overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-xl md:text-2xl lg:text-2xl leading-tight font-sans text-darkText mb-3 group-hover:text-darkText/70 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.description && (
                            <p className="text-base md:text-lg text-neutral-600 leading-relaxed flex-1 line-clamp-3">
                              {post.description}
                            </p>
                          )}
                          <div className="mt-3 text-sm md:text-base font-medium text-darkText opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                            Read more
                            <svg
                              className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
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
                  className="flex justify-center mt-8 md:mt-12"
                >
                  <RectangularButton href="/blog" text="See all posts" />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Bottom spacing for the section */}
      <div className="pb-16 md:pb-24" />
    </section>
  );
};
