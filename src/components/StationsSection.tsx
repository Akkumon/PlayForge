import React, { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Calendar, X, ChevronLeft, ChevronRight as ChevronRightIcon, Clock, Check, MemoryStick, Gamepad2, Star, Save } from 'lucide-react';
import OptimizedImage from './common/OptimizedImage';
import { StationCardSkeleton } from './ui/Skeleton';
import { Link } from 'react-router-dom';

const BookingModal = React.lazy(() => import('./BookingModal'));

interface Station {
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
}

const stations: Station[] = [
  {
    id: 1,
    name: 'Pro Gaming Station Alpha',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071',
    specs: {
      ram: '32GB DDR5',
      gpu: 'RTX 4090',
      storage: '2TB NVMe',
    },
    rating: 4.9,
    status: 'available',
  },
  {
    id: 2,
    name: 'Elite Gaming Station Beta',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042',
    specs: {
      ram: '64GB DDR5',
      gpu: 'RTX 4080',
      storage: '4TB NVMe',
    },
    rating: 4.7,
    status: 'occupied',
  },
  {
    id: 3,
    name: 'Ultra Gaming Station Gamma',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2070',
    specs: {
      ram: '128GB DDR5',
      gpu: 'RTX 4090 Ti',
      storage: '8TB NVMe',
    },
    rating: 5.0,
    status: 'available',
  },
];

interface NotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

function SuccessNotification({ isVisible, onClose }: NotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-[60]">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="mt-6 flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-xl shadow-lg
              shadow-green-500/20 border border-green-400/20 backdrop-blur-sm"
            onAnimationComplete={() => {
              setTimeout(onClose, 3000);
            }}
          >
            <div className="bg-white/20 rounded-full p-1.5">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-lg font-medium">Booking Confirmed Successfully!</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationName: string;
  onBookingConfirmed: () => void;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dates = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    day: days[date.getDay()],
    date: date.getDate(),
    isSelected: i === 2, // Wednesday is selected by default
  };
});

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function StationsSection() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStationClick = (station: Station) => {
    if (station.status === 'available') {
      setSelectedStation(station);
      setIsModalOpen(true);
    }
  };

  const handleBookingConfirmed = () => {
    setShowSuccess(true);
    setIsModalOpen(false);
  };

  return (
    <section id="stations" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-purple-200/20 to-gray-100 dark:from-black dark:via-purple-900/20 dark:to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-700 dark:text-purple-400 font-medium mb-4"
          >
            Gaming Stations
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-press-start-2p leading-relaxed"
          >
            Premium Hardware At Your Fingertips
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 dark:text-gray-400 text-base sm:text-lg max-w-3xl mx-auto"
          >
            Choose from our selection of high-performance gaming stations, each equipped with top-tier
            components for the ultimate gaming experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {isLoading ? (
            <>
              <StationCardSkeleton />
              <StationCardSkeleton />
              <StationCardSkeleton />
            </>
          ) : (
            stations.map((station) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group bg-white dark:bg-[#0f1729] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-purple-600 dark:hover:border-purple-500/30 transition-all duration-300
                  hover:shadow-lg hover:shadow-gray-300/30 dark:hover:shadow-[0_0_30px_rgba(147,51,234,0.1)] focus-within:ring-2 focus-within:ring-purple-500"
                role="article"
                aria-label={`Gaming station: ${station.name}`}
              >
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        station.status === 'available' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}
                      role="status"
                      aria-label={`Station status: ${station.status}`}
                    >
                      {station.status}
                    </span>
                  </div>
                  <div className="h-48 sm:h-56">
                    <OptimizedImage
                      src={station.image}
                      alt={station.name}
                      width={600}
                      className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">{station.name}</h4>
                  <div className="text-sm text-gray-700 dark:text-gray-400 space-y-2">
                    <p className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-purple-600 dark:text-purple-400" />{station.specs.ram}</p>
                    <p className="flex items-center gap-2"><Gamepad2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />{station.specs.gpu}</p>
                    <p className="flex items-center gap-2"><Save className="w-4 h-4 text-purple-600 dark:text-purple-400" />{station.specs.storage}</p>
                    <p className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />{station.rating}</p>
                  </div>
                  <button
                    onClick={() => handleStationClick(station)}
                    disabled={station.status === 'occupied'}
                    className={`mt-6 w-full px-4 py-2 rounded-lg font-medium text-white transition-colors duration-200 
                      ${station.status === 'available' 
                        ? 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 border border-purple-500/50'
                        : 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
                      }`}
                  >
                    {station.status === 'available' ? 'Book Now' : 'Occupied'}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        {/* View All Stations Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            to="/stations"
            className="group inline-flex items-center justify-center gap-2 text-lg font-medium text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
          >
            View All Stations
            <ChevronRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <Suspense fallback={null}>
        {selectedStation && (
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            stationName={selectedStation.name}
            onBookingConfirmed={handleBookingConfirmed}
          />
        )}
      </Suspense>

      <SuccessNotification
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </section>
  );
}