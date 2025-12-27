import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Target, Lock, Link2, Check } from 'lucide-react';
import { trackFormStart, trackFormSubmit, trackFormView, getStoredUTMParams, trackWhatsAppClick } from '../lib/tracking';

const WHATSAPP_NUMBER = '601116343646';

const restaurantTypes = [
  'Fine Dining',
  'Casual Dining',
  'Cafe',
  'Fast Food / QSR',
  'Cloud Kitchen',
  'Bar / Pub',
  'Catering',
  'Other',
];

const branchOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6-10', label: '6-10' },
  { value: 'more_than_10', label: 'More than 10' },
];

const menuSizeOptions = [
  { value: 'less_than_30', label: 'Less than 30' },
  { value: '30-50', label: '30-50' },
  { value: '50-100', label: '50-100' },
  { value: 'more_than_100', label: 'More than 100' },
];

const states = [
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
  'Putrajaya',
];

const HUBSPOT_PORTAL_ID = '244263164';
const HUBSPOT_FORM_ID = '3feb8a47-f70d-427a-89ed-dfc098282d7d';

const trustItems = [
  { icon: Target, text: 'Easy setup for anyone' },
  { icon: Lock, text: 'Your data stays yours' },
  { icon: Link2, text: 'Integrates with your tools' },
];

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  your_restaurant_name: string;
  restaurant_type: string;
  num_branches: string;
  menu_size: string;
  state_region: string;
}

export const LeadCaptureSection = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    your_restaurant_name: '',
    restaurant_type: '',
    num_branches: '',
    menu_size: '',
    state_region: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    trackFormView();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!hasStarted) {
      setHasStarted(true);
      trackFormStart();
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Get UTM params
    const utmParams = getStoredUTMParams();

    try {
      // Format phone with +60 prefix
      const formattedPhone = formData.phone.startsWith('+60') 
        ? formData.phone 
        : `+60${formData.phone}`;

      // Submit to HubSpot
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
              { name: 'phone', value: formattedPhone },
              { name: 'your_restaurant_name', value: formData.your_restaurant_name },
              { name: 'restaurant_type', value: formData.restaurant_type },
              { name: 'num_branches', value: formData.num_branches },
              { name: 'menu_size', value: formData.menu_size },
              { name: 'state_region', value: formData.state_region },
              // UTM fields (if configured in HubSpot)
              ...(utmParams.utm_source ? [{ name: 'utm_source', value: utmParams.utm_source }] : []),
              ...(utmParams.utm_medium ? [{ name: 'utm_medium', value: utmParams.utm_medium }] : []),
              ...(utmParams.utm_campaign ? [{ name: 'utm_campaign', value: utmParams.utm_campaign }] : []),
            ],
            context: {
              pageUri: window.location.href,
              pageName: 'NorWeb FnB Landing Page - Lead Capture Section',
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Track successful submission
      trackFormSubmit({
        restaurant_type: formData.restaurant_type,
        num_branches: formData.num_branches,
        menu_size: formData.menu_size,
        state: formData.state_region,
        ...utmParams,
      });

      setIsSubmitted(true);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        your_restaurant_name: '',
        restaurant_type: '',
        num_branches: '',
        menu_size: '',
        state_region: '',
      });
    } catch (err) {
      setError('Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick('nova', 'lead_capture_section');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  return (
    <section id="contact" className="px-6 py-24 bg-gradient-to-b from-black via-gray-900/50 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              NorWeb's AI-powered system is built for restaurants that want to grow
            </h2>

            {/* Trust Icons */}
            <div className="flex flex-wrap gap-6 mb-10">
              {trustItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Early Bird Banner */}
            <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-4 mb-6">
              <p className="text-orange-400 font-semibold text-sm md:text-base">
                🎉 Early Bird: 15% off setup + FREE custom AI character for first 50 restaurants
              </p>
            </div>

            {/* WhatsApp Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-colors shadow-lg shadow-green-500/30"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </motion.button>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
                  <p className="text-gray-600 mb-6">
                    We've received your request. Our team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-cyan-600 font-medium hover:text-cyan-700"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Get a free consultation and tailored demo
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Schedule a 15-minute call with our team — just fill out the form.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name & Last Name - Side by side on sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First name *
                        </label>
                        <input
                          type="text"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                          placeholder="Ahmad"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last name *
                        </label>
                        <input
                          type="text"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                          placeholder="Abdullah"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your email address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                        placeholder="ahmad@restaurant.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your WhatsApp number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm font-medium">
                          +60
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          pattern="[0-9]{9,10}"
                          className="flex-1 px-4 py-3 rounded-r-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                          placeholder="12 345 6789"
                        />
                      </div>
                    </div>

                    {/* Restaurant Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your restaurant name *
                      </label>
                      <input
                        type="text"
                        name="your_restaurant_name"
                        value={formData.your_restaurant_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900"
                        placeholder="Warung Makan Sedap"
                      />
                    </div>

                    {/* Restaurant Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Restaurant type *
                      </label>
                      <select
                        name="restaurant_type"
                        value={formData.restaurant_type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900 bg-white"
                      >
                        <option value="">Select type...</option>
                        {restaurantTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Number of Branches */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Branches *
                      </label>
                      <select
                        name="num_branches"
                        value={formData.num_branches}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900 bg-white"
                      >
                        <option value="">Select number of branches...</option>
                        {branchOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Menu Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        How many items on your menu? *
                      </label>
                      <select
                        name="menu_size"
                        value={formData.menu_size}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900 bg-white"
                      >
                        <option value="">Select menu size...</option>
                        {menuSizeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <select
                        name="state_region"
                        value={formData.state_region}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-gray-900 bg-white"
                      >
                        <option value="">Select state...</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-4 rounded-lg font-bold text-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(90deg, #F28500, #FF6B35)' }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Get Your Custom Quote →'}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting, you agree to receive communications from NorWeb.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
