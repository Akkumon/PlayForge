import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { optimizeImage, getImagePlaceholder } from '../../utils/imageOptimization';

interface OptimizedImageProps {
  src: string;
  width?: number;
  quality?: number;
  className?: string;
  alt?: string;
}

export default function OptimizedImage({ 
  src, 
  width = 800, 
  quality = 80, 
  className = '', 
  alt = ''
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');
  const [placeholderSrc, setPlaceholderSrc] = useState('');

  useEffect(() => {
    setOptimizedSrc(optimizeImage({ url: src, width, quality }));
    setPlaceholderSrc(getImagePlaceholder(src));
  }, [src, width, quality]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {!isLoaded && placeholderSrc && (
          <motion.img
            src={placeholderSrc}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover filter blur-lg transform scale-105"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <motion.img
        src={optimizedSrc}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
} 