'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaMoneyBillWave, FaMoon, FaSun, FaBars, FaShieldAlt, FaChartLine, FaLock, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function FinancialSafety() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const features = [
    {
      title: 'Scam Prevention',
      description: 'Learn to identify and avoid common financial scams and frauds.',
      icon: <FaExclamationTriangle className="text-3xl" />,
      details: {
        title: 'Common Financial Scams',
        points: [
          'Phishing emails and messages pretending to be from banks',
          'Investment scams promising unrealistic returns',
          'Romance scams targeting vulnerable individuals',
          'Lottery and prize scams asking for upfront payments',
          'Tech support scams requesting remote access to your computer'
        ],
        tips: [
          'Never share personal or financial information via email or phone',
          'Verify the identity of anyone requesting money or information',
          'Be skeptical of unsolicited investment opportunities',
          'Use strong, unique passwords for all financial accounts',
          'Enable two-factor authentication whenever possible'
        ]
      }
    },
    {
      title: 'Secure Banking',
      description: 'Best practices for online banking and secure transactions.',
      icon: <FaLock className="text-3xl" />,
      details: {
        title: 'Banking Security Tips',
        points: [
          'Always use secure networks for online banking',
          'Avoid public Wi-Fi for financial transactions',
          'Keep banking apps updated regularly',
          'Use biometric authentication when available',
          'Monitor account activity for suspicious transactions'
        ],
        tips: [
          'Set up transaction alerts for all accounts',
          'Regularly review bank statements',
          'Use virtual cards for online shopping',
          'Enable location-based security features',
          'Keep your devices protected with security software'
        ]
      }
    },
    {
      title: 'Money Management',
      description: 'Tools and tips for effective financial planning and budgeting.',
      icon: <FaChartLine className="text-3xl" />,
      details: {
        title: 'Financial Planning Guide',
        points: [
          'Create and maintain a monthly budget',
          'Build an emergency fund (3-6 months of expenses)',
          'Track your spending habits',
          'Set financial goals and milestones',
          'Review and adjust your financial plan regularly'
        ],
        tips: [
          'Use budgeting apps to track expenses',
          'Automate savings and bill payments',
          'Diversify your investments',
          'Review your credit report annually',
          'Plan for major life events in advance'
        ]
      }
    },
    {
      title: 'Financial Protection',
      description: 'Strategies to protect your assets and personal information.',
      icon: <FaShieldAlt className="text-3xl" />,
      details: {
        title: 'Asset Protection Strategies',
        points: [
          'Use secure payment methods for online transactions',
          'Keep important documents in a safe place',
          'Regularly update your security settings',
          'Be cautious with sharing financial information',
          'Use credit monitoring services'
        ],
        tips: [
          'Freeze your credit when not in use',
          'Use password managers for secure credentials',
          'Enable fraud alerts on all accounts',
          'Keep backup copies of important documents',
          'Regularly review your insurance coverage'
        ]
      }
    }
  ];

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  const handleCloseDetails = () => {
    setSelectedCard(null);
  };

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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block p-4 rounded-full bg-green-500 mb-8"
            >
              <FaMoneyBillWave className="text-4xl text-white" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Financial Safety Education
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Learn how to protect yourself from financial scams, manage your money securely, and make informed financial decisions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                  <div className="text-purple-600 dark:text-purple-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information Modal */}
      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleCloseDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-purple-600 dark:text-purple-400">
                  {features[selectedCard].icon}
                </div>
                <button
                  onClick={handleCloseDetails}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                {features[selectedCard].details.title}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Key Points</h3>
                  <ul className="space-y-2">
                    {features[selectedCard].details.points.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-white">Safety Tips</h3>
                  <ul className="space-y-2">
                    {features[selectedCard].details.tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-green-500">✓</span>
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Financial Safety Steps
          </h2>
          <div className="space-y-8">
            {[
              {
                step: '01',
                title: 'Recognize Scams',
                description: 'Learn to identify common financial scams and fraud tactics.'
              },
              {
                step: '02',
                title: 'Secure Accounts',
                description: 'Implement strong security measures for your financial accounts.'
              },
              {
                step: '03',
                title: 'Smart Budgeting',
                description: 'Create and maintain a secure financial plan for your future.'
              },
              {
                step: '04',
                title: 'Stay Protected',
                description: 'Regularly update your knowledge and security practices.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
