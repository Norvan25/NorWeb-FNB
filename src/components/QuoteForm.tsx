/**
 * QuoteForm Component
 * Enhanced quote form with comprehensive fields for lead capture
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { trackFormStart, trackFormSubmit, trackFormView, getStoredUTMParams } from '../lib/tracking';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  restaurantName: string;
  restaurantType: string;
  numBranches: string;
  menuSize: string;
  state: string;
}

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

const branchOptions = [
  '1 (Single outlet)',
  '2',
  '3',
  '4',
  '5',
  '6-10',
  'More than 10',
];

const menuSizeOptions = [
  'Less than 30',
  '30 - 50',
  '50 - 100',
  'More than 100',
];

const malaysiaStates = [
  'Kuala Lumpur',
  'Selangor',
  'Penang',
  'Johor',
  'Perak',
  'Kedah',
  'Kelantan',
  'Terengganu',
  'Pahang',
  'Negeri Sembilan',
  'Melaka',
  'Sabah',
  'Sarawak',
  'Perlis',
  'Labuan',
  'Putrajaya',
];

interface QuoteFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function QuoteForm({ onSuccess, className = '' }: QuoteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    restaurantName: '',
    restaurantType: '',
    numBranches: '',
    menuSize: '',
    state: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackFormView();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackFormStart();
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Get UTM params
    const utmParams = getStoredUTMParams();

    // Prepare submission data
    const submissionData = {
      ...formData,
      ...utmParams,
      submittedAt: new Date().toISOString(),
      source: 'norweb-fnb-landing',
      pageUrl: window.location.href,
    };

    try {
      // Submit to Supabase edge function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wjcjmelphvogwgjltllg.supabase.co';
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-quote`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        trackFormSubmit(submissionData);
        setIsSuccess(true);
        onSuccess?.();
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 text-center ${className}`}
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Quote on its way! 🚀</h3>
        <p className="text-slate-400 mb-4">
          Check your email and WhatsApp in the next 2 minutes.
        </p>
        <p className="text-sm text-cyan-400">
          This quote was generated automatically by Nova.
        </p>
      </motion.div>
    );
  }

  const inputClasses = "w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-colors";
  const selectClasses = `${inputClasses} appearance-none cursor-pointer`;
  const labelClasses = "block text-sm text-slate-400 mb-1";

  return (
    <form onSubmit={handleSubmit} className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700 ${className}`}>
      {/* Early Bird Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-3 px-4 rounded-xl mb-6 font-medium text-sm md:text-base">
        🚀 EARLY BIRD — 50% off setup | ROI guaranteed or money back | First 50 restaurants
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">
        Get Your Custom Quote
      </h3>
      <p className="text-slate-400 text-center mb-6 text-sm md:text-base">
        Fill in your details. Quote delivered in 2 minutes.
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>First name *</label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Ahmad"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Last name *</label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Abdullah"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClasses}>Your email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="ahmad@restaurant.com"
            className={inputClasses}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClasses}>Your contact number *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+60 12 345 6789"
            className={inputClasses}
          />
        </div>

        {/* Restaurant Name */}
        <div>
          <label className={labelClasses}>Your Restaurant Name *</label>
          <input
            type="text"
            required
            value={formData.restaurantName}
            onChange={(e) => handleInputChange('restaurantName', e.target.value)}
            placeholder="Warung Makan Sedap"
            className={inputClasses}
          />
        </div>

        {/* Restaurant Type */}
        <div>
          <label className={labelClasses}>Restaurant Type *</label>
          <div className="relative">
            <select
              required
              value={formData.restaurantType}
              onChange={(e) => handleInputChange('restaurantType', e.target.value)}
              className={selectClasses}
            >
              <option value="" disabled>Select restaurant type</option>
              {restaurantTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Number of Branches */}
        <div>
          <label className={labelClasses}>How many outlets/branches? *</label>
          <div className="relative">
            <select
              required
              value={formData.numBranches}
              onChange={(e) => handleInputChange('numBranches', e.target.value)}
              className={selectClasses}
            >
              <option value="" disabled>Select number of branches</option>
              {branchOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Menu Size */}
        <div>
          <label className={labelClasses}>How many items on your menu? *</label>
          <div className="relative">
            <select
              required
              value={formData.menuSize}
              onChange={(e) => handleInputChange('menuSize', e.target.value)}
              className={selectClasses}
            >
              <option value="" disabled>Select menu size</option>
              {menuSizeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* State */}
        <div>
          <label className={labelClasses}>State *</label>
          <div className="relative">
            <select
              required
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={selectClasses}
            >
              <option value="" disabled>Select state</option>
              {malaysiaStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Generating your quote...</span>
            </>
          ) : (
            'Get Your Custom Quote →'
          )}
        </motion.button>
      </div>

      <p className="text-xs text-slate-500 text-center mt-4">
        By submitting, you agree to receive your quote via email and WhatsApp.
      </p>
    </form>
  );
}

