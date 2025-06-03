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
import Link from "next/link";
import { PortableTextBlock } from "@portabletext/types";

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
  params: { slug: string };
}) {
  const destination = await getDestinationBySlug(params.slug);

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
  params: { slug: string };
}) {
  const destination = (await getDestinationBySlug(params.slug)) as Destination;

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
              {recentPosts.map((post: Post) => (
                <div key={post._id} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                      {post.mainImage ? (
                        <Image
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200"></div>
                      )}
                    </div>
                    <h3 className="text-xl font-serif text-gray-800 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {post.description}
                    </p>
                    {post.categories && post.categories.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                          <span
                            key={category}
                            className="text-sm text-gray-500"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
