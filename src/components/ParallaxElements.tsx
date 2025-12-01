import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';

interface FloatingElement {
  id: number;
  Icon: typeof Leaf | typeof Sparkles;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const ParallaxElements = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      mouseX.set(xPercent * 50);
      mouseY.set(yPercent * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const floatingElements: FloatingElement[] = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    Icon: i % 3 === 0 ? Leaf : Sparkles,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 16,
    delay: Math.random() * 5,
    duration: 12 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {floatingElements.map((element) => {
        const parallaxX = useTransform(mouseX, (value) => -value * (0.3 + Math.random() * 0.4));
        const parallaxY = useTransform(mouseY, (value) => -value * (0.3 + Math.random() * 0.4));

        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              x: parallaxX,
              y: parallaxY,
            }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              rotate: [0, 360],
            }}
            transition={{
              opacity: {
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: 'easeInOut',
              },
              rotate: {
                duration: element.duration * 1.5,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            <element.Icon
              size={element.size}
              className="text-[#D4AF37] drop-shadow-lg"
            />
          </motion.div>
        );
      })}
    </div>
  );
};
