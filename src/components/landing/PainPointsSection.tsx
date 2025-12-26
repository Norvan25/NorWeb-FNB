import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const PainPointsSection = () => {
  const { t } = useTranslation();

  const painPoints = [
    {
      emoji: '📞',
      statKey: 'pain.stat1',
      titleKey: 'pain.title1',
      descKey: 'pain.desc1',
      color: '#EF4444',
    },
    {
      emoji: '⏰',
      statKey: 'pain.stat2',
      titleKey: 'pain.title2',
      descKey: 'pain.desc2',
      color: '#F97316',
    },
    {
      emoji: '🪑',
      statKey: 'pain.stat3',
      titleKey: 'pain.title3',
      descKey: 'pain.desc3',
      color: '#EAB308',
    },
    {
      emoji: '💸',
      statKey: 'pain.stat4',
      titleKey: 'pain.title4',
      descKey: 'pain.desc4',
      color: '#8B5CF6',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
            {t('pain.headline')}
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto">
            {t('pain.subheadline')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg hover:border-[#F28500]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div
                  className="p-3 sm:p-4 rounded-xl text-2xl sm:text-3xl flex-shrink-0"
                  style={{ backgroundColor: `${point.color}15` }}
                >
                  {point.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 break-words"
                    style={{ color: point.color }}
                  >
                    {t(point.statKey)}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A1628] mb-2">{t(point.titleKey)}</h3>
                  <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">{t(point.descKey)}</p>
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
          <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
            {t('pain.closing')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPointsSection;
