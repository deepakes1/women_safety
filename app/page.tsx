'use client';

import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaRocket } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-pink-200 via-purple-400 to-indigo-200'}`}>
      {/* Responsive Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              SafeHer
            </motion.h1>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full bg-purple-50 dark:bg-gray-800"
              >
                {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
              </motion.button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-800"
              >
                <FaBars className="text-xl" />
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          <motion.div 
            initial={false}
            animate={{ height: isMenuOpen ? 'auto' : 0 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="py-4 space-y-4">
              {['Home', 'Live Sharing', 'Safety Tips', 'Community', 'Contact'].map((item, index) => (
                <Link 
                  key={index}
                  href={item === 'Live Sharing' ? '/features/location-sharing' : '#'}
                  className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:text-gray-800">
                Empowering Women's Safety
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
                Your safety is our priority. Join our community for real-time location sharing, safety tips, and emergency assistance.
              </p>
              <Link href="/get-started">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <FaRocket className="text-xl sm:text-2xl" />
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
