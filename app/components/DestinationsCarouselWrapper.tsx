import { getAllDestinations } from "@/sanity/lib/api";
import { DestinationsCarousel } from "./DestinationsCarousel";

interface Destination {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  mainImage?: string;
}

// Helper function to filter out Travel Advice and Travel Tips
const filterTravelAdviceAndTips = (destinations: Destination[]) => {
  return destinations.filter((destination: Destination) => {
    const titleLower = destination.title?.toLowerCase() || "";
    const slugLower = destination.slug?.toLowerCase() || "";
    return (
      !titleLower.includes("travel advice") &&
      !slugLower.includes("travel-advice") &&
      !slugLower.includes("travel_advice") &&
      !titleLower.includes("travel tips") &&
      !slugLower.includes("travel-tips") &&
      !slugLower.includes("travel_tips")
    );
  });
};

export const DestinationsCarouselWrapper = async () => {
  const allDestinations = await getAllDestinations();
  const destinations = filterTravelAdviceAndTips(allDestinations);

  return <DestinationsCarousel destinations={destinations} />;
};
