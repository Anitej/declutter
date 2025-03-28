
import React, { useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (textContainerRef.current) {
      observer.observe(textContainerRef.current);
    }

    return () => {
      if (textContainerRef.current) {
        observer.unobserve(textContainerRef.current);
      }
    };
  }, []);

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pb-20 pt-32"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-5"></div>
      
      <div
        ref={textContainerRef}
        className="editorial-layout text-center opacity-0 transition-all duration-1000 ease-out"
      >
        <p className="text-sm uppercase tracking-[0.25em] mb-6 animate-fade-in-slow">The Personal Style Newsletter</p>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-8 max-w-4xl mx-auto animate-fade-in text-balance">
          Turn outfit inspo into 
          <span className="block"> reality — delivered weekly</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-muted-foreground animate-fade-in-slow text-balance">
          Personalized, shoppable outfit recommendations based on your favorite brands and style inspiration.
        </p>
        
        <button 
          onClick={scrollToHowItWorks}
          className="newsletter-button inline-block animate-fade-in"
        >
          Get Started
        </button>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button onClick={scrollToHowItWorks} className="text-sm text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
