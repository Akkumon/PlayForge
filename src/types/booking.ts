export interface BookingSlot {
  time: number;
  isAvailable: boolean;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  error?: string;
}

export interface BookingRequest {
  stationId: string;
  date: string;
  time: number;
} 