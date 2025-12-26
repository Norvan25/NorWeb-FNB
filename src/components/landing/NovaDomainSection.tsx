import { motion } from 'framer-motion';

const novaFeatures = [
  {
    iconEmoji: '🛡️',
    title: 'The Reputation Guard',
    description:
      'Customer complains to Marco? Nova flags it instantly — you fix it before they post on Google.',
  },
  {
    iconEmoji: '🧠',
    title: 'The Silent CRM',
    description:
      "Nova remembers every birthday, allergy, and favorite dish. Your regulars feel like royalty — without training staff.",
  },
  {
    iconEmoji: '🚀',
    title: 'The Marketing Autopilot',
    description:
      "Slow Tuesday? Nova blasts a promo to your top 100 customers. No visit in 30 days? Nova sends a 'We Miss You' voucher.",
  },
];

export const NovaDomainSection = () => {
  return (
    <section id="features" className="py-20 px-4 bg-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              You Can't Be Everywhere.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F28500] to-[#FF9A1F]">
                Nova Can.
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-10">
              Having a friendly face is great. Having a ruthless sales manager is better. Nova is the
              brain behind the boys.
            </p>

            <div className="space-y-8">
              {novaFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-[#132238] border border-[#1e3a5f] hover:border-[#F28500]/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#F28500]/20 to-[#FF9A1F]/20 border border-[#F28500]/30 rounded-xl flex items-center justify-center text-2xl">
                    {feature.iconEmoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Nova Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Dashboard mockup */}
              <div className="w-80 md:w-96 bg-[#132238] rounded-2xl border border-[#1e3a5f] p-4 shadow-2xl">
                <div className="bg-[#0A1628] rounded-xl p-4 space-y-4">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e3a5f]">
                    <span className="text-sm font-semibold text-white">Nova Dashboard</span>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#132238] rounded-lg p-3 border border-[#1e3a5f]">
                      <p className="text-2xl font-bold text-[#F28500]">47</p>
                      <p className="text-xs text-gray-400">Calls Today</p>
                    </div>
                    <div className="bg-[#132238] rounded-lg p-3 border border-[#1e3a5f]">
                      <p className="text-2xl font-bold text-green-400">RM 2.4k</p>
                      <p className="text-xs text-gray-400">Bookings</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Recent Activity</p>
                    {[
                      { time: '2m ago', action: 'Booking confirmed', agent: 'Marco', color: '#EF4444' },
                      { time: '5m ago', action: 'Call answered', agent: 'Aiman', color: '#22C55E' },
                      { time: '12m ago', action: 'Lead captured', agent: 'Dev', color: '#F97316' },
                      { time: '18m ago', action: 'Review requested', agent: 'Nova', color: '#F28500' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3 text-sm py-1"
                      >
                        <span className="text-gray-500 text-xs w-14">{item.time}</span>
                        <span className="text-gray-300 flex-1">{item.action}</span>
                        <span className="text-xs font-medium" style={{ color: item.color }}>
                          {item.agent}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CRM Preview */}
                  <div className="bg-[#132238] rounded-lg p-3 border border-[#1e3a5f]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Customer Insight</span>
                      <span className="text-xs text-[#F28500]">VIP</span>
                    </div>
                    <p className="text-sm text-white font-medium">Ahmad Rahman</p>
                    <p className="text-xs text-gray-500">🎂 Birthday in 3 days • Allergic to nuts</p>
                  </div>
                </div>
              </div>

              {/* Nova overlay */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-[#F28500]/20 to-[#FF9A1F]/40 rounded-full flex items-center justify-center text-6xl shadow-xl border-4 border-[#0A1628]"
              >
                👩‍💼
              </motion.div>

              {/* Glow effect */}
              <div className="absolute -inset-8 bg-[#F28500]/10 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NovaDomainSection;
