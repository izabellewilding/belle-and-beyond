import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import { RecentPosts } from "./components/recent-posts";
import { RecentPostsAlternative } from "./components/recent-posts-alternative";
import { Footer } from "./components/footer";
import { About } from "./components/about";
import { GalleryDirectoryWrapper } from "./components/GalleryDirectoryWrapper";
import { Contact } from "./components/contact";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Izzia Travel | Travel Blog & Travel Guides",
  description:
    "Izzia Travel - Your ultimate travel blog and travel guides. Discover inspiring destinations, travel tips, and photography from around the world. Expert travel guides to help you plan your next adventure.",
  openGraph: {
    title: "Izzia Travel | Travel Blog & Travel Guides",
    description:
      "Your ultimate travel blog and travel guides. Discover inspiring destinations, travel tips, and photography from around the world.",
    type: "website",
  },
};

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";

  // Structured data for Organization and Blog
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Izzia Travel",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description:
      "Izzia Travel - Your ultimate travel blog and travel guides. Discover inspiring destinations, travel tips, and photography from around the world.",
    sameAs: [],
  };

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Izzia Travel",
    description:
      "Travel blog and travel guides featuring inspiring destinations, travel tips, and photography from around the world.",
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: "Izzia Travel",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
  };
  // Set to true to use the alternative layout, false for the original
  const useAlternativeLayout = false;

  return (
    <div className="">
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogStructuredData),
        }}
      />
      <Navigation />
      <Hero />
      {/* Gallery below hero, aligned to the right side */}

      {useAlternativeLayout ? <RecentPostsAlternative /> : <RecentPosts />}
      <div className="w-full flex justify-end">
        <GalleryDirectoryWrapper />
      </div>
      {/* <DestinationsCarouselWrapper /> */}
      <About />
      <Contact />

      <Footer />
    </div>
  );
}
