import React, { useEffect, useRef } from 'react';

interface TitleEffectProps {
  text: string;
  className?: string;
}

export const TitleEffect: React.FC<TitleEffectProps> = ({ text, className = '' }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
            title.style.filter = 'blur(0)';
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return (
    <h1
      ref={titleRef}
      className={`text-4xl md:text-6xl font-bold tracking-tight
        bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent
        opacity-0 transform translate-y-8 blur-sm
        transition-all duration-1000 ease-out
        hover:scale-105 hover:from-purple-500 hover:via-purple-400 hover:to-blue-400
        ${className}`}
      style={{
        textShadow: '0 0 30px rgba(147, 51, 234, 0.3)',
      }}
    >
      {text}
    </h1>
  );
}; 