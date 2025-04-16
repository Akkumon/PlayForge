import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import BackgroundEffects from './BackgroundEffects';
import ParticleEffects from './ParticleEffects';

const gamingCards = [
  {
    src: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&q=80&w=2940',
    title: 'Premium Gaming Setup',
    category: 'Hardware',
    gradient: 'from-purple-500/20 to-purple-900/20',
    shadow: 'shadow-[0_0_15px_rgba(147,51,234,0.1)] group-hover:shadow-[0_0_25px_rgba(147,51,234,0.2)]'
  },
  {
    src: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80&w=2940',
    title: 'Racing Experience',
    category: 'Racing',
    gradient: 'from-blue-500/20 to-blue-900/20',
    shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]'
  },
  {
    src: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=2940',
    title: 'FPS Gaming',
    category: 'Action',
    gradient: 'from-red-500/20 to-red-900/20',
    shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.1)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]'
  },
  {
    src: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2940',
    title: 'Strategy Games',
    category: 'Strategy',
    gradient: 'from-green-500/20 to-green-900/20',
    shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]'
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
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-press-start-2p leading-relaxed"
        >
          <span className="text-white">High-End Gaming </span>
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-transparent bg-clip-text animate-gradient">Without</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-transparent bg-clip-text animate-gradient">The Hardware</span>
        </motion.h1>
        
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
          <motion.a 
            href="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 w-full sm:w-auto text-center
              shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 border border-purple-500/50"
          >
            Get Started
          </motion.a>
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
        <div className="flex flex-row justify-center -space-x-4 md:-space-x-8">
          {gamingCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="group relative w-64 md:w-72 hover:z-10 transition-all duration-300"
            >
              <div className={`bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 
                transition-all duration-300 ${card.shadow} hover:translate-y-[-5px] hover:bg-black/70`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                <div className="relative flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={card.src}
                      alt={card.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/30 text-purple-300 border border-purple-500/30">
                        {card.category}
                      </span>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                        className="h-6 w-6 rounded-full bg-purple-500/30 border border-purple-500/40 flex items-center justify-center"
                      >
                        <span className="text-xs font-bold text-purple-300">{index + 1}</span>
                      </motion.div>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors duration-300 line-clamp-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                      Experience the ultimate gaming setup with our cloud-based platform.
                    </p>
                    <motion.a
                      href="/stations"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
                        bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-500/50
                        transition-all duration-200 text-sm text-purple-300 hover:text-purple-200"
                    >
                      <span className="font-medium">Learn More</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 flex justify-center"
        >
          <motion.a
            href="/stations"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200
              shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 border border-purple-500/50 flex items-center gap-2"
          >
            <span>View All Stations</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
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