import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  title: string;
  imageSrc: string;
  href: string;
}

const DestinationCard = ({ title, imageSrc, href }: DestinationCardProps) => {
  return (
    <div className="relative h-[400px] group overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10" />
      <Image
        src={imageSrc}
        alt={`${title} travel destination`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white">
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
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

export const Destinations = () => {
  const destinations = [
    {
      title: "COSTA RICA",
      imageSrc: "/images/destinations/albania.jpg",
      href: "/destinations/costarica",
    },
    {
      title: "THAILAND",
      imageSrc: "/images/destinations/vietnam.jpg",
      href: "/destinations/thailand",
    },
    {
      title: "MEXICO",
      imageSrc: "/images/destinations/cambodia.jpg",
      href: "/destinations/mexico",
    },
    {
      title: "GEORGIA",
      imageSrc: "/images/destinations/armenia.jpg",
      href: "/destinations/georgia",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-5xl font-serif mb-4 text-center">
        More amazing countries
      </h2>
      <p className="text-xl mb-12 text-center">
        Use my travel blog to plan your next trip
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.title}
            title={destination.title}
            imageSrc={destination.imageSrc}
            href={destination.href}
          />
        ))}
      </div>
    </section>
  );
};

export default Destinations;
