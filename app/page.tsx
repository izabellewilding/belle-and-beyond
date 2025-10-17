import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import { RecentPosts } from "./components/recent-posts";
import { Footer } from "./components/footer";
import { About } from "./components/about";
import { GalleryDirectory } from "./components/GalleryDirectory";

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
