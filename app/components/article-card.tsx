import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

interface ArticleCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    mainImage: string;
    description?: string;
    categories?: string[];
  };
  showButton?: boolean;
  className?: string;
}

export const ArticleCard = ({
  post,
  showButton = false,
  className = "",
}: ArticleCardProps) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full ${className}`}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={post.mainImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {post.categories && post.categories.length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 space-y-3 flex flex-col flex-grow">
        <h3 className="text-xl font-serif line-clamp-2 group-hover:text-gray-700 transition-colors">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {post.description}
          </p>
        )}
        {showButton && (
          <div className="mt-auto pt-4">
            <Button text="Read article" href={`/blog/${post.slug}`} outline />
          </div>
        )}
      </div>
    </Link>
  );
};
