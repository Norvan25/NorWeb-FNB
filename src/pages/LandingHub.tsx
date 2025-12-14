import { motion } from 'framer-motion';
import { CuisineCard } from '../components/CuisineCard';
import { restaurants } from '../data/restaurants';
import { Sparkles, Moon, Calendar, Wallet, Rocket, Palette, Bot, Target, Award, Users } from 'lucide-react';
import { FloatingFNBIcons } from '../components/FloatingFNBIcons';

export const LandingHub = () => {
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
                Stop Donating 30% of Your Revenue.<br />
                Automate Your Restaurant Instead.
              </h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto"
              >
                No more missed calls. No more DM chaos. No more paying a "lazy tax" to delivery platforms.<br />
                NorWeb handles bookings, orders, and questions 24/7 — all inside YOUR business.
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
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-xl shadow-purple-500/50"
                onClick={() => document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Talk to Nova
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all"
                onClick={() => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Live Demos
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
                  Still Losing Money to Third-Party Apps?
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  They take 30%. They own your data. They call the shots.<br />
                  Take back your business.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Moon,
                    title: 'Revenue While You Sleep',
                    description: '3am cravings become 3am profit.\nNorWeb takes orders 24/7 — 0% commission, 100% yours.'
                  },
                  {
                    icon: Calendar,
                    title: 'Reservations Without the Phone Tag',
                    description: 'No double-bookings. No missed calls during rush hour.\nCustomers book themselves. You just cook.'
                  },
                  {
                    icon: Wallet,
                    title: 'Keep Your 30%',
                    description: 'Delivery apps take a third of the pie. Direct orders through NorWeb?\n0% commission. Your margin, your money.'
                  },
                  {
                    icon: Rocket,
                    title: 'Live in 7 Days',
                    description: 'Not 7 months.\nWe build your branded, fully functional restaurant webapp in one week flat.'
                  },
                  {
                    icon: Palette,
                    title: 'Your Brand, Not a Template',
                    description: 'RIMBA doesn\'t look like GUSTO.\nYour restaurant shouldn\'t look like a generic app listing.'
                  },
                  {
                    icon: Bot,
                    title: 'AI That Actually Sounds Human',
                    description: 'Our Voice Agent answers FAQs, takes bookings, and handles "do you have parking?"\nso your staff can focus on the food.'
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
                    <feature.icon className="text-purple-400 mb-4" size={40} />
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-24 bg-gradient-to-b from-black to-gray-900">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  You Caught Them. Now Keep Them.
                </h2>
                <p className="text-xl text-gray-400 mb-10">
                  NorWeb gets customers to the door. <span className="font-bold text-white">NorCast</span> keeps them coming back on autopilot.
                </p>

                <div className="max-w-3xl mx-auto text-left space-y-6 mb-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Automated Reactivation</h3>
                      <p className="text-gray-400">Automatically text customers who haven't visited in 30 days.</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Review Engine</h3>
                      <p className="text-gray-400">Turn happy diners into 5-star Google Reviews automatically.</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mt-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Loyalty on Autopilot</h3>
                      <p className="text-gray-400">Fill your tables on slow Tuesdays without lifting a finger.</p>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-xl shadow-purple-500/50"
                  onClick={() => document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ask Agent About NorCast
                </motion.button>
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
                  Ready to Stop Losing Orders<br />
                  to Instagram DMs?
                </h2>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-xl shadow-purple-500/50"
                    onClick={() => document.getElementById('agent')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Talk to Nova
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all"
                  >
                    Schedule a Strategy Call
                  </motion.button>
                </div>

                <p className="text-gray-500 text-sm">
                  The agent knows F&B.<br />
                  Ask Nova about pricing, features, or see how she handles your rudest customer questions.
                </p>
              </motion.div>
            </div>
          </section>

          <section id="agent" className="px-6 py-32 bg-gradient-to-b from-black via-gray-900 to-black">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Meet Your NorWeb Consultant
                </h2>
                <p className="text-xl text-gray-400">
                  AI-powered. F&B-trained. Available now.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-12 backdrop-blur-sm"
                style={{ minHeight: '400px' }}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Bot className="mx-auto mb-4 text-purple-400" size={64} />
                    <p className="text-xl text-gray-400">Agent widget loading...</p>
                    <p className="text-sm text-gray-500 mt-2">ElevenLabs widget will be embedded here</p>
                  </div>
                </div>
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
    </div>
  );
};
