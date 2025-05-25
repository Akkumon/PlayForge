import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import Chat from './chat/Chat';
import SubtleAnimatedPattern from './SubtleAnimatedPattern';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Subtle Animated Background */}
      <SubtleAnimatedPattern />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chat />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}