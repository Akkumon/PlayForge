import { useState } from 'react';
import { BookingModal } from './BookingModal';

export const BookingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Book Your Gaming Session
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Choose your preferred date and time slot to start gaming. Our stations are available daily from 9 AM to 8 PM.
        </p>
      </div>

      <div className="bg-[#0E1221] rounded-2xl p-8 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-medium transition-colors"
          >
            Book a Session Now
          </button>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}; 