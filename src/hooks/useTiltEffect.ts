import { useState, useEffect, useCallback } from 'react';

interface TiltConfig {
  max: number;
  scale: number;
  speed: number;
}

export function useTiltEffect(config: TiltConfig = { max: 15, scale: 1.05, speed: 400 }) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: `transform ${config.speed}ms cubic-bezier(.03,.98,.52,.99)`,
  });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;
    const xRotate = xPct * config.max;
    const yRotate = -yPct * config.max;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${yRotate}deg) rotateY(${xRotate}deg) scale(${config.scale})`,
      transition: `transform ${config.speed}ms cubic-bezier(.03,.98,.52,.99)`,
    });
  }, [config.max, config.scale, config.speed]);

  const onMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: `transform ${config.speed}ms cubic-bezier(.03,.98,.52,.99)`,
    });
  }, [config.speed]);

  return {
    tiltStyle,
    onMouseMove,
    onMouseLeave,
  };
}