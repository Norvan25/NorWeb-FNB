import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const leftColumnFAQs: FAQItem[] = [
  {
    question: "I'm not technical at all. Can I actually use this?",
    answer: "That's exactly why we built it this way. You don't operate NorWeb — it operates for you. After setup (which we handle completely), you just check your dashboard occasionally. If you can read a WhatsApp message, you can use NorWeb."
  },
  {
    question: "Will this work with my current POS?",
    answer: "Yes. NorWeb is POS-agnostic. We don't replace your transaction system — we handle marketing, which your POS doesn't do. They work together, not against each other. Whatever POS you use, NorWeb sits on top."
  },
  {
    question: "How long does setup take?",
    answer: "7 days from sign-up to live. We do the heavy lifting: building your website, training the AI on your menu and policies, setting up automations. You just answer some questions about your restaurant and approve the final result."
  },
  {
    question: "What if I don't like it?",
    answer: "Cancel anytime. No lock-in contracts. We also offer a 30-day satisfaction guarantee — if you're not seeing value, we'll make it right or refund you. We're not here to trap you. We earn your business every month."
  },
  {
    question: "Is the voice AI actually good? Or robotic?",
    answer: "Talk to Nova right now. The button is on this page. That's your answer. Our AI uses advanced voice technology trained specifically for restaurant conversations. Most customers don't realize they're talking to AI until the booking is confirmed instantly."
  },
  {
    question: "Do I need to do anything after setup?",
    answer: "Check your dashboard. See your bookings. That's it. The AI handles customer inquiries 24/7. If you have menu changes or new promotions, just tell us — we'll update the system. Otherwise, it runs itself."
  }
];

const rightColumnFAQs: FAQItem[] = [
  {
    question: "What about walk-in customers?",
    answer: "NorWeb handles digital and phone customers — the ones who would otherwise slip through the cracks. Your staff stays focused on serving people in front of them. If anything, service IMPROVES because they're not running to answer the phone during rush hour."
  },
  {
    question: "Will customers know they're talking to AI?",
    answer: "We can configure it either way. Most customers don't mind — they want fast, accurate answers and instant booking. What matters is they get helped immediately instead of waiting or being ignored."
  },
  {
    question: "How long until I see results?",
    answer: "Most restaurants see their first AI-handled booking within 24 hours of going live. Within the first week, you'll notice fewer missed calls and more online orders. By month 2-3, you'll have concrete data on revenue recovered. Our fastest result: a restaurant recovered RM 3,200 in their first month."
  },
  {
    question: "Who owns my customer data?",
    answer: "You do. 100%. Unlike delivery platforms that keep your customer information, every contact, booking, and order belongs to you. Export anytime. This is YOUR customer database to market to, build loyalty with, and grow your business — not ours to monetize."
  },
  {
    question: "What's the Early Bird offer?",
    answer: "First 50 restaurants get 15% off for life. We're building case studies and want early partners who'll grow with us. Once the 50 spots fill, prices go back to normal."
  },
  {
    question: "Can I upgrade from Starter later?",
    answer: "Absolutely. Many restaurants start with Starter to test the waters, then upgrade to Growth when they see results. Upgrading is seamless — all your data, customers, and settings carry over. No setup fee for upgrades. You can change plans anytime."
  }
];

const FAQItem = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border-b border-gray-800 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group"
      >
        <span className={`font-medium transition-colors ${isOpen ? 'text-cyan-400' : 'text-white group-hover:text-gray-300'}`}>
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 p-1 rounded-full transition-colors ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700'}`}
        >
          {isOpen ? <X size={18} /> : <Plus size={18} />}
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-400 text-sm leading-relaxed pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (question: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(question)) {
        newSet.delete(question);
      } else {
        newSet.add(question);
      }
      return newSet;
    });
  };

  return (
    <section className="px-6 py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Questions We Get Over Teh Tarik
          </h2>
        </motion.div>

        {/* 2-Column FAQ Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Left Column */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
            {leftColumnFAQs.map((faq) => (
              <FAQItem
                key={faq.question}
                item={faq}
                isOpen={openItems.has(faq.question)}
                onToggle={() => toggleItem(faq.question)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
            {rightColumnFAQs.map((faq) => (
              <FAQItem
                key={faq.question}
                item={faq}
                isOpen={openItems.has(faq.question)}
                onToggle={() => toggleItem(faq.question)}
              />
            ))}
          </div>
        </motion.div>

        {/* Still have questions? */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Talk to Nova
          </a>
        </motion.div>
      </div>
    </section>
  );
};

