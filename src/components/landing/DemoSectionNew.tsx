/**
 * DemoSection - Simplified with character cards
 * "Don't Trust Us. Test Us." section
 * Each card has ONE button that opens the restaurant demo page
 */

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { DemoCharacterCard } from '../DemoCharacterCard';
import { useVoice } from '../../context/VoiceContext';
import { trackVoiceStart } from '../../lib/tracking';

export const DemoSectionNew = () => {
  const { t } = useTranslation();
  const { triggerCall } = useVoice();

  const handleTalkToNova = () => {
    trackVoiceStart('nova');
    triggerCall();
  };

  return (
    <section id="demo" className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('demo.headline', "Don't Trust Us.")}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              {t('demo.headline_highlight', 'Test Us.')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400">
            Chat with our AI restaurant assistants. Ask about the menu, make a reservation, 
            or just say hello. This is exactly what your customers will experience.
          </p>
        </motion.div>

        {/* Three Character Cards - Simple with ONE button each */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 max-w-5xl mx-auto mb-16"
        >
          <DemoCharacterCard character="aiman" />
          <DemoCharacterCard character="dev" />
          <DemoCharacterCard character="marco" />
        </motion.div>

        {/* Nova Message - Below demos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-slate-700/50"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img
                src="/images/NOVA.png"
                alt="Nova"
                className="w-16 h-16 object-contain"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(102, 211, 250, 0.3))' }}
              />
            </motion.div>
            <div className="text-center sm:text-left flex-1">
              <p className="text-white font-semibold">I'm Nova, your AI manager.</p>
              <p className="text-slate-400 text-sm">
                While you explore the demos, I'm collecting data for your custom quote. 
                Ready to talk?
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTalkToNova}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap"
            >
              Talk to Nova
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSectionNew;
