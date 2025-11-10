import {
  getDestinationBySlug,
  getAllDestinations,
  getPostsByCountry,
} from "@/sanity/lib/api";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { ArticleCard } from "@/app/components/article-card";
import { PortableTextBlock } from "@portabletext/types";
import { DestinationTracker } from "@/app/components/DestinationTracker";

interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: string;
  publishedAt: string;
  author: string;
  country: string;
  description: string;
  categories: string[];
}

interface Destination {
  _id: string;
  title: string;
  slug: string;
  description: string;
  mainImage: string;
  content: PortableTextBlock[];
}

// Generate static paths for all destinations
export async function generateStaticParams() {
  const destinations = await getAllDestinations();

  return destinations.map((destination: { slug: string }) => ({
    slug: destination.slug,
  }));
}

// Generate metadata for each destination page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${destination.title} | Belle and Beyond`,
    description: destination.description,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = (await getDestinationBySlug(slug)) as Destination;

  if (!destination) {
    notFound();
  }

  let recentPosts: Post[] = [];
  try {
    if (destination._id) {
      recentPosts = await getPostsByCountry(destination._id);
    }
  } catch (error) {
    console.error("Error fetching recent posts:", error);
  }

  return (
    <>
      <Navigation />
      <DestinationTracker destination={destination.title} />

      {/* Banner with image and title */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        {destination.mainImage ? (
          <Image
            src={destination.mainImage}
            alt={destination.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Country title centered on banner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white text-center px-4">
            {destination.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        {destination.description && (
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              {destination.description}
            </p>
          </div>
        )}

        {/* <div className="prose prose-lg max-w-none">
          {destination.content && <PortableText value={destination.content} />}
        </div> */}

        {/* Recent Articles Section */}
        {recentPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-12">
              Recent Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {recentPosts.map((post) => (
                <ArticleCard key={post._id} post={post} showButton={false} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
