import { motion } from 'framer-motion';
import { Play, ArrowDown, Check } from 'lucide-react';

interface HeroContentProps {
  onScrollTo: (sectionId: string) => void;
}

export const HeroContent = ({ onScrollTo }: HeroContentProps) => {
  const channels = ['Website', 'WhatsApp', 'Voice'];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-3 sm:gap-4 max-w-xl"
    >
      {/* First-in-Malaysia Badge */}
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-4 py-1.5 w-fit">
        <span className="text-amber-400">🏆</span>
        <span className="text-amber-200 text-sm font-medium">FIRST IN MALAYSIA</span>
      </div>

      {/* Headline - sized for above-fold fit */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
        Your Restaurant.
        <br />
        Open 24 Hours.
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
          Zero Extra Staff.
        </span>
      </h1>

      {/* Sub-headline */}
      <p className="text-base sm:text-lg text-gray-300">
        AI that takes bookings, orders & calls on{' '}
        <span className="text-white font-medium">Website</span>,{' '}
        <span className="text-white font-medium">WhatsApp</span> &{' '}
        <span className="text-white font-medium">Phone</span>.
      </p>

      {/* Channel Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {channels.map((channel) => (
            <span
              key={channel}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
            >
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm">{channel}</span>
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm">All AI. All 24/7. All Yours.</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 pt-2">
        {/* Primary CTA */}
        <motion.button
          onClick={() => onScrollTo('demos')}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-orange-500/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-5 h-5" fill="currentColor" />
          Try Live Demo
          <ArrowDown className="w-4 h-4" />
        </motion.button>

        {/* Secondary CTA */}
        <motion.button
          onClick={() => onScrollTo('pricing')}
          className="flex items-center gap-2 border border-white/30 hover:border-white/50 hover:bg-white/5 text-white font-medium px-6 py-3 rounded-full transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get Pricing
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HeroContent;

