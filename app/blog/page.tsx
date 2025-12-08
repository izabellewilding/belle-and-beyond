import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { getAllPostsWithData } from "@/sanity/lib/api";
import { PostsGrid } from "@/app/components/posts-grid";
import { PageHeader } from "@/app/components/page-header";
import { Metadata } from "next";
import Image from "next/image";

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

export default async function BlogPage() {
  const posts = await getAllPostsWithData();

  // Banner image - you can change this path to any image you want
  const bannerImage = "/images/dominical-surfer.jpg";

  return (
    <>
      <Navigation />

      {/* Banner Section */}
      <section className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
        <Image
          src={bannerImage}
          alt="Travel Stories"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        {/* Optional overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </section>

      <section className="bg-[#faf7fa] w-full">
        <div className="container-content">
          {/* Header: centered title matching homepage style */}
          <PageHeader
            title="Travel Stories"
            description="Read about our adventures, experiences, and insights from traveling around the world. Get inspired for your next journey."
          />

          {/* Posts Grid */}
          <div className="max-w-7xl mx-auto px-0 lg:px-8 pb-16 md:pb-24">
            <PostsGrid posts={posts} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
