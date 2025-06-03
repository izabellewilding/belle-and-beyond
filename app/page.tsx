import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import { RecentPosts } from "./components/recent-posts";
import { Footer } from "./components/footer";
import { Suspense } from "react";
import { About } from "./components/about";

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
      <RecentPosts />
      <About />
      <Suspense
        fallback={
          <div className="py-16 text-center">Loading destinations...</div>
        }
      >
        <DestinationsContainer />
      </Suspense>
      <Footer />
    </div>
  );
}
