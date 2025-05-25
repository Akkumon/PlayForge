import React from 'react';
import { motion } from 'framer-motion';

interface SubtleAnimatedPatternProps {
  // Define any potential props for customization later
  // e.g., number of elements, colors, animation variations
}

const generateRandomPosition = () => ({
  x: Math.random() * 100 + '%',
  y: Math.random() * 100 + '%',
});

const generateRandomScale = () => Math.random() * 0.5 + 0.5; // Scale between 0.5 and 1.0

const generateRandomDuration = () => Math.random() * 10 + 10; // Duration between 10 and 20 seconds

export default function SubtleAnimatedPattern({
  // props
}: SubtleAnimatedPatternProps) {

  const elements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    initialPos: generateRandomPosition(),
    animatePos: generateRandomPosition(),
    initialScale: generateRandomScale(),
    animateScale: generateRandomScale(),
    duration: generateRandomDuration(),
    color: i % 2 === 0 ? 'rgba(147, 51, 234, 0.08)' : 'rgba(80, 40, 120, 0.06)', // Subtle purple/blue
  }));

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {elements.map(el => (
        <motion.div
          key={el.id}
          className="absolute rounded-full"
          style={{
            width: 150, // Size of the elements
            height: 150,
            backgroundColor: el.color,
            filter: 'blur(80px)', // Soft blur for ethereal look
          }}
          initial={{
            x: el.initialPos.x,
            y: el.initialPos.y,
            scale: el.initialScale,
            opacity: 0,
          }}
          animate={{
            x: el.animatePos.x,
            y: el.animatePos.y,
            scale: el.animateScale,
            opacity: [0, 0.3, 0.3, 0], // Fade in, stay, fade out
          }}
          transition={{
            duration: el.duration,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  );
} 