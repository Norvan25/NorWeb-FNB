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
  }, []);

  return <elevenlabs-convai agent-id="agent_6101kcewd8mvfh0tecwefhth3vwx"></elevenlabs-convai>;
}
