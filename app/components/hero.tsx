// pages/index.tsx
import Image from "next/image";

export const Hero = () => {
  return (
    <main className=" bg-gray-50 text-neutral-800 min-h-full">
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)]">
        <div className="relative h-[50vh] md:h-full">
          <Image
            src="/images/sunset-puerto-viejo.png"
            alt="Scenic beach"
            layout="fill"
            objectFit="cover"
            className="rounded-none md:rounded-r-3xl"
          />
        </div>

        <div className="p-10 flex flex-col justify-center bg-gray-50 rounded-none">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-gray-900">
            Elevate your travel with
            <br />
            inspirational guides & smart tips
          </h2>
          <p className="text-gray-600 mb-6 text-base leading-relaxed">
            Hey! I'm Izabelle, a photographer, web developer and traveller based
            in Tbilisi, Georgia. I explore the world with curiosity and
            intention—and share practical advice, detailed guides, and curated
            recommendations to help you plan unforgettable, stress-free trips.
          </p>
          <div className="flex gap-4">
            <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
              Explore Blog
            </button>
            <button className="border border-gray-300 text-gray-700 px-5 py-2 rounded-full hover:border-gray-500 transition">
              See Destinations
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
