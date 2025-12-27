/**
 * ScrollTracker Component
 * Tracks section visibility for analytics
 */

import { useEffect } from 'react';
import { trackSectionView } from '../lib/tracking';

export function ScrollTracker() {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observed = new Set<string>();
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !observed.has(entry.target.id)) {
            observed.add(entry.target.id);
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);
  
  return null;
}

