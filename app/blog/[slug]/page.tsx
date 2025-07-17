import { getPostBySlug } from "@/sanity/lib/api";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { notFound } from "next/navigation";
import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { getRecentPostsQuery } from "@/sanity/lib/queries";
import { SanityDocument } from "next-sanity";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";
import { Icons } from "@/app/components/icons";
import { NewsSidebar } from "../../components/news-sidebar";
import { AuthorWidget } from "../../components/author-widget";

// Define a basic type for Portable Text blocks
interface PortableTextBlock {
  _key: string;
  _type: string;
  children: {
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }[];
  markDefs: {
    _key: string;
    _type: string;
    [key: string]: unknown; // Use unknown instead of any for better type safety
  }[];
  style: string;
  [key: string]: unknown; // Use unknown instead of any
}

interface Post extends SanityDocument {
  _id: string;
  title: string;
  slug: string;
  mainImage: SanityImageObject & { alt?: string }; // Add alt to the type definition
  publishedAt: string | null;
  author: string;
  body: PortableTextBlock[]; // Use the defined Portable Text type
}

// Generate static paths for all posts (optional but recommended for performance)
export async function generateStaticParams() {
  const posts = await client.fetch(getRecentPostsQuery);

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Custom Portable Text components for rendering
  const components: PortableTextComponents = {
    types: {
      image: ({
        value,
      }: {
        value: SanityImageObject & { alt?: string; description?: string };
      }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        const imageUrl = urlFor(value).url();

        return (
          <div className="my-8">
            <Image
              src={imageUrl}
              alt={value.alt || ""} // Access alt directly from value
              width={800} // Adjust as needed
              height={600} // Adjust as needed
              layout="responsive"
              objectFit="contain"
            />
            {/* Display the image description if it exists */}
            {value.description && (
              <p className="text-center text-gray-600 text-sm mt-2">
                {value.description}
              </p>
            )}
          </div>
        );
      },
    },
    block: {
      // Customize block types
      h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-12 mb-4">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-10 mb-3">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-bold mt-8 mb-2">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
          {children}
        </blockquote>
      ),
      // Add custom component for normal text (paragraphs)
      normal: ({ children }) => <p className="mb-4">{children}</p>,
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-5 my-4">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-5 my-4">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-2">{children}</li>,
      number: ({ children }) => <li className="mb-2">{children}</li>,
    },
    marks: {
      // Customize marks (bold, italic, etc.)
      link: ({ children, value }) => {
        const rel = value.href.startsWith("/")
          ? undefined
          : "noopener noreferrer";
        return (
          <a
            href={value.href}
            rel={rel}
            className="text-blue-600 hover:underline"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <>
      <Navigation />
      <section className="flex flex-col md:flex-row px-4 py-24 px-8 md:py-32 max-w-7xl mx-auto">
        {/* Main Content Area */}
        <article className="w-full md:w-2/3 md:pr-8">
          <div className="text-center md:text-left mb-8 md:mt-12">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-600 text-sm mb-4">
              By {post.author} •{" "}
              {post.publishedAt ? formatDate(post.publishedAt) : ""}
            </p>
            {/* Social Icons */}
            <div className="mb-4 flex justify-center md:justify-start">
              <Icons />
            </div>
          </div>

          {/* Horizontal Rule */}
          <hr className="border-gray-300 my-8" />

          {/* Post Body */}
          <div className="prose max-w-none">
            <PortableText value={post.body} components={components} />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-full md:w-1/3 md:pl-8 mt-8 md:mt-0 flex flex-col space-y-8">
      
          <AuthorWidget />
          <NewsSidebar />
        </aside>
      </section>
      <Footer />
    </>
  );
}
