
import React, { useEffect, useRef } from 'react';

const testimonials = [
  {
    quote: "Decluttr has completely transformed my shopping experience. I actually wear everything I buy now!",
    author: "Emma S.",
    role: "Digital Marketing Manager"
  },
  {
    quote: "The outfit recommendations are spot-on with my style, but push me just enough outside my comfort zone.",
    author: "Michael T.",
    role: "UX Designer"
  },
  {
    quote: "I've discovered so many brands that match my aesthetic thanks to Decluttr's personalized approach.",
    author: "Olivia H.",
    role: "Content Creator"
  }
];

const TestimonialSection: React.FC = () => {
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
    <section id="testimonials" ref={sectionRef} className="py-24 bg-white">
      <div className="editorial-layout">
        <h2 className="text-3xl md:text-4xl font-serif mb-16 text-center">From Our Subscribers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="flex flex-col opacity-0 translate-y-10 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="border-t border-black pt-6 flex-grow">
                <blockquote className="text-lg mb-6">"{testimonial.quote}"</blockquote>
                <footer>
                  <cite className="not-italic font-medium">{testimonial.author}</cite>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
