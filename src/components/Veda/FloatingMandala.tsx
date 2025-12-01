import { Circle, Triangle, Star, Hexagon } from 'lucide-react';

export const FloatingMandala = () => {
  const shapes = [Circle, Triangle, Star, Hexagon];

  const fragments = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    Icon: shapes[Math.floor(Math.random() * shapes.length)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${10 + Math.random() * 10}s`,
    size: `${16 + Math.random() * 24}px`,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {fragments.map((fragment) => (
        <div
          key={fragment.id}
          className="absolute animate-mandala-float"
          style={{
            left: fragment.left,
            top: fragment.top,
            animationDelay: fragment.delay,
            animationDuration: fragment.duration,
          }}
        >
          <fragment.Icon
            size={parseInt(fragment.size)}
            className="text-amber-400/20 drop-shadow-lg"
            style={{
              transform: `rotate(${fragment.rotation}deg)`,
              filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))',
            }}
          />
        </div>
      ))}
    </div>
  );
};
