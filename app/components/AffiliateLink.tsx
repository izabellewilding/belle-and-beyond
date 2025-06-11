'use client';

import Link from 'next/link';

interface AffiliateLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export const AffiliateLink = ({ 
  href, 
  className = '', 
  children 
}: AffiliateLinkProps) => {
  return (
    <Link 
      href={href}
      className={className}
      target="_blank"
      rel="nofollow noopener noreferrer sponsored"
    >
      {children}
    </Link>
  );
}; 