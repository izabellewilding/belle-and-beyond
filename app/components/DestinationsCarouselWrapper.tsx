import { getAllDestinations } from "@/sanity/lib/api";
import { DestinationsCarousel } from "./DestinationsCarousel";

export const DestinationsCarouselWrapper = async () => {
  const destinations = await getAllDestinations();

  return <DestinationsCarousel destinations={destinations} />;
};
