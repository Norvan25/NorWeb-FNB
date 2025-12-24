import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, ChevronDown, ChevronUp } from 'lucide-react';

interface Feature {
  name: string;
  starter: boolean;
  growth: boolean;
  enterprise: boolean;
}

interface Category {
  name: string;
  features: Feature[];
}

const comparisonData: Category[] = [
  {
    name: 'AI-POWERED WEBSITE',
    features: [
      { name: 'Custom branded website', starter: true, growth: true, enterprise: true },
      { name: 'Mobile optimized', starter: true, growth: true, enterprise: true },
      { name: 'Menu with photos', starter: true, growth: true, enterprise: true },
      { name: 'Online ordering', starter: true, growth: true, enterprise: true },
      { name: 'SEO optimized', starter: true, growth: true, enterprise: true },
    ],
  },
  {
    name: 'AI FRONT DESK',
    features: [
      { name: 'AI Chatbot (web)', starter: true, growth: true, enterprise: true },
      { name: 'AI Chatbot (WhatsApp)', starter: true, growth: true, enterprise: true },
      { name: 'AI Voice Agent (phone)', starter: false, growth: true, enterprise: true },
      { name: 'After-hours handling', starter: true, growth: true, enterprise: true },
      { name: 'Multi-language (BM/EN)', starter: true, growth: true, enterprise: true },
    ],
  },
  {
    name: 'BOOKING & ORDERS',
    features: [
      { name: 'Online reservations', starter: true, growth: true, enterprise: true },
      { name: 'Automated confirmations', starter: true, growth: true, enterprise: true },
      { name: 'No-show reminders', starter: false, growth: true, enterprise: true },
      { name: 'Delivery integration', starter: false, growth: true, enterprise: true },
      { name: 'Direct ordering (0% commission)', starter: true, growth: true, enterprise: true },
    ],
  },
  {
    name: 'MARKETING & CRM',
    features: [
      { name: 'Basic analytics', starter: true, growth: true, enterprise: true },
      { name: 'Customer database', starter: true, growth: true, enterprise: true },
      { name: 'Full CRM', starter: false, growth: true, enterprise: true },
      { name: 'Review collection', starter: false, growth: true, enterprise: true },
      { name: 'WhatsApp broadcasts', starter: false, growth: true, enterprise: true },
      { name: 'Social media management', starter: false, growth: false, enterprise: true },
      { name: 'Content creation', starter: false, growth: false, enterprise: true },
    ],
  },
  {
    name: 'SUPPORT',
    features: [
      { name: 'Email support', starter: true, growth: true, enterprise: true },
      { name: 'Priority support', starter: false, growth: true, enterprise: true },
      { name: 'Dedicated manager', starter: false, growth: false, enterprise: true },
    ],
  },
];

const FeatureCell = ({ enabled, isGrowth }: { enabled: boolean; isGrowth?: boolean }) => (
  <td className={`py-3 px-4 text-center ${isGrowth ? 'bg-cyan-500/5' : ''}`}>
    {enabled ? (
      <Check className="w-5 h-5 text-cyan-400 mx-auto" />
    ) : (
      <Minus className="w-5 h-5 text-gray-600 mx-auto" />
    )}
  </td>
);

export const FeatureComparisonTable = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      {/* Header with Toggle for Mobile */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-white">Compare Plans</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <span className="text-sm font-medium">{isExpanded ? 'Hide' : 'Show'} Details</span>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Table - Always visible on desktop, toggleable on mobile */}
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{ 
            height: 'auto',
            opacity: 1 
          }}
          className={`overflow-hidden ${!isExpanded ? 'hidden lg:block' : 'block'}`}
        >
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full min-w-[600px]">
              {/* Sticky Header */}
              <thead className="sticky top-0 z-10">
                <tr className="bg-gray-900 border-b border-gray-800">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium text-sm w-1/2">Feature</th>
                  <th className="py-4 px-4 text-center text-gray-300 font-semibold">Starter</th>
                  <th className="py-4 px-4 text-center text-cyan-400 font-semibold bg-cyan-500/10 border-x border-cyan-500/20">
                    Growth
                    <span className="block text-xs text-cyan-500 font-normal">Popular</span>
                  </th>
                  <th className="py-4 px-4 text-center text-gray-300 font-semibold">Enterprise</th>
                </tr>
              </thead>

              <tbody>
                {comparisonData.map((category, catIdx) => (
                  <>
                    {/* Category Header Row */}
                    <tr key={`cat-${catIdx}`} className="bg-gray-800/80">
                      <td colSpan={4} className="py-3 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {category.name}
                      </td>
                    </tr>

                    {/* Feature Rows */}
                    {category.features.map((feature, featIdx) => (
                      <tr 
                        key={`feat-${catIdx}-${featIdx}`} 
                        className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="py-3 px-6 text-gray-300 text-sm">{feature.name}</td>
                        <FeatureCell enabled={feature.starter} />
                        <FeatureCell enabled={feature.growth} isGrowth />
                        <FeatureCell enabled={feature.enterprise} />
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mobile hint when collapsed */}
      {!isExpanded && (
        <p className="lg:hidden text-center text-gray-500 text-sm mt-4">
          Tap "Show Details" to compare all features
        </p>
      )}
    </motion.div>
  );
};

