interface AffiliateClickEvent {
  affiliateId: string;
  url: string;
  timestamp: string;
}

// Initialize analytics (you can replace this with your preferred analytics service)
let analyticsInitialized = false;

const initializeAnalytics = () => {
  if (analyticsInitialized) return;
  
  // Initialize your analytics service here
  // Example: Google Analytics, Plausible, etc.
  
  analyticsInitialized = true;
};

export const trackAffiliateClick = async (event: AffiliateClickEvent) => {
  // Initialize analytics if not already done
  initializeAnalytics();

  // Track the event
  try {
    // 1. Log to your analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        affiliate_id: event.affiliateId,
        url: event.url,
        timestamp: event.timestamp
      });
    }

    // 2. Optional: Log to your backend
    await fetch('/api/track-affiliate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

  } catch (error) {
    console.error('Error tracking affiliate click:', error);
  }
}; 