
import React from 'react';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialSection from '../components/TestimonialSection';
import PreviewSection from '../components/PreviewSection';
import SubscribeForm from '../components/SubscribeForm';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TestimonialSection />
        <PreviewSection />
        <SubscribeForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
