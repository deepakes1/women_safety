'use client';

import { motion } from 'framer-motion';
import { FaBell, FaUsers, FaMoon, FaSun, FaShieldAlt, FaRoute, FaUserFriends, FaLightbulb, FaHandshake, FaComments, FaMapMarkerAlt, FaBars, FaRocket } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100'}`}>
      {/* Responsive Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-gray-900/30">
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
                className="p-2 rounded-full bg-purple-100 dark:bg-gray-800"
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
              {['Home', 'Features', 'Safety Tips', 'Community', 'Contact'].map((item, index) => (
                <a 
                  key={index}
                  href="#"
                  className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Responsive Hero Section */}
      <section className="pt-24 sm:pt-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Safety, Our Priority
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
                Empowering women with advanced safety features and instant emergency response.
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden md:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {['Live Tracking', 'Emergency Alerts', 'Safe Routes', 'Community'].map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-purple-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl text-center"
                    >
                      <p className="font-semibold text-sm sm:text-base text-purple-600 dark:text-purple-400">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Responsive Features Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent dark:via-gray-800/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Safety Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                title: 'Real-time Protection',
                desc: 'Advanced location tracking and emergency alerts',
                icon: <FaShieldAlt className="text-4xl sm:text-5xl" />,
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                title: 'Smart Navigation',
                desc: 'AI-powered safe route recommendations',
                icon: <FaRoute className="text-4xl sm:text-5xl" />,
                color: 'from-purple-500 to-pink-500'
              },
              { 
                title: 'Community Network',
                desc: 'Connect with local safety groups',
                icon: <FaUserFriends className="text-4xl sm:text-5xl" />,
                color: 'from-green-500 to-emerald-500'
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                  <div className={`inline-block p-3 sm:p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-4 sm:mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Emergency Contacts Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Emergency Contacts
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                title: 'Police',
                number: '100',
                desc: '24/7 Emergency Response',
                icon: <FaShieldAlt className="text-3xl sm:text-4xl" />,
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                title: 'Women\'s Helpline',
                number: '1091',
                desc: 'Dedicated Support',
                icon: <FaUserFriends className="text-3xl sm:text-4xl" />,
                color: 'from-purple-500 to-pink-500'
              },
              { 
                title: 'Emergency Services',
                number: '112',
                desc: 'All Emergency Services',
                icon: <FaBell className="text-3xl sm:text-4xl" />,
                color: 'from-red-500 to-orange-500'
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                  <div className={`inline-block p-3 sm:p-4 rounded-xl bg-gradient-to-r ${contact.color} mb-4 sm:mb-6`}>
                    {contact.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">{contact.title}</h3>
                  <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">{contact.number}</p>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{contact.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Safety Tips Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:via-gray-800/30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Safety Tips & Guidelines
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: 'Travel Safety',
                tips: [
                  'Share your travel plans with trusted contacts',
                  'Stay in well-lit areas',
                  'Keep your phone charged and accessible'
                ],
                icon: <FaRoute className="text-3xl sm:text-4xl" />,
                color: 'from-orange-500 to-red-500'
              },
              {
                title: 'Personal Safety',
                tips: [
                  'Trust your instincts',
                  'Stay aware of your surroundings',
                  'Keep emergency contacts handy'
                ],
                icon: <FaShieldAlt className="text-3xl sm:text-4xl" />,
                color: 'from-green-500 to-emerald-500'
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                  <div className={`inline-block p-3 sm:p-4 rounded-xl bg-gradient-to-r ${section.color} mb-4 sm:mb-6`}>
                    {section.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{section.title}</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {section.tips.map((tip, tipIndex) => (
                      <motion.li
                        key={tipIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: tipIndex * 0.2 }}
                        className="flex items-center gap-3 text-sm sm:text-base text-gray-600 dark:text-gray-300"
                      >
                        <FaLightbulb className="text-yellow-500 flex-shrink-0" />
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Community Support Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Community Support
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Local Support Groups',
                desc: 'Connect with women in your area',
                icon: <FaUsers className="text-3xl sm:text-4xl" />,
                color: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Safety Workshops',
                desc: 'Learn self-defense and safety tips',
                icon: <FaHandshake className="text-3xl sm:text-4xl" />,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                title: 'Community Forums',
                desc: 'Share experiences and advice',
                icon: <FaComments className="text-3xl sm:text-4xl" />,
                color: 'from-green-500 to-emerald-500'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg">
                  <div className={`inline-block p-3 sm:p-4 rounded-xl bg-gradient-to-r ${item.color} mb-4 sm:mb-6`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">{item.desc}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Join Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Footer */}
      <footer className="py-8 sm:py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">SafeHer</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Empowering women with safety and support.</p>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Safety Tips', 'Emergency Contacts', 'Community'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Contact Us</h4>
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt />
                <span>123 Safety Street, City</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
