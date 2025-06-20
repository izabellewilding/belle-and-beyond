declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown> | {
        affiliate_id: string;
        url: string;
        timestamp: string;
        [key: string]: unknown;
      }
    ) => void;
  }
}

export {}; 