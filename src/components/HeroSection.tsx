import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackgroundEffects from './BackgroundEffects';
import ParticleEffects from './ParticleEffects';
import { scrollToSection } from '../lib/utils';
import RotatingCarousel from './RotatingCarousel';
import { TitleEffect } from './TitleEffect';

const gamingCards = [
  {
    src: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&q=80&w=2940',
    title: 'Premium Gaming Setup',
    category: 'Hardware',
    description: 'Experience ultra-fast performance and stunning graphics with our top-tier cloud gaming rigs.'
  },
  {
    src: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80&w=2940',
    title: 'Racing Experience',
    category: 'Racing',
    description: 'Feel the adrenaline of high-speed racing games with zero lag and immersive controls.'
  },
  {
    src: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=2940',
    title: 'FPS Gaming',
    category: 'Action',
    description: 'Dominate the battlefield with lightning-fast response times and crystal-clear visuals.'
  },
  {
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2940',
    title: 'Strategy Games',
    category: 'Strategy',
    description: 'Plan, build, and conquer with seamless gameplay and powerful cloud resources.'
  },
  {
    src: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2940',
    title: 'Adventure Worlds',
    category: 'Adventure',
    description: 'Explore vast open worlds and embark on epic quests from any device.'
  },
  {
    src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&q=80&w=2940',
    title: 'Indie Gems',
    category: 'Indie',
    description: 'Discover and play the latest indie hits with smooth, uninterrupted streaming.'
  },
  {
    src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=2940',
    title: 'Sports Arena',
    category: 'Sports',
    description: 'Compete in your favorite sports games with friends and rivals worldwide.'
  },
  {
    src: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&q=80&w=2940',
    title: 'Retro Classics',
    category: 'Retro',
    description: 'Relive the golden age of gaming with classic titles, all in the cloud.'
  }
];

export default function HeroSection() {
  return (
    <div id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32 font-sans">
      <BackgroundEffects />
      <ParticleEffects />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-purple-400 font-medium tracking-wide uppercase text-sm font-press-start-2p text-xs"
        >
          Next-Gen Cloud Gaming
        </motion.p>
        
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-8 font-press-start-2p">
            High-End Gaming
            <br />
            Without
            <br />
            The Hardware
          </h2>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Access premium gaming stations from anywhere. Play the latest titles
          without investing in expensive equipment.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/signup"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto text-center
                shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 border border-purple-500/50 block"
            >
              Get Started
            </Link>
          </motion.div>
          <motion.a 
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 
              flex items-center justify-center gap-2 w-full sm:w-auto backdrop-blur-sm border border-white/10 hover:border-white/20
              shadow-lg shadow-white/5 hover:shadow-white/10"
          >
            <Play className="h-4 w-4 text-purple-400 group-hover:text-purple-300" fill="currentColor" />
            Learn More
          </motion.a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 mt-16 w-full max-w-6xl mx-auto"
      >
        <RotatingCarousel 
          items={gamingCards}
          autoRotate={true}
          rotationSpeed={5000}
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/stations"
              className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200
                shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 border border-purple-500/50 flex items-center gap-2"
            >
              <span>View All Stations</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 flex justify-center"
        >
          <div className="group bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 border border-white/5 hover:border-white/10 transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.1)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.2)] relative hover:translate-y-[-5px]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
                'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100'
              ].map((profileImg, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 + i * 0.1 }}
                  className="h-8 w-8 rounded-full border-2 border-black/70 overflow-hidden transform group-hover:scale-110 transition-transform duration-300"
                >
                  <img 
                    src={profileImg} 
                    alt={`Online gamer ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <div className="relative flex flex-col">
              <span className="text-sm text-purple-400 font-medium group-hover:text-purple-300 transition-colors">1,200+ gamers</span>
              <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">currently online</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}