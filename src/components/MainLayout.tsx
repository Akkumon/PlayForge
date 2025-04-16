import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chat from './chat/Chat';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0118] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/50 to-blue-900/20 pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Chat />
      </div>
    </div>
  );
}