import { BookingRequest, BookingResponse, BookingSlot } from '../types/booking';
import { format } from 'date-fns';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated available time slots (in a real app, this would come from the backend)
const generateAvailableSlots = (date: Date): BookingSlot[] => {
  const slots = Array.from({ length: 12 }, (_, i) => i + 9).map(time => ({
    time,
    // Randomly make some slots unavailable
    isAvailable: Math.random() > 0.3
  }));
  return slots;
};

export const bookingService = {
  async getAvailableSlots(date: Date): Promise<BookingSlot[]> {
    await delay(1000); // Simulate API call
    return generateAvailableSlots(date);
  },

  async createBooking(request: BookingRequest): Promise<BookingResponse> {
    await delay(1500); // Simulate API call

    // Simulate random success/failure
    const success = Math.random() > 0.2;

    if (success) {
      return {
        success: true,
        message: 'Booking confirmed successfully!',
        bookingId: Math.random().toString(36).substring(7),
      };
    } else {
      throw new Error('Unable to confirm booking. Please try again.');
    }
  }
}; 