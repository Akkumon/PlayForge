import React from 'react';
import { ChevronRight } from 'lucide-react';
import GameStationCard from './GameStationCard';

const stations = [
  {
    id: 'station-1',
    name: 'Nebula X1',
    image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&q=80&w=2940',
    location: 'New York',
    rating: 4.9,
    reviews: 124,
    status: 'Available' as const,
    specs: {
      cpu: { label: 'CPU', value: 'AMD Ryzen 9 5900X' },
      gpu: { label: 'GPU', value: 'NVIDIA RTX 3080' },
      ram: { label: 'RAM', value: '32GB DDR4' },
      storage: { label: 'Storage', value: '2TB NVMe SSD' },
    },
    features: ['4K Gaming', 'Ray Tracing', 'Premium Audio'],
    extraFeatures: 1,
  },
  {
    id: 'station-2',
    name: 'Quantum Pro',
    image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=2940',
    location: 'Los Angeles',
    rating: 5.0,
    reviews: 89,
    status: 'Available' as const,
    specs: {
      cpu: { label: 'CPU', value: 'Intel i9-12900K' },
      gpu: { label: 'GPU', value: 'NVIDIA RTX 3090' },
      ram: { label: 'RAM', value: '64GB DDR5' },
      storage: { label: 'Storage', value: '4TB NVMe SSD' },
    },
    features: ['8K Gaming', 'Ray Tracing', 'Premium Audio'],
    extraFeatures: 2,
  },
  {
    id: 'station-3',
    name: 'Fusion Elite',
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&q=80&w=2940',
    location: 'Chicago',
    rating: 4.8,
    reviews: 56,
    status: 'Under Maintenance' as const,
    specs: {
      cpu: { label: 'CPU', value: 'AMD Threadripper Pro' },
      gpu: { label: 'GPU', value: 'NVIDIA RTX 3080 Ti' },
      ram: { label: 'RAM', value: '128GB DDR5' },
      storage: { label: 'Storage', value: '8TB NVMe SSD' },
    },
    features: ['4K Gaming', 'Ray Tracing', 'Premium Audio'],
    extraFeatures: 2,
  },
];

export default function StationsSection() {
  return (
    <section id="stations" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-purple-400 font-medium mb-4">Gaming Stations</h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-press-start-2p text-3xl sm:text-4xl md:text-4xl leading-relaxed">
            Premium Hardware At Your Fingertips
          </h3>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Choose from our selection of high-performance gaming stations, each equipped with top-tier
            components for the ultimate gaming experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {stations.map((station) => (
            <GameStationCard key={station.id} {...station} />
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
            View All Stations
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}