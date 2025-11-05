'use client';

import { useEffect } from 'react';
import { trackDestinationView } from '@/lib/gtag';

interface DestinationTrackerProps {
  destination: string;
}

export const DestinationTracker = ({ destination }: DestinationTrackerProps) => {
  useEffect(() => {
    // Track destination page view
    trackDestinationView(destination);
  }, [destination]);

  return null; // This component doesn't render anything
};

