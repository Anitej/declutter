
// Type definitions for Google Analytics and Facebook Pixel

interface Window {
  // Google Analytics
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
  
  // Facebook Pixel
  fbq?: (...args: any[]) => void;
  _fbq?: any;
}
