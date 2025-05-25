import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  children: React.ReactNode;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  maxTilt = 15,
  scale = 1.03,
  perspective = 1200,
  children,
  style,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Invert the tilt for "opposite corner" effect
  const rotateX = useSpring(useTransform(y, [-1, 1], [maxTilt, -maxTilt]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-maxTilt, maxTilt]), { stiffness: 200, damping: 20 });
  const cardScale = useSpring(useTransform(x, [-1, 1], [1, scale]), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // Map px/py from [0,1] to [-1,1]
    x.set((px - 0.5) * 2);
    y.set((py - 0.5) * 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale: cardScale,
        willChange: "transform",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard; 