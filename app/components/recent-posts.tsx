"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePostsStore } from "../stores/usePostsStore";
import { ArticleCard } from "./article-card";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="relative w-full aspect-[3/4] bg-gray-200 rounded-3xl" />
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
      id="news"
      className="bg-white pb-16 md:pb-24 px-4 md:px-10 lg:px-14 w-full"
    >
      {/* Border line at top */}
      <div className="border-t border-neutral-400/70 pt-16 md:pt-24 mb-8 md:mb-12">
        {/* Header: large serif heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-neutral-900">
            Latest News
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mt-8 text-md md:text-xl font-serif text-neutral-900"
          >
            Here are our latest stories and experiences from around the world.
            Currently we are living and working from Costa Rica, high up in the
            mountains.
          </motion.p>
        </motion.div>
      </div>

      <div>
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
              className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-3"
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
                    showButton={false}
                    smallDescription={true}
                  />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mt-8 md:mt-12 text-center"
            >
              <Link
                href="#news"
                className="inline-flex items-center rounded-full bg-neutral-900 text-white px-10 md:px-16 py-4 md:py-5 text-lg md:text-xl font-medium hover:bg-neutral-800 transition-colors"
              >
                See the blog
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
