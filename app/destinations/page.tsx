import { Navigation } from "@/app/components/navigation";
import { Footer } from "@/app/components/footer";
import { DestinationsCarouselWrapper } from "@/app/components/DestinationsCarouselWrapper";

export const metadata = {
  title: "Destinations | Belle and Beyond",
  description: "Explore travel destinations around the world.",
};

export default async function DestinationsPage() {
  return (
    <>
      <Navigation />
      <DestinationsCarouselWrapper />
      <Footer />
    </>
  );
}
