import { motion } from 'framer-motion';
import { CuisineCard } from '../components/CuisineCard';
import { restaurants } from '../data/restaurants';
import { Sparkles, Wallet, Phone, MessageSquare, ArrowRight, Check, Percent, XCircle, AlertCircle, ShoppingCart, ChefHat, Truck } from 'lucide-react';
import { FloatingFNBIcons } from '../components/FloatingFNBIcons';
import { SchedulingModal } from '../components/SchedulingModal';
import { ElevenLabsWidget } from '../components/ElevenLabsWidget';
import { useState, useEffect } from 'react';

export const LandingHub = () => {
  const [schedulingModalOpen, setSchedulingModalOpen] = useState(false);
  const [schedulingType, setSchedulingType] = useState<'strategy' | 'norcast'>('strategy');

  const openSchedulingModal = (type: 'strategy' | 'norcast') => {
    setSchedulingType(type);
    setSchedulingModalOpen(true);
  };

  const triggerElevenLabsAgent = () => {
    const elevenLabsWidget = document.querySelector('elevenlabs-convai');
    if (elevenLabsWidget) {
      const shadowRoot = elevenLabsWidget.shadowRoot;
      if (shadowRoot) {
        const button = shadowRoot.querySelector('[part="button"]') as HTMLElement;
        if (button) {
          button.click();
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingFNBIcons />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <img
          src="/images/norvan_logo_only.svg"
          alt="Norvan Logo"
          className="w-16 h-16 md:w-20 md:h-20 opacity-90 hover:opacity-100 transition-opacity"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

        <div className="relative z-10">
          <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="inline-block mb-6"
              >
                <Sparkles className="text-yellow-400" size={48} />
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent leading-tight">
                Stop Losing Orders When<br />
                No One Replies.
              </h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto"
              >
                A 24/7 digital sales manager that takes bookings, orders, and delivery automatically.<br />
                No commissions. No missed calls.
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-8"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all shadow-xl shadow-cyan-500/50"
                onClick={triggerElevenLabsAgent}
              >
                Activate Free Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all"
                onClick={() => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Calculate Your Savings
              </motion.button>
            </motion.div>
          </section>

          <section id="brands" className="px-6 py-20 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Don't Watch a Demo. Play the Customer.
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                Experience the system in 3 ways right now:<br />
                <span className="block mt-4 text-left max-w-2xl mx-auto">
                  <span className="font-semibold text-white">1. Click</span> a card to browse the full menu.<br />
                  <span className="font-semibold text-white">2. Type</span> in the chat widget to order via text.<br />
                  <span className="font-semibold text-white">3. Talk</span> to the AI Agent to hear the magic live.
                </span>
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {restaurants.map((restaurant, index) => (
                <CuisineCard key={restaurant.id} restaurant={restaurant} index={index} />
              ))}
            </div>
          </section>

          <section className="px-6 py-32 bg-gradient-to-b from-black via-gray-900 to-black">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  This is not a website.<br />
                  It's a revenue capture system.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Percent,
                    title: 'Delivery Apps Take 30%. We Take 0%.',
                    description: 'Stop donating your margin. You keep the customer data, you keep the profit.'
                  },
                  {
                    icon: XCircle,
                    title: 'Missed Calls = Missed Revenue',
                    description: 'No more "Do you have parking?" calls interrupting your rush hour. The AI answers instantly.'
                  },
                  {
                    icon: AlertCircle,
                    title: 'End WhatsApp Order Chaos',
                    description: 'Stop deciphering screenshots and voice notes. Orders go straight to your kitchen/POS.'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(255,255,255,0.05)'
                    }}
                    className="p-8 rounded-xl border border-gray-800 backdrop-blur-sm"
                  >
                    <feature.icon className="text-red-400 mb-4" size={40} />
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-32 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  From Chat to Kitchen in Seconds.
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: MessageSquare,
                    step: '1',
                    title: 'Customer Messages',
                    description: 'Scan QR or Click Link'
                  },
                  {
                    icon: ShoppingCart,
                    step: '2',
                    title: 'AI Takes Order',
                    description: 'Upsells items automatically'
                  },
                  {
                    icon: ChefHat,
                    step: '3',
                    title: 'POS Syncs',
                    description: 'Kitchen gets ticket instantly'
                  },
                  {
                    icon: Truck,
                    step: '4',
                    title: 'Delivery Dispatched',
                    description: 'Rider assigned automatically'
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="relative"
                  >
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm text-center h-full">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-500 text-cyan-400 font-bold text-xl mb-4">
                        {step.step}
                      </div>
                      <step.icon className="text-cyan-400 mx-auto mb-4" size={40} />
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                        <ArrowRight className="text-cyan-500" size={24} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-32 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-6">
                  Costs Less Than One Missed Table.
                </h2>
                <p className="text-xl text-gray-400 mb-2">
                  One-time Setup: <span className="text-white font-bold">RM 1,500 – 3,000</span>
                </p>
                <p className="text-sm text-gray-500">
                  (Includes Menu Build & Training)
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    name: 'ESSENTIALS',
                    price: 'RM 499',
                    period: '/ mo',
                    features: [
                      'Digital Menu',
                      'Direct Ordering',
                      '0% Commission',
                      'Payment Gateway'
                    ],
                    highlighted: false
                  },
                  {
                    name: 'GROWTH',
                    price: 'RM 899',
                    period: '/ mo',
                    badge: 'Recommended',
                    features: [
                      'Everything in Essentials',
                      'WhatsApp Automation',
                      'Table Reservations',
                      'Review Engine'
                    ],
                    highlighted: true
                  },
                  {
                    name: 'AUTOPILOT',
                    price: 'RM 1,499',
                    period: '/ mo',
                    features: [
                      'Everything in Growth',
                      'Voice AI Agent (Phone)',
                      'Loyalty Campaigns',
                      'Dedicated Acct Manager'
                    ],
                    highlighted: false
                  }
                ].map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-8 rounded-2xl backdrop-blur-sm ${
                      tier.highlighted
                        ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500 shadow-xl shadow-cyan-500/20'
                        : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700'
                    }`}
                  >
                    {tier.badge && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                          {tier.badge}
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-4 text-center">{tier.name}</h3>
                    <div className="text-center mb-6">
                      <span className="text-5xl font-black">{tier.price}</span>
                      <span className="text-gray-400 text-lg">{tier.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className={`${tier.highlighted ? 'text-cyan-400' : 'text-green-400'} flex-shrink-0 mt-0.5`} size={20} />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                        tier.highlighted
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      }`}
                      onClick={triggerElevenLabsAgent}
                    >
                      Activate Free Demo
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-6"
              >
                <p className="text-2xl font-bold text-cyan-400">
                  90-Day ROI Guarantee: If it doesn't pay for itself, you get your money back.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="px-6 py-32 bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-12">
                  Ready to Stop Losing Money?
                </h2>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-bold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all shadow-xl shadow-cyan-500/50"
                  onClick={triggerElevenLabsAgent}
                >
                  Activate Free Demo
                </motion.button>
              </motion.div>
            </div>
          </section>

          <footer className="py-12 px-6 border-t border-gray-900">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-gray-500">
                NorWeb Universal F&B Platform &copy; 2025. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </motion.div>

      <SchedulingModal
        isOpen={schedulingModalOpen}
        onClose={() => setSchedulingModalOpen(false)}
        type={schedulingType}
      />

      <ElevenLabsWidget />
    </div>
  );
};
