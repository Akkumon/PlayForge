import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Calendar, Clock, X } from 'lucide-react';
import { format, addDays, startOfToday, isSameDay, isAfter, isBefore, addWeeks } from 'date-fns';
import { cn, formatTime, timeSlots } from '../lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const today = startOfToday();
  const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (!selectedDate || selectedTime === null) return;
    
    // Here you would typically make an API call to book the session
    console.log('Booking session for:', {
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: formatTime(selectedTime),
    });
    
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0E1221] rounded-2xl p-8 w-full max-w-2xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-white">
              Book Your Gaming Session
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-white">
              <X size={24} />
            </Dialog.Close>
          </div>

          <div className="space-y-8">
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
                    className={cn(
                      "p-4 rounded-lg text-center transition-colors",
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
                
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className={cn(
                        "p-3 rounded-lg text-center transition-colors",
                        selectedTime === time
                          ? "bg-blue-500 text-white"
                          : "bg-[#1E2537] text-gray-300 hover:bg-[#2A3447]"
                      )}
                    >
                      {formatTime(time)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Booking Button */}
            <div className="flex justify-end">
              <button
                onClick={handleBooking}
                disabled={!selectedDate || selectedTime === null}
                className={cn(
                  "px-6 py-3 rounded-lg font-medium transition-colors",
                  selectedDate && selectedTime !== null
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                )}
              >
                Book Session
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 