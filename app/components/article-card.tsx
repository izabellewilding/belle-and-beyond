"use client";

import Image from "next/image";
import Link from "next/link";
import { trackBlogPostClick } from "@/lib/gtag";

interface ArticleCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    mainImage: string;
    description?: string;
    categories?: string[];
  };
  className?: string;
  smallDescription?: boolean;
}

export const ArticleCard = ({
  post,
  className = "",
  smallDescription = false,
}: ArticleCardProps) => {
  const href = `/blog/${post.slug}`;

  return (
    <Link
      href={href}
      onClick={() => trackBlogPostClick(post.title, post.slug)}
      className={`group flex flex-col h-full ${className} transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <Image
          src={post.mainImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={false}
          quality={85}
          loading="lazy"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl leading-tight font-serif text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.description && (
          <p
            className={`text-sm md:text-base text-neutral-600 leading-relaxed flex-1 ${smallDescription ? "line-clamp-2" : "line-clamp-3"}`}
          >
            {post.description}
          </p>
        )}
        <div className="mt-3 text-sm font-medium text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
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
  );
};
