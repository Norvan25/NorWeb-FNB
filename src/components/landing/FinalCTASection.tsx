import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCommunication } from '../../context/CommunicationContext';

interface FinalCTASectionProps {
  onScrollTo?: (sectionId: string) => void;
}

export const FinalCTASection = ({ onScrollTo }: FinalCTASectionProps) => {
  const { t } = useTranslation();
  const { openLeadCapture } = useCommunication();

  const scrollToSection = (sectionId: string) => {
    if (onScrollTo) {
      onScrollTo(sectionId);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        className="max-w-4xl mx-auto text-center text-white relative z-10 space-y-8"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">{t('cta.headline')}</h2>

        <div className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6">
          <div>
            <p className="mb-2">You can wake up tomorrow and:</p>
            <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
              <li>Still have missed calls from last night</li>
              <li>Still have unanswered WhatsApp messages</li>
              <li>Still have no idea which marketing works</li>
              <li>Still be running yourself into the ground</li>
            </ul>
          </div>

          <p className="text-3xl md:text-4xl font-bold text-white py-4">Or.</p>

          <div>
            <p className="mb-2">You can start the 7-day countdown to having an AI marketing department that:</p>
            <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
              <li>Answered every call</li>
              <li>Captured every lead</li>
              <li>Nurtured every interested customer</li>
              <li>Turned interest into bookings</li>
              <li>While you slept</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            Your competitors who seem to have it figured out?
          </p>
          <p className="text-xl font-semibold text-white">
            They don't work harder than you.
          </p>
          <p className="text-xl font-semibold text-white">
            They just have help.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-2xl font-bold text-white">
            The dinner rush is coming.
          </p>
          <p className="text-2xl font-bold text-[#F28500]">
            Will you answer the call?
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <p className="text-xl font-semibold text-white">{t('cta.badge1')}</p>
          <p className="text-lg text-gray-300">{t('cta.badge2')}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openLeadCapture('Final CTA')}
            className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-8 md:px-12 py-4 rounded-full text-lg md:text-xl font-bold hover:shadow-2xl transition-all shadow-lg shadow-[#F28500]/30"
          >
            {t('cta.button')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('pricing')}
            className="border-2 border-white/30 text-white px-8 md:px-12 py-4 rounded-full text-lg md:text-xl font-bold hover:border-white hover:bg-white/10 transition-all"
          >
            View Pricing
          </motion.button>
        </div>

        <div className="pt-6 text-gray-400">
          <p className="mb-2">Prefer a human?</p>
          <p>WhatsApp: +60 11-1634 3646</p>
          <p>Email: hello@norvan.io</p>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
