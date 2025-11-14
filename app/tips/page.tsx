import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { getPostsByCategories } from "@/sanity/lib/api";
import { ArticleCard } from "@/app/components/article-card";

interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: string;
  description?: string;
  categories?: string[];
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Tips & Advice | Travel Blog | Izzia Travel",
  description:
    "Expert travel tips and advice from Izzia Travel blog. Discover practical travel tips, advice, and guides to make the most of your adventures. Your ultimate travel blog resource.",
  keywords: [
    "travel tips",
    "travel advice",
    "travel blog",
    "Izzia Travel",
    "travel guides",
    "travel planning",
    "adventure tips",
  ],
  openGraph: {
    title: "Travel Tips & Advice | Travel Blog | Izzia Travel",
    description:
      "Expert travel tips and advice from Izzia Travel blog. Discover practical travel tips and guides to make the most of your adventures.",
    type: "website",
  },
};

export default async function TipsPage() {
  // Get posts from both "Travel Advice" and "Travel Tips" categories
  const posts = await getPostsByCategories(["Travel Advice", "Travel Tips"]);

  return (
    <>
      <Navigation />
      <section className="bg-white py-24 md:py-20 px-4 md:px-10 lg:px-14 w-full">
        {/* Header: top rule + large serif heading */}
        <div className="mb-12 md:mb-16">
          <div className="border-t border-neutral-400/70" />
          <h1 className="mt-8 text-4xl md:text-5xl font-serif text-neutral-900">
            Travel Tips & Advice
          </h1>
          <p className="mt-8 text-md md:text-xl font-serif text-neutral-900">
            Expert travel tips and advice from our travel blog to help you make
            the most of your adventures. Discover practical guides and insights
            from Izzia Travel.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No tips found.</p>
        ) : (
          <div className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-3">
            {posts.map((post: Post) => (
              <ArticleCard
                key={post._id}
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
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
