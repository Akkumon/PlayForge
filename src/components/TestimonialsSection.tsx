import { Star } from 'lucide-react';

interface TestimonialCardProps {
  rating: number;
  text: string;
  name: string;
  role: string;
  imageUrl: string;
}

const TestimonialCard = ({ rating, text, name, role, imageUrl }: TestimonialCardProps) => {
  return (
    <div className="bg-[#0E1221] rounded-2xl p-8 flex flex-col gap-4 border border-transparent hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={`${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
          />
        ))}
      </div>
      <p className="text-gray-300 text-lg">{text}</p>
      <div className="flex items-center gap-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const testimonials = [
  {
    rating: 5,
    text: "PlayForge has completely changed how I game. I can play the latest titles without investing in expensive hardware. The streaming quality is incredible!",
    name: "Alex Johnson",
    role: "Casual Gamer",
    imageUrl: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&q=80&w=150"
  },
  {
    rating: 4,
    text: "As someone who competes in tournaments, I was skeptical about cloud gaming. But PlayForge's zero-lag experience and high-end peripherals have made me a convert.",
    name: "Samantha Lee",
    role: "Competitive Gamer",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    rating: 4,
    text: "The Basic plan is perfect for my budget as a student. I get to play great games without breaking the bank. The booking system is super convenient too.",
    name: "Marcus Chen",
    role: "Student",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
  },
  {
    rating: 5,
    text: "I don't have time to maintain a gaming PC. PlayForge lets me jump into gaming sessions whenever I have free time. The Pro plan is absolutely worth it.",
    name: "Priya Sharma",
    role: "Working Professional",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="bg-[#1E2537] text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
          Testimonials
        </span>
        <h2 className="text-4xl font-bold text-white mt-4 font-press-start-2p text-3xl sm:text-4xl leading-relaxed">
          What Our Gamers Say
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}; 