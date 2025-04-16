import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import StationsSection from '../components/StationsSection';
import GameLibrary from '../components/GameLibrary';
import HowItWorksSection from '../components/HowItWorksSection';
import PricingSection from '../components/PricingSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { FAQSection } from '../components/FAQSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-black dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      <AnimatePresence>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSection />
          
          {[
            { Component: FeaturesSection },
            { Component: StationsSection },
            { Component: GameLibrary },
            { Component: HowItWorksSection },
            { Component: PricingSection },
            { Component: TestimonialsSection },
            { Component: CTASection },
            { Component: FAQSection }
          ].map(({ Component }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Component />
            </motion.div>
          ))}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
} 