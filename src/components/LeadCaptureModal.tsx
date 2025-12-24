import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle, MessageCircle } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string | null;
}

const HUBSPOT_PORTAL_ID = '244263164';
const HUBSPOT_FORM_ID = '3feb8a47-f70d-427a-89ed-dfc098282d7d';

const restaurantTypes = [
  'Fine Dining',
  'Casual Dining',
  'Cafe',
  'Fast Food/QSR',
  'Cloud Kitchen',
  'Bar/Pub',
  'Catering',
  'Other',
];

const malaysiaStates = [
  'Kuala Lumpur',
  'Selangor',
  'Penang',
  'Johor',
  'Melaka',
  'Perak',
  'Negeri Sembilan',
  'Pahang',
  'Kedah',
  'Kelantan',
  'Terengganu',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Labuan',
];

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  your_restaurant_name: string;
  restaurant_type: string;
  state_region: string;
}

export const LeadCaptureModal = ({ isOpen, onClose }: LeadCaptureModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    your_restaurant_name: '',
    restaurant_type: '',
    state_region: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  // Auto close after success
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        onClose();
        // Reset form after close
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          your_restaurant_name: '',
          restaurant_type: '',
          state_region: '',
        });
        setSubmitStatus('idle');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: [
              { name: 'firstname', value: formData.firstname },
              { name: 'lastname', value: formData.lastname },
              { name: 'email', value: formData.email },
              { name: 'phone', value: formData.phone },
              { name: 'your_restaurant_name', value: formData.your_restaurant_name },
              { name: 'restaurant_type', value: formData.restaurant_type },
              { name: 'state_region', value: formData.state_region },
            ],
            context: {
              pageUri: window.location.href,
              pageName: 'NorWeb FnB Landing Page',
            },
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-md
    bg-[#0D1326] border border-[#2A2F40]
    text-white placeholder-white/40
    focus:outline-none focus:border-[#66D3FA]
    transition-colors duration-200
  `;

  const labelClasses = 'block text-white/70 text-sm font-medium mb-1.5';

  const selectClasses = `
    ${inputClasses}
    appearance-none cursor-pointer
    bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2366D3FA%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
    bg-no-repeat bg-[right_12px_center] bg-[length:20px]
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(13, 19, 38, 0.9)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-xl p-8"
            style={{
              backgroundColor: '#132238',
              border: '1px solid rgba(102, 211, 250, 0.2)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#66D3FA] hover:brightness-125 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {submitStatus === 'success' ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">You're in! 🎉</h3>
                <p className="text-gray-400 text-lg">
                  We'll WhatsApp you within 24 hours to schedule your demo.
                </p>
              </motion.div>
            ) : (
              /* Form State */
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Get Your AI Restaurant Assistant
                  </h2>
                  <p className="text-gray-400">
                    Fill in your details. We'll set up your free demo within 24 hours.
                  </p>
                  
                  {/* Early Bird Badge */}
                  <div className="inline-flex items-center mt-4 px-4 py-2 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: '#F28500' }}
                  >
                    🚀 Early Bird: 15% off setup + up to 6 months FREE
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* First Name & Last Name - Side by side */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="firstname" className={labelClasses}>
                        First name *
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        placeholder="Ahmad"
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastname" className={labelClasses}>
                        Last name *
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        placeholder="Abdullah"
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Your email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ahmad@restaurant.com"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Your contact number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+60 12 345 6789"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Restaurant Name */}
                  <div>
                    <label htmlFor="your_restaurant_name" className={labelClasses}>
                      Your Restaurant Name *
                    </label>
                    <input
                      type="text"
                      id="your_restaurant_name"
                      name="your_restaurant_name"
                      value={formData.your_restaurant_name}
                      onChange={handleInputChange}
                      placeholder="Warung Makan Sedap"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Restaurant Type */}
                  <div>
                    <label htmlFor="restaurant_type" className={labelClasses}>
                      Restaurant Type *
                    </label>
                    <select
                      id="restaurant_type"
                      name="restaurant_type"
                      value={formData.restaurant_type}
                      onChange={handleInputChange}
                      required
                      className={selectClasses}
                    >
                      <option value="" disabled>Select restaurant type</option>
                      {restaurantTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="state_region" className={labelClasses}>
                      State *
                    </label>
                    <select
                      id="state_region"
                      name="state_region"
                      value={formData.state_region}
                      onChange={handleInputChange}
                      required
                      className={selectClasses}
                    >
                      <option value="" disabled>Select state</option>
                      {malaysiaStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/10 border border-red-500/30">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-md font-semibold text-white transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: isSubmitting ? '#c46a00' : '#F28500',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) e.currentTarget.style.backgroundColor = '#FF9500';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) e.currentTarget.style.backgroundColor = '#F28500';
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Your Free Demo →'}
                  </button>

                  {/* Consent Text */}
                  <p className="text-center text-white/50 text-xs">
                    By submitting, you agree to receive communications from NorWeb.
                  </p>

                  {/* Trust Line */}
                  <p className="text-center text-white/60 text-[13px]">
                    ✅ No credit card required • ✅ Free consultation • ✅ 3-month guarantee
                  </p>

                  {/* WhatsApp Alternative */}
                  <div className="text-center pt-2">
                    <a
                      href="https://wa.me/60196069033"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#66D3FA] text-sm hover:underline"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Prefer to chat? WhatsApp us directly
                    </a>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
