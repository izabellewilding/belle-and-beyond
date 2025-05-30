"use client";


import Image from "next/image";
import Link from "next/link";
import { usePostsStore } from "../stores/usePostsStore";
import { useEffect } from "react"

interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: string;
  body: any[];
}

interface Props {
  posts: Post[];
}

export const NewsSidebar = () => {
    const { posts, loading, error, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  return (
    <div className="space-y-6 md:pt-24 md:pb-24">
        <h2 className="font-semibold">Recent articles</h2>
      {posts.map((post) => (
        <div key={post._id} className="flex gap-4">
          <div className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden ">
            <Image
              src={post.mainImage}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">
              {post.title}
            </h4>
            <p className="text-sm text-gray-600">
              {/* {previewText ? previewText(post.body) : ""} */}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
