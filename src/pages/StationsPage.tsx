import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import StationsSection from '../components/StationsSection';
import Footer from '../components/Footer';

export default function StationsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-20"
      >
        <StationsSection />
      </motion.main>
      <Footer />
    </div>
  );
} 