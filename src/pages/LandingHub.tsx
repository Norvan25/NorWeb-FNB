import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SchedulingModal } from '../components/SchedulingModal';
import { Footer } from '../components/Footer';
import { FeatureComparisonTable } from '../components/FeatureComparisonTable';
import { ROICalculator } from '../components/ROICalculator';
import { FAQSection } from '../components/FAQSection';
import { SocialProofSection } from '../components/SocialProofSection';
import { LeadCaptureSection } from '../components/LeadCaptureSection';
import { useCommunication } from '../context/CommunicationContext';
import { trackPricingView, trackCTAClick } from '../lib/tracking';

// New landing components
import {
  TopBanner,
  Navbar,
  HeroSection,
  DemoSection,
  RevealSection,
  NovaDomainSection,
  ComparisonSection,
  PainPointsSection,
  CostSection,
  HowItWorksSection,
  POSIntegrationSection,
  FinalCTASection,
} from '../components/landing';

export const LandingHub = () => {
  const [schedulingModalOpen, setSchedulingModalOpen] = useState(false);
  const [schedulingType] = useState<'strategy' | 'norcast'>('strategy');
  const [isAnnualBilling, setIsAnnualBilling] = useState(true);

  const { openLeadCapture } = useCommunication();

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetStarted = (plan?: string) => {
    if (plan) {
      trackPricingView(plan);
      trackCTAClick('start_free_trial', `pricing_${plan.toLowerCase()}`);
    }
    openLeadCapture(plan);
  };

  // Track pricing section view
  useEffect(() => {
    const pricingSection = document.getElementById('pricing');
    if (!pricingSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          trackPricingView('section_viewed');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(pricingSection);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#0A1628] overflow-hidden">
      {/* Fixed Top Banner - NO close button */}
      <TopBanner />

      {/* Sticky Navbar (below banner) */}
      <Navbar onScrollTo={scrollToSection} />

      {/* SECTION 1: Hero Section */}
      <HeroSection onScrollTo={scrollToSection} />

      {/* SECTION 2: Pain Points */}
      <PainPointsSection />

      {/* SECTION 3: The Cost */}
      <CostSection />

      {/* SECTION 4: The Solution - Nova's Domain */}
      <NovaDomainSection />

      {/* SECTION 5: Meet The Team */}
      <DemoSection />

      {/* SECTION 6: How It Works */}
      <HowItWorksSection />

      {/* SECTION 7: Works With Your Setup */}
      <POSIntegrationSection />

      {/* SECTION 8: Comparison Table */}
      <ComparisonSection />

      {/* SECTION 9: ROI Calculator / The Math */}
      <div className="bg-[#0A1628]">
        <ROICalculator />
      </div>

      {/* SECTION 10: Pricing */}
      <section id="pricing" className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
              Hire Your AI Team
            </h2>
            <p className="text-lg md:text-xl text-[#4B5563]">
              No contracts. Cancel anytime. Start in 48 hours.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
          >
            <span
              className={`text-sm sm:text-lg font-medium transition-colors ${
                !isAnnualBilling ? 'text-[#0A1628]' : 'text-[#4B5563]'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnualBilling(!isAnnualBilling)}
              className={`relative w-14 sm:w-16 h-7 sm:h-8 rounded-full transition-colors flex-shrink-0 ${
                isAnnualBilling ? 'bg-gradient-to-r from-[#F28500] to-[#FF9A1F]' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: isAnnualBilling ? 26 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-0.5 sm:top-1 w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md"
              />
            </button>
            <span
              className={`text-sm sm:text-lg font-medium transition-colors ${
                isAnnualBilling ? 'text-[#0A1628]' : 'text-[#4B5563]'
              }`}
            >
              Annually
            </span>
            {isAnnualBilling && (
              <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-bold rounded-full text-white bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                Save 15%
              </span>
            )}
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch">
            {/* Starter Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 rounded-3xl bg-white border-2 border-gray-200 hover:border-[#F28500]/50 hover:shadow-xl transition-all"
            >
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-[#0A1628] mb-1">Starter</h3>
                <p className="text-[#4B5563] text-sm mb-6">For: Small cafés, new restaurants, single outlets testing the waters</p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628]">
                      RM {isAnnualBilling ? '299' : '299'}
                    </span>
                    <span className="text-[#4B5563]">/mo</span>
                  </div>
                  {isAnnualBilling && (
                    <>
                      <p className="text-sm text-[#22C55E] font-medium">RM 3,588/year</p>
                      <p className="text-xs text-[#4B5563]">billed annually</p>
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'AI-powered website (mobile-first)',
                    'Nova voice agent (English)',
                    'Basic lead capture (name, phone, preferences)',
                    'WhatsApp booking confirmations',
                    'Basic dashboard (leads + bookings overview)',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#22C55E] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#4B5563] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetStarted('Starter')}
                  className="w-full py-4 rounded-full font-bold text-lg text-white transition-all bg-gradient-to-r from-[#F28500] to-[#FF9A1F] hover:shadow-lg"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>

            {/* Growth Card (Popular) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#FFF7ED] to-white border-2 border-[#F28500] shadow-2xl lg:scale-105 lg:-my-4"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-6 py-2 rounded-full text-sm font-bold text-white shadow-lg bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                  MOST POPULAR
                </span>
              </div>

              <div className="pt-6">
                <h3 className="text-2xl font-bold text-[#0A1628] mb-1">Growth</h3>
                <p className="text-[#4B5563] text-sm mb-6">For: Busy restaurants serious about filling more tables</p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628]">
                      RM {isAnnualBilling ? '499' : '499'}
                    </span>
                    <span className="text-[#4B5563]">/mo</span>
                  </div>
                  {isAnnualBilling && (
                    <>
                      <p className="text-sm text-[#22C55E] font-medium">RM 5,988/year</p>
                      <p className="text-xs text-[#4B5563]">billed annually</p>
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'Everything in Starter, plus:',
                    'Full AI team (Nova, Aiman, Marco, Dev)',
                    'Phone call answering (never miss another call)',
                    'Advanced lead nurturing sequences',
                    'Automated WhatsApp follow-ups and reminders',
                    'Detailed analytics (channel performance, repeat customers)',
                    'Priority support and onboarding',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#F28500] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#0A1628] text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetStarted('Growth')}
                  className="w-full py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg bg-gradient-to-r from-[#F28500] to-[#FF9A1F] hover:shadow-xl"
                >
                  Start Growing
                </motion.button>
              </div>
            </motion.div>

            {/* Enterprise Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-6 md:p-8 rounded-3xl bg-white border-2 border-gray-200 hover:border-[#8B5CF6]/50 hover:shadow-xl transition-all"
            >
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-[#0A1628] mb-1">Scale</h3>
                <p className="text-[#4B5563] text-sm mb-6">For: Restaurant groups, franchises, multi-location brands</p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A1628]">
                      RM {isAnnualBilling ? '799' : '799'}
                    </span>
                    <span className="text-[#4B5563]">/mo</span>
                  </div>
                  {isAnnualBilling && (
                    <>
                      <p className="text-sm text-[#22C55E] font-medium">RM 9,588/year</p>
                      <p className="text-xs text-[#4B5563]">billed annually</p>
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'Everything in Growth, plus:',
                    'Multi-location dashboard and routing',
                    'Custom integrations with your existing systems',
                    'Dedicated account manager',
                    'Quarterly optimization review',
                    'Custom voice training for your brand',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#8B5CF6] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-[#4B5563] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetStarted('Scale')}
                  className="w-full py-4 rounded-full font-bold text-lg text-[#0A1628] border-2 border-[#0A1628]/30 hover:border-[#0A1628] hover:bg-gray-50 transition-all"
                >
                  Contact Sales
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* First 50 restaurants note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-lg text-[#F28500] font-semibold">
              🚀 Early Bird Offer: First 50 restaurants get 15% off for life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <div className="bg-[#0A1628] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <FeatureComparisonTable />
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-[#0A1628]">
        <SocialProofSection />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* SECTION 11: Final CTA */}
      <FinalCTASection onScrollTo={scrollToSection} />

      {/* Lead Capture Section */}
      <div className="bg-[#F3F4F6]">
        <LeadCaptureSection />
      </div>

      {/* SECTION 12: Footer */}
      <Footer />

      <SchedulingModal
        isOpen={schedulingModalOpen}
        onClose={() => setSchedulingModalOpen(false)}
        type={schedulingType}
      />
    </div>
  );
};
