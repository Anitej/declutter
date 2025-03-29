import React, { useState } from 'react';
import { toast } from "sonner";
import { supabase, isSupabaseAvailable } from '@/lib/supabase';
import useAnalytics from '@/hooks/useAnalytics';


const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useAnalytics();


  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if Supabase is available
      if (!isSupabaseAvailable()) {
        toast.error("Database connection is not available");
        return;
      }

      // Insert the email into the subscribers table
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email: email.toLowerCase() }]);
      
      if (error) {
        // Check for unique constraint violation (email already exists)
        if (error.code === '23505') {
          toast.error("This email is already subscribed");
        } else {
          console.error('Error saving subscriber:', error);
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.success("Thank you for subscribing!");
        
        // Track successful subscription event
        trackEvent('subscribe', { email_domain: email.split('@')[1] });
        
        setEmail('');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error("Connection error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="subscribe" className="py-24 bg-secondary">
      <div className="editorial-layout">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Subscribe to decluttr</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Join our community of fashion enthusiasts and receive personalized style recommendations straight to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="newsletter-form-input"
                disabled={isSubmitting}
              />
            </div>
            
            <button
              type="submit"
              className="newsletter-button relative overflow-hidden group disabled:opacity-70"
              disabled={isSubmitting}
            >
              <span className={`inline-block transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                Subscribe
              </span>
              {isSubmitting && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              )}
            </button>
            
            <p className="text-xs text-muted-foreground mt-6">
              By subscribing, you agree to receive email marketing communications from us.
              <br />
              Don't worry, we respect your privacy and you can unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscribeForm;

