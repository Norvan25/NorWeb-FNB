import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, CalendarX, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { useCommunication } from '../context/CommunicationContext';

export const ROICalculator = () => {
  const [missedCalls, setMissedCalls] = useState(5);
  const [avgOrderValue, setAvgOrderValue] = useState(50);
  const [noShows, setNoShows] = useState(5);
  const { openLeadCapture } = useCommunication();

  const calculations = useMemo(() => {
    const missedCallsLoss = missedCalls * avgOrderValue * 30;
    const noShowsLoss = noShows * avgOrderValue * 4;
    const totalLoss = missedCallsLoss + noShowsLoss;
    
    // NorWeb recovers 100% of missed calls and 50% of no-shows
    const recoveredFromCalls = missedCallsLoss;
    const recoveredFromNoShows = noShowsLoss * 0.5;
    const totalRecovered = recoveredFromCalls + recoveredFromNoShows;
    
    // ROI calculation (assuming Growth plan at RM 499/mo)
    const subscriptionCost = 499;
    const roi = totalRecovered / subscriptionCost;

    return {
      missedCallsLoss,
      noShowsLoss,
      totalLoss,
      totalRecovered,
      roi: roi.toFixed(1),
    };
  }, [missedCalls, avgOrderValue, noShows]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleStopLosingMoney = () => {
    openLeadCapture();
  };

  return (
    <section className="px-6 py-24 bg-gradient-to-b from-black via-[#0a1020] to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
            Calculate Your Hidden Losses
          </h2>
          <p className="text-xl text-gray-400">
            See how much revenue you're leaving on the table
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Missed Calls Slider */}
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <PhoneOff className="w-5 h-5 text-red-400" />
                </div>
                <label className="text-white font-medium">Missed calls per day</label>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(missedCalls - 1) / 19 * 100}%, #374151 ${(missedCalls - 1) / 19 * 100}%, #374151 100%)`
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-sm">1</span>
                <span className="text-2xl font-bold text-red-400">{missedCalls}</span>
                <span className="text-gray-500 text-sm">20</span>
              </div>
            </div>

            {/* Average Order Value Slider */}
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <span className="text-yellow-400 font-bold text-sm">RM</span>
                </div>
                <label className="text-white font-medium">Average order value (RM)</label>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #eab308 0%, #eab308 ${(avgOrderValue - 20) / 180 * 100}%, #374151 ${(avgOrderValue - 20) / 180 * 100}%, #374151 100%)`
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-sm">RM 20</span>
                <span className="text-2xl font-bold text-yellow-400">RM {avgOrderValue}</span>
                <span className="text-gray-500 text-sm">RM 200</span>
              </div>
            </div>

            {/* No-Show Bookings Slider */}
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <CalendarX className="w-5 h-5 text-orange-400" />
                </div>
                <label className="text-white font-medium">No-show bookings per week</label>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={noShows}
                onChange={(e) => setNoShows(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${noShows / 20 * 100}%, #374151 ${noShows / 20 * 100}%, #374151 100%)`
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-sm">0</span>
                <span className="text-2xl font-bold text-orange-400">{noShows}</span>
                <span className="text-gray-500 text-sm">20</span>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Losses Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/30 to-gray-900/50 border border-red-500/20">
              <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">📉</span> Your Monthly Losses
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="py-2 border-b border-gray-800/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Missed calls</span>
                    <span className="text-red-400 font-bold">RM {formatCurrency(calculations.missedCallsLoss)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {missedCalls} calls × RM {avgOrderValue} × 30 days
                  </p>
                </div>
                <div className="py-2 border-b border-gray-800/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">No-shows</span>
                    <span className="text-orange-400 font-bold">RM {formatCurrency(calculations.noShowsLoss)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {noShows} bookings × RM {avgOrderValue} × 4 weeks
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-red-500/20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold text-white">TOTAL LOSS:</span>
                  <motion.span
                    key={calculations.totalLoss}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-red-500"
                  >
                    RM {formatCurrency(calculations.totalLoss)}
                  </motion.span>
                </div>
                <p className="text-gray-500 text-sm mt-1 sm:text-right">per month</p>
              </div>
            </div>

            {/* Recovery Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-gray-900/50 border border-cyan-500/20">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> With NorWeb
              </h3>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span className="text-gray-300">AI answers <span className="text-white font-semibold">100%</span> of inquiries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span className="text-gray-300">Automated reminders reduce no-shows by <span className="text-white font-semibold">50%</span></span>
                </li>
              </ul>

              <div className="pt-4 border-t border-cyan-500/20">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                  <span className="text-base sm:text-lg font-bold text-white">You recover:</span>
                  <motion.span
                    key={calculations.totalRecovered}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-black text-green-400"
                  >
                    RM {formatCurrency(calculations.totalRecovered)}
                  </motion.span>
                </div>
                <p className="text-gray-500 text-sm sm:text-right">per month</p>
              </div>
            </div>

            {/* ROI Badge */}
            <motion.div
              key={calculations.roi}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-center"
            >
              <div className="flex items-center justify-center gap-3">
                <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-white flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-xs sm:text-sm font-medium">Return on Investment</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                    {calculations.roi}x
                  </p>
                  <p className="text-white/70 text-xs sm:text-sm">your subscription cost</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStopLosingMoney}
              className="w-full py-4 rounded-full font-bold text-lg text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/30"
              style={{ background: 'linear-gradient(90deg, #F28500, #FF6B35)' }}
            >
              Stop Losing Money
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Custom slider thumb styles */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          border: 3px solid #0ea5e9;
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          border: 3px solid #0ea5e9;
        }
      `}</style>
    </section>
  );
};

