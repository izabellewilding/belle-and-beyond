interface Window {
  gtag: (
    command: 'event',
    action: string,
    params: {
      affiliate_id: string;
      url: string;
      timestamp: string;
      [key: string]: any;
    }
  ) => void;
} 