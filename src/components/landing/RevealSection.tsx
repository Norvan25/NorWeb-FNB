import { motion } from 'framer-motion';

const revealData = [
  {
    soul: 'Aiman joked about the Sambal.',
    brain: 'Nova captured your phone number for SMS marketing.',
  },
  {
    soul: 'Dev suggested the Palak Paneer.',
    brain: 'Nova upsold a high-margin item automatically.',
  },
  {
    soul: 'Marco confirmed your booking.',
    brain: 'Nova collected a deposit to prevent No-Show.',
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            That Charm You Just Felt?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              That Was Engineered Revenue.
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            While you were chatting with the boys,{' '}
            <span className="font-semibold">Nova (your AI Sales Manager)</span> was working in the
            background.
          </p>
        </motion.div>

        {/* The Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl p-6 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Soul Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">❤️</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">The "Soul" Moment</h3>
                  <p className="text-gray-600">What You Felt</p>
                </div>
              </div>
              <div className="space-y-4">
                {revealData.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                  >
                    <p className="text-gray-700">{item.soul}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Brain Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🧠</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">The "Brain" Reality</h3>
                  <p className="text-gray-600">What You Earned</p>
                </div>
              </div>
              <div className="space-y-4">
                {revealData.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl p-4 text-white shadow-lg"
                  >
                    <p className="font-medium">{item.brain}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-10 pt-8 border-t border-gray-200">
            <p className="text-xl font-semibold text-gray-900">
              You didn't just have a conversation. You entered a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                Revenue Capture System.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RevealSection;

