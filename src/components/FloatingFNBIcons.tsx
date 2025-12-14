import { motion } from 'framer-motion';
import { Coffee, Wine, UtensilsCrossed, Pizza, IceCream, Soup, CupSoda, Cake } from 'lucide-react';
import { useEffect, useState } from 'react';

const icons = [Coffee, Wine, UtensilsCrossed, Pizza, IceCream, Soup, CupSoda, Cake];

interface FloatingIcon {
  id: number;
  Icon: typeof Coffee;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingFNBIcons = () => {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const newIcons: FloatingIcon[] = [];
    for (let i = 0; i < 15; i++) {
      newIcons.push({
        id: i,
        Icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 20,
        duration: 20 + Math.random() * 30,
        delay: Math.random() * 5,
      });
    }
    setFloatingIcons(newIcons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute opacity-10"
          initial={{
            x: `${icon.x}vw`,
            y: `${icon.y}vh`,
          }}
          animate={{
            x: [`${icon.x}vw`, `${(icon.x + 20) % 100}vw`],
            y: [`${icon.y}vh`, `${(icon.y + 30) % 100}vh`, `${icon.y}vh`],
            rotate: [0, 360],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            delay: icon.delay,
            ease: 'linear',
          }}
        >
          <icon.Icon size={icon.size} className="text-white" />
        </motion.div>
      ))}
    </div>
  );
};
