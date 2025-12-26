import { motion } from 'framer-motion';
import { Play, ArrowDown, Check } from 'lucide-react';

interface HeroContentProps {
  onScrollTo: (sectionId: string) => void;
}

export const HeroContent = ({ onScrollTo }: HeroContentProps) => {
  const channels = [
    { icon: '🌐', label: 'Website' },
    { icon: '💬', label: 'WhatsApp' },
    { icon: '📞', label: 'Voice' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* First-in-Malaysia Badge */}
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-4 py-2">
        <span className="text-amber-400">🏆</span>
        <span className="text-amber-200 text-sm font-medium tracking-wide">FIRST IN MALAYSIA</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
        Your Restaurant.
        <br />
        Open 24 Hours.
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          Zero Extra Staff.
        </span>
      </h1>

      {/* Divider line */}
      <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />

      {/* Sub-headline - EXPLAINS WHAT NORWEB IS */}
      <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
        <span className="text-white font-medium">NorWeb is an AI-powered website</span> that 
        handles reservations, orders, and calls for your restaurant — across{' '}
        <span className="text-white">web</span>,{' '}
        <span className="text-white">WhatsApp</span> &{' '}
        <span className="text-white">phone</span>.
      </p>

      {/* Channel Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          {channels.map((channel) => (
            <span
              key={channel.label}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
            >
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm font-medium">{channel.label}</span>
            </span>
          ))}
        </div>
        <p className="text-gray-500 text-sm">All AI. All 24/7. All Yours.</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4 pt-2">
        {/* Primary CTA - scrolls to demo section */}
        <motion.button
          onClick={() => onScrollTo('demos')}
          className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3.5 rounded-full transition-all shadow-lg shadow-orange-500/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-5 h-5" fill="currentColor" />
          See How It Works
          <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </motion.button>

        {/* Secondary CTA - scrolls to pricing */}
        <motion.button
          onClick={() => onScrollTo('pricing')}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white font-medium px-6 py-3.5 rounded-full transition-all"
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
