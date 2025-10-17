import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import { RecentPosts } from "./components/recent-posts";
import { Footer } from "./components/footer";
import { About } from "./components/about";
import { GalleryDirectory } from "./components/GalleryDirectory";

// Create a container for the async Destinations component
const DestinationsContainer = async () => {
  // Dynamic import to use the async component
  const { Destinations } = await import("./components/destinations");
  return <Destinations />;
};

export default function Home() {
  return (
    <div className="">
      <Navigation />
      <Hero />
      {/* Gallery below hero, aligned to the right side */}

      <RecentPosts />
      <div className="w-full flex justify-end">
        <GalleryDirectory />
      </div>
      <About />

      <Footer />
    </div>
  );
}
