// pages/index.tsx
import Image from "next/image";
import { Button } from "./button";
import { ProfileCard } from "./profile-card";

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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900">
            Discover the extraordinary and find beauty in your travels
            <br />
          </h2>
          <div className="mb-6">
            <ProfileCard />
          </div>
          <p className="text-gray-600 mb-6 text-base leading-relaxed">
            Hey! I'm Izabelle, a photographer, web developer and traveller based
            in Tbilisi, Georgia. I'm drawn to the quiet beauty of nature, little
            surprises, and the raw, authentic feel of old, rustic places. I
            believe travel isn’t just about ticking off destinations—it’s about
            finding those unexpected, peaceful moments that stay with you. I
            love exploring popular places differently:{" "}
            <strong> finding stillness in the noise</strong>, charm in the old
            and rustic, and magic in the unplanned. Here, you’ll find practical
            travel tips and guides to help you do the same.
          </p>
          <div className="flex gap-4">
            <Button text="Visit Blog" href="/blog" />

            <button className="border border-gray-300 text-gray-700 px-5 py-2 rounded-full hover:border-gray-500 transition">
              See Destinations
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
