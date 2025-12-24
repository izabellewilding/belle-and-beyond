import { getPostBySlug, getPostByOldSlug } from "@/sanity/lib/api";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { notFound, permanentRedirect } from "next/navigation";
import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { getAllPostsQuery } from "@/sanity/lib/queries";
import { SanityDocument } from "next-sanity";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";
import { Icons } from "@/app/components/icons";
import { NewsSidebar } from "../../components/news-sidebar";
import { AuthorWidget } from "@/app/components/author-widget";
import { TableOfContents } from "@/app/components/table-of-contents";
import { Metadata } from "next";
import Script from "next/script";

// Revalidate page every hour (3600 seconds)
export const revalidate = 3600;

// Helper function to convert text to a URL-friendly slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Extract text from Portable Text children
function extractTextFromChildren(children: any[]): string {
  if (!children) return "";
  return children
    .map((child: any) => {
      if (typeof child === "string") return child;
      if (child.text) return child.text;
      return "";
    })
    .join("");
}

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

interface ChapterIcon {
  headingText: string;
  icon: string;
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
  chapterIcons?: ChapterIcon[];
  seo?: PostSEO;
}

// Generate static paths for all posts (optional but recommended for performance)
export async function generateStaticParams() {
  const posts = await client.fetch(getAllPostsQuery);

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

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://theportablelife.blog";
  const pageUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.mainImage?.asset?._ref
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
      // Permanent redirect (308) for SEO - tells Google the old URL is permanently moved
      permanentRedirect(`/blog/${postWithOldSlug.slug}`);
    }
    // If still not found, show 404
    notFound();
  }

  // Custom Portable Text components for rendering
  const components: PortableTextComponents = {
    types: {
      callout: ({
        value,
      }: {
        value: {
          style: "default" | "olive" | "light";
          title?: string;
          content: string;
          linkText?: string;
          linkUrl?: string;
        };
      }) => {
        const styles = {
          default: {
            bg: "bg-neutral-50",
            border: "border-l-[6px] border-navy",
            text: "text-neutral-800",
            title: "text-navy",
            link: "text-navy hover:text-navy/80",
          },
          olive: {
            bg: "bg-neutral-50",
            border: "border-l-[6px] border-olive",
            text: "text-neutral-800",
            title: "text-olive",
            link: "text-olive hover:text-olive/80",
          },
          light: {
            bg: "bg-neutral-100/50",
            border: "border-l-[6px] border-neutral-400",
            text: "text-neutral-800",
            title: "text-neutral-900",
            link: "text-neutral-700 hover:text-neutral-900",
          },
        };

        const style = styles[value.style] || styles.default;

        return (
          <div className={`${style.bg} ${style.border} rounded-r-md p-6 md:p-8 my-8`}>
            {value.title && (
              <h4 className={`text-lg md:text-xl font-bold mb-3 ${style.title} font-playfair`}>
                {value.title}
              </h4>
            )}
            <div className={`text-base md:text-lg leading-relaxed ${style.text} whitespace-pre-wrap`}>
              {value.content}
            </div>
            {value.linkText && value.linkUrl && (
              <Link
                href={value.linkUrl}
                className={`inline-flex items-center gap-2 mt-4 font-medium underline underline-offset-2 transition-colors ${style.link}`}
              >
                {value.linkText}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </div>
        );
      },
      image: ({
        value,
      }: {
        value: SanityImageObject & { alt?: string; description?: string };
      }) => {
        if (!value?.asset?._ref) {
          return null;
        }

        // Get image dimensions from metadata if available
        const metadata = (value.asset as any)?.metadata?.dimensions;
        const imageWidth = metadata?.width || 1200;
        const imageHeight = metadata?.height || 800;

        // Use max width of 1200px, maintain aspect ratio
        const maxWidth = 1200;
        const aspectRatio = imageWidth / imageHeight;
        const calculatedHeight = Math.round(maxWidth / aspectRatio);

        const imageUrl = urlFor(value)
          .width(maxWidth)
          .quality(75)
          .auto("format")
          .url();

        return (
          <figure className="mt-10 mb-12">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageUrl}
                alt={value.alt || ""}
                width={imageWidth}
                height={imageHeight}
                className="w-full h-auto"
                quality={75}
                loading="lazy"
                style={{ maxWidth: `${maxWidth}px` }}
              />
            </div>
            {/* Display the image description if it exists */}
            {value.description && (
              <figcaption className="text-center text-neutral-600 text-sm mt-3 italic">
                {value.description}
              </figcaption>
            )}
          </figure>
        );
      },
    },
    block: {
      // Customize block types
      h1: ({ children }) => {
        const text = extractTextFromChildren(Array.isArray(children) ? children : [children]);
        const id = slugify(text);
        return (
          <h1 id={id} className="text-4xl md:text-5xl font-bold mt-16 mb-6 leading-tight scroll-mt-24">
            {children}
          </h1>
        );
      },
      h2: ({ children }) => {
        const text = extractTextFromChildren(Array.isArray(children) ? children : [children]);
        const id = slugify(text);
        return (
          <h2 id={id} className="text-3xl md:text-4xl font-extrabold mt-12 mb-6 leading-tight scroll-mt-24">
            {children}
          </h2>
        );
      },
      h3: ({ children }) => {
        const text = extractTextFromChildren(Array.isArray(children) ? children : [children]);
        const id = slugify(text);
        return (
          <h3 id={id} className="text-2xl md:text-3xl font-bold mt-10 mb-4 leading-tight scroll-mt-24">
            {children}
          </h3>
        );
      },
      h4: ({ children }) => {
        const text = extractTextFromChildren(Array.isArray(children) ? children : [children]);
        const id = slugify(text);
        return (
          <h4 id={id} className="text-xl md:text-2xl font-bold mt-8 mb-3 leading-tight scroll-mt-24">
            {children}
          </h4>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-neutral-300 pl-6 py-2 my-8 italic text-lg md:text-xl leading-relaxed text-neutral-700 bg-neutral-50 rounded-r">
          {children}
        </blockquote>
      ),
      // Add custom component for normal text (paragraphs)
      normal: ({ children }) => (
        <p className="mb-6 text-lg md:text-xl leading-[1.75] text-neutral-800">
          {children}
        </p>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 md:pl-8 my-6 space-y-3">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 md:pl-8 my-6 space-y-3">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="text-lg md:text-xl leading-[1.75] text-neutral-800 pl-2">
          {children}
        </li>
      ),
      number: ({ children }) => (
        <li className="text-lg md:text-xl leading-[1.75] text-neutral-800 pl-2">
          {children}
        </li>
      ),
    },
    marks: {
      // Customize marks (bold, italic, etc.)
      strong: ({ children }) => (
        <strong className="font-extrabold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => {
        const rel = value.href.startsWith("/")
          ? undefined
          : "noopener noreferrer";
        return (
          <a
            href={value.href}
            rel={rel}
            className="text-blue-600 hover:text-blue-800 font-medium underline decoration-2 underline-offset-2 transition-colors"
          >
            {children}
          </a>
        );
      },
    },
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://theportablelife.blog";
  const pageUrl = `${baseUrl}/blog/${slug}`;
  const imageUrl = post.mainImage?.asset?._ref
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
              .quality(75)
              .auto("format")
              .url()}
            alt={post.bannerImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={75}
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
          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-p:mb-6 prose-p:leading-[1.75] prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            {/* Opening paragraph */}
            {post.body && post.body[0] && (
              <PortableText value={[post.body[0]]} components={components} />
            )}
          </div>

          {/* Table of Contents */}
          <TableOfContents body={post.body} chapterIcons={post.chapterIcons} />

          {/* Rest of Post Body */}
          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-p:mb-6 prose-p:leading-[1.75] prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            {post.body && post.body.length > 1 && (
              <PortableText value={post.body.slice(1)} components={components} />
            )}
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
