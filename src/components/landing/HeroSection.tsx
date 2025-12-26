import { motion } from 'framer-motion';

interface HeroSectionProps {
  onScrollTo: (sectionId: string) => void;
}

export const HeroSection = ({ onScrollTo }: HeroSectionProps) => {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24 px-4 bg-gradient-to-b from-[#FFF7ED] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F28500]/10 to-[#FF9A1F]/10 border border-[#F28500]/30 px-4 py-2 rounded-full text-sm font-medium text-[#F28500]">
              <span>🇲🇾</span>
              <span>Malaysia's First AI Restaurant Team</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1628] leading-tight">
              Finally. An AI Team That Has{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                Soul.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
              Stop hiring staff that quit in 3 months. Meet{' '}
              <span className="font-semibold text-[#0A1628]">Aiman, Dev, and Marco</span> — your AI
              workforce that answers every call, charms every customer, and fills your tables 24/7.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScrollTo('demo')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all"
              >
                Meet Your New Team
                <span>→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScrollTo('demo')}
                className="inline-flex items-center gap-2 border-2 border-[#0A1628]/20 text-[#0A1628] px-8 py-4 rounded-full font-semibold text-lg hover:border-[#F28500] hover:bg-[#FFF7ED] transition-all"
              >
                <span>▶️</span>
                Watch Demo
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 md:gap-6 pt-4 text-sm text-[#4B5563]">
              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span> Fluent in BM & English
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span> 0% Sick Days
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span> 100% Malaysian Hospitality
              </span>
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <HeroPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function HeroPhoneMockup() {
  return (
    <div className="relative">
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Phone Frame */}
        <div className="relative z-10 w-72 md:w-80 bg-[#0A1628] rounded-[3rem] p-3 shadow-2xl">
          <div className="bg-white rounded-[2.5rem] overflow-hidden">
            {/* Phone Screen Content */}
            <div className="h-[520px] bg-gradient-to-b from-[#FFF7ED] to-white flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white p-4 text-center">
                <h3 className="font-bold text-lg">Your AI Team</h3>
                <p className="text-sm opacity-90">Ready to serve 24/7</p>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-4 space-y-3">
                {/* Aiman's bubble */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-2xl rounded-bl-sm p-3 max-w-[85%]"
                >
                  <p className="text-sm text-[#166534] font-medium">
                    "Sambal pedas manja, boss! 🔥"
                  </p>
                  <p className="text-xs text-[#22C55E] mt-1 font-semibold">— Aiman</p>
                </motion.div>

                {/* Dev's bubble */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#F97316]/10 border border-[#F97316]/30 rounded-2xl rounded-br-sm p-3 max-w-[85%] ml-auto"
                >
                  <p className="text-sm text-[#9A3412] font-medium">"Try our Palak Paneer! 🙏"</p>
                  <p className="text-xs text-[#F97316] mt-1 font-semibold">— Dev</p>
                </motion.div>

                {/* Marco's bubble */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-2xl rounded-bl-sm p-3 max-w-[85%]"
                >
                  <p className="text-sm text-[#991B1B] font-medium">"Bellissimo! 🤌"</p>
                  <p className="text-xs text-[#EF4444] mt-1 font-semibold">— Marco</p>
                </motion.div>
              </div>

              {/* Characters at Bottom */}
              <div className="h-28 relative bg-gradient-to-t from-white to-transparent">
                <div className="absolute bottom-2 left-0 right-0 flex justify-around items-end px-4">
                  {/* Aiman */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#22C55E]/20 to-[#22C55E]/40 rounded-full flex items-center justify-center text-3xl border-2 border-[#22C55E]/50 shadow-lg"
                  >
                    👨‍🍳
                  </motion.div>
                  {/* Dev */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#F97316]/20 to-[#F97316]/40 rounded-full flex items-center justify-center text-3xl border-2 border-[#F97316]/50 shadow-lg"
                  >
                    👨‍🍳
                  </motion.div>
                  {/* Marco */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#EF4444]/20 to-[#EF4444]/40 rounded-full flex items-center justify-center text-3xl border-2 border-[#EF4444]/50 shadow-lg"
                  >
                    👨‍🍳
                  </motion.div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="p-4">
                <button className="w-full bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg">
                  Talk to us! 👋
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative glow */}
      <div className="absolute -inset-8 bg-gradient-to-r from-[#F28500]/20 to-[#FF9A1F]/20 rounded-full blur-3xl -z-10" />

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -top-4 -right-4 w-16 h-16 bg-[#22C55E]/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#F97316]/10 rounded-full blur-xl"
      />
    </div>
  );
}

export default HeroSection;
