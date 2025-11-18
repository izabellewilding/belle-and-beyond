import { MetadataRoute } from "next";

// Lazy import to avoid build failures if Sanity env vars are missing
async function getSanityData() {
  try {
    const { getAllPosts, getAllDestinations, getAllGalleries } = await import(
      "@/sanity/lib/api"
    );
    const results = await Promise.allSettled([
      getAllPosts().catch(() => []),
      getAllDestinations().catch(() => []),
      getAllGalleries().catch(() => []),
    ]);

    return {
      posts: results[0].status === "fulfilled" ? results[0].value || [] : [],
      destinations:
        results[1].status === "fulfilled" ? results[1].value || [] : [],
      galleries:
        results[2].status === "fulfilled" ? results[2].value || [] : [],
    };
  } catch (error) {
    // If Sanity isn't configured or fails, return empty arrays
    console.error("Sitemap: Could not fetch Sanity data:", error);
    return {
      posts: [],
      destinations: [],
      galleries: [],
    };
  }
}

interface SitemapPost {
  slug: string;
  _updatedAt?: string;
}

interface SitemapDestination {
  slug: string;
  _updatedAt?: string;
}

interface SitemapGallery {
  slug: string;
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";

  // Get all dynamic routes with better error handling
  const { posts, destinations, galleries } = await getSanityData();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // {
    //   url: `${baseUrl}/tips`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.7,
    // }, // Temporarily commented out
  ];

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = (posts || []).map(
    (post: SitemapPost) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  // Dynamic destination routes
  const destinationRoutes: MetadataRoute.Sitemap = (destinations || []).map(
    (dest: SitemapDestination) => ({
      url: `${baseUrl}/destinations/${dest.slug}`,
      lastModified: dest._updatedAt ? new Date(dest._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  // Dynamic gallery routes
  const galleryRoutes: MetadataRoute.Sitemap = (galleries || []).map(
    (gallery: SitemapGallery) => ({
      url: `${baseUrl}/gallery/${gallery.slug}`,
      lastModified: gallery._updatedAt
        ? new Date(gallery._updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })
  );

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...destinationRoutes,
    ...galleryRoutes,
  ];
}
