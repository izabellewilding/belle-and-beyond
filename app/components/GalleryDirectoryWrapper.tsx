import { getAllGalleries } from "@/sanity/lib/api";
import { GalleryDirectory } from "./GalleryDirectory";

interface Gallery {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
}

export const GalleryDirectoryWrapper = async () => {
  const galleries = await getAllGalleries();

  const galleryCards = galleries.map((gallery: Gallery) => ({
    title: gallery.title,
    href: `/gallery/${gallery.slug}`,
    src: gallery.coverImage || "/images/destinations/placeholder.jpg",
    description: gallery.description || "",
  }));

  return <GalleryDirectory cards={galleryCards} />;
};
