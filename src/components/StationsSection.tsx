import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Calendar, X, ChevronLeft, ChevronRight as ChevronRightIcon, Clock, Check } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  status: 'Available' | 'Under Maintenance';
  image: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  features: string[];
}

const stations: Station[] = [
  {
    id: '1',
    name: 'Nebula X1',
    location: 'New York',
    rating: 4.9,
    reviews: 124,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&q=80&w=2942',
    specs: {
      cpu: 'AMD Ryzen 9 5900X',
      gpu: 'NVIDIA RTX 3080',
      ram: '32GB DDR4',
      storage: '2TB NVMe SSD',
    },
    features: ['4K Gaming', 'Ray Tracing', 'Premium Audio'],
  },
  {
    id: '2',
    name: 'Quantum Pro',
    location: 'Los Angeles',
    rating: 5.0,
    reviews: 89,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&q=80&w=2940',
    specs: {
      cpu: 'Intel i9-12900K',
      gpu: 'NVIDIA RTX 3090',
      ram: '64GB DDR5',
      storage: '4TB NVMe SSD',
    },
    features: ['8K Gaming', 'Ray Tracing', 'Premium Audio'],
  },
  {
    id: '3',
    name: 'Fusion Elite',
    location: 'Chicago',
    rating: 4.8,
    reviews: 56,
    status: 'Under Maintenance',
    image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=2949',
    specs: {
      cpu: 'AMD Threadripper',
      gpu: 'NVIDIA RTX 3080 Ti',
      ram: '128GB DDR5',
      storage: '8TB NVMe SSD',
    },
    features: ['4K Gaming', 'Ray Tracing', 'Premium Audio'],
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

function BookingModal({ isOpen, onClose, stationName }: BookingModalProps) {
  const [step, setStep] = useState<'date' | 'time' | 'confirmation'>('date');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('confirmation');
  };

  const handleConfirm = () => {
    setShowSuccess(true);
    onClose();
    setStep('date');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={onClose}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-xl bg-[#0f1729] rounded-2xl shadow-2xl overflow-hidden
                  shadow-[0_0_50px_rgba(147,51,234,0.3)] border border-purple-500/20 mx-4"
                style={{
                  background: 'linear-gradient(180deg, rgba(15,23,41,1) 0%, rgba(17,24,39,1) 100%)',
                }}
              >
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Book Your Gaming Session</h2>
                    <p className="text-gray-400">{stationName}</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 'date' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-2 text-purple-400 justify-center">
                          <Calendar className="w-5 h-5" />
                          <span className="font-medium">Select Date & Time</span>
                        </div>

                        <div className="flex items-center justify-center gap-1">
                          {dates.map((item, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDateSelect(item.date)}
                              className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                item.isSelected
                                  ? 'bg-purple-600 text-white'
                                  : 'hover:bg-white/5 text-gray-400'
                              }`}
                            >
                              <span className="text-sm font-medium">{item.day}</span>
                              <span className={`text-lg font-medium ${item.isSelected ? 'text-white' : ''}`}>
                                {item.date}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="text-center text-gray-400 text-sm">
                          Please select a date to view available time slots
                        </div>
                      </motion.div>
                    )}

                    {step === 'time' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                      >
                        <div className="flex items-center gap-2 text-purple-400 justify-center">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">Select Time Slot</span>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          {timeSlots.map((time, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleTimeSelect(time)}
                              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-purple-600 text-gray-400 hover:text-white transition-all duration-200"
                            >
                              {time}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 'confirmation' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6 text-center"
                      >
                        <div className="space-y-2">
                          <p className="text-gray-400">You're about to book</p>
                          <p className="text-xl font-bold text-white">{stationName}</p>
                          <p className="text-purple-400">
                            {selectedDate} {days[new Date().getDay()]} at {selectedTime}
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleConfirm}
                          className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                          Confirm Booking
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {step !== 'date' && (
                    <button
                      onClick={() => setStep(step === 'confirmation' ? 'time' : 'date')}
                      className="mt-4 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      ← Go Back
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      <SuccessNotification 
        isVisible={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </>
  );
}

export default function StationsSection() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  return (
    <section id="stations" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-purple-400 font-medium mb-4">Gaming Stations</h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-press-start-2p text-3xl sm:text-4xl md:text-4xl leading-relaxed">
            Premium Hardware At Your Fingertips
          </h3>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Choose from our selection of high-performance gaming stations, each equipped with top-tier
            components for the ultimate gaming experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stations.map((station) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group bg-[#0f1729] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    station.status === 'Available' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {station.status}
                  </span>
                </div>
                <div className="h-48">
                  <img
                    src={station.image}
                    alt={station.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] to-transparent" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {station.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-white">{station.rating}</span>
                    <span className="text-gray-400">({station.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{station.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">CPU</div>
                    <div className="text-white text-sm font-medium">{station.specs.cpu}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">GPU</div>
                    <div className="text-white text-sm font-medium">{station.specs.gpu}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">RAM</div>
                    <div className="text-white text-sm font-medium">{station.specs.ram}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-gray-400 text-sm">Storage</div>
                    <div className="text-white text-sm font-medium">{station.specs.storage}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {station.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 rounded-lg text-gray-300 text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-white/5 rounded-lg text-gray-300 text-xs">
                    +{station.features.length - 3} more
                  </span>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => station.status === 'Available' && setSelectedStation(station.name)}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      station.status === 'Available'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={station.status !== 'Available'}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
            View All Stations
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={!!selectedStation}
        onClose={() => setSelectedStation(null)}
        stationName={selectedStation || ''}
      />
    </section>
  );
}