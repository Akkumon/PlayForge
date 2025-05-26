import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { scrollToSection } from '../lib/utils';
import { Gamepad2 } from 'lucide-react';

interface CarouselItem {
  src: string;
  title: string;
  category: string;
}

interface RotatingCarouselProps {
  items?: CarouselItem[];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

const CARD_WIDTH = 180;
const CARD_HEIGHT = 260;
const RADIUS = 320;

// Modern, high-end gaming images (emphasizing experience, not just hardware)
const highEndGamingCards: CarouselItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1558507653-c711b46872b3?auto=format&fit=crop&w=800&q=80',
    title: 'Immersive Worlds',
    category: 'Experience',
  },
  {
    src: 'https://images.unsplash.com/photo-1580325710304-9ac9df8d4f42?auto=format&fit=crop&w=800&q=80',
    title: 'Stunning Graphics',
    category: 'Visuals',
  },
  {
    src: 'https://images.unsplash.com/photo-1629575079440-c74855511af2?auto=format&fit=crop&w=800&q=80',
    title: 'Competitive Edge',
    category: 'Performance',
  },
  {
    src: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=800&q=80',
    title: 'Pure Adrenaline',
    category: 'Action',
  },
  {
    src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
    title: 'Play Anywhere',
    category: 'Access',
  },
  {
    src: 'https://images.unsplash.com/photo-1542751371-738aa5606974?auto=format&fit=crop&w=800&q=80',
    title: 'Seamless Gameplay',
    category: 'Smoothness',
  },
  {
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    title: 'Effortless Control',
    category: 'Control',
  },
  {
    src: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=800&q=80',
    title: 'Next-Gen Power',
    category: 'Power',
  }
];

export default function RotatingCarousel({
  items = highEndGamingCards,
  autoRotate = true,
  rotationSpeed = 5000,
}: RotatingCarouselProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState<number|null>(null);
  const [isFocusing, setIsFocusing] = useState(false);
  const theta = 360 / items.length;
  const rotation = useMotionValue(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper to start auto-rotation
  const startAutoRotate = React.useCallback(() => {
    if (!autoRotateRef.current && autoRotate) {
      const tick = () => {
        animate(rotation, rotation.get() + theta, {
          duration: rotationSpeed / 1000,
          ease: [0.4, 0, 0.2, 1],
          onUpdate: v => rotation.set(v),
          onComplete: () => {
            autoRotateRef.current = setTimeout(tick, rotationSpeed);
          }
        });
      };
      autoRotateRef.current = setTimeout(tick, rotationSpeed);
    }
  }, [autoRotate, rotation, theta, rotationSpeed]);

  // Helper to stop auto-rotation
  const stopAutoRotate = React.useCallback(() => {
    if (autoRotateRef.current) {
      clearTimeout(autoRotateRef.current);
      autoRotateRef.current = null;
    }
  }, []);

  // Start auto-rotation on mount and when not focusing
  React.useEffect(() => {
    if (!isFocusing && autoRotate) {
      startAutoRotate();
    } else {
      stopAutoRotate();
    }
    return () => stopAutoRotate();
  }, [isFocusing, autoRotate, startAutoRotate, stopAutoRotate]);

  // Mouse drag to rotate
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragStartAngle(rotation.get());
    stopAutoRotate();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    rotation.set(dragStartAngle + delta * 0.5);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (!focusedIndex && autoRotate) startAutoRotate();
  };

  // Add more cards for a fuller look if needed
  const displayItems = items.length < 7 ? [...items, ...items, ...items].slice(0, 8) : items;
  const displayTheta = 360 / displayItems.length;

  // Click to focus: animate carousel so card comes to center
  const handleCardClick = (i: number) => {
    if (focusedIndex === i) {
      setFocusedIndex(null);
      setIsFocusing(false);
      if (autoRotate) startAutoRotate();
      return;
    }
    setIsFocusing(true);
    stopAutoRotate();
    const angleToFocus = -i * displayTheta;
    animate(rotation.get(), angleToFocus, {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: v => rotation.set(v),
      onComplete: () => {
        setFocusedIndex(i);
        setIsFocusing(false);
        if (autoRotate) startAutoRotate();
      }
    });
  };

  // Subtle blur effect when focused
  const blurStyle = focusedIndex !== null 
    ? { 
        filter: 'blur(2px) brightness(0.99)',
        transition: 'filter 0.5s cubic-bezier(0.32, 0.72, 0, 1)'
      } 
    : { 
        filter: 'blur(0px) brightness(1)',
        transition: 'filter 0.5s cubic-bezier(0.32, 0.72, 0, 1)'
      };

  return (
    <div
      ref={carouselRef}
      className="relative w-full flex items-center justify-center h-[320px] md:h-[340px] select-none"
      style={{ perspective: 1200, marginTop: '0', marginBottom: '0', alignItems: 'flex-start' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Subtle background blur when focused */}
      <div className="absolute inset-0" style={{ zIndex: 10, pointerEvents: 'none', ...blurStyle }} />
      {/* Carousel (always animating) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 flex items-center justify-center" style={{ perspective: 1200, zIndex: 20 }}>
        {displayItems.map((item, i) => {
          // 3D positioning
          const angle = i * displayTheta;
          const rotateY = useTransform(rotation, v => v + angle);
          const x = useTransform(rotateY, v => Math.sin((v * Math.PI) / 180) * RADIUS);
          const z = useTransform(rotateY, v => Math.cos((v * Math.PI) / 180) * RADIUS);
          const scale = useTransform(z, zVal => {
            if (focusedIndex === i) return 1.12;
            return 0.7 + 0.3 * ((zVal + RADIUS) / (2 * RADIUS));
          }, {
            transition: { type: 'spring', stiffness: 100, damping: 20 }
          });
          const opacity = useTransform(z, (zVal: number) => 0.4 + 0.6 * ((zVal + RADIUS) / (2 * RADIUS)), {
            transition: { type: 'spring', stiffness: 100, damping: 20 }
          });
          // Floating animation
          const floatY = useMotionValue(0);
          React.useEffect(() => {
            const controls = animate(floatY, [0, -10, 0, 10, 0], {
              duration: 3 + i * 0.1,
              repeat: Infinity,
              ease: 'easeInOut',
            });
            return () => controls.stop();
          }, [floatY, i]);

          // Show full description if focused, else clamp
          const descClass = focusedIndex === i
            ? 'text-xs text-gray-300 transition-colors duration-300 flex-1'
            : 'text-xs text-gray-300 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300 flex-1';

          // Tag style: smaller and less prominent in focus mode
          const tagClass = focusedIndex === i
            ? 'px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/20'
            : 'px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/30 text-purple-300 border border-purple-500/30';

          return (
            <motion.div
              key={i}
              style={{
                x,
                z,
                scale,
                opacity,
                y: floatY,
                rotateY: focusedIndex === i ? 0 : rotateY,
                position: 'absolute',
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                cursor: isDragging ? 'grabbing' : 'pointer',
                boxShadow: focusedIndex === i
                  ? '0 0 32px 0 rgba(147,51,234,0.25), 0 0 80px 0 rgba(80,40,120,0.18)'
                  : '0 8px 32px rgba(80,40,120,0.15)',
                willChange: 'transform',
                zIndex: 100 + Math.round(z.get()),
                border: focusedIndex === i ? 'none' : undefined,
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 100, 
                damping: 20,
                mass: 0.8
              }}
              className={`rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group`}
              onClick={() => handleCardClick(i)}
            >
              {/* Gradient blur glow for focused card */}
              {focusedIndex === i && (
                <div className="absolute -inset-4 z-0 rounded-3xl pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at center, rgba(147,51,234,0.25) 0%, rgba(80,40,120,0.10) 80%, transparent 100%)',
                  filter: 'blur(12px)',
                }} />
              )}
              <div className="relative flex flex-col h-full z-10">
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={item.src}
                    alt={item.title}
                    className={focusedIndex === i
                      ? 'w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]'
                      : 'w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]'}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow h-full min-h-0 overflow-hidden">
                  <div className={
                    focusedIndex === i
                      ? 'flex items-center justify-center mb-2'
                      : 'flex items-center justify-start mb-2'
                  }>
                    {focusedIndex !== i && (
                      <span className="flex items-center justify-center mr-2 opacity-40">
                        <Gamepad2 className="w-6 h-6" />
                      </span>
                    )}
                    <span className={tagClass}>
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-grow min-h-0 mb-2 relative justify-center items-center">
                    <h3 className="text-base font-bold text-white transition-colors duration-300 break-words whitespace-normal text-center">
                      {item.title}
                    </h3>
                  </div>
                  <div className={
                    'mt-auto pt-2 flex min-h-[32px] max-h-[36px] ' +
                    (focusedIndex === i ? '' : 'justify-center')
                  }>
                    <button
                      onClick={e => { e.stopPropagation(); scrollToSection('faq'); }}
                      className={
                        (focusedIndex === i
                          ? 'w-full px-2 py-1 text-[10px] min-h-0 flex-shrink-0'
                          : 'px-2 py-0.5 text-[9px] min-h-0 flex-shrink-0') +
                        ' inline-flex items-center justify-center gap-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200 text-purple-300 hover:text-purple-200 font-medium'
                      }
                      style={{ maxHeight: 28 }}
                    >
                      <span>Learn More</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  {focusedIndex !== i && (
                    <div className="absolute inset-0 z-0 rounded-2xl pointer-events-none" style={{
                      background: 'linear-gradient(135deg, rgba(80,40,120,0.08) 0%, rgba(147,51,234,0.10) 100%)',
                    }} />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 