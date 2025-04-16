import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, Clock, X, Loader2, Check, AlertCircle } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { format, addDays, startOfToday, isSameDay, isBefore } from 'date-fns';
import { cn, formatTime } from '../lib/utils';
import { bookingService } from '../services/bookingService';
import { BookingSlot } from '../types/booking';

interface Spec {
  label: string;
  value: string;
}

interface GameStationProps {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  status: 'Available' | 'Under Maintenance';
  specs: {
    cpu: Spec;
    gpu: Spec;
    ram: Spec;
    storage: Spec;
  };
  features: string[];
  extraFeatures: number;
}

export default function GameStationCard({
  id,
  name,
  image,
  location,
  rating,
  reviews,
  status,
  specs,
  features,
  extraFeatures,
}: GameStationProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  const statusColors = {
    Available: 'bg-green-500',
    'Under Maintenance': 'bg-orange-500',
  };

  const today = startOfToday();
  const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadAvailableSlots = async (date: Date) => {
    setIsLoadingSlots(true);
    setSelectedTime(null);
    try {
      const slots = await bookingService.getAvailableSlots(date);
      setAvailableSlots(slots);
    } catch (error) {
      setBookingStatus({
        type: 'error',
        message: 'Failed to load available time slots. Please try again.',
      });
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setBookingStatus({ type: null, message: null });
  };

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    setBookingStatus({ type: null, message: null });
  };

  const handleBooking = async () => {
    if (!selectedDate || selectedTime === null) return;

    setIsBooking(true);
    setBookingStatus({ type: null, message: null });

    try {
      const response = await bookingService.createBooking({
        stationId: id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
      });

      setBookingStatus({
        type: 'success',
        message: response.message,
      });

      // Close modal after success message
      setTimeout(() => {
        setIsBookingOpen(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setBookingStatus({ type: null, message: null });
      }, 2000);

    } catch (error) {
      setBookingStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    } finally {
      setIsBooking(false);
    }
  };

  const resetBookingState = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStatus({ type: null, message: null });
  };

  return (
    <>
      <div className="bg-[#0f1729]/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300">
        <div className="relative h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className={`absolute top-4 right-4 ${statusColors[status]} text-white text-sm px-3 py-1 rounded-full flex items-center gap-2`}>
            <div className="w-2 h-2 rounded-full bg-white" />
            {status}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-white font-medium">{rating}</span>
              <span className="text-gray-400 text-sm ml-1">({reviews})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(specs).map(([key, spec]) => (
              <div key={key} className="bg-black/30 rounded-lg p-3">
                <div className="text-gray-400 text-xs uppercase mb-1">{spec.label}</div>
                <div className="text-white text-sm font-medium truncate">{spec.value}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {features.map((feature) => (
              <span
                key={feature}
                className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {extraFeatures > 0 && (
              <span className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full">
                +{extraFeatures} more
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2 rounded-lg transition-colors duration-200">
              View Details
            </button>
            <button 
              onClick={() => {
                setIsBookingOpen(true);
                resetBookingState();
              }}
              disabled={status !== 'Available'}
              className={cn(
                "flex-1 font-medium py-2 rounded-lg transition-colors duration-200",
                status === 'Available' 
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              )}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <Dialog.Root open={isBookingOpen} onOpenChange={(open) => {
        setIsBookingOpen(open);
        if (!open) resetBookingState();
      }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0E1221] rounded-2xl p-8 w-full max-w-2xl shadow-xl z-[60]">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-2xl font-bold text-white">
                Book {name}
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </Dialog.Close>
            </div>

            <div className="space-y-8">
              {/* Status Messages */}
              {bookingStatus.message && (
                <div className={cn(
                  "p-4 rounded-lg flex items-center gap-2",
                  bookingStatus.type === 'success' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                )}>
                  {bookingStatus.type === 'success' ? (
                    <Check size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                  {bookingStatus.message}
                </div>
              )}

              {/* Date Selection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-blue-400" size={20} />
                  <h3 className="text-lg font-semibold text-white">Select Date & Time</h3>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((date, i) => (
                    <button
                      key={i}
                      onClick={() => handleDateSelect(date)}
                      disabled={isBefore(date, today)}
                      className={cn(
                        "p-4 rounded-lg text-center transition-colors",
                        isBefore(date, today) && "opacity-50 cursor-not-allowed",
                        selectedDate && isSameDay(date, selectedDate)
                          ? "bg-blue-500 text-white"
                          : "bg-[#1E2537] text-gray-300 hover:bg-[#2A3447]"
                      )}
                    >
                      <div className="text-sm mb-1">{format(date, 'EEE')}</div>
                      <div className="text-lg font-semibold">{format(date, 'd')}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="text-blue-400" size={20} />
                    <h3 className="text-lg font-semibold text-white">Select Time Slot</h3>
                  </div>
                  
                  {isLoadingSlots ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-3">
                      {availableSlots.map(({ time, isAvailable }) => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          disabled={!isAvailable}
                          className={cn(
                            "p-3 rounded-lg text-center transition-colors",
                            !isAvailable && "opacity-50 cursor-not-allowed",
                            selectedTime === time
                              ? "bg-blue-500 text-white"
                              : "bg-[#1E2537] text-gray-300 hover:bg-[#2A3447]"
                          )}
                        >
                          {formatTime(time)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Booking Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || selectedTime === null || isBooking}
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2",
                    selectedDate && selectedTime !== null && !isBooking
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                  )}
                >
                  {isBooking && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isBooking ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}