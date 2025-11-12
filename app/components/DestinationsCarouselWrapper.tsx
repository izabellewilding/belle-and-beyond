import { getAllDestinations } from "@/sanity/lib/api";
import { DestinationsCarousel } from "./DestinationsCarousel";

// Helper function to filter out Travel Advice and Travel Tips
const filterTravelAdviceAndTips = (destinations: any[]) => {
  return destinations.filter((destination: any) => {
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
