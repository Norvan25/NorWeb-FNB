import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { restaurants } from '../data/restaurants';
import { ArrowLeft } from 'lucide-react';

export const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Restaurant Not Found</h1>
          <Link to="/" className="text-purple-400 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen bg-gradient-to-br ${restaurant.theme.gradient} text-white`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-12 text-lg"
          >
            <ArrowLeft size={24} />
            Back to Showroom
          </motion.button>
        </Link>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="text-9xl mb-8"
          >
            {restaurant.icon}
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4">
            {restaurant.name}
          </h1>

          <p className="text-3xl text-white/80 font-light mb-6">
            {restaurant.cuisine}
          </p>

          <p className="text-2xl italic text-white/90 mb-8">
            "{restaurant.tagline}"
          </p>

          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {restaurant.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Coming Soon</h2>
          <p className="text-xl text-white/80 mb-8">
            Full menu and ordering experience in development
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black font-bold rounded-full"
            >
              View Menu
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/20 backdrop-blur-sm font-bold rounded-full"
            >
              Make Reservation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
