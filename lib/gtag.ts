export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-2DZ5GVQ2FF";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_location: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track outbound links
export const trackOutboundLink = (url: string) => {
  event({
    action: "click",
    category: "outbound",
    label: url,
  });
};

// Track affiliate link clicks
export const trackAffiliateClick = (
  affiliateName: string,
  destination: string
) => {
  event({
    action: "click",
    category: "affiliate",
    label: `${affiliateName} - ${destination}`,
  });
};

// Track destination page views
export const trackDestinationView = (destination: string) => {
  event({
    action: "view",
    category: "destination",
    label: destination,
  });
};

// Track blog post reads
export const trackBlogPostRead = (postTitle: string, country: string) => {
  event({
    action: "read",
    category: "blog_post",
    label: `${postTitle} - ${country}`,
  });
};

// Track blog post link clicks
export const trackBlogPostClick = (postTitle: string, slug: string) => {
  event({
    action: "click",
    category: "blog_post",
    label: `${postTitle} - ${slug}`,
  });
};

// Track search queries
export const trackSearch = (query: string) => {
  event({
    action: "search",
    category: "engagement",
    label: query,
  });
};

// Track newsletter signups
export const trackNewsletterSignup = (source: string) => {
  event({
    action: "signup",
    category: "newsletter",
    label: source,
  });
};

// Track contact form submissions
export const trackContactForm = (formType: string) => {
  event({
    action: "submit",
    category: "contact",
    label: formType,
  });
};
