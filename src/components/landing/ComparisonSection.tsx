import { motion } from 'framer-motion';

const comparisons = [
  {
    others: 'Waiter inputs order manually',
    norweb: 'AI upsells & takes order automatically',
  },
  {
    others: '"Press 1 for hours" (robotic)',
    norweb: '"We\'re open until 10, come hungry!" (soul)',
  },
  {
    others: 'Data sits in spreadsheets',
    norweb: 'Data triggers return visits',
  },
  {
    others: 'You chase reviews',
    norweb: 'AI builds your reputation',
  },
];

export const ComparisonSection = () => {
  return (
    <section className="py-20 px-4 bg-[#F3F4F6]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628]">
            The Difference Between a Tool and a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
              Teammate.
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="grid grid-cols-2">
            <div className="bg-gray-200 p-4 md:p-6 text-center">
              <span className="text-2xl mb-2 block">❌</span>
              <p className="font-bold text-[#4B5563] text-sm md:text-base">Standard Systems</p>
            </div>
            <div className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] p-4 md:p-6 text-center">
              <span className="text-2xl mb-2 block">✅</span>
              <p className="font-bold text-white text-sm md:text-base">NorWeb AI Team</p>
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
              className="grid grid-cols-2 border-t border-gray-100"
            >
              <div className="p-4 md:p-5 bg-gray-50 flex items-center">
                <span className="text-[#4B5563] text-sm md:text-base">{row.others}</span>
              </div>
              <div className="p-4 md:p-5 bg-[#FFF7ED] flex items-center">
                <span className="text-[#0A1628] font-medium text-sm md:text-base">{row.norweb}</span>
              </div>
            </motion.div>
          ))}

          {/* Footer */}
          <div className="grid grid-cols-2 border-t-2 border-gray-200">
            <div className="p-6 md:p-8 text-center bg-gray-100">
              <p className="text-lg md:text-xl font-bold text-[#4B5563]">It costs you time.</p>
            </div>
            <div className="p-6 md:p-8 text-center bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
              <p className="text-lg md:text-xl font-bold text-white">It buys you freedom.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
