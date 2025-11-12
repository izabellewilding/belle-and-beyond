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

export const metadata = {
  title: "Tips | Izzia Travel",
  description: "Travel tips and advice for your adventures.",
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
          <h2 className="mt-8 text-4xl md:text-5xl font-serif text-neutral-900">
            Tips
          </h2>
          <p className="mt-8 text-md md:text-xl font-serif text-neutral-900">
            Travel tips and advice to help you make the most of your adventures.
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
