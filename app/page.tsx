import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import { RecentPosts } from "./components/recent-posts";
import { Destinations } from "./components/destinations";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="">
      <Navigation />
      <Hero />
      <RecentPosts />
      <Destinations />
      <Footer />
    </div>
  );
}
