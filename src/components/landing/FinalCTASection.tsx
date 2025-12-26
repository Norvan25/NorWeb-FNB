import { motion } from 'framer-motion';
import { useCommunication } from '../../context/CommunicationContext';

export const FinalCTASection = () => {
  const { openLeadCapture } = useCommunication();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-orange-500 via-rose-500 to-pink-600">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center text-white"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Get Your Life Back.</h2>

        <p className="text-xl md:text-2xl opacity-90 mb-10 leading-relaxed">
          Imagine a Friday night where the phone doesn't ring because Marco answered it. Imagine waking
          up to RM2,000 in bookings that Nova secured while you slept. Imagine a staff member who never
          asks for leave, never has a bad attitude, and loves your customers 24/7.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openLeadCapture('Final CTA')}
          className="bg-white text-orange-600 px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition-all"
        >
          Hire Your AI Team Today
        </motion.button>

        <p className="mt-6 text-sm opacity-75">
          Founding Member Pricing Available for Next 50 Restaurants
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;

