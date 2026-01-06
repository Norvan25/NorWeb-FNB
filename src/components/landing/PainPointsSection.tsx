import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const PainPointsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 px-4 bg-[#0A1628] text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('pain.headline')}
          </h2>
          
          <div className="space-y-4 text-lg md:text-xl leading-relaxed text-gray-200">
            <p>{t('pain.body1')}</p>
            <p>{t('pain.body2')}</p>
            <p className="font-semibold text-white">{t('pain.body3')}</p>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-xl font-semibold text-white">{t('pain.reality_header')}</p>
            
            <div className="space-y-4 text-lg text-gray-300">
              <p className="flex items-start gap-3">
                <span className="text-[#F28500] mt-1">→</span>
                <span>{t('pain.reality1')}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#F28500] mt-1">→</span>
                <span>{t('pain.reality2')}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#F28500] mt-1">→</span>
                <span>{t('pain.reality3')}</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-[#F28500] mt-1">→</span>
                <span>{t('pain.reality4')}</span>
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-lg text-gray-200">
            <p>{t('pain.meanwhile')}</p>
            <p className="font-semibold text-white">{t('pain.question')}</p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              {t('pain.closing')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPointsSection;
