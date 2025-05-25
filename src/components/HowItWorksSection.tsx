import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Choose Your Plan',
    description: 'Select a subscription plan that fits your gaming needs and budget.',
    bgColor: 'bg-blue-600',
  },
  {
    number: '02',
    title: 'Book A Station',
    description: 'Reserve your preferred gaming station at your convenient time.',
    bgColor: 'bg-purple-600',
  },
  {
    number: '03',
    title: 'Play & Enjoy',
    description: 'Connect to your station and start playing your favorite games instantly.',
    bgColor: 'bg-violet-600',
  },
] as const;

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-purple-400 font-medium mb-2 sm:mb-4 text-sm sm:text-base">How It Works</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-press-start-2p leading-tight">
            Start Gaming In Three Simple Steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#0f1729]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className={`${step.bgColor} w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6`}>
                {step.number}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-3">{step.title}</h4>
              <p className="text-gray-400 text-sm sm:text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}