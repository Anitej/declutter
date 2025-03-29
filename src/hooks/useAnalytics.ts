
// A custom hook to handle analytics tracking for both Google Analytics and Facebook Pixel

const useAnalytics = () => {
  // Function to track page views
  const trackPageView = (path: string) => {
    try {
      // Google Analytics pageview
      if (window.gtag) {
        window.gtag('config', 'G-XXXXXXXXXX', {
          page_path: path
        });
      }
      
      // Facebook Pixel pageview
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  // Function to track custom events
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    try {
      // Google Analytics event
      if (window.gtag) {
        window.gtag('event', eventName, params);
      }
      
      // Facebook Pixel event - handle special events differently 
      if (window.fbq) {
        // Special handling for subscription events
        if (eventName === 'SubscribeButtonClick') {
          window.fbq('trackCustom', 'SubscribeButtonClick');
        } 
        else if (eventName === 'subscribe') {
          window.fbq('track', 'CompleteRegistration', {
            content_name: 'newsletter_subscription',
            ...params
          });
        } 
        else {
          // Default event tracking
          window.fbq('trackCustom', eventName, params);
        }
        
      }
    } catch (error) {
      console.error('Analytics event tracking error:', error);
    }
  };

  return {
    trackPageView,
    trackEvent
  };
};

export default useAnalytics;
