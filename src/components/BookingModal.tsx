import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Check } from 'lucide-react';

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
    isSelected: i === 2,
  };
});

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function BookingModal({ isOpen, onClose, stationName, onBookingConfirmed }: BookingModalProps) {
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
    onBookingConfirmed();
  };

  return (
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
  );
} 