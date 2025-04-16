import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundEffects() {
  const { scrollY } = useScroll();
  const gradientRef = useRef<HTMLDivElement>(null);

  // Transform scroll position into gradient values
  const gradientOpacity = useTransform(scrollY, [0, 500], [0.1, 0.3]);
  const gradientScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Parallax effect for background elements
  const parallaxY = useTransform(scrollY, [0, 500], [0, 50]);

  useEffect(() => {
    const updateGradient = () => {
      if (gradientRef.current) {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const hue = (scrollPercent * 60 + 270) % 360;
        gradientRef.current.style.background = `linear-gradient(to bottom, 
          hsla(${hue}, 70%, 15%, ${gradientOpacity.get()}),
          hsla(${hue + 30}, 70%, 5%, ${gradientOpacity.get()})
        )`;
      }
    };

    window.addEventListener('scroll', updateGradient);
    return () => window.removeEventListener('scroll', updateGradient);
  }, [gradientOpacity]);

  return (
    <>
      <motion.div
        ref={gradientRef}
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          scale: gradientScale,
          y: parallaxY,
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 pointer-events-none -z-10" />
    </>
  );
} 