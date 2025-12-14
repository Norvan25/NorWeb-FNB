import { useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
      };
    }
  }
}

export function ElevenLabsWidget() {
  useEffect(() => {
    const script = document.querySelector('script[src*="elevenlabs"]');
    if (!script) {
      const newScript = document.createElement('script');
      newScript.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed@beta';
      newScript.async = true;
      newScript.type = 'text/javascript';
      document.body.appendChild(newScript);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes glow-pulse {
        0%, 100% {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.6),
                      0 0 40px rgba(139, 92, 246, 0.4),
                      0 0 60px rgba(139, 92, 246, 0.2);
        }
        50% {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.8),
                      0 0 60px rgba(139, 92, 246, 0.6),
                      0 0 90px rgba(139, 92, 246, 0.4);
        }
      }

      @keyframes glow-ring {
        0% {
          transform: scale(1);
          opacity: 0.8;
        }
        100% {
          transform: scale(1.5);
          opacity: 0;
        }
      }

      elevenlabs-convai::part(button) {
        animation: glow-pulse 2s ease-in-out infinite;
        position: relative;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%) !important;
        transition: all 0.3s ease;
      }

      elevenlabs-convai::part(button):hover {
        transform: scale(1.1);
        box-shadow: 0 0 40px rgba(139, 92, 246, 1),
                    0 0 80px rgba(139, 92, 246, 0.8),
                    0 0 120px rgba(139, 92, 246, 0.6) !important;
      }

      elevenlabs-convai::part(button)::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: rgba(139, 92, 246, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: glow-ring 1.5s ease-out infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return <elevenlabs-convai agent-id="agent_6101kcewd8mvfh0tecwefhth3vwx"></elevenlabs-convai>;
}
