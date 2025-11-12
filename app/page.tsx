import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import { RecentPosts } from "./components/recent-posts";
import { RecentPostsAlternative } from "./components/recent-posts-alternative";
import { Footer } from "./components/footer";
import { About } from "./components/about";
import { GalleryDirectory } from "./components/GalleryDirectory";
import { Contact } from "./components/contact";

export default function Home() {
  // Set to true to use the alternative layout, false for the original
  const useAlternativeLayout = false;

  return (
    <div className="">
      <Navigation />
      <Hero />
      {/* Gallery below hero, aligned to the right side */}

      {useAlternativeLayout ? <RecentPostsAlternative /> : <RecentPosts />}
      <div className="w-full flex justify-end">
        <GalleryDirectory />
      </div>
      {/* <DestinationsCarouselWrapper /> */}
      <About />
      <Contact />

      <Footer />
    </div>
  );
}
