import { motion } from 'framer-motion';
import { CuisineCard } from '../components/CuisineCard';
import { restaurants } from '../data/restaurants';
import { Sparkles, Wallet, Phone, MessageSquare, ArrowRight, Check, Percent, XCircle, AlertCircle, ShoppingCart, ChefHat, Truck, PhoneOff, Clock, CalendarX, BadgePercent } from 'lucide-react';
import { FloatingFNBIcons } from '../components/FloatingFNBIcons';
import { SchedulingModal } from '../components/SchedulingModal';
import { CommunicationHUD } from '../components/CommunicationHUD';
import { LeadCaptureModal } from '../components/LeadCaptureModal';
import { Footer } from '../components/Footer';
import { useCommunication } from '../context/CommunicationContext';
import { useState } from 'react';

export const LandingHub = () => {
  const [schedulingModalOpen, setSchedulingModalOpen] = useState(false);
  const [schedulingType, setSchedulingType] = useState<'strategy' | 'norcast'>('strategy');
  const [leadCaptureOpen, setLeadCaptureOpen] = useState(false);

  const { openHUD } = useCommunication();

  const openSchedulingModal = (type: 'strategy' | 'norcast') => {
    setSchedulingType(type);
    setSchedulingModalOpen(true);
  };

  const handleOpenDemo = () => {
    openHUD('HUB');
  };

  const handleCalculateSavings = () => {
    setLeadCaptureOpen(true);
  };

  const handleLeadSuccess = () => {
    console.log('Lead captured successfully!');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingFNBIcons />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-16 right-6 z-50"
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
                onClick={handleOpenDemo}
              >
                Activate Free Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all"
                onClick={handleCalculateSavings}
              >
                Calculate Your Savings
              </motion.button>
            </motion.div>
          </section>

          {/* The Problem Section */}
          <section className="px-6 py-24 bg-gradient-to-b from-black via-[#0a0f1a] to-black">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                  Every Day You Wait, You Lose Money
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                  These problems are costing Malaysian restaurants thousands every month
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    icon: PhoneOff,
                    stat: 'RM 6,000/month',
                    title: 'Lost to Missed Calls',
                    description: '20-40% of calls go unanswered during peak hours. Each missed call = lost booking.'
                  },
                  {
                    icon: Clock,
                    stat: '2-4 hours/day',
                    title: 'Wasted on Repetitive Questions',
                    description: 'Your staff answers "What time you close?" 50 times a day instead of serving customers.'
                  },
                  {
                    icon: CalendarX,
                    stat: '10-20% no-shows',
                    title: 'Empty Tables, Lost Revenue',
                    description: 'No automated reminders = customers forget. Empty tables on busy nights.'
                  },
                  {
                    icon: BadgePercent,
                    stat: '30-35% commission',
                    title: 'Paid to Platforms',
                    description: 'Grab and FoodPanda take nearly a third. Your customers, their profit.'
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 30px rgba(0, 212, 170, 0.3)'
                    }}
                    className="p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
                    style={{ backgroundColor: '#132238' }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <card.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {card.stat}
                        </p>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {card.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {card.description}
                        </p>
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
                <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  NorWeb solves all four. Automatically. 24/7.
                </p>
              </motion.div>
            </div>
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
                  Stop Paying Agencies RM 4,500 for 'Likes'.
                </h2>
                <p className="text-xl text-gray-400">
                  Hire a 24/7 Intelligence System that drives actual revenue.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    name: 'THE DIGITAL HOST',
                    price: 'RM 799',
                    period: '/ mo',
                    hook: 'Your 24/7 Front Desk',
                    features: [
                      { text: 'AI Agent (WhatsApp + Website)', enabled: true },
                      { text: 'Online Booking & Order Handling', enabled: true },
                      { text: 'Digital Menu Engineering', enabled: true },
                      { text: 'Human Handoff for Order Processing', enabled: true }
                    ],
                    highlighted: false
                  },
                  {
                    name: 'THE OPS MANAGER',
                    price: 'RM 1,499',
                    period: '/ mo',
                    badge: 'RECOMMENDED',
                    hook: 'Operations on Autopilot',
                    features: [
                      { text: 'Everything in Digital Host', enabled: true },
                      { text: 'POS Integration (Direct to Kitchen)', enabled: true, bold: true },
                      { text: 'Delivery Dispatch (Lalamove/Grab)', enabled: true, bold: true },
                      { text: 'Voice AI Agent (Phone Answering)', enabled: true, bold: true },
                      { text: 'Omnichannel Inbox (WA, FB, IG, Web)', enabled: true, bold: true }
                    ],
                    highlighted: true
                  },
                  {
                    name: 'THE REVENUE ENGINE',
                    price: 'RM 3,299',
                    period: '/ mo',
                    hook: 'Your Marketing Machine',
                    badge2: 'ALL INCLUSIVE',
                    features: [
                      { text: 'Everything in Ops Manager', enabled: true },
                      { text: 'Social Media Content Generator', enabled: true, bold: true },
                      { text: 'Automated Posting & Scheduling', enabled: true, bold: true },
                      { text: 'Campaign Automation', enabled: true, bold: true },
                      { text: 'Customer Reactivation Blasts', enabled: true, bold: true },
                      { text: 'Review Recovery Engine (Google 5-Star)', enabled: true, bold: true }
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
                    {tier.badge2 && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                          {tier.badge2}
                        </span>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2 text-center">{tier.name}</h3>
                    {tier.hook && (
                      <p className="text-center text-gray-400 text-sm mb-4 italic">{tier.hook}</p>
                    )}
                    <div className="text-center mb-6">
                      <span className="text-5xl font-black">{tier.price}</span>
                      <span className="text-gray-400 text-lg">{tier.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          {feature.enabled ? (
                            <Check className={`${tier.highlighted ? 'text-cyan-400' : 'text-green-400'} flex-shrink-0 mt-0.5`} size={20} />
                          ) : (
                            <XCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                          )}
                          <span className={`${feature.warning ? 'text-yellow-400' : 'text-gray-300'} ${feature.bold ? 'font-bold' : ''}`}>{feature.text}</span>
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
                      onClick={handleOpenDemo}
                    >
                      Select Plan
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <p className="text-lg text-gray-400">
                  One-Time Setup: <span className="text-white font-bold text-xl">From RM 3,799</span> <span className="text-sm text-gray-500">(T&C applies)</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Includes Menu Engineering, POS Wiring, AI Training & 2 Days Dedicated Onboarding.
                </p>
                <p className="text-xs text-gray-600 mt-3 italic">
                  * AI token usage billed based on consumption
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto mt-16 p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30"
              >
                <h3 className="text-3xl font-bold mb-4 text-center">
                  Franchise or Multi-Branch?
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed text-center mb-6">
                  Ask about our <span className="font-bold text-white">HQ Command Center (NorOne)</span> for centralized control.
                </p>
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-lg font-bold rounded-full hover:from-purple-600 hover:to-blue-700 transition-all shadow-xl shadow-purple-500/50"
                    onClick={handleOpenDemo}
                  >
                    Ask Nova About Enterprise Architecture
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12"
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
                  onClick={handleOpenDemo}
                >
                  Activate Free Demo
                </motion.button>
              </motion.div>
            </div>
          </section>

          <Footer />
        </div>
      </motion.div>

      <SchedulingModal
        isOpen={schedulingModalOpen}
        onClose={() => setSchedulingModalOpen(false)}
        type={schedulingType}
      />

      <LeadCaptureModal
        isOpen={leadCaptureOpen}
        onClose={() => setLeadCaptureOpen(false)}
        onSuccess={handleLeadSuccess}
        selectedPlan="Savings Calculator"
        restaurantName={null}
      />

      <CommunicationHUD />
    </div>
  );
};
