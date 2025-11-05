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

      <div className="relative max-w-6xl mx-auto px-4 mt-16 mb-24">
        {/* Container for text and image with artistic overlap */}
        <div className="relative">
          {/* Text positioned to overlap with the image */}
          <div className="relative z-10 bg-cream py-4 md:py-0 md:bg-transparent">
            <h1 className="text-5xl md:text-6xl font-serif text-gray-800 tracking-wide px-4 md:px-0">
              {destination.title.toUpperCase()}
            </h1>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide mt-1 px-4 md:px-0">
              TRAVEL ADVICE
            </h2>
          </div>

          {/* Image that the text partially overlaps */}
          <div className="relative max-h-[375px] md:mt-[-80px] w-full aspect-[1.77/1] overflow-hidden">
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
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-4 pb-20 -mt-32 bg-white">
        {destination.description && (
          <div className="mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              {destination.description}
            </p>
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {destination.content && <PortableText value={destination.content} />}
        </div>

        {/* Recent Articles Section */}
        {recentPosts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-serif text-gray-800 mb-8">
              Recent Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
