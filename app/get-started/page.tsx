'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaBell, 
  FaMapMarkerAlt, 
  FaVideo, 
  FaPiggyBank, 
  FaRobot as FaAI,
  FaUsers,
  FaComments,
  FaHeart,
  FaMicrophone,
  FaGamepad,
  FaMobile,
  FaFileDownload,
  FaMoon,
  FaSun,
  FaBars
} from 'react-icons/fa';
import { useState } from 'react';

export default function GetStarted() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: 'Real-time Safety Alerts',
      description: 'Sends SMS notifications when suspicious activity is detected.',
      icon: <FaBell className="text-4xl text-white" />,
      color: 'from-red-500 to-red-600',
      link: '/features/safety-alerts'
    },
    {
      title: 'Live Location Sharing',
      description: 'Automatically shares user\'s location with emergency contacts.',
      icon: <FaMapMarkerAlt className="text-4xl text-white" />,
      color: 'from-blue-500 to-blue-600',
      link: '/features/location-sharing'
    },
    
    // {
    //   title: 'Video & Article Recommendations',
    //   description: 'Personalized content on safety, mental health, and financial security.',
    //   icon: <FaVideo className="text-4xl text-white" />,
    //   color: 'from-pink-500 to-pink-600',
    //   link: '/features/video-article'
    // },
    {
      title: 'Financial Safety Education',
      description: 'Teaches users about scams, frauds, and secure money management.',
      icon: <FaPiggyBank className="text-4xl text-white" />,
      color: 'from-yellow-500 to-yellow-600',
      link: '/features/Financial-safety'
    },
    {
      title: 'AI Virtual Assistant',
      description: 'A virtual assistant that speaks and interacts for instant help.',
      icon: <FaAI className="text-4xl text-white" />,
      color: 'from-cyan-500 to-cyan-600',
      link: 'https://woemn-safety-chatbot.vercel.app/'
    },
    {
      title: 'Workshops',
      description: 'Real-time expert sessions on mental health and safety awareness.',
      icon: <FaUsers className="text-4xl text-white" />,
      color: 'from-indigo-500 to-indigo-600',
      link: '/features/Workshop'
    },
    // {
    //   title: 'Counseling Chat Rooms',
    //   description: 'Anonymous spaces for users to seek emotional support from professionals.',
    //   icon: <FaComments className="text-4xl text-white" />,
    //   color: 'from-teal-500 to-teal-600'
    // },
    // {
    //   title: 'Mental Health Tracking',
    //   description: 'Users can log emotions and get personalized self-care suggestions.',
    //   icon: <FaHeart className="text-4xl text-white" />,
    //   color: 'from-rose-500 to-rose-600',
    //   link: '/features/mental-health'
    // },
    // {
    //   title: 'Audio Messaging',
    //   description: 'Record and send voice messages instead of typing.',
    //   icon: <FaMicrophone className="text-4xl text-white" />,
    //   color: 'from-orange-500 to-orange-600',
    //   link: '/features/audio-message'
    // },
    {
      title: 'Safety Games',
      description: 'Interactive learning about safety through fun activities.',
      icon: <FaGamepad className="text-4xl text-white" />,
      color: 'from-emerald-500 to-emerald-600',
      link: '/features/safety-games'
    },
    
    
    {
      title: 'Cross-platform Support',
      description: 'Available across multiple devices for wider reach.',
      icon: <FaMobile className="text-4xl text-white" />,
      color: 'from-fuchsia-500 to-fuchsia-600'
    },
    {
      title: 'Offline Resources',
      description: 'Important safety, legal, and mental health resources available offline.',
      icon: <FaFileDownload className="text-4xl text-white" />,
      color: 'from-lime-500 to-lime-600',
      link: '/features/offline-resources'
    }
  ];

  return (
    <main className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <motion.h1 
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
              >
                SafeHer
              </motion.h1>
            </Link>
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

      {/* Content */}
      <div className="pt-24 sm:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Features & Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 dark:text-gray-300 text-center mb-12 text-lg"
          >
            Explore our comprehensive safety and support features
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform`}></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className={`inline-block p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                  {feature.link ? (
                    <Link href={feature.link}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`mt-4 w-full bg-gradient-to-r ${feature.color} text-white py-2 px-4 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
                      >
                        Learn More
                      </motion.button>
                    </Link>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`mt-4 w-full bg-gradient-to-r ${feature.color} text-white py-2 px-4 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all`}
                    >
                      Learn More
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}



