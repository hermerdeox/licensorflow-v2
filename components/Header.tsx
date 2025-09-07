"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, Calendar } from 'lucide-react';
import { useGlobalErrorHandler } from './GlobalErrorBoundary';
import { safeRender } from '@/lib/safe-async';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const handleError = useGlobalErrorHandler();

  // Prevent hydration mismatch by only showing interactive elements after mount
  useEffect(() => {
    try {
      setIsMounted(true);
    } catch (error) {
      handleError(error as Error, { component: 'Header', action: 'useEffect' });
    }
  }, [handleError]);

  const navigation = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Courses', href: '/courses' },
    { name: 'License Vault', href: '/license-vault' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return safeRender(
    () => (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center h-16 flex-shrink-0">
            <img
              src="/licensor-flow-logo.png"
              alt="LicensorFlow"
              className="h-14 w-auto max-h-14 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              style={{ maxWidth: '220px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/portal">
              {isMounted ? (
                <motion.button
                  className="px-4 py-2 bg-transparent border border-blue-500/50 text-white font-medium rounded-lg hover:bg-blue-600/10 hover:border-blue-500 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn className="w-4 h-4" />
                  Access Portal
                </motion.button>
              ) : (
                <button className="px-4 py-2 bg-transparent border border-blue-500/50 text-white font-medium rounded-lg hover:bg-blue-600/10 hover:border-blue-500 transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Access Portal
                </button>
              )}
            </Link>
            
            <Link href="/demo">
              {isMounted ? (
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-4 h-4" />
                  Schedule Demo
                </motion.button>
              ) : (
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Demo
                </button>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {isMounted ? (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            ) : (
              <div className="p-2">
                <Menu className="w-6 h-6 text-gray-300" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMounted && (
          <AnimatePresence>
            {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-800/50"
            >
              <div className="py-4 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 border-t border-gray-800/50 space-y-3">
                  <Link href="/portal" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-4 py-2 bg-transparent border border-blue-500/50 text-white font-medium rounded-lg hover:bg-blue-600/10 transition-all duration-300 flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Access Portal
                    </button>
                  </Link>
                  
                  <Link href="/demo" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Demo
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
    ),
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50 h-16 flex items-center justify-center">
      <div className="text-white text-sm">Loading navigation...</div>
    </div>,
    { component: 'Header', action: 'render' }
  );
}
