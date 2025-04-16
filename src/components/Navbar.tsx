import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../lib/utils';
import Logo from './Logo';

const navItems = [
  { name: 'Home', href: '/#hero', isScroll: true },
  { name: 'Features', href: '/#features', isScroll: true },
  { name: 'Stations', href: '/stations', isScroll: false },
  { name: 'Pricing', href: '/#pricing', isScroll: true },
  { name: 'FAQ', href: '/#faq', isScroll: true },
] as const;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(() => navItems, []);

  const handleNavClick = useCallback(async (href: string, isScroll?: boolean) => {
    setMobileMenuOpen(false);
    
    if (isScroll) {
      if (location.pathname !== '/') {
        setIsNavigating(true);
        // If we're not on homepage and it's a scroll link, first navigate to home
        await navigate('/');
        // Use requestAnimationFrame for smoother scrolling after navigation
        requestAnimationFrame(() => {
          const sectionId = href.replace('/#', '');
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          setIsNavigating(false);
        });
      } else {
        // If we're on homepage and it's a scroll link, just scroll
        const sectionId = href.replace('/#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // For non-scroll links, just navigate
      setIsNavigating(true);
      await navigate(href);
      setIsNavigating(false);
    }
  }, [location.pathname, navigate]);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="fixed w-full backdrop-blur-lg bg-black/20 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center">
              <button 
                onClick={() => handleNavClick('/#hero', true)}
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                aria-label="Go to home page"
              >
                <Logo />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <AnimatePresence mode="wait">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.isScroll)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg px-2 py-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Go to ${item.name} section`}
                    disabled={isNavigating}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button 
                  onClick={() => navigate('/signup')}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Sign up"
                  disabled={isNavigating}
                >
                  Sign up
                </motion.button>
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-1"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ rotate: 90 }}
                      animate={{ rotate: 0 }}
                      exit={{ rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden relative z-50"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <motion.div 
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#0a0118] px-6 py-6 sm:max-w-sm">
              <AnimatePresence>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => handleNavClick('/#hero', true)}
                      className="flex items-center -m-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0118] rounded-lg"
                      aria-label="Go to home page"
                    >
                      <Logo />
                    </button>
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0118]"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close menu"
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        {navigationItems.map((item) => (
                          <motion.button
                            key={item.name}
                            onClick={() => handleNavClick(item.href, item.isScroll)}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#1E2537] w-full text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0118] disabled:opacity-50"
                            whileHover={{ x: 10 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Go to ${item.name} section`}
                            disabled={isNavigating}
                          >
                            {item.name}
                          </motion.button>
                        ))}
                      </div>
                      <div className="py-6">
                        <motion.button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            navigate('/signup');
                          }}
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-purple-600 hover:bg-purple-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0118] disabled:opacity-50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label="Sign up"
                          disabled={isNavigating}
                        >
                          Sign up
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  );
}