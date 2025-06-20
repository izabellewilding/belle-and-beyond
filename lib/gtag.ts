export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-2DZ5GVQ2FF';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track outbound links
export const trackOutboundLink = (url: string) => {
  event({
    action: 'click',
    category: 'outbound',
    label: url,
  });
};

// Track affiliate link clicks
export const trackAffiliateClick = (affiliateName: string, destination: string) => {
  event({
    action: 'click',
    category: 'affiliate',
    label: `${affiliateName} - ${destination}`,
  });
}; 