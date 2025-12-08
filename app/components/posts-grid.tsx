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
      className="grid gap-8 md:gap-12 lg:gap-16 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center"
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
  );
};
