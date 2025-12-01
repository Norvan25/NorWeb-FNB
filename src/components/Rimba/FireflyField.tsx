export const FireflyField = () => {
  const fireflies = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${8 + Math.random() * 8}s`,
    size: `${4 + Math.random() * 8}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute rounded-full animate-firefly-drift"
          style={{
            left: firefly.left,
            top: firefly.top,
            width: firefly.size,
            height: firefly.size,
            animationDelay: firefly.delay,
            animationDuration: firefly.duration,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0.4) 40%, transparent 70%)',
            boxShadow: `
              0 0 ${parseInt(firefly.size) * 2}px rgba(212, 175, 55, 0.6),
              0 0 ${parseInt(firefly.size) * 4}px rgba(212, 175, 55, 0.4),
              0 0 ${parseInt(firefly.size) * 6}px rgba(212, 175, 55, 0.2)
            `,
          }}
        />
      ))}
    </div>
  );
};
