import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { getAllDestinations } from "@/sanity/lib/api";
import { DestinationCard } from "@/app/components/destination-card";

interface Destination {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  mainImage?: string;
}

export const metadata = {
  title: "Destinations | Izzia Travel",
  description: "Explore travel destinations around the world.",
};

export default async function DestinationsPage() {
  const allDestinations = await getAllDestinations();
  // Filter out "Travel Advice" and "Travel Tips" destinations (case-insensitive, check both title and slug)
  const destinations = allDestinations.filter((destination: Destination) => {
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

  return (
    <>
      <Navigation />
      <section className="bg-white py-24 md:py-20 px-4 md:px-10 lg:px-14 w-full">
        {/* Header: top rule + large serif heading */}
        <div className="mb-12 md:mb-16">
          <div className="border-t border-neutral-400/70" />
          <h2 className="mt-8 text-4xl md:text-5xl font-serif text-neutral-900">
            Destinations
          </h2>
        </div>

        <div className="grid gap-8 md:gap-10 sm:grid-cols-1 md:grid-cols-3">
          {destinations.map((destination: Destination) => (
            <DestinationCard
              key={destination._id}
              destination={{
                _id: destination._id,
                title: destination.title,
                slug: destination.slug,
                coverImage: destination.coverImage,
                mainImage: destination.mainImage,
                description: destination.description,
              }}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
