import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from '../types/restaurant';
import { ArrowRight } from 'lucide-react';

interface CuisineCardProps {
  restaurant: Restaurant;
  index: number;
}

export const CuisineCard = ({ restaurant, index }: CuisineCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
      }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="group cursor-pointer relative overflow-hidden rounded-2xl h-96 perspective-1000"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${restaurant.theme.gradient} opacity-90`}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative h-full flex flex-col justify-between p-8 z-10">
        <div className="flex justify-between items-start">
          <div>
            <motion.div
              className="text-6xl mb-4"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {restaurant.icon}
            </motion.div>
            <h3 className="text-5xl font-bold text-white tracking-wider mb-2">
              {restaurant.name}
            </h3>
            <p className="text-white/80 text-lg font-light tracking-wide">
              {restaurant.cuisine}
            </p>
          </div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-full p-3"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <ArrowRight className="text-white" size={24} />
          </motion.div>
        </div>

        <div>
          <motion.p
            className="text-white/90 text-xl font-medium mb-3 italic"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            "{restaurant.tagline}"
          </motion.p>
          <p className="text-white/70 text-sm leading-relaxed">
            {restaurant.description}
          </p>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 border-2 border-white/20 rounded-2xl"
        whileHover={{ borderColor: 'rgba(255,255,255,0.4)' }}
      />
    </motion.div>
  );
};
