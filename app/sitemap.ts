import { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllDestinations,
  getAllGalleries,
} from "@/sanity/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izziatravel.com";

  // Get all dynamic routes
  const [posts, destinations, galleries] = await Promise.all([
    getAllPosts().catch(() => []),
    getAllDestinations().catch(() => []),
    getAllGalleries().catch(() => []),
  ]);

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
    {
      url: `${baseUrl}/tips`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = (posts || []).map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic destination routes
  const destinationRoutes: MetadataRoute.Sitemap = (destinations || []).map(
    (dest: any) => ({
      url: `${baseUrl}/destinations/${dest.slug}`,
      lastModified: dest._updatedAt ? new Date(dest._updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  // Dynamic gallery routes
  const galleryRoutes: MetadataRoute.Sitemap = (galleries || []).map(
    (gallery: any) => ({
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
