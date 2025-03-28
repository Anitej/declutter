
import React, { useEffect, useRef } from 'react';

const previews = [
  {
    title: "Minimalist Elegance",
    excerpt: "Oversized white shirt from ZARA paired with relaxed beige pants from H&M for a clean, versatile ensemble that works for any occasion.",
    image: "/lovable-uploads/aef2bde5-1523-4008-9d95-571b96c4bc37.png",
    date: "Summer 2023"
  },
  {
    title: "Burgundy Business Chic",
    excerpt: "Sophisticated burgundy blouse from CHRISTY DAWN complemented by high-waisted beige trousers from Patagonia for a polished office look.",
    image: "/lovable-uploads/c3e89710-9236-4502-ab4a-42971cd402e9.png",
    date: "Fall 2023"
  },
  {
    title: "Classic Minimalism",
    excerpt: "Timeless white tank top from ZARA paired with tailored brown wide-leg pants from Patagonia for an effortlessly elegant silhouette.",
    image: "/lovable-uploads/cf36c7fa-1b12-4dd8-8291-e28a3a092ea2.png",
    date: "Spring 2023"
  }
];

const PreviewSection: React.FC = () => {
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
    <section id="previews" ref={sectionRef} className="py-24 bg-white">
      <div className="editorial-layout">
        <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center">Previous Editions</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Here is a sneak peek of what your newsletter could look like.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {previews.map((preview, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className="group opacity-0 translate-y-10 transition-all duration-700 ease-out hover-lift"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 overflow-hidden">
                <img 
                  src={preview.image} 
                  alt={preview.title} 
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{preview.date}</p>
              <h3 className="text-xl font-serif mb-2">{preview.title}</h3>
              <p className="text-muted-foreground">{preview.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;
