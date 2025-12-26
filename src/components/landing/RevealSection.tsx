import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const RevealSection = () => {
  const { t } = useTranslation();

  const revealData = [
    {
      soulKey: 'reveal.soul1',
      soulEmoji: '💚',
      brainKey: 'reveal.brain1',
      brainEmoji: '📊',
    },
    {
      soulKey: 'reveal.soul2',
      soulEmoji: '🧡',
      brainKey: 'reveal.brain2',
      brainEmoji: '📈',
    },
    {
      soulKey: 'reveal.soul3',
      soulEmoji: '❤️',
      brainKey: 'reveal.brain3',
      brainEmoji: '💳',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
            {t('reveal.headline')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
              {t('reveal.headline_highlight')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563]">
            {t('reveal.subheadline_start')}{' '}
            <span className="font-semibold text-[#0A1628]">{t('reveal.subheadline_nova')}</span>{' '}
            {t('reveal.subheadline_end')}
          </p>
        </motion.div>

        {/* Two-Column Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#F3F4F6] to-[#FFF7ED] rounded-3xl p-6 md:p-10 overflow-hidden"
        >
          {/* Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl">❤️</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A1628]">{t('reveal.soul_title')}</h3>
                  <p className="text-xs sm:text-sm text-[#4B5563]">{t('reveal.soul_subtitle')}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] rounded-2xl p-4 text-center shadow-lg">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl">🧠</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{t('reveal.brain_title')}</h3>
                  <p className="text-xs sm:text-sm text-white/80">{t('reveal.brain_subtitle')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-4">
            {revealData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
              >
                {/* Soul */}
                <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-sm flex items-center gap-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{item.soulEmoji}</span>
                  <p className="text-sm sm:text-base text-[#4B5563] font-medium">{t(item.soulKey)}</p>
                </div>
                {/* Brain */}
                <div className="bg-[#0A1628] rounded-xl p-3 sm:p-4 shadow-lg flex items-center gap-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{item.brainEmoji}</span>
                  <p className="text-sm sm:text-base text-white font-medium">{t(item.brainKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A1628]">
              {t('reveal.closing')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                {t('reveal.closing_highlight')}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RevealSection;
