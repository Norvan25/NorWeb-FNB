import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const CostSection = () => {
  const { t } = useTranslation();

  const leaks = [
    { what: 'cost.leak1_what', cost: 'cost.leak1_cost' },
    { what: 'cost.leak2_what', cost: 'cost.leak2_cost' },
    { what: 'cost.leak3_what', cost: 'cost.leak3_cost' },
    { what: 'cost.leak4_what', cost: 'cost.leak4_cost' },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
              {t('cost.headline')}
            </h2>
            <p className="text-lg md:text-xl text-[#4B5563]">
              {t('cost.subheadline')}
            </p>
          </div>

          {/* Missed Calls Section */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 md:p-10 border border-red-100">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0A1628] mb-6">
              {t('cost.missed_calls_header')}
            </h3>
            
            <div className="space-y-4 text-lg text-[#4B5563] mb-6">
              <p>{t('cost.scenario')}</p>
              <p className="font-semibold text-[#0A1628]">{t('cost.nobody_answers')}</p>
              <p>{t('cost.not_just_noise')}</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <ul className="space-y-2 text-lg">
                <li>• {t('cost.reservation_details')}</li>
                <li>• {t('cost.average_spend')}</li>
                <li className="font-bold text-red-600">• {t('cost.one_call_value')}</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-xl font-semibold text-[#0A1628] mb-2">{t('cost.one_call_per_day')}</p>
              <p className="text-3xl md:text-4xl font-black text-red-600">
                {t('cost.monthly_loss')}
              </p>
            </div>
          </div>

          {/* Other Leaks Table */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6">
              {t('cost.other_leaks_header')}
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0A1628] text-white">
                    <th className="p-4 text-left font-semibold">What's Happening</th>
                    <th className="p-4 text-left font-semibold">What It's Costing You</th>
                  </tr>
                </thead>
                <tbody>
                  {leaks.map((leak, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4 text-[#4B5563]">{t(leak.what)}</td>
                      <td className="p-4 font-semibold text-[#0A1628]">{t(leak.cost)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Biggest Cost */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center space-y-4"
          >
            <p className="text-2xl font-bold text-[#0A1628]">{t('cost.biggest_cost')}</p>
            <p className="text-xl text-[#4B5563]">{t('cost.biggest_cost_desc')}</p>
            <p className="text-lg text-[#4B5563]">{t('cost.competitors')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CostSection;

