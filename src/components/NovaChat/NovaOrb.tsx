import { useEffect, useRef } from 'react';

interface Props {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
}

export function NovaOrb({ isActive, isListening, isSpeaking }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 160;
    canvas.width = size;
    canvas.height = size;

    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 65, 0, Math.PI * 2);
      ctx.strokeStyle = isActive ? 'rgba(0, 212, 170, 0.3)' : 'rgba(0, 212, 170, 0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (isActive) {
        const waveCount = isSpeaking ? 6 : 4;
        const amplitude = isSpeaking ? 18 : (isListening ? 12 : 6);

        for (let i = 0; i < waveCount; i++) {
          const radius = 35 + i * 7 + Math.sin(phase + i * 0.6) * amplitude;
          const alpha = 0.35 - i * 0.05;

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = isSpeaking
            ? `rgba(0, 212, 170, ${alpha})`
            : `rgba(0, 180, 150, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      if (isActive) {
        gradient.addColorStop(0, '#00D4AA');
        gradient.addColorStop(1, '#00A888');
      } else {
        gradient.addColorStop(0, 'rgba(0, 212, 170, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 168, 136, 0.4)');
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      if (isActive) {
        ctx.shadowColor = '#00D4AA';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)';
      ctx.fill();

      phase += isActive ? 0.1 : 0.02;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isListening, isSpeaking]);

  return <canvas ref={canvasRef} className="nova-orb-canvas" />;
}
