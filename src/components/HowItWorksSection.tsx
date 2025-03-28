
import React, { useEffect, useRef } from 'react';

const steps = [
  {
    number: "01",
    title: "Share Your Favorites",
    description: "Tell us about your favorite fashion brands and share outfit inspiration images that represent your style goals."
  },
  {
    number: "02",
    title: "We Curate",
    description: "Our style experts analyze your preferences and curate personalized, shoppable outfit recommendations just for you."
  },
  {
    number: "03",
    title: "Weekly Delivery",
    description: "Receive a custom newsletter with outfit ideas and direct links to purchase items that match your style and budget."
  }
];

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-accent">
      <div className="editorial-layout">
        <h2 className="text-3xl md:text-4xl font-serif mb-16 text-center">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="opacity-0 translate-y-10 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl font-serif text-muted-foreground/30 mb-4">{step.number}</div>
              <h3 className="text-xl font-medium mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
