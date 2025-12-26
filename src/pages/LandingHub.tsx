import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, PhoneOff, Clock, CalendarX, BadgePercent } from 'lucide-react';
import { SchedulingModal } from '../components/SchedulingModal';
import { Footer } from '../components/Footer';
import { FeatureComparisonTable } from '../components/FeatureComparisonTable';
import { ROICalculator } from '../components/ROICalculator';
import { FAQSection } from '../components/FAQSection';
import { SocialProofSection } from '../components/SocialProofSection';
import { LeadCaptureSection } from '../components/LeadCaptureSection';
import { useCommunication } from '../context/CommunicationContext';

// New landing components
import {
  TopBanner,
  Navbar,
  HeroSection,
  DemoSection,
  RevealSection,
  NovaDomainSection,
  ComparisonSection,
  FinalCTASection,
} from '../components/landing';

export const LandingHub = () => {
  const [schedulingModalOpen, setSchedulingModalOpen] = useState(false);
  const [schedulingType] = useState<'strategy' | 'norcast'>('strategy');
  const [isAnnualBilling, setIsAnnualBilling] = useState(true);

  const { openLeadCapture } = useCommunication();

  const handleGetStarted = (plan?: string) => {
    openLeadCapture(plan);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Fixed Top Banner - NO close button */}
      <TopBanner />

      {/* Sticky Navbar */}
      <Navbar onScrollTo={scrollToSection} />

      {/* Hero Section - AI Team with Soul concept */}
      <HeroSection onScrollTo={scrollToSection} />

      {/* Demo Section - "Don't Trust Us. Test Us." with character cards */}
      <DemoSection />

      {/* Reveal Section - Soul vs Brain */}
      <RevealSection />

      {/* Nova's Domain - Features */}
      <NovaDomainSection />

      {/* Comparison Section - Tool vs Teammate */}
      <ComparisonSection />

      {/* The Problem Section - Keeping this for revenue context */}
      <section className="px-6 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Every Day You Wait, You Lose Money
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              These problems are costing Malaysian restaurants thousands every month
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: PhoneOff,
                stat: 'RM 6,000/month',
                title: 'Lost to Missed Calls',
                description:
                  '20-40% of calls go unanswered during peak hours. Each missed call = lost booking.',
                color: 'red',
              },
              {
                icon: Clock,
                stat: '2-4 hours/day',
                title: 'Wasted on Repetitive Questions',
                description:
                  'Your staff answers "What time you close?" 50 times a day instead of serving customers.',
                color: 'orange',
              },
              {
                icon: CalendarX,
                stat: '10-20% no-shows',
                title: 'Empty Tables, Lost Revenue',
                description: 'No automated reminders = customers forget. Empty tables on busy nights.',
                color: 'yellow',
              },
              {
                icon: BadgePercent,
                stat: '30-35% commission',
                title: 'Paid to Platforms',
                description: 'Grab and FoodPanda take nearly a third. Your customers, their profit.',
                color: 'purple',
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
                className="p-6 md:p-8 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-orange-100">
                    <card.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{card.stat}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              NorWeb solves all four. Automatically. 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <div className="bg-gray-900 text-white">
        <ROICalculator />
      </div>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Simple Pricing. Serious Results.
            </h2>
            <p className="text-xl text-gray-600">Choose your plan. Get your AI running in 7 days.</p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span
              className={`text-lg font-medium transition-colors ${
                !isAnnualBilling ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnualBilling(!isAnnualBilling)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isAnnualBilling ? 'bg-gradient-to-r from-orange-500 to-rose-500' : 'bg-gray-300'
              }`}
            >
              <motion.div
                animate={{ x: isAnnualBilling ? 32 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
            <span
              className={`text-lg font-medium transition-colors ${
                isAnnualBilling ? 'text-gray-900' : 'text-gray-400'
              }`}
            >
              Annual
            </span>
            {isAnnualBilling && (
              <span className="px-3 py-1 text-sm font-bold rounded-full text-white bg-gradient-to-r from-orange-500 to-rose-500">
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
              transition={{ delay: 0 }}
              className="relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500">
                  EARLY BIRD
                </span>
              </div>

              <div className="pt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Starter</h3>
                <p className="text-gray-600 text-sm mb-6">Your AI Front Desk</p>

                <div className="mb-4">
                  {isAnnualBilling ? (
                    <>
                      <span className="text-gray-400 line-through text-xl">RM 219/mo</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-gray-900">RM 186</span>
                        <span className="text-gray-500">/mo</span>
                      </div>
                      <p className="text-sm text-gray-500">billed annually</p>
                    </>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-gray-900">RM 219</span>
                      <span className="text-gray-500">/mo</span>
                    </div>
                  )}
                </div>

                <p className="text-sm font-medium mb-6 text-orange-500">
                  {isAnnualBilling ? '🔥 + 6 months FREE' : '🔥 + 1 month FREE'}
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Custom AI-powered website',
                    'AI chatbot (WhatsApp + Web)',
                    'Menu display with photos',
                    'Online booking system',
                    'Basic analytics dashboard',
                    'Email support',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleGetStarted('Starter')}
                  className="w-full py-4 rounded-full font-bold text-lg text-white transition-all bg-gradient-to-r from-orange-500 to-rose-500"
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
              className="relative p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-rose-50 border-2 border-orange-500 shadow-2xl lg:scale-105 lg:-my-4"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <span className="px-6 py-2 rounded-full text-base font-bold text-white shadow-lg bg-gradient-to-r from-orange-500 to-rose-500">
                  MOST POPULAR
                </span>
              </div>

              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Growth</h3>
                <p className="text-gray-600 text-sm mb-6">Full Operations Suite</p>

                <div className="mb-4">
                  {isAnnualBilling ? (
                    <>
                      <span className="text-gray-400 line-through text-xl">RM 549/mo</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-gray-900">RM 499</span>
                        <span className="text-gray-500">/mo</span>
                      </div>
                      <p className="text-sm text-gray-500">billed annually</p>
                    </>
                  ) : (
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-gray-900">RM 549</span>
                      <span className="text-gray-500">/mo</span>
                    </div>
                  )}
                </div>

                <p className="text-sm font-medium mb-6 text-orange-500">
                  {isAnnualBilling ? '🔥 + 6 months FREE' : '\u00A0'}
                </p>

                <p className="text-orange-600 text-sm font-medium mb-4">Everything in Starter, plus:</p>
                <ul className="space-y-3 mb-8">
                  {[
                    'AI Voice Agent (answers phone calls)',
                    'Delivery platform integration',
                    'Full CRM with customer history',
                    'Automated review collection',
                    'WhatsApp broadcast marketing',
                    'Priority support',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-orange-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-800 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleGetStarted('Growth')}
                  className="w-full py-4 rounded-full font-bold text-lg text-white transition-all shadow-lg bg-gradient-to-r from-orange-500 to-rose-500"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>

            {/* Enterprise Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all"
            >
              <div className="pt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Enterprise</h3>
                <p className="text-gray-600 text-sm mb-6">Complete Marketing Machine</p>

                <div className="mb-4">
                  <span className="text-4xl font-black text-gray-900">Custom</span>
                </div>

                <p className="text-gray-500 text-sm mb-6">
                  For restaurant groups and ambitious brands
                </p>

                <p className="text-purple-600 text-sm font-medium mb-4">Everything in Growth, plus:</p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Full social media management',
                    'Content creation & posting',
                    'Influencer coordination',
                    'Monthly strategy sessions',
                    'Dedicated account manager',
                    'Multi-location support',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-purple-500 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleGetStarted('Enterprise')}
                  className="w-full py-4 rounded-full font-bold text-lg text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Setup Fee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-lg text-gray-600">
              Setup from <span className="text-gray-400 line-through">RM 3,500</span>{' '}
              <span className="text-gray-900 font-bold text-xl">RM 2,975</span>{' '}
              <span className="font-bold text-orange-500">(Early Bird 15% off)</span>
            </p>
          </motion.div>

          {/* Guarantee Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 bg-green-50 border border-green-200 rounded-full text-center">
              <span className="text-green-500 text-lg">✅</span>
              <span className="text-green-700 font-semibold text-sm sm:text-base">
                3-Month ROI Guarantee — 50 bookings or full setup refund
              </span>
            </div>
          </motion.div>

          {/* Trust Line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 text-sm mb-16"
          >
            No hidden fees. No per-message charges. Cancel anytime.
          </motion.p>

          {/* Feature Comparison Table */}
          <FeatureComparisonTable />
        </div>
      </section>

      {/* Social Proof Section */}
      <div className="bg-gray-900 text-white">
        <SocialProofSection />
      </div>

      {/* FAQ Section */}
      <div id="faq">
        <FAQSection />
      </div>

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Lead Capture Section */}
      <div className="bg-gray-50">
        <LeadCaptureSection />
      </div>

      <Footer />

      <SchedulingModal
        isOpen={schedulingModalOpen}
        onClose={() => setSchedulingModalOpen(false)}
        type={schedulingType}
      />
    </div>
  );
};
