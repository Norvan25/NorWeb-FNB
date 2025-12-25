import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const leftColumnFAQs: FAQItem[] = [
  {
    question: "Times are tough — is NorWeb worth the cost?",
    answer: "We get it. That's why we built NorWeb to pay for itself. Most restaurants recover their subscription cost within the first 2 weeks through saved missed calls and reduced no-shows alone. Plus, with our 3-Month ROI Guarantee, if you don't see results, you get your setup fee back. Zero risk."
  },
  {
    question: "Other solutions seem cheaper — why NorWeb?",
    answer: "Cheaper tools give you a chatbot. NorWeb gives you a complete revenue system — AI that answers calls, takes orders, sends reminders, collects reviews, and markets to your customers. One platform replacing 5-6 separate tools. When you add up what you'd pay for a website builder + booking system + WhatsApp tool + review manager + CRM, NorWeb is actually the most cost-effective option."
  },
  {
    question: "What's the 3-Month ROI Guarantee?",
    answer: "Simple: If NorWeb doesn't generate at least 50 bookings or orders in your first 3 months, we'll refund your entire setup fee. No questions asked. We're betting on our own product because we know it works."
  },
  {
    question: "What's included in the Growth tier?",
    answer: "Everything in Starter (AI website, chatbot, booking system) PLUS: AI Voice Agent that answers your phone 24/7, delivery platform integration (Grab, Lalamove), full CRM with customer history, automated review collection, WhatsApp broadcast marketing, and priority support. It's our most popular plan because it covers everything a growing restaurant needs."
  },
  {
    question: "What does 'AI Voice Agent' mean?",
    answer: "It's like having a receptionist who never sleeps. When customers call your restaurant, our AI answers in a natural voice, handles reservations, answers menu questions, provides operating hours, and can even take orders. Available in English and Bahasa Malaysia. Your staff focuses on customers in the restaurant while AI handles the phone."
  },
  {
    question: "What does setup include?",
    answer: "Full white-glove onboarding: We build your custom AI-powered website, configure your menu with photos, train the AI on your specific restaurant details (parking, dietary options, signature dishes), integrate with your existing systems, and provide 2 days of dedicated support to ensure everything runs smoothly. You don't lift a finger."
  }
];

const rightColumnFAQs: FAQItem[] = [
  {
    question: "Are there hidden fees?",
    answer: "No hidden fees, ever. Your subscription includes everything listed. The only variable cost is AI usage (voice minutes and messages), which is billed based on actual consumption — and for most restaurants, this is under RM 50/month. We believe in transparent pricing."
  },
  {
    question: "How long until I see results?",
    answer: "Most restaurants see their first AI-handled booking within 24 hours of going live. Within the first week, you'll notice fewer missed calls and more online orders. By month 2-3, you'll have concrete data on revenue recovered. Our fastest result: a restaurant recovered RM 3,200 in their first month."
  },
  {
    question: "I already use StoreHub — do I need this?",
    answer: "StoreHub is great for POS. NorWeb handles everything before the transaction: answering inquiries, taking bookings, reducing no-shows, and bringing customers to your door. We integrate WITH your existing POS, not replace it. Think of us as your 24/7 sales and customer service team that feeds orders into StoreHub."
  },
  {
    question: "Who owns my customer data?",
    answer: "You do. 100%. Unlike delivery platforms that keep your customer information, every contact, booking, and order belongs to you. Export anytime. This is YOUR customer database to market to, build loyalty with, and grow your business — not ours to monetize."
  },
  {
    question: "What's the Early Bird offer?",
    answer: "First 50 restaurants in each area get: 15% off setup (RM 2,975 instead of RM 3,500), up to 6 months FREE on annual plans, and priority onboarding. We're building case studies and want early partners who'll grow with us. Once the 50 spots fill, prices go back to normal."
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
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about NorWeb
          </p>
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
            href="mailto:info@norvan.io"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            Contact us at info@norvan.io
          </a>
        </motion.div>
      </div>
    </section>
  );
};

