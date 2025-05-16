import { Hero } from "./components/hero";
import { Navigation } from "./components/navigation";
import { RecentPosts } from "./components/recent-posts";
import { Destinations } from "./components/destinations";

export default function Home() {
  return (
    <div className="">
      <Navigation />
      <Hero />
      <RecentPosts />
      <Destinations />
    </div>
  );
}
