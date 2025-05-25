interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  return (
    <div className="bg-[#0E1221] rounded-2xl p-6 sm:p-8 border border-transparent hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{question}</h3>
      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{answer}</p>
    </div>
  );
};

const faqs = [
  {
    question: "How does PlayForge cloud gaming work?",
    answer: "PlayForge runs games on our powerful servers and streams the gameplay directly to your device. You control the game in real-time, while our hardware handles all the processing. This means you can play demanding games even on basic devices."
  },
  {
    question: "What internet speed do I need?",
    answer: "We recommend at least 15 Mbps for 720p gaming, 25 Mbps for 1080p, and 35 Mbps for 4K gaming. A wired ethernet connection provides the best experience, but a stable WiFi connection works well too."
  },
  {
    question: "Can I use my own game library?",
    answer: "Yes! PlayForge supports integration with major platforms like Steam, Epic Games Store, and more. You can play games you already own, or access our extensive library included with your subscription."
  },
  {
    question: "How do I book a gaming station?",
    answer: "Simply log in to your account, navigate to the Booking page, select your preferred date and time slot, choose an available station, and confirm your booking. You'll receive a confirmation email with all the details."
  },
  {
    question: "What happens if I need to cancel my booking?",
    answer: "You can cancel or reschedule your booking up to 2 hours before your session without any penalty. For cancellations less than 2 hours before your session, you'll be charged a small fee or lose the session from your monthly allocation."
  },
  {
    question: "Are there physical locations I can visit?",
    answer: "Yes! We have gaming lounges in select cities where you can experience our premium gaming stations in person. Check our Locations page to find the nearest PlayForge gaming center."
  }
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <span className="bg-[#1E2537] text-blue-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
          FAQ
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 sm:mt-4 leading-tight">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}; 