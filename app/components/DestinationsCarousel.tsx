"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Destination {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  featured?: boolean;
}

interface DestinationsCarouselProps {
  destinations: Destination[];
}

export const DestinationsCarousel = ({
  destinations,
}: DestinationsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Update visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(2);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, destinations.length - visibleCards);

  // Ensure currentIndex doesn't exceed maxIndex when visibleCards changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Calculate transform based on current index
  useEffect(() => {
    const updateTransform = () => {
      if (carouselRef.current && cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth;
        const gap = 24; // 1.5rem = 24px
        const translateX = -(currentIndex * (cardWidth + gap));
        carouselRef.current.style.transform = `translateX(${translateX}px)`;
      }
    };

    updateTransform();

    // Recalculate on resize
    window.addEventListener("resize", updateTransform);
    return () => window.removeEventListener("resize", updateTransform);
  }, [currentIndex, visibleCards]);

  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-[#e4e2e3] rounded-b-3xl py-16 md:py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Section - Heading and Description */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-neutral-900 mb-6 leading-tight">
                Explore
                <br />
                Destinations
              </h2>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed mb-8">
                Discover amazing places around the world through our travel
                experiences and stories.
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  currentIndex === 0
                    ? "border border-neutral-300 cursor-not-allowed"
                    : "border border-neutral-900 hover:bg-neutral-900 group"
                }`}
                aria-label="Previous destinations"
              >
                <svg
                  className={`w-5 h-5 transition-colors duration-200 ${
                    currentIndex === 0
                      ? "text-neutral-300"
                      : "text-neutral-900 group-hover:text-white"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  currentIndex >= maxIndex
                    ? "border border-neutral-300 cursor-not-allowed"
                    : "border border-neutral-900 hover:bg-neutral-900 group"
                }`}
                aria-label="Next destinations"
              >
                <svg
                  className={`w-5 h-5 transition-colors duration-200 ${
                    currentIndex >= maxIndex
                      ? "text-neutral-300"
                      : "text-neutral-900 group-hover:text-white"
                  }`}
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
              </button>
            </div>
          </div>

          {/* Right Section - Cards Carousel */}
          <div className="lg:col-span-8 overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-6 transition-transform duration-500 ease-in-out"
            >
              {destinations.map((destination, index) => (
                <div
                  key={destination._id}
                  ref={index === 0 ? cardRef : null}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(50%-24px)]"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      {destination.coverImage ? (
                        <Image
                          src={destination.coverImage}
                          alt={destination.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                          <span className="text-neutral-400">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="text-xl md:text-2xl font-sans font-bold text-neutral-900 mb-3">
                        {destination.title}
                      </h3>
                      <p className="text-neutral-600 text-sm md:text-base mb-6 flex-grow line-clamp-3">
                        {destination.description ||
                          "Discover this amazing destination and explore its unique culture and beauty."}
                      </p>
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="inline-flex items-center justify-center border-2 border-neutral-900 text-neutral-900 px-6 py-3 rounded-full font-medium text-sm md:text-base hover:bg-neutral-900 hover:text-white transition-colors duration-200 w-fit"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
