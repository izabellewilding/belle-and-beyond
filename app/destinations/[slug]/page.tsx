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
      description:
        destination.description ||
        `Complete travel guide for ${destination.title}`,
      type: "article",
      url: pageUrl,
      siteName: "Izzia Travel",
    },
    twitter: {
      card: "summary_large_image",
      title: `${destination.title} Travel Guide | Izzia Travel`,
      description:
        destination.description ||
        `Complete travel guide for ${destination.title}`,
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
    description:
      destination.description ||
      `Complete travel guide for ${destination.title}`,
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

      {/* Hero Section - Visual header with image and content */}
      <div className="bg-gradient-to-b from-neutral-50 to-white pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Decorative top border */}
          <div className="border-t border-neutral-300 mb-8 md:mb-12"></div>

          {/* Image and content side-by-side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Content side - appears first on mobile */}
            <div className="lg:sticky lg:top-24">
              <div className="mb-4">
                <span className="inline-block text-xs md:text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2">
                  Travel Guide
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-neutral-900 mb-6 leading-tight">
                {destination.title}
              </h1>
              {destination.description && (
                <div className="border-l-4 border-neutral-300 pl-6">
                  <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                    {destination.description}
                  </p>
                </div>
              )}
            </div>

            {/* Image side - appears second on mobile */}
            {destination.mainImage && (
              <div className="relative w-full aspect-[4/3] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src={destination.mainImage}
                  alt={destination.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Articles Section - Main focus of the page */}
      {recentPosts.length > 0 ? (
        <section className="bg-white py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Decorative separator */}
            <div className="border-t border-neutral-200 mb-12 md:mb-16"></div>

            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 mb-4">
                Stories from {destination.title}
              </h2>
              <p className="text-base md:text-lg text-neutral-600 max-w-2xl">
                Discover our latest articles and travel experiences from{" "}
                {destination.title}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {recentPosts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <p className="text-lg text-neutral-600">
              No articles yet for {destination.title}. Check back soon!
            </p>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
