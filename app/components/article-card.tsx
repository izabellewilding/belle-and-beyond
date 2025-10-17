import Image from "next/image";
import Link from "next/link";

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
  const href = `/blog/${post.slug}`;

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <Link href={href} className="block relative w-full aspect-[4/5] overflow-hidden rounded-3xl">
        <Image
          src={post.mainImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, 100vw"
          priority={false}
        />
      </Link>
      <div className="mt-6 space-y-3">
        <Link href={href}>
          <h3 className="text-2xl md:text-2xl leading-snug font-serif text-neutral-900">
            {post.title}
          </h3>
        </Link>
        {post.description && (
          <p className="text-base text-neutral-600">
            {post.description}
          </p>
        )}
        {showButton && (
          <div className="pt-2 font-semibold">
            <Link href={href}>Read more</Link>
          </div>
        )}
      </div>
    </div>
  );
};
