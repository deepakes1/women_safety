'use client';

import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaRocket, FaBell, FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';
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
                Empowering Women&apos;s Safety
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
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative w-full h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                <div className="relative w-full max-w-2xl mx-auto">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        title: "Safe & Secure",
                        description: "24/7 protection",
                        icon: <FaBell className="text-4xl text-white" />,
                        color: "from-red-500 to-red-600"
                      },
                      {
                        title: "Live Tracking",
                        description: "Real-time location",
                        icon: <FaMapMarkerAlt className="text-4xl text-white" />,
                        color: "from-blue-500 to-blue-600"
                      },
                      {
                        title: "Community",
                        description: "Support network",
                        icon: <FaUsers className="text-4xl text-white" />,
                        color: "from-indigo-500 to-indigo-600"
                      },
                      {
                        title: "Emergency",
                        description: "Quick response",
                        icon: <FaHeart className="text-4xl text-white" />,
                        color: "from-rose-500 to-rose-600"
                      }
                    ].map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform`}></div>
                        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                          <div className={`inline-block p-4 rounded-xl bg-gradient-to-r ${card.color} mb-4`}>
                            {card.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-2 dark:text-white">{card.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{card.description}</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`mt-4 w-full bg-gradient-to-r ${card.color} text-white py-2 px-4 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
                          >
                            Learn More
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover how SafeHer keeps you protected with our innovative safety features
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Location Sharing',
                description: 'Share your location with trusted contacts in real-time',
                icon: '📍'
              },
              {
                title: 'Emergency SOS',
                description: 'Quick access to emergency services with one tap',
                icon: '🚨'
              },
              {
                title: 'Safety Network',
                description: 'Build your personal safety network of trusted contacts',
                icon: '👥'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-6 rounded-xl bg-purple-50 dark:bg-gray-900 hover:shadow-lg transition-shadow border border-purple-100 dark:border-gray-800"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Safety Tips
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Essential safety tips to keep you protected in various situations
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Travel Safety',
                tips: [
                  'Share your travel plans with trusted contacts',
                  'Keep emergency numbers handy',
                  'Stay aware of your surroundings'
                ]
              },
              {
                title: 'Digital Safety',
                tips: [
                  'Use strong, unique passwords',
                  'Enable two-factor authentication',
                  'Be cautious with location sharing'
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{category.title}</h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join Our Community
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with other women, share experiences, and support each other
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Why Join?</h3>
              <ul className="space-y-3">
                {[
                  'Share your experiences and learn from others',
                  'Get support from a community that understands',
                  'Participate in safety workshops and events',
                  'Access exclusive resources and guides'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 dark:text-purple-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-purple-50 dark:bg-gray-900 p-8 rounded-xl border border-purple-100 dark:border-gray-800"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Join Today</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Become part of our growing community and make a difference
              </p>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:from-purple-700 hover:to-pink-700">
                Sign Up Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions or need support? We're here to help
            </p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  message: formData.get('message'),
                };

                try {
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });

                  if (response.ok) {
                    alert('Message sent successfully!');
                    e.currentTarget.reset();
                  } else {
                    const error = await response.json();
                    alert(error.error || 'Failed to send message');
                  }
                } catch (error) {
                  alert('Failed to send message. Please try again.');
                }
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                  rows={4}
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover:from-purple-700 hover:to-pink-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
