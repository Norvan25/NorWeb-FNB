import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useVoice } from '../../context/VoiceContext';

interface HeroSectionProps {
  onScrollTo: (sectionId: string) => void;
}

export const HeroSection = ({ onScrollTo }: HeroSectionProps) => {
  const { t } = useTranslation();

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
            {/* Eyebrow - More prominent */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#F28500] to-[#FF9A1F] px-5 py-2.5 rounded-full text-base font-bold text-white shadow-lg shadow-orange-500/30"
            >
              <span className="text-lg">🇲🇾</span>
              <span>{t('hero.eyebrow')}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1628] leading-tight">
              {t('hero.headline')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                {t('hero.headline_highlight')}
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg md:text-xl text-[#4B5563] leading-relaxed">
              {t('hero.subheadline')}{' '}
              <span className="font-semibold text-[#0A1628]">{t('hero.subheadline_names')}</span>
              {t('hero.subheadline_end')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScrollTo('demo')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                {t('hero.cta_primary')}
                <span>→</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onScrollTo('demo')}
                className="inline-flex items-center justify-center gap-2 border-2 border-[#0A1628]/20 text-[#0A1628] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:border-[#F28500] hover:bg-[#FFF7ED] transition-all w-full sm:w-auto"
              >
                <span>▶️</span>
                {t('hero.cta_secondary')}
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 md:gap-6 pt-4 text-sm text-[#4B5563]">
              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span> {t('hero.badge_language')}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span> {t('hero.badge_sick')}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span> {t('hero.badge_hospitality')}
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
  const { t } = useTranslation();
  const { triggerCall } = useVoice();

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
                <h3 className="font-bold text-lg">{t('hero.phone_header')}</h3>
                <p className="text-sm opacity-90">{t('hero.phone_subheader')}</p>
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

              {/* Characters at Bottom - Popping out effect */}
              <div className="h-28 relative bg-gradient-to-t from-white via-white/90 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end gap-0">
                  {/* Aiman */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    whileHover={{ scale: 1.08, y: -6 }} 
                    className="w-[72px] h-[90px] relative z-10 -mr-2"
                  >
                    <img
                      src="/images/AIMAN.png"
                      alt="Aiman"
                      className="w-full h-full object-contain object-bottom drop-shadow-xl"
                      style={{ filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.25))' }}
                    />
                  </motion.div>
                  {/* Dev - Taller in center, overlapping */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    whileHover={{ scale: 1.08, y: -6 }} 
                    className="w-[80px] h-[100px] relative z-30"
                  >
                    <img
                      src="/images/DEV.png"
                      alt="Dev"
                      className="w-full h-full object-contain object-bottom"
                      style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }}
                    />
                  </motion.div>
                  {/* Marco */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    whileHover={{ scale: 1.08, y: -6 }} 
                    className="w-[72px] h-[90px] relative z-10 -ml-2"
                  >
                    <img
                      src="/images/MARCO.png"
                      alt="Marco"
                      className="w-full h-full object-contain object-bottom drop-shadow-xl"
                      style={{ filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.25))' }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* CTA Button - Triggers Nova voice agent */}
              <div className="p-4">
                <motion.button 
                  onClick={() => triggerCall()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                >
                  {t('hero.phone_cta')} 👋
                </motion.button>
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
