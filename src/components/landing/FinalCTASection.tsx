import { motion } from 'framer-motion';
import { useCommunication } from '../../context/CommunicationContext';

export const FinalCTASection = () => {
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
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">Get Your Life Back.</h2>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 leading-relaxed">
          Imagine a Friday night where the phone doesn't ring because Marco answered it. Imagine waking
          up to RM2,000 in bookings that Nova secured while you slept. Imagine a staff member who never
          asks for leave, never has a bad attitude, and loves your customers 24/7.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openLeadCapture('Final CTA')}
          className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-10 md:px-14 py-5 md:py-6 rounded-full text-xl md:text-2xl font-bold hover:shadow-2xl transition-all shadow-lg shadow-[#F28500]/30"
        >
          Hire Your AI Team Today
        </motion.button>

        <p className="mt-8 text-sm md:text-base text-gray-400">
          <span className="inline-flex items-center gap-2">
            <span>🚀</span> Founding Member Pricing Available
          </span>
          <span className="mx-2 md:mx-4">•</span>
          <span className="inline-flex items-center gap-2">
            <span>⚡</span> 48-Hour Setup
          </span>
          <span className="mx-2 md:mx-4">•</span>
          <span className="inline-flex items-center gap-2">
            <span>✓</span> No Long-Term Contract
          </span>
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
