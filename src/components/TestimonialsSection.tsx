import React from 'react';
import { motion } from 'framer-motion';
import '../styles/mesh-gradient.css';
import { useTiltEffect } from '../hooks/useTiltEffect';

interface TestimonialCardProps {
  text: string;
  name: string;
  company: string;
  imageUrl: string;
  gradient: string;
  meshColors: string[];
}

const testimonials = [
  {
    text: "Started using PlayForge yesterday & I'm blown away. It's how cloud gaming should feel. I'm completely off traditional gaming now.",
    name: "Sam Whitmore",
    company: "New Computer",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    gradient: "from-purple-500/20 via-purple-800/20 to-purple-900/20",
    meshColors: ['#4B0082', '#800080', '#9400D3']
  },
  {
    text: "PlayForge is 🎮-ed for real",
    name: "Johannes Schickling",
    company: "Prisma",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    gradient: "from-blue-500/20 via-blue-800/20 to-blue-900/20",
    meshColors: ['#000080', '#0000FF', '#1E90FF']
  },
  {
    text: "PlayForge is the best product I've used in a while - it's an AI enabled gaming platform. I just asked it to find a station and it worked first time.",
    name: "Alex MacCaw",
    company: "Reflect",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    gradient: "from-red-500/20 via-red-800/20 to-red-900/20",
    meshColors: ['#8B0000', '#FF0000', '#DC143C']
  },
  {
    text: "I really like how PlayForge suggests gaming stations. It noticed I was into racing games and popped up this suggestion that matched my preferences!",
    name: "Wes Bos",
    company: "Internet",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150",
    gradient: "from-green-500/20 via-green-800/20 to-green-900/20",
    meshColors: ['#006400', '#228B22', '#32CD32']
  },
  {
    text: "The most useful gaming tool that I have used in years. PlayForge is steps ahead of anything else in the market.",
    name: "Guillermo Rauch",
    company: "Vercel",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150",
    gradient: "from-yellow-500/20 via-yellow-800/20 to-yellow-900/20",
    meshColors: ['#B8860B', '#DAA520', '#FFD700']
  },
  {
    text: "PlayForge is hands down my biggest gaming improvement in years",
    name: "Kevin Whinnery",
    company: "OpenAI",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    gradient: "from-pink-500/20 via-pink-800/20 to-pink-900/20",
    meshColors: ['#C71585', '#FF1493', '#FF69B4']
  }
];

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, name, company, imageUrl, gradient, meshColors }) => {
  const { tiltStyle, onMouseMove, onMouseLeave } = useTiltEffect({
    max: 12,
    scale: 1.02,
    speed: 400,
  });

  const meshGradientStyle = {
    background: `
      radial-gradient(at 21% 33%, ${meshColors[0]}1A 0px, transparent 50%),
      radial-gradient(at 79% 32%, ${meshColors[1]}1A 0px, transparent 50%),
      radial-gradient(at 26% 83%, ${meshColors[2]}1A 0px, transparent 50%)
    `,
    backgroundSize: '400% 400%',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="testimonial-card relative overflow-hidden rounded-2xl bg-black/60 backdrop-blur-sm border border-white/5 hover:border-purple-500/30 transition-all duration-300 group"
      style={tiltStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 transition-opacity duration-300 group-hover:opacity-30`} />
      <div 
        className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300" 
        style={meshGradientStyle}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="relative p-8 space-y-6">
        <p className="text-gray-300 text-lg leading-relaxed">{text}</p>
        <div className="flex items-center gap-4">
          <img
            src={imageUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/10"
          />
          <div>
            <h4 className="font-medium text-white">{name}</h4>
            <p className="text-gray-400 text-sm">{company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};