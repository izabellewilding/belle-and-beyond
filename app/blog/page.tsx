import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { getAllPostsWithData } from "@/sanity/lib/api";
import { ArticleCard } from "@/app/components/article-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Stories & Blog Posts | The Portable Life",
  description:
    "Read our travel stories, adventures, and experiences from around the world. Get inspired for your next journey with real travel stories and insights.",
  keywords: [
    "travel stories",
    "travel blog",
    "travel experiences",
    "The Portable Life",
    "travel adventures",
    "travel inspiration",
  ],
  openGraph: {
    title: "Travel Stories & Blog Posts | The Portable Life",
    description:
      "Read our travel stories, adventures, and experiences from around the world. Get inspired for your next journey.",
    type: "website",
  },
};

interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: string;
  publishedAt?: string;
  author?: string;
  description?: string;
  categories?: string[];
}

export default async function BlogPage() {
  const posts = await getAllPostsWithData();

  return (
    <>
      <Navigation />
      <section className="bg-white py-16 md:py-24 px-4 md:px-10 lg:px-14 w-full min-h-screen">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="border-t border-neutral-400/70" />
          <h1 className="mt-8 text-4xl md:text-5xl font-serif text-neutral-900">
            Travel Stories
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-700 max-w-3xl">
            Read about our adventures, experiences, and insights from traveling
            around the world. Get inspired for your next journey.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
