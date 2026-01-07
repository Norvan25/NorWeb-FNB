import { motion } from 'framer-motion';
import { useCommunication } from '../../context/CommunicationContext';
import { X, Rocket, Check } from 'lucide-react';

interface FinalCTASectionProps {
  onScrollTo?: (sectionId: string) => void;
}

export const FinalCTASection = ({ onScrollTo }: FinalCTASectionProps) => {
  const { openHUD } = useCommunication();

  const scrollToSection = (sectionId: string) => {
    if (onScrollTo) {
      onScrollTo(sectionId);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetNorWeb = () => {
    openHUD('HUB');
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-[#0A1628] relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#132238] to-[#0A1628]" />

      {/* Decorative glow elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F28500]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto text-white relative z-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Tomorrow Morning Could Look Different
          </h2>
        </motion.div>

        {/* Two-Column Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 relative">
          {/* Left Column - Stay on Same Path */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 md:p-10 rounded-3xl bg-[#0F1720] border-2 border-gray-800"
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                <X className="w-8 h-8 text-gray-500" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-400 text-center mb-8">
              Stay on the same path
            </h3>

            {/* Pain Points - Stacked */}
            <div className="space-y-4 text-center">
              <p className="text-lg text-gray-500">Missed calls</p>
              <p className="text-lg text-gray-500">Unanswered messages</p>
              <p className="text-lg text-gray-500">Guessing what works</p>
              <p className="text-lg text-gray-500">Running on empty</p>
            </div>
          </motion.div>

          {/* Center Divider - OR */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#00D9FF]/20 blur-xl rounded-full w-24 h-24" />
              <div className="relative bg-[#0A1628] border-4 border-[#00D9FF] rounded-full w-20 h-20 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#00D9FF]">OR</span>
              </div>
            </motion.div>
          </div>

          {/* Mobile OR Divider */}
          <div className="lg:hidden flex justify-center my-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#00D9FF]/20 blur-xl rounded-full w-24 h-24" />
              <div className="relative bg-[#0A1628] border-4 border-[#00D9FF] rounded-full w-20 h-20 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#00D9FF]">OR</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Get Help */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#1A2332] to-[#0F1720] border-2 border-[#00D9FF]/50 shadow-2xl shadow-[#00D9FF]/20"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 to-transparent rounded-3xl" />

            {/* Icon */}
            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#00D9FF]/20 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-[#00D9FF]" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 relative z-10">
              Or get help
            </h3>

            {/* Benefits - Stacked */}
            <div className="space-y-4 text-center relative z-10">
              <p className="text-lg text-white flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-[#00D9FF]" />
                Every call answered
              </p>
              <p className="text-lg text-white flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-[#00D9FF]" />
                Every lead captured
              </p>
              <p className="text-lg text-white flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-[#00D9FF]" />
                Know what's working
              </p>
              <p className="text-lg text-white flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-[#00D9FF]" />
                Growing while you sleep
              </p>
            </div>
          </motion.div>
        </div>

        {/* Punch Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mb-12 space-y-3"
        >
          <p className="text-lg text-gray-400">
            Your competitors who seem to have it figured out?
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            They don't work harder than you.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-[#F28500]">
            They just have help.
          </p>
        </motion.div>

        {/* The Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12 space-y-2"
        >
          <p className="text-3xl md:text-4xl font-bold text-white">
            The dinner rush is coming.
          </p>
          <motion.p
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-3xl md:text-4xl font-bold text-[#F28500]"
          >
            Will you answer the call?
          </motion.p>
        </motion.div>

        {/* Price Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12 space-y-2"
        >
          <p className="text-xl font-semibold text-white">
            Setup from RM 1,399 <span className="text-[#F28500]">(Early Bird)</span>
          </p>
          <p className="text-lg text-gray-400">
            That's less than what you lose on one bad weekend.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetNorWeb}
            className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-10 md:px-16 py-5 rounded-full text-xl md:text-2xl font-bold hover:shadow-2xl transition-all shadow-lg shadow-[#F28500]/30 w-full sm:w-auto"
          >
            Get NorWeb Now — Talk to Nova First
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('pricing')}
            className="border-2 border-white/30 text-white px-10 md:px-16 py-5 rounded-full text-xl md:text-2xl font-bold hover:border-white hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            View Pricing
          </motion.button>
        </motion.div>

        {/* Footer Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-400 text-sm md:text-base"
        >
          <p>
            Prefer a human?{' '}
            <a href="https://wa.me/601116343646" className="text-[#00D9FF] hover:underline">
              WhatsApp: +60 11-1634 3646
            </a>
            {' '}|{' '}
            <a href="mailto:hello@norvan.io" className="text-[#00D9FF] hover:underline">
              Email: hello@norvan.io
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
