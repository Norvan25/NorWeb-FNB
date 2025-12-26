import { motion } from 'framer-motion';

const comparisons = [
  {
    others: { text: 'Waiter inputs order (Manual)', icon: '❌' },
    norweb: { text: 'AI upsells & takes order (Auto)', icon: '✅' },
  },
  {
    others: { text: '"Press 1 for hours" (Robot)', icon: '❌' },
    norweb: { text: '"We\'re open until 10, come in!" (Soul)', icon: '✅' },
  },
  {
    others: { text: 'Data sits in a spreadsheet', icon: '❌' },
    norweb: { text: 'Data triggers return visits', icon: '✅' },
  },
  {
    others: { text: 'You chase reviews', icon: '❌' },
    norweb: { text: 'AI builds your reputation', icon: '✅' },
  },
];

export const ComparisonSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            The Difference Between a Tool and a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              Teammate.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="grid grid-cols-2">
            <div className="bg-gray-200 p-4 text-center">
              <p className="font-semibold text-gray-600 text-sm md:text-base">
                Standard System (The Others)
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-rose-500 p-4 text-center">
              <p className="font-semibold text-white text-sm md:text-base">NorWeb AI (Your Team)</p>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid grid-cols-2 border-t border-gray-200"
            >
              <div className="p-4 flex items-center gap-3 bg-white">
                <span className="text-xl flex-shrink-0">{row.others.icon}</span>
                <span className="text-gray-600 text-sm md:text-base">{row.others.text}</span>
              </div>
              <div className="p-4 flex items-center gap-3 bg-orange-50">
                <span className="text-xl flex-shrink-0">{row.norweb.icon}</span>
                <span className="text-gray-900 font-medium text-sm md:text-base">{row.norweb.text}</span>
              </div>
            </motion.div>
          ))}

          {/* Footer */}
          <div className="grid grid-cols-2 border-t-2 border-gray-300">
            <div className="p-6 text-center bg-gray-100">
              <p className="text-lg font-bold text-gray-500">It costs you time.</p>
            </div>
            <div className="p-6 text-center bg-gradient-to-r from-orange-500 to-rose-500">
              <p className="text-lg font-bold text-white">It buys you freedom.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;

