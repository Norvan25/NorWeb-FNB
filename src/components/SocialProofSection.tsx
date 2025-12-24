import { motion } from 'framer-motion';
import { MessageSquare, Clock, Zap, Lock, BadgeCheck, Users } from 'lucide-react';

const stats = [
  {
    icon: MessageSquare,
    value: '200+',
    label: 'conversations handled daily',
    color: '#06b6d4', // cyan
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'AI availability',
    color: '#10b981', // green
  },
  {
    icon: Zap,
    value: '3 min',
    label: 'average setup response time',
    color: '#f59e0b', // amber
  },
];

const trustBadges = [
  { emoji: '🔒', text: 'Your Data Stays Yours' },
  { emoji: '💰', text: '3-Month ROI Guarantee' },
  { emoji: '🇲🇾', text: 'Local Support Team' },
];

export const SocialProofSection = () => {
  return (
    <section className="px-6 py-24 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Restaurant Owners
          </h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 text-center hover:border-gray-700 transition-colors"
            >
              <div 
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
              </div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-cyan-950/20 to-gray-900/50 border border-cyan-500/20 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Users className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <p className="text-xl md:text-2xl text-white font-medium mb-4">
              Be among our first partners
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Early adopters get founding member benefits — priority support, direct access to our team, and input on future features.
            </p>
            
            {/* Placeholder for future testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 opacity-50">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="h-32 rounded-xl border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-600 text-sm"
                >
                  Testimonial coming soon
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Logo Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-6">
            Join restaurants already using NorWeb
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-24 h-12 md:w-32 md:h-16 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center"
              >
                <span className="text-gray-600 text-xs">Logo {i}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-gray-900/50 border border-gray-800"
            >
              <span className="text-2xl">{badge.emoji}</span>
              <span className="text-white font-medium text-sm md:text-base">{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

