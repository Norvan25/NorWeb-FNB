import { useCallback } from 'react';
import { TopBanner } from './TopBanner';
import { Navbar } from './Navbar';
import { HeroContent } from './HeroContent';
import { HeroMockup } from './HeroMockup';
import { ScrollIndicator } from './ScrollIndicator';

export const HeroSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Top Banner - single, accurate offer */}
      <TopBanner />

      {/* Navigation */}
      <Navbar onScrollTo={scrollToSection} />

      {/* Hero Section - full height minus banner */}
      <section className="min-h-[calc(100vh-96px)] flex items-center py-8 lg:py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* LEFT: Content */}
            <div className="max-w-xl">
              <HeroContent onScrollTo={scrollToSection} />
            </div>
            
            {/* RIGHT: Mockup */}
            <div className="hidden lg:flex justify-center lg:justify-end">
              <HeroMockup />
            </div>
            
          </div>
          
          {/* Scroll Indicator - centered below grid */}
          <div className="text-center mt-8 lg:mt-12">
            <ScrollIndicator onScrollTo={scrollToSection} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
