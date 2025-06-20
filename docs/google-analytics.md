# Google Analytics Setup

This project uses Google Analytics 4 (GA4) with the latest Next.js best practices.

## Setup

1. **Environment Variable**: Create a `.env.local` file in your project root and add:
   ```
   NEXT_PUBLIC_GA_ID=YOUR_GA_MEASUREMENT_ID
   ```

2. **Implementation**: Google Analytics is automatically loaded in `app/layout.tsx` using Next.js Script component with `strategy="afterInteractive"` for optimal performance.

## Usage

### Basic Page Tracking
Page views are automatically tracked. For custom page tracking, use:

```typescript
import { pageview } from '@/lib/gtag';

// Track a custom page view
pageview('/custom-page');
```

### Custom Events
Track custom events using the `event` function:

```typescript
import { event } from '@/lib/gtag';

// Track a button click
event({
  action: 'click',
  category: 'engagement',
  label: 'newsletter_signup',
});
```

### Outbound Links
Track when users click external links:

```typescript
import { trackOutboundLink } from '@/lib/gtag';

// In your component
<a 
  href="https://example.com" 
  onClick={() => trackOutboundLink('https://example.com')}
>
  External Link
</a>
```

### Affiliate Links
Track affiliate link clicks:

```typescript
import { trackAffiliateClick } from '@/lib/gtag';

// Track affiliate click
trackAffiliateClick('booking.com', 'paris-hotel');
```

## Best Practices

1. **Performance**: Scripts load after the page becomes interactive
2. **Privacy**: Respect user privacy and GDPR compliance
3. **Type Safety**: Full TypeScript support with proper type definitions
4. **Environment**: Use environment variables for different environments (dev/staging/prod)

## Testing

- In development, check the browser console for gtag calls
- Use Google Analytics Real-Time reports to verify tracking
- Test with Google Analytics Debugger browser extension

## Files

- `app/layout.tsx` - Main GA implementation
- `app/types/gtag.d.ts` - TypeScript declarations
- `lib/gtag.ts` - Utility functions for tracking
- `.env.local` - Environment variable (create this file) 