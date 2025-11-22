"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageMetadata {
  src: string;
  alt: string;
  title?: string;
  photographer?: string;
}

interface BentoGalleryProps {
  images: ImageMetadata[];
}

interface ImageWithDimensions extends ImageMetadata {
  aspectRatio: number;
  isLandscape: boolean;
  height: number;
}

export const BentoGallery = ({ images }: BentoGalleryProps) => {
  const [imagesWithDimensions, setImagesWithDimensions] = useState<
    ImageWithDimensions[]
  >([]);
  const [columnCount, setColumnCount] = useState(4);

  useEffect(() => {
    // Determine column count based on screen size
    const updateColumnCount = () => {
      if (window.innerWidth < 768) {
        setColumnCount(2);
      } else {
        setColumnCount(4);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  useEffect(() => {
    // Load images and detect their dimensions
    const loadImageDimensions = async () => {
      const loadedImages: ImageWithDimensions[] = await Promise.all(
        images.map(async (image) => {
          return new Promise<ImageWithDimensions>((resolve) => {
            const img = new window.Image();
            img.onload = () => {
              const aspectRatio = img.width / img.height;
              const isLandscape = aspectRatio > 1;

              resolve({
                ...image,
                aspectRatio,
                isLandscape,
                height: img.height,
              });
            };
            img.onerror = () => {
              // Fallback if image fails to load
              resolve({
                ...image,
                aspectRatio: 1,
                isLandscape: true,
                height: 800,
              });
            };
            // Handle both relative paths and absolute URLs
            img.src = image.src.startsWith("http")
              ? image.src
              : image.src.startsWith("/")
                ? image.src
                : `/${image.src}`;
          });
        })
      );

      setImagesWithDimensions(loadedImages);
    };

    if (images.length > 0) {
      loadImageDimensions();
    }
  }, [images]);

  // Distribute images across columns using a smart algorithm
  const distributeImages = () => {
    if (imagesWithDimensions.length === 0) return [];

    const columns: ImageWithDimensions[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const columnHeights = Array(columnCount).fill(0);

    imagesWithDimensions.forEach((image) => {
      // Find the column with the shortest height
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columns[shortestColumnIndex].push(image);
      // Update column height (approximate based on aspect ratio)
      // Assuming a base width, calculate approximate height
      const baseWidth = 300; // Approximate column width
      const approximateHeight = baseWidth / image.aspectRatio;
      columnHeights[shortestColumnIndex] += approximateHeight;
    });

    return columns;
  };

  const columns = distributeImages();

  if (imagesWithDimensions.length === 0) {
    // Loading state - distribute evenly across columns
    const loadingColumns = Array.from({ length: columnCount }, (_, colIndex) =>
      images.filter((_, index) => index % columnCount === colIndex)
    );

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loadingColumns.map((columnImages, colIndex) => (
          <div key={colIndex} className="grid gap-4">
            {columnImages.map((image, index) => (
              <div
                key={index}
                className="relative w-full bg-neutral-100 rounded-lg overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {columns.map((columnImages, colIndex) => (
        <div key={colIndex} className="grid gap-4">
          {columnImages.map((image, index) => (
            <div key={index} className="relative w-full group rounded-lg">
              <div className="relative w-full inline-block">
                <Image
                  src={image.src}
                  alt={image.alt}
                  title={image.title || image.alt}
                  width={800}
                  height={1200}
                  className="w-full h-auto object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 block"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading={colIndex < 2 && index < 2 ? "eager" : "lazy"}
                />
                {/* Overlay with photographer credit on hover */}
                {image.photographer && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-center opacity-0 group-hover:opacity-100 pointer-events-none rounded-lg">
                    <div className="bg-neutral-900/90 text-white text-xs px-4 py-2 mb-2 rounded pointer-events-auto">
                      <span className="font-medium">
                        Photo by {image.photographer}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
