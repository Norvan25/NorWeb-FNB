import { useCallback } from 'react';
import { TopBanner } from './TopBanner';
import { Navbar } from './Navbar';
import { HeroContent } from './HeroContent';
import { HeroMockup } from './HeroMockup';
import { DemoCards } from './DemoCards';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Top Banner - single, accurate offer */}
      <TopBanner />

      {/* Navigation */}
      <Navbar onScrollTo={scrollToSection} />

      {/* Main Hero Content - reduced padding for above-fold fit */}
      <div className="container mx-auto px-4 pt-4 pb-2">
        {/* Hero Grid: Content + Mockup - reduced gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-4">
          <HeroContent onScrollTo={scrollToSection} />
          <div className="hidden lg:block">
            <HeroMockup />
          </div>
        </div>

        {/* Demo Cards - compact, all buttons visible */}
        <DemoCards />

        {/* Scroll Indicator */}
        <ScrollIndicator onScrollTo={scrollToSection} />
      </div>
    </div>
  );
};

export default HeroSection;

