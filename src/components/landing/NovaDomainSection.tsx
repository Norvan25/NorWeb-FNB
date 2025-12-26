import { motion } from 'framer-motion';

const novaFeatures = [
  {
    iconEmoji: '🛡️',
    title: 'The Reputation Guard',
    description:
      'Customer complains to Marco? Nova flags it instantly so you can fix it before they post on Google.',
  },
  {
    iconEmoji: '📋',
    title: 'The Silent CRM',
    description:
      "Nova remembers every birthday, every allergy, and every favorite dish. Your regulars will feel like royalty without you training staff.",
  },
  {
    iconEmoji: '🎯',
    title: 'The Marketing Autopilot',
    description:
      "Slow Tuesday? Nova can blast a promo to your top 100 customers instantly. Customer hasn't visited in 30 days? Nova sends a 'We Miss You' voucher.",
  },
];

export const NovaDomainSection = () => {
  return (
    <section id="features" className="py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              You Can't Be Everywhere.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
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
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-2xl">
                    {feature.iconEmoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
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
              {/* Dashboard mockup background */}
              <div className="w-80 h-96 bg-gray-800 rounded-2xl border border-gray-700 p-4 shadow-2xl">
                <div className="h-full bg-gray-900 rounded-xl p-4 space-y-4">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                    <span className="text-sm font-semibold text-white">Nova Dashboard</span>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <p className="text-2xl font-bold text-orange-400">47</p>
                      <p className="text-xs text-gray-400">Calls Today</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <p className="text-2xl font-bold text-green-400">RM 2.4k</p>
                      <p className="text-xs text-gray-400">Bookings</p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 uppercase">Recent Activity</p>
                    {[
                      { time: '2m ago', action: 'Booking confirmed', agent: 'Marco' },
                      { time: '5m ago', action: 'Call answered', agent: 'Aiman' },
                      { time: '12m ago', action: 'Lead captured', agent: 'Dev' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className="text-gray-500 text-xs w-12">{item.time}</span>
                        <span className="text-gray-300">{item.action}</span>
                        <span className="text-orange-400 text-xs ml-auto">{item.agent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nova overlay */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-5xl shadow-xl border-4 border-gray-900">
                👩‍💼
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-8 bg-orange-500/10 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NovaDomainSection;

