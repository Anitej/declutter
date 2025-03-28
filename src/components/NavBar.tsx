
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const scrollToSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    const subscribeSection = document.getElementById('subscribe');
    if (subscribeSection) {
      subscribeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10',
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-serif font-bold tracking-tighter">
          decluttr<span className="text-sm align-super"></span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#how-it-works" className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">How It Works</a>
          <a href="#testimonials" className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">Testimonials</a>
          <a href="#previews" className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">Previews</a>
        </nav>
        
        <button 
          onClick={scrollToSubscribe}
          className="text-sm uppercase tracking-widest bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-md"
        >
          Subscribe
        </button>
      </div>
    </header>
  );
};

export default NavBar;
