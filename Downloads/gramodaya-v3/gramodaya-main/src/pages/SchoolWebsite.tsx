import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import AcademicsSection from '@/components/AcademicsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import QuickLinksSection from '@/components/QuickLinksSection';
import AdmissionsSection from '@/components/AdmissionsSection';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

const SchoolWebsite = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <AcademicsSection />
        <FacilitiesSection />
        <GallerySection />
        <TestimonialsSection />
        <QuickLinksSection />
        <AdmissionsSection />
        <LocationSection />
        <ContactSection />
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default SchoolWebsite;
