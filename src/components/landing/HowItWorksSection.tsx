import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCommunication } from '../../context/CommunicationContext';

export const HowItWorksSection = () => {
  const { t } = useTranslation();
  const { openLeadCapture } = useCommunication();

  const steps = [
    {
      days: 'Day 1-3',
      title: t('how_it_works.day1_3_header'),
      desc: t('how_it_works.day1_3_desc'),
      bullets: [
        t('how_it_works.day1_3_bullet1'),
        t('how_it_works.day1_3_bullet2'),
        t('how_it_works.day1_3_bullet3'),
      ],
    },
    {
      days: 'Day 4-5',
      title: t('how_it_works.day4_5_header'),
      desc: t('how_it_works.day4_5_desc'),
      bullets: [
        t('how_it_works.day4_5_bullet1'),
        t('how_it_works.day4_5_bullet2'),
        t('how_it_works.day4_5_bullet3'),
        t('how_it_works.day4_5_bullet4'),
      ],
    },
    {
      days: 'Day 6-7',
      title: t('how_it_works.day6_7_header'),
      desc: t('how_it_works.day6_7_desc'),
      bullets: [
        t('how_it_works.day6_7_bullet1'),
        t('how_it_works.day6_7_bullet2'),
        t('how_it_works.day6_7_bullet3'),
        t('how_it_works.day6_7_bullet4'),
      ],
    },
    {
      days: 'Day 8+',
      title: t('how_it_works.day8_header'),
      desc: t('how_it_works.day8_desc'),
      bullets: [
        t('how_it_works.day8_bullet1'),
        t('how_it_works.day8_bullet2'),
        t('how_it_works.day8_bullet3'),
      ],
      special: true,
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-[#F3F4F6]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
            {t('how_it_works.headline')}
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto">
            {t('how_it_works.subheadline')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#F28500] to-[#FF9A1F]" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-6 items-start ${
                  step.special ? 'bg-gradient-to-br from-[#FFF7ED] to-white rounded-2xl p-8 border-2 border-[#F28500]' : ''
                }`}
              >
                {/* Day Number Circle */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg ${
                      step.special
                        ? 'bg-gradient-to-r from-[#F28500] to-[#FF9A1F] text-white shadow-lg'
                        : 'bg-white border-2 border-[#F28500] text-[#0A1628]'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-[#F28500]">{step.days}</span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#0A1628] mt-1">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-[#4B5563] mb-4">{step.desc}</p>
                  
                  <ul className="space-y-2">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#4B5563]">
                        <span className="text-[#F28500] mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {step.special && (
                    <div className="mt-6 space-y-3">
                      <p className="text-lg font-semibold text-[#0A1628]">
                        {t('how_it_works.day8_job')}
                      </p>
                      <p className="text-lg text-[#4B5563]">
                        {t('how_it_works.day8_answer')}
                      </p>
                      <p className="text-xl font-bold text-[#F28500]">
                        {t('how_it_works.day8_final')}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
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
            {t('how_it_works.cta')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

