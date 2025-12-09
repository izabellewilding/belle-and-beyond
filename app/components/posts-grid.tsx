"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackBlogPostClick } from "@/lib/gtag";

interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: string;
  description?: string;
  categories?: string[];
}

interface PostsGridProps {
  posts: Post[];
}

export const PostsGrid = ({ posts }: PostsGridProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 text-lg">
          No blog posts available yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
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
      className="grid gap-8 md:gap-10 lg:gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
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
            className="group flex flex-col h-full transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Image with slightly taller aspect ratio for more visual impact */}
            <div
              className="relative w-full overflow-hidden rounded-none mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={post.mainImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 768px) 50vw, (min-width: 1024px) 33vw, 100vw"
                priority={false}
                quality={85}
                loading="lazy"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl md:text-2xl leading-tight font-playfair text-darkText mb-2 group-hover:text-darkText/70 transition-colors line-clamp-2">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed flex-1 line-clamp-3 mb-3">
                  {post.description}
                </p>
              )}
              {/* Read more indicator */}
              <div className="text-sm font-medium text-darkText opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                Read more
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
  );
};
