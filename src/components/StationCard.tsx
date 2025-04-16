import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { MemoryStick, Gamepad2, Star } from 'lucide-react';
import OptimizedImage from './common/OptimizedImage';

interface StationProps {
  station: {
    id: number;
    name: string;
    image: string;
    specs: {
      ram: string;
      gpu: string;
      storage: string;
    };
    rating: number;
    status: 'available' | 'occupied';
  };
  onStationClick: (station: StationProps['station']) => void;
  index: number;
}

const StationCard = memo(({ station, onStationClick, index }: StationProps) => {
  return (
    <motion.div
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
      <div className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 
        transition-all duration-300 hover:translate-y-[-5px] hover:bg-black/70">
        <div className="relative flex flex-col">
          <div className="aspect-video overflow-hidden">
            <OptimizedImage
              src={station.image}
              alt={station.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/30 text-purple-300 border border-purple-500/30">
                {station.status}
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
              {station.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <MemoryStick className="w-4 h-4 text-purple-400" />
                <span className="text-sm">{station.specs.ram}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Gamepad2 className="w-4 h-4 text-purple-400" />
                <span className="text-sm">{station.specs.gpu}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-sm">{station.rating}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStationClick(station)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
                bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 hover:border-purple-500/50
                transition-all duration-200 text-sm text-purple-300 hover:text-purple-200
                disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={station.status === 'occupied'}
            >
              <span className="font-medium">{station.status === 'available' ? 'Book Now' : 'Occupied'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

StationCard.displayName = 'StationCard';

export default StationCard; 