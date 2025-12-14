import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
}

export const ImagePreloader = ({ images }: ImagePreloaderProps) => {
  useEffect(() => {
    images.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    return () => {
      const links = document.head.querySelectorAll('link[rel="preload"][as="image"]');
      links.forEach((link) => {
        if (images.includes(link.getAttribute('href') || '')) {
          link.remove();
        }
      });
    };
  }, [images]);

  return null;
};
