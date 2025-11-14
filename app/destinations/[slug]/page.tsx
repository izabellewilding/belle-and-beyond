import {
  getDestinationBySlug,
  getAllDestinations,
  getPostsByCountry,
} from "@/sanity/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { ArticleCard } from "@/app/components/article-card";
import { PortableTextBlock } from "@portabletext/types";
import { DestinationTracker } from "@/app/components/DestinationTracker";
import Script from "next/script";

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";
  const pageUrl = `${baseUrl}/destinations/${slug}`;

  return {
    title: `${destination.title} Travel Guide | Izzia Travel`,
    description: destination.description
      ? `${destination.description} Read our comprehensive travel guide for ${destination.title} on Izzia Travel - your ultimate travel blog and travel guides resource.`
      : `Complete travel guide for ${destination.title}. Discover the best places to visit, things to do, and travel tips. Expert travel guides from Izzia Travel.`,
    keywords: [
      `${destination.title} travel guide`,
      `${destination.title} travel`,
      "travel guides",
      "travel blog",
      "Izzia Travel",
      `${destination.title} destination`,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${destination.title} Travel Guide | Izzia Travel`,
      description: destination.description || `Complete travel guide for ${destination.title}`,
      type: "article",
      url: pageUrl,
      siteName: "Izzia Travel",
    },
    twitter: {
      card: "summary_large_image",
      title: `${destination.title} Travel Guide | Izzia Travel`,
      description: destination.description || `Complete travel guide for ${destination.title}`,
    },
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";
  const pageUrl = `${baseUrl}/destinations/${slug}`;

  // Structured data for Travel Guide
  const travelGuideStructuredData = {
    "@context": "https://schema.org",
    "@type": "TravelGuide",
    name: `${destination.title} Travel Guide`,
    description: destination.description || `Complete travel guide for ${destination.title}`,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "Izzia Travel",
      url: baseUrl,
    },
    mainEntity: {
      "@type": "Place",
      name: destination.title,
      description: destination.description,
    },
  };

  return (
    <>
      <Script
        id="travel-guide-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(travelGuideStructuredData),
        }}
      />
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

      {/* Description - wider container */}
      {destination.description && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-20">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            {destination.description}
          </p>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-20">
        {/* <div className="prose prose-lg max-w-none">
          {destination.content && <PortableText value={destination.content} />}
        </div> */}
      </div>

      {/* Recent Articles Section - wider container */}
      {recentPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-16 md:pb-20">
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

      <Footer />
    </>
  );
}
