import { motion, useScroll, useTransform } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

export const CherryBlossomFall = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200, 400], [0, 1, 1]);

  const petals: Petal[] = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 8 + Math.random() * 6,
    rotation: Math.random() * 360,
    size: 8 + Math.random() * 8,
  }));

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ opacity }}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          initial={{
            x: `${petal.x}vw`,
            y: '-10%',
            rotate: petal.rotation,
          }}
          animate={{
            y: '110vh',
            x: `${petal.x + (Math.random() - 0.5) * 20}vw`,
            rotate: petal.rotation + 720,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 20 20"
            className="drop-shadow-md"
          >
            <path
              d="M10 2 C8 2, 6 4, 6 6 C6 8, 8 10, 10 10 C8 10, 6 12, 6 14 C6 16, 8 18, 10 18 C12 18, 14 16, 14 14 C14 12, 12 10, 10 10 C12 10, 14 8, 14 6 C14 4, 12 2, 10 2 Z"
              fill="#fecdd3"
              opacity="0.8"
            />
            <path
              d="M10 2 C8 2, 6 4, 6 6 C6 8, 8 10, 10 10 C8 10, 6 12, 6 14 C6 16, 8 18, 10 18 C12 18, 14 16, 14 14 C14 12, 12 10, 10 10 C12 10, 14 8, 14 6 C14 4, 12 2, 10 2 Z"
              fill="#fda4af"
              opacity="0.4"
              transform="scale(0.8)"
              transform-origin="center"
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};
