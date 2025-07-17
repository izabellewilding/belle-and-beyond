import { getAllDestinations } from "@/sanity/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";

export const metadata = {
  title: "Destinations | Belle and Beyond",
  description: "Explore travel destinations around the world.",
};

interface Destination {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  featured?: boolean;
}

export default async function DestinationsPage() {
  const destinations = await getAllDestinations();

  return (
    <>
      <Navigation />
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        <h1 className="text-5xl font-serif mb-4 text-center">Destinations</h1>
        <p className="text-xl mb-12 text-center">
          Explore amazing destinations around the world
        </p>

        {destinations && destinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination: Destination) => (
              <Link
                href={`/destinations/${destination.slug}`}
                key={destination._id}
                className="group"
              >
                <div className="relative h-[100px] overflow-hidden rounded-lg mb-4">
                  {destination.coverImage ? (
                    <Image
                      src={destination.coverImage}
                      alt={destination.title}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 z-10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {destination.title}
                    </h3>
                    <span className="border border-white px-4 py-1 text-sm transition-colors group-hover:bg-white group-hover:text-black">
                      Explore
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-gray-100 rounded-lg">
            <h3 className="text-2xl mb-4">No destinations found</h3>
            <p className="mb-4">
              You need to add destinations in your Sanity Studio first.
            </p>
            <Link
              href="/studio"
              className="inline-block bg-purple text-white px-6 py-2 rounded-sm hover:bg-opacity-90"
            >
              Go to Sanity Studio
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
