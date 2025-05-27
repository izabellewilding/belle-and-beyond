"use client";

import Image from "next/image";
import Link from "next/link";
import { getRecentPosts } from "../../sanity/lib/api";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: string;
  publishedAt: string | null;
  author: string;
  body: {
    _key: string;
    _type: string;
    children: {
      _key: string;
      _type: string;
      marks: string[];
      text: string;
    }[];
    markDefs: {
      _key: string;
      _type: string;
      href?: string;
    }[];
    style: string;
  }[];
}

export const RecentPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getRecentPosts();
        console.log("Fetched posts:", fetchedPosts);
        setPosts(fetchedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getPreviewText = (body: Post["body"]) => {
    // Get the first block that has text
    const firstBlock = body.find(
      (block) =>
        Array.isArray(block.children) &&
        block.children.some((child) => child.text.trim().length > 0)
    );
    if (!firstBlock) return "";

    // Get the text from the first child
    const text = firstBlock.children[0].text;
    // Return first 150 characters
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  };

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-[1600px] text-center mx-auto rounded-4xl p-8">
          {/* <h2 className="text-2xl font-semibold text-gray-700 mb-10">
            Latest from the Blog
          </h2> */}
          <p>Loading posts...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="mmax-w-[1600px] text-center mx-auto rounded-4xl p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-10">
            Latest from the Blog
          </h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-[1600px] text-center mx-auto rounded-4xl p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-10">
            Latest from the Blog
          </h2>
          <p>No posts found.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-16 px-4 ">
      <div className=" mx-auto rounded-4xl p-8  bg-white rounded-xl py-32 max-w-[1600px]">
         <h2 className="text-5xl text-center font-semibold text-gray-900 mb-32">
         Most recent blog posts
        </h2> 
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-3 justify-center">
          {posts.map((post: Post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 ${
                post.title.includes("San Gerardo")
                  ? "col-span-5 h-[300px]"
                  : "grid grid-cols-5"
              }`}
            >
              {/* FEATURED IMAGE WITH TEXT OVERLAY */}
              {post.title.includes("San Gerardo") ? (
                <>
                  <div className="relative w-full h-full shadow-lg">
                    <Image
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* <div className="absolute inset-0 bg-black/20"></div> */}
                    <div className="absolute bottom-6 left-6 text-white z-10 max-w-[80%]">
                      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-md">
                        San Gerardo de Rivas
                      </h2>
                      <p className="text-sm md:text-base mt-1 opacity-90 drop-shadow-sm">
                        Costa Rica’s Most Magical Hidden Gem
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                // DEFAULT CARD LAYOUT
                <>
                  <div className="relative aspect-[4/3] w-full col-span-3">
                    <Image
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 col-span-2">
                    <p className="text-sm text-gray-500 mb-1">{post.author}</p>
                    <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {getPreviewText(post.body)}
                    </p>
                  </div>
                </>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
