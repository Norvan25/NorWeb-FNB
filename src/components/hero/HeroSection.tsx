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
      {/* Top Banner */}
      <TopBanner />

      {/* Navigation */}
      <Navbar onScrollTo={scrollToSection} />

      {/* Main Hero Content */}
      <div className="container mx-auto px-4 pt-6 pb-4">
        {/* Hero Grid: Content + Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">
          <HeroContent onScrollTo={scrollToSection} />
          <HeroMockup />
        </div>

        {/* Demo Cards */}
        <DemoCards />

        {/* Scroll Indicator */}
        <ScrollIndicator onScrollTo={scrollToSection} />
      </div>
    </div>
  );
};

export default HeroSection;

