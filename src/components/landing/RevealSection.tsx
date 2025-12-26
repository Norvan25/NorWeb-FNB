import { motion } from 'framer-motion';

const revealData = [
  {
    soul: 'Aiman joked about the Sambal.',
    soulEmoji: '💚',
    brain: 'Nova captured your phone number for SMS marketing.',
    brainEmoji: '📊',
  },
  {
    soul: 'Dev suggested the Palak Paneer.',
    soulEmoji: '🧡',
    brain: 'Nova upsold a high-margin item automatically.',
    brainEmoji: '📈',
  },
  {
    soul: 'Marco confirmed your booking.',
    soulEmoji: '❤️',
    brain: 'Nova collected a deposit to prevent no-shows.',
    brainEmoji: '💳',
  },
];

export const RevealSection = () => {
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
            That Charm You Just Felt?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
              That Was Engineered Revenue.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563]">
            While you were chatting,{' '}
            <span className="font-semibold text-[#0A1628]">Nova (your AI Sales Manager)</span> was
            working behind the scenes.
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
                  <h3 className="text-base sm:text-lg font-bold text-[#0A1628]">The "Soul" Moment</h3>
                  <p className="text-xs sm:text-sm text-[#4B5563]">What You Felt</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] rounded-2xl p-4 text-center shadow-lg">
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl">🧠</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">The "Brain" Reality</h3>
                  <p className="text-xs sm:text-sm text-white/80">What You Earned</p>
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
                  <p className="text-sm sm:text-base text-[#4B5563] font-medium">{item.soul}</p>
                </div>
                {/* Brain */}
                <div className="bg-[#0A1628] rounded-xl p-3 sm:p-4 shadow-lg flex items-center gap-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{item.brainEmoji}</span>
                  <p className="text-sm sm:text-base text-white font-medium">{item.brain}</p>
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
              You didn't just have a conversation. You entered a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                Revenue Capture System.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RevealSection;
