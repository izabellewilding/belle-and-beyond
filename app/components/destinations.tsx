import Image from "next/image";
import Link from "next/link";
import { getAllDestinations } from "@/sanity/lib/api";

interface DestinationCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

const DestinationCard = ({ title, imageSrc, href }: DestinationCardProps) => {
  return (
    <div className="relative h-[400px] group overflow-hidden rounded-2xl max-w-7xl py-16 px-4">
      <div className="absolute inset-0 bg-black/30 z-10" />
      <Image
        src={imageSrc}
        alt={`${title} travel destination`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <Link
          href={href}
          className="border border-white text-white px-6 py-2 transition-colors hover:bg-white hover:text-black"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

interface Destination {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  featured?: boolean;
}

export const Destinations = async () => {
  const destinations = await getAllDestinations();

  return (
    <section id="destinations" className="py-16 px-4 max-w-7xl mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-10">
        More destinations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {destinations.map((destination: Destination) => (
          <DestinationCard
            key={destination._id}
            title={destination.title}
            imageSrc={
              destination.coverImage || "/images/destinations/placeholder.jpg"
            }
            href={`/destinations/${destination.slug}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Destinations;
