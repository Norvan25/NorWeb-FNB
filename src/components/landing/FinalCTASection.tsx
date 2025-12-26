import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCommunication } from '../../context/CommunicationContext';

export const FinalCTASection = () => {
  const { t } = useTranslation();
  const { openLeadCapture } = useCommunication();

  return (
    <section className="py-20 md:py-28 px-4 bg-[#0A1628] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#132238] to-[#0A1628]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F28500]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF9A1F]/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center text-white relative z-10"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">{t('cta.headline')}</h2>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 leading-relaxed">
          {t('cta.body')}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openLeadCapture('Final CTA')}
          className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-10 md:px-14 py-5 md:py-6 rounded-full text-xl md:text-2xl font-bold hover:shadow-2xl transition-all shadow-lg shadow-[#F28500]/30"
        >
          {t('cta.button')}
        </motion.button>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base text-gray-400">
          <span className="inline-flex items-center gap-2">
            <span>🚀</span> {t('cta.badge1')}
          </span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="inline-flex items-center gap-2">
            <span>⚡</span> {t('cta.badge2')}
          </span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="inline-flex items-center gap-2">
            <span>✓</span> {t('cta.badge3')}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
