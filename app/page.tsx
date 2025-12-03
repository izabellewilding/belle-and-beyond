import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import { RecentPosts } from "./components/recent-posts";
import { RecentPostsAlternative } from "./components/recent-posts-alternative";
import { Footer } from "./components/footer";
import { About } from "./components/about";
import { GalleryDirectoryWrapper } from "./components/GalleryDirectoryWrapper";
import { Contact } from "./components/contact";
import { DominicalFeature } from "./components/dominical-feature";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "The Portable Life | Ecotourism Guides & Sustainable Travel Blog",
  description:
    "The Portable Life shares ecotourism guides, sustainable travel tips, and remote-work friendly adventures for people who want to travel ethically.",
  keywords: [
    "ecotourism",
    "sustainable travel",
    "ecotourism guides",
    "eco travel tips",
    "responsible travel",
    "green itineraries",
  ],
  openGraph: {
    title: "The Portable Life | Ecotourism Guides & Sustainable Travel Blog",
    description:
      "Practical ecotourism guides, slow travel inspiration, and sustainable travel stories documented by a remote-working duo.",
    type: "website",
    siteName: "The Portable Life",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Portable Life | Ecotourism Guides & Sustainable Travel Blog",
    description:
      "Ecotourism guides, sustainable travel tips, and responsible travel inspiration for your next mindful trip.",
  },
};

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";

  // Structured data for Organization and Blog
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Portable Life",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description:
      "The Portable Life shares ecotourism guides, sustainable travel tips, and remote-work adventures from across the globe.",
    sameAs: [],
  };

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Portable Life",
    description:
      "Ecotourism blog featuring sustainable travel guides, responsible tips, and stories from conservation-focused adventures.",
    url: baseUrl,
    publisher: {
      "@type": "Organization",
      name: "The Portable Life",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is ecotourism?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ecotourism is travel that focuses on conservation, supports local communities, and minimizes environmental impact while immersing visitors in nature.",
        },
      },
      {
        "@type": "Question",
        name: "How do I plan a sustainable travel itinerary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with ethical accommodations, choose eco-conscious tour operators, pack light, and offset your emissions—our guides offer practical examples step by step.",
        },
      },
      {
        "@type": "Question",
        name: "Are there remote-work friendly ecotourism adventures?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we document remote-work friendly eco itineraries with stable Wi-Fi, intentional rest days, and immersive conservation experiences to keep you productive yet grounded.",
        },
      },
    ],
  };
  // Set to true to use the alternative layout, false for the original
  const useAlternativeLayout = false;

  return (
    <div className="m-0 p-0 w-full">
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
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <Hero />
      <About />
      {useAlternativeLayout ? <RecentPostsAlternative /> : <RecentPosts />}
      {/* <DominicalFeature /> */}
      <div className="w-full flex justify-end">
        {/* <GalleryDirectoryWrapper /> */}
      </div>
      {/* <DestinationsCarouselWrapper /> */}

      {/* <Contact /> */}

      <Footer />
    </div>
  );
}
