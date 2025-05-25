import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionStyle } from 'framer-motion';

interface TiltEffectOptions {
  max?: number;
  scale?: number;
  speed?: number;
  perspective?: number;
}

export const useTiltEffect = ({ 
  max = 15, 
  scale = 1.05, 
  speed = 400,
  perspective = 1000 
}: TiltEffectOptions = {}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Invert the rotation values to create the opposite tilt effect
  const rotateX = useTransform(y, [-100, 100], [-max, max]);
  const rotateY = useTransform(x, [-100, 100], [max, -max]);

  // Add a subtle scale effect that follows the mouse
  const scaleX = useTransform(x, [-100, 0, 100], [1 - scale/2, 1, 1 - scale/2]);
  const scaleY = useTransform(y, [-100, 0, 100], [1 - scale/2, 1, 1 - scale/2]);

  // Spring configuration for smooth animation
  const springConfig = { 
    damping: 20, 
    stiffness: 200,
    mass: 0.5
  };

  // Apply spring physics to all transforms
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  const scaleXSpring = useSpring(scaleX, springConfig);
  const scaleYSpring = useSpring(scaleY, springConfig);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;

    // Normalize the values to [-100, 100] range
    const normalizedX = (mouseX / (rect.width / 2)) * 100;
    const normalizedY = (mouseY / (rect.height / 2)) * 100;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const tiltStyle: MotionStyle = {
    transform: `
      perspective(${perspective}px)
      rotateX(${rotateXSpring}deg)
      rotateY(${rotateYSpring}deg)
      scale(${scaleXSpring}, ${scaleYSpring})
    `,
    transformStyle: 'preserve-3d' as const,
    transition: `transform ${speed}ms cubic-bezier(0.17, 0.67, 0.83, 0.67)`,
    willChange: 'transform',
  };

  return { tiltStyle, onMouseMove, onMouseLeave };
};