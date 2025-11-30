import { motion } from 'framer-motion';
import { CuisineCard } from '../components/CuisineCard';
import { restaurants } from '../data/restaurants';
import { Sparkles, TrendingUp, Zap, Globe, Shield, Clock } from 'lucide-react';

export const LandingHub = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
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

              <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                NorWeb
              </h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl text-gray-400 font-light tracking-wide"
              >
                Universal F&B Platform
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-8"
              />
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center max-w-3xl mb-20"
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                Experience six distinctive culinary worlds, each crafted with meticulous attention to detail.
                One platform. Six universes. Infinite possibilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Brands
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
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                Our Brands
              </h2>
              <p className="text-gray-400 text-lg">
                Six distinct identities, one exceptional platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  For Restaurant Owners
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Transform your restaurant's digital presence with our enterprise-grade platform
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: TrendingUp,
                    title: 'Revenue Growth',
                    description: 'Increase online orders by up to 300% with our conversion-optimized design system'
                  },
                  {
                    icon: Zap,
                    title: 'Lightning Fast',
                    description: 'Sub-second load times ensure customers never wait, maximizing conversion rates'
                  },
                  {
                    icon: Globe,
                    title: 'Multi-Brand Ready',
                    description: 'Manage multiple restaurant concepts from one unified, powerful dashboard'
                  },
                  {
                    icon: Shield,
                    title: 'Enterprise Security',
                    description: 'Bank-grade security with PCI compliance and data encryption as standard'
                  },
                  {
                    icon: Clock,
                    title: 'Launch in Days',
                    description: 'Go from zero to live in less than a week with our streamlined onboarding'
                  },
                  {
                    icon: Sparkles,
                    title: 'Premium Design',
                    description: 'Stand out with award-winning designs that reflect your brand excellence'
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
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-xl shadow-purple-500/50"
                >
                  Schedule a Demo
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
    </div>
  );
};
