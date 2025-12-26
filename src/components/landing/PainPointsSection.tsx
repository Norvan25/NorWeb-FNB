import { motion } from 'framer-motion';
import { PhoneOff, Clock, CalendarX, Percent } from 'lucide-react';

const painPoints = [
  {
    icon: PhoneOff,
    emoji: '📞',
    stat: 'RM 6,000/month',
    title: 'Lost to Missed Calls',
    description: '20-40% of calls go unanswered during peak hours. Each missed call = lost booking.',
    color: '#EF4444',
  },
  {
    icon: Clock,
    emoji: '⏰',
    stat: '2-4 hours/day',
    title: 'Wasted on Repetitive Questions',
    description: 'Your staff answers "What time you close?" 50 times a day instead of serving customers.',
    color: '#F97316',
  },
  {
    icon: CalendarX,
    emoji: '🪑',
    stat: '10-20% no-shows',
    title: 'Empty Tables, Lost Revenue',
    description: 'No automated reminders = customers forget. Empty tables on busy nights.',
    color: '#EAB308',
  },
  {
    icon: Percent,
    emoji: '💸',
    stat: '30-35% commission',
    title: 'Paid to Platforms',
    description: 'Grab and FoodPanda take nearly a third. Your customers, their profit.',
    color: '#8B5CF6',
  },
];

export const PainPointsSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4">
            Every Day You Wait, You Lose Money
          </h2>
          <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto">
            These problems are costing Malaysian restaurants thousands every month
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-lg hover:border-[#F28500]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div
                  className="p-3 sm:p-4 rounded-xl text-2xl sm:text-3xl flex-shrink-0"
                  style={{ backgroundColor: `${point.color}15` }}
                >
                  {point.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 break-words"
                    style={{ color: point.color }}
                  >
                    {point.stat}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A1628] mb-2">{point.title}</h3>
                  <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
            NorWeb solves all four. Automatically. 24/7.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPointsSection;

