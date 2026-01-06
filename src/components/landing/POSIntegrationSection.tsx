import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCommunication } from '../../context/CommunicationContext';

export const POSIntegrationSection = () => {
  const { t } = useTranslation();
  const { openLeadCapture } = useCommunication();

  const integrations = [
    { what: 'pos_integration.pos1_what', role: 'pos_integration.pos1_role' },
    { what: 'pos_integration.pos2_what', role: 'pos_integration.pos2_role' },
    { what: 'pos_integration.pos3_what', role: 'pos_integration.pos3_role' },
    { what: 'pos_integration.pos4_what', role: 'pos_integration.pos4_role' },
  ];

  const zeroDisruption = [
    'pos_integration.zero1',
    'pos_integration.zero2',
    'pos_integration.zero3',
    'pos_integration.zero4',
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-6">
              {t('pos_integration.headline')}
            </h2>
            
            <div className="space-y-4 text-lg text-[#4B5563] max-w-3xl mx-auto">
              <p>{t('pos_integration.body1')}</p>
              <p className="text-2xl font-bold text-[#F28500]">{t('pos_integration.body2')}</p>
              <p>{t('pos_integration.body3')}</p>
              <p className="font-semibold text-[#0A1628]">{t('pos_integration.body4')}</p>
              <p className="text-xl font-bold text-[#0A1628]">{t('pos_integration.body5')}</p>
            </div>
          </div>

          {/* How It Works Together Table */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6">
              {t('pos_integration.how_it_works_header')}
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0A1628] text-white">
                    <th className="p-4 text-left font-semibold">Your Current Setup</th>
                    <th className="p-4 text-left font-semibold">NorWeb's Role</th>
                  </tr>
                </thead>
                <tbody>
                  {integrations.map((item, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4 text-[#4B5563]">{t(item.what)}</td>
                      <td className="p-4 font-semibold text-[#0A1628]">{t(item.role)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Zero Disruption */}
          <div className="mt-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-[#0A1628] mb-6">
              {t('pos_integration.zero_disruption_header')}
            </h3>
            
            <ul className="space-y-3">
              {zeroDisruption.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 text-lg text-[#4B5563]"
                >
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>{t(item)}</span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-6 text-xl font-semibold text-[#0A1628] text-center">
              {t('pos_integration.zero_final')}
            </p>
          </div>

          {/* Think of it this way */}
          <div className="mt-12 text-center space-y-4 bg-[#F3F4F6] rounded-2xl p-8">
            <p className="text-xl font-semibold text-[#0A1628]">{t('pos_integration.think_of_it')}</p>
            <p className="text-lg text-[#4B5563]">{t('pos_integration.pos_handles')}</p>
            <p className="text-2xl font-bold text-[#F28500]">{t('pos_integration.norweb_brings')}</p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openLeadCapture()}
              className="bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all"
            >
              {t('pos_integration.cta')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default POSIntegrationSection;

