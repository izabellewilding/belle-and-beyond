import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    title: "Exploring Tbilisi: A Complete Travel Guide",
    slug: "/blog/tbilisi-guide",
    date: "May 12, 2025",
    excerpt:
      "Discover Georgia’s capital with curated tips, scenic spots, and delicious eats.",
    image: "/images/tbilisi.jpg",
  },
  {
    title: "Sunset Hikes in Puerto Viejo",
    slug: "/blog/puerto-viejo-sunset",
    date: "April 28, 2025",
    excerpt:
      "The best sunset views and jungle paths to explore in Costa Rica’s Caribbean coast.",
    image: "/images/puerto-viejo.jpg",
  },
  {
    title: "Travel Photography Tips for Beginners",
    slug: "/blog/photography-tips",
    date: "April 15, 2025",
    excerpt:
      "Master light, angles, and composition with these easy travel photo hacks.",
    image: "/images/photography.jpg",
  },
  {
    title: "Best Cafés to Work From in Tbilisi",
    slug: "/blog/tbilisi-cafes",
    date: "March 29, 2025",
    excerpt: "Cozy spots with fast Wi-Fi and strong coffee for digital nomads.",
    image: "/images/cafe.jpg",
  },
  {
    title: "Costa Rica Packing List Essentials",
    slug: "/blog/costa-rica-packing",
    date: "March 10, 2025",
    excerpt:
      "Everything you need for beach days, rainforest hikes, and pura vida living.",
    image: "/images/packing.jpg",
  },
  {
    title: "Why You Should Visit Georgia in Spring",
    slug: "/blog/georgia-spring",
    date: "Feb 22, 2025",
    excerpt:
      "Wildflowers, empty trails, and perfect weather—spring is Georgia’s best kept secret.",
    image: "/images/spring.jpg",
  },
];

export const RecentPosts = () => (
  <section className="py-16 px-4">
    <div className="max-w-7xl text-center mx-auto rounded-4xl p-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-10">
        Latest from the Blog
      </h2>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.slug}
            className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-500 mb-1">{post.date}</p>
              <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
