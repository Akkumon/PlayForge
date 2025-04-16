import React from 'react';
import { Cloud, Zap, Sliders, Smartphone, Library, Save, Monitor } from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: 'Cloud Gaming',
    description: 'Play AAA titles without expensive hardware. Our cloud servers handle the processing, you enjoy the gameplay.',
    bgColor: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Experience gaming at its best with our top-tier hardware configurations, delivering smooth gameplay and stunning visuals.',
    bgColor: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    icon: Sliders,
    title: 'Flexible Plans',
    description: 'Choose the plan that fits your gaming style, from casual weekend sessions to hardcore daily gaming marathons.',
    bgColor: 'bg-pink-500/10',
    iconColor: 'text-pink-500',
  },
  {
    icon: Library,
    title: 'Extensive Game Library',
    description: 'Access hundreds of popular titles across all genres, from the latest releases to timeless classics.',
    bgColor: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
  },
  {
    icon: Save,
    title: 'Save Your Progress',
    description: 'Your game progress is safely stored in the cloud, allowing you to continue your adventures from any station.',
    bgColor: 'bg-green-500/10',
    iconColor: 'text-green-500',
  },
  {
    icon: Monitor,
    title: 'Premium Peripherals',
    description: 'Enjoy gaming with high-end keyboards, mice, headsets, and controllers for the ultimate gaming experience.',
    bgColor: 'bg-teal-500/10',
    iconColor: 'text-teal-500',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-purple-400 font-medium mb-4">Features</h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-press-start-2p text-3xl sm:text-4xl md:text-4xl leading-relaxed">
            Everything You Need For Premium Gaming
          </h3>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            PlayForge provides a complete cloud gaming solution with high-performance hardware,
            extensive game library, and flexible subscription plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#0f1729] backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
            >
              <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}