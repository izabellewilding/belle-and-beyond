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
      className={`bg-white rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full ${className}`}
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={post.mainImage}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 space-y-2 flex flex-col flex-grow">
        <h3 className="text-lg font-serif line-clamp-2 font-bold">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-sm text-gray-600 line-clamp-2 text-xs">
            {post.description}
          </p>
        )}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.categories.map((category) => (
              <span key={category} className="text-sm text-gray-500">
                {category}
              </span>
            ))}
          </div>
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
