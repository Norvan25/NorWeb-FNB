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

  const { openLeadCapture, openHUD } = useCommunication();

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
      <section id="pricing" className="py-20 md:py-28 px-4 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Choose Your Marketing Department
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Simple pricing. No hidden fees. No lock-in contracts.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch">
            {/* Starter Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-8 rounded-3xl bg-[#1A2332] border-2 border-gray-700 hover:border-[#F28500]/50 hover:shadow-xl transition-all"
            >
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-white mb-1">Starter</h3>
                <p className="text-gray-400 text-sm mb-4">Website + WhatsApp AI</p>

                {/* Setup Price */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400 line-through">RM 2,799</span>
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full text-white bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                      EARLY BIRD
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-white">From RM 1,399</p>
                  <p className="text-xs text-gray-400 mt-1">One-time setup</p>
                </div>

                {/* Monthly Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                      RM 299
                    </span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'Custom branded website',
                    'WhatsApp AI assistant',
                    'Booking system',
                    '7-day deployment',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#22C55E] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetStarted('Starter')}
                  className="w-full py-4 rounded-full font-bold text-lg text-white transition-all bg-gradient-to-r from-[#F28500] to-[#FF9A1F] hover:shadow-lg"
                >
                  Get Quote →
                </motion.button>
              </div>
            </motion.div>

            {/* Growth Card (Popular) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#1A2332] to-[#0F1720] border-2 border-[#F28500] shadow-2xl lg:scale-105 lg:-my-4"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="px-6 py-2 rounded-full text-sm font-bold text-white shadow-lg bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                  MOST POPULAR
                </span>
              </div>

              <div className="pt-6">
                <h3 className="text-2xl font-bold text-white mb-1">Growth</h3>
                <p className="text-gray-400 text-sm mb-4">Website + WhatsApp + Voice + CRM</p>

                {/* Setup Price */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400 line-through">RM 4,799</span>
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full text-white bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                      EARLY BIRD
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-white">From RM 2,399</p>
                  <p className="text-xs text-gray-400 mt-1">One-time setup</p>
                </div>

                {/* Monthly Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                      RM 599
                    </span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'Everything in Starter, plus:',
                    'Voice AI (answers calls 24/7)',
                    'CRM system',
                    'Auto-nurture campaigns',
                    'Staff training',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#F28500] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-white text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetStarted('Growth')}
                  className="w-full py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg bg-gradient-to-r from-[#F28500] to-[#FF9A1F] hover:shadow-xl"
                >
                  Get Quote →
                </motion.button>
              </div>
            </motion.div>

            {/* Scale Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-6 md:p-8 rounded-3xl bg-[#1A2332] border-2 border-gray-700 hover:border-[#8B5CF6]/50 hover:shadow-xl transition-all"
            >
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-white mb-1">Scale</h3>
                <p className="text-gray-400 text-sm mb-4">Complete AI Marketing Department</p>

                {/* Setup Price */}
                <div className="mb-4 pb-4 border-b border-gray-700">
                  <p className="text-lg font-semibold text-white">Custom</p>
                  <p className="text-xs text-gray-400 mt-1">One-time setup</p>
                </div>

                {/* Monthly Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                      Custom
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'Everything in Growth, plus:',
                    'Marketing AI engine',
                    'Social media automation',
                    'Multi-branch dashboard',
                    'Dedicated support',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-[#8B5CF6] flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGetStarted('Scale')}
                  className="w-full py-4 rounded-full font-bold text-lg text-white border-2 border-gray-600 hover:border-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all"
                >
                  Contact Sales →
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Trust Element 1 */}
            <div className="text-center p-6 rounded-2xl bg-[#1A2332] border border-gray-700">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-bold text-white mb-2">90-Day ROI Guarantee</h3>
              <p className="text-sm text-gray-400">Doesn't pay for itself? Full setup refund.</p>
            </div>

            {/* Trust Element 2 */}
            <div className="text-center p-6 rounded-2xl bg-[#1A2332] border border-gray-700">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-lg font-bold text-white mb-2">Early Bird: 50% Off Setup</h3>
              <p className="text-sm text-gray-400">12-month commitment. First 50 only.</p>
            </div>

            {/* Trust Element 3 */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openHUD('HUB')}
              className="text-center p-6 rounded-2xl bg-[#1A2332] border border-gray-700 hover:border-[#F28500]/50 transition-all cursor-pointer w-full"
            >
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-bold text-white mb-2">Not sure which tier?</h3>
              <p className="text-sm text-gray-400">Talk to Nova. She'll help you decide.</p>
            </motion.button>
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
