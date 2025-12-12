import { getPostBySlug, getPostByOldSlug } from "@/sanity/lib/api";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { notFound, redirect } from "next/navigation";
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
import { Metadata } from "next";
import Script from "next/script";

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

interface PostSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  focusKeyword?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImageObject & { alt?: string };
  noindex?: boolean;
}

interface Post extends SanityDocument {
  _id: string;
  title: string;
  slug: string;
  mainImage: SanityImageObject & { alt?: string }; // Add alt to the type definition
  bannerImage?: SanityImageObject & { alt?: string };
  publishedAt: string | null;
  author: string;
  body: PortableTextBlock[]; // Use the defined Portable Text type
  seo?: PostSEO;
}

// Generate static paths for all posts (optional but recommended for performance)
export async function generateStaticParams() {
  const posts = await client.fetch(getRecentPostsQuery);

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | The Portable Life",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";
  const pageUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  // Extract description from body if available (first 160 characters)
  const bodyText = post.body
    ?.map((block: PortableTextBlock) => {
      if (block._type === "block" && block.children) {
        return block.children
          .map((child) =>
            typeof child === "object" && "text" in child ? child.text : ""
          )
          .join(" ");
      }
      return "";
    })
    .join(" ")
    .substring(0, 160);

  // Use SEO fields from CMS if available, otherwise use defaults
  const seoTitle = post.seo?.metaTitle || post.title;
  const metaDescription =
    post.seo?.metaDescription ||
    bodyText ||
    `Read ${post.title} on The Portable Life - your ultimate travel blog and travel guides resource.`;
  const ogTitle =
    post.seo?.ogTitle ||
    seoTitle ||
    `${post.title} | Travel Blog | The Portable Life`;
  const ogDescription = post.seo?.ogDescription || metaDescription;

  // Build keywords array - combine CMS keywords with defaults
  const defaultKeywords = [
    post.title,
    "travel blog",
    "The Portable Life",
    "travel guides",
    post.author,
  ];

  // Get keywords from Sanity - ensure it's an array and filter out empty values
  const cmsKeywords = Array.isArray(post.seo?.keywords)
    ? post.seo.keywords
        .map((kw: string) => kw?.trim())
        .filter((kw: string) => kw && kw.length > 0)
    : [];

  const focusKeyword = post.seo?.focusKeyword?.trim();

  // Combine all keywords: focus keyword first, then CMS keywords, then defaults (avoiding duplicates)
  const keywordsSet = new Set<string>();

  // Add focus keyword first if it exists
  if (focusKeyword) {
    keywordsSet.add(focusKeyword);
  }

  // Add all CMS keywords
  cmsKeywords.forEach((kw: string) => {
    if (kw) keywordsSet.add(kw);
  });

  // Add default keywords that aren't already in the set (case-insensitive check)
  defaultKeywords.forEach((kw) => {
    if (!kw) return;
    const kwLower = kw.toLowerCase();
    const alreadyExists = Array.from(keywordsSet).some(
      (existing) => existing.toLowerCase() === kwLower
    );
    if (!alreadyExists) {
      keywordsSet.add(kw);
    }
  });

  // Convert Set back to array
  const keywords = Array.from(keywordsSet);

  // Use OG image from SEO settings if available, otherwise use main image
  const ogImageUrl = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : imageUrl;

  const pageTitle = `${seoTitle} | Travel Blog | The Portable Life`;

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: keywords, // Comma-separated string of all keywords
    authors: [{ name: post.author }],
    robots: post.seo?.noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "article",
      url: pageUrl,
      siteName: "The Portable Life",
      publishedTime: post.publishedAt || undefined,
      authors: [post.author],
      images: ogImageUrl
        ? [
            {
              url: ogImageUrl,
              alt: post.seo?.ogImage?.alt || post.mainImage?.alt || post.title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // First try to get post by current slug
  const post: Post = await getPostBySlug(slug);

  // If not found, check if it's an old slug and redirect
  if (!post) {
    const postWithOldSlug = await getPostByOldSlug(slug);
    if (postWithOldSlug && postWithOldSlug.slug) {
      // Redirect to the new slug (permanent redirect for SEO)
      redirect(`/blog/${postWithOldSlug.slug}`);
    }
    // If still not found, show 404
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
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-lg md:text-xl leading-relaxed">
          {children}
        </blockquote>
      ),
      // Add custom component for normal text (paragraphs)
      normal: ({ children }) => (
        <p className="mb-4 text-lg md:text-xl leading-relaxed">{children}</p>
      ),
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
      bullet: ({ children }) => (
        <li className="mb-2 text-lg md:text-xl leading-relaxed">{children}</li>
      ),
      number: ({ children }) => (
        <li className="mb-2 text-lg md:text-xl leading-relaxed">{children}</li>
      ),
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";
  const pageUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined;

  // Structured data for BlogPosting
  const blogPostStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.body
      ?.map((block: PortableTextBlock) => {
        if (block._type === "block" && block.children) {
          return block.children
            .map((child) =>
              typeof child === "object" && "text" in child ? child.text : ""
            )
            .join(" ");
        }
        return "";
      })
      .join(" ")
      .substring(0, 200),
    image: imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "The Portable Life",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <>
      <Script
        id="blog-post-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostStructuredData),
        }}
      />
      <Navigation />

      {/* Banner Section */}
      {post.bannerImage ? (
        <section className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
          <Image
            src={urlFor(post.bannerImage)
              .width(1400)
              .height(600)
              .quality(85)
              .url()}
            alt={post.bannerImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
        </section>
      ) : null}

      <section className="flex flex-col md:flex-row px-4 py-24 px-8 md:py-32 max-w-[90rem] mx-auto">
        {/* Main Content Area */}
        <article className="w-full md:w-2/3 md:pr-8">
          {/* Title section - overlaps banner if banner exists */}
          <div
            className={`text-center md:text-left mb-8 ${post.bannerImage ? "-mt-[110px] md:-mt-[130px] lg:-mt-[150px] relative z-10" : "md:mt-12"}`}
          >
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-playfair text-neutral-900 mb-2 ${post.bannerImage ? "bg-white px-6 md:px-10 py-4 md:py-6 shadow-lg inline-block" : "font-bold"}`}
            >
              {post.title}
            </h1>
            <p className="text-gray-600 text-sm mb-4 mt-4">
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
          <div className="prose prose-lg md:prose-xl max-w-none">
            <PortableText value={post.body} components={components} />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-full md:w-1/3 md:pl-8 mt-8 md:mt-0 flex flex-col space-y-8">
          {/* <AuthorWidget /> */}
          <NewsSidebar />
        </aside>
      </section>
      <Footer />
    </>
  );
}
