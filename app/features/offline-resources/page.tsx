'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaDownload, FaFileAlt, FaFilePdf, FaMoon, FaSun, FaBars, FaChild, FaFemale, FaBookOpen, FaHeartbeat } from 'react-icons/fa';

export default function OfflineResources() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: <FaBookOpen /> },
    { id: 'women', name: 'Women Safety', icon: <FaFemale /> },
    { id: 'children', name: 'Children Safety', icon: <FaChild /> },
    { id: 'health', name: 'Health & Wellbeing', icon: <FaHeartbeat /> }
  ];

  const resources = [
    {
      id: 1,
      title: "Women&apos;s Personal Safety Guide",
      description: "Comprehensive guide covering safety tips, risk assessment, and prevention strategies for women.",
      fileType: "PDF",
      fileSize: "2.4MB",
      category: "women",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "https://drive.google.com/file/d/16p2DMCoiKJ_qhIAA-lJ4SH0BCNUjS394/view"
    },
    {
      id: 2,
      title: "Child Safety Handbook",
      description: "Essential safety information for parents and caregivers to protect children from various threats.",
      fileType: "PDF",
      fileSize: "3.1MB",
      category: "children",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/child-safety-handbook.pdf"
    },
    {
      id: 3,
      title: "Emergency Response Checklist",
      description: "Step-by-step guide for responding to different emergency situations involving women and children.",
      fileType: "PDF",
      fileSize: "1.2MB",
      category: "women",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/emergency-response-checklist.pdf"
    },
    {
      id: 4,
      title: "Children&apos;s Internet Safety Guide",
      description: "Tips for keeping children safe online and protecting them from digital threats.",
      fileType: "PDF",
      fileSize: "2.8MB",
      category: "children",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/childrens-internet-safety-guide.pdf"
    },
    {
      id: 5,
      title: "Women&apos;s Health & Wellbeing",
      description: "Comprehensive resource covering essential health information and wellness practices for women.",
      fileType: "PDF",
      fileSize: "4.2MB",
      category: "health",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/womens-health-wellbeing.pdf"
    },
    {
      id: 6,
      title: "Child Development & Safety Milestones",
      description: "Guide to understanding child development stages and associated safety considerations.",
      fileType: "Document",
      fileSize: "1.8MB",
      category: "children",
      icon: <FaFileAlt className="text-blue-500" />,
      downloadUrl: "/resources/child-development-safety.docx"
    },
    {
      id: 7,
      title: "Self-Defense Techniques for Women",
      description: "Illustrated guide to basic self-defense moves that women can learn for protection.",
      fileType: "PDF",
      fileSize: "3.5MB",
      category: "women",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/self-defense-techniques-women.pdf"
    },
    {
      id: 8,
      title: "Teaching Children About Personal Safety",
      description: "Resource for parents on how to discuss personal safety with children without causing fear.",
      fileType: "PDF",
      fileSize: "2.1MB",
      category: "children",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/teaching-children-personal-safety.pdf"
    },
    {
      id: 9,
      title: "Mental Health Resources for Women",
      description: "Compilation of resources focusing on women&apos;s mental health and stress management.",
      fileType: "Document",
      fileSize: "2.7MB",
      category: "health",
      icon: <FaFileAlt className="text-blue-500" />,
      downloadUrl: "/resources/mental-health-resources-women.docx"
    },
    {
      id: 10,
      title: "Children&apos;s Health & Nutrition Guide",
      description: "Comprehensive guide on maintaining optimal health and nutrition for children of all ages.",
      fileType: "PDF",
      fileSize: "3.8MB",
      category: "health",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/childrens-health-nutrition.pdf"
    },
    {
      id: 11,
      title: "Domestic Violence: Recognition & Resources",
      description: "Information on recognizing signs of domestic abuse and resources for seeking help.",
      fileType: "PDF",
      fileSize: "1.9MB",
      category: "women",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/domestic-violence-resources.pdf"
    },
    {
      id: 12,
      title: "Child Abuse Prevention Guide",
      description: "Information for parents, teachers and caregivers on recognizing and preventing child abuse.",
      fileType: "PDF",
      fileSize: "2.5MB",
      category: "children",
      icon: <FaFilePdf className="text-red-500" />,
      downloadUrl: "/resources/child-abuse-prevention.pdf"
    }
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

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
              className="inline-block p-4 rounded-full bg-purple-500 mb-8"
            >
              <FaDownload className="text-4xl text-white" />
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Offline Resources
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Access and download important safety resources for women and children that you can use offline.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/70 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-gray-700 rounded-lg">
                      {resource.icon}
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                      {resource.fileType} • {resource.fileSize}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{resource.description}</p>
                  <a 
                    href={resource.downloadUrl}
                    download
                    className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    <FaDownload />
                    <span>Download</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Help Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 rounded-3xl mx-4 sm:mx-8 lg:mx-auto my-8 max-w-7xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Need More Resources?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            We regularly update our library of offline resources. Check back frequently or subscribe to our notification service to stay informed about new safety materials.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg font-medium shadow-lg hover:bg-purple-700 transition-colors"
            >
              Subscribe to Updates
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Request a Resource
            </motion.button>
          </div>
        </div>
      </section>
    </main>
  );
}
