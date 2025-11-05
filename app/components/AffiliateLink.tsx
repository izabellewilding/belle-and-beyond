'use client';

import Link from 'next/link';
import { trackAffiliateClick } from '@/lib/gtag';

interface AffiliateLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  affiliateName?: string;
  destination?: string;
}

export const AffiliateLink = ({ 
  href, 
  className = '', 
  children,
  affiliateName = 'unknown',
  destination = 'unknown'
}: AffiliateLinkProps) => {
  const handleClick = () => {
    trackAffiliateClick(affiliateName, destination);
  };

  return (
    <Link 
      href={href}
      className={className}
      target="_blank"
      rel="nofollow noopener noreferrer sponsored"
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}; 