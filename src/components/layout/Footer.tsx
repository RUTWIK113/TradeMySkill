import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="/trademyskill logo.png" 
                  alt="Trade My Skill Logo" 
                  className="w-8 h-8"
                />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Trade My Skill
                </h3>
              </motion.div>
              <p className="text-gray-400">
                The global platform for peer-to-peer skill exchange. Learn anything from anyone, anywhere.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                {['How it Works', 'Browse Skills', 'Success Stories', 'Community', 'Help Center'].map((link) => (
                  <li key={link}>
                    <motion.a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Popular Categories</h4>
              <ul className="space-y-2">
                {['Technology', 'Languages', 'Design', 'Music', 'Business', 'Cooking'].map((category) => (
                  <li key={category}>
                    <motion.a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {category}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Stay Updated</h4>
              <p className="text-gray-400">
                Get the latest updates on new features and skill opportunities.
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="primary" className="w-full">
                    <Mail size={16} className="mr-2" />
                    Subscribe
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Trade My Skill. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
                whileHover={{ y: -2 }}
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Footer */}
      <footer className="w-full bg-white dark:bg-zinc-900 border-t text-center text-sm text-gray-600 dark:text-gray-400 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-1">
              <img 
                src="/trademyskill logo.png" 
                alt="Trade My Skill Logo" 
                className="w-6 h-6"
              />
              <p className="text-base font-medium">
                Trade My Skill – Built with ❤️ by <strong>Rutwik Nakkalla</strong> (IITM, Mechanical Engg)
              </p>
            </div>
            <p className="text-xs mb-3 text-gray-500 dark:text-gray-400">
              A platform to connect, learn, and grow through global peer-to-peer skill exchange.
            </p>

            {/* 🌐 Social Links */}
            <div className="flex justify-center gap-6 mt-2">
              <motion.a 
                href="https://github.com/RUTWIK113" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-black dark:hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/rutwik-nakkalla-113me27/" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
            </div>

            {/* 🛠 Friend Request Button */}
            <div className="mt-4">
              <motion.a 
                href="https://www.linkedin.com/in/rutwik-nakkalla-113me27/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition inline-block text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Friend Request
              </motion.a>
            </div>


            {/* 🎯 Skill Glimpses */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left text-sm">
              <motion.div 
                className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                🎨 UI/UX Design – by Sarah (Canada)
              </motion.div>
              <motion.div 
                className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                🧮 DSA in Python – by Ahmed (Egypt)
              </motion.div>
              <motion.div 
                className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                📈 Freelancing 101 – by Meena (India)
              </motion.div>
              <motion.div 
                className="bg-gray-100 dark:bg-zinc-800 p-3 rounded-xl"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                🧠 AI Prompting – by Alex (USA)
              </motion.div>
            </div>

            {/* 🛡 Legal + Badge */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <motion.a 
                href="/privacy" 
                className="hover:underline transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="/terms" 
                className="hover:underline transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Terms
              </motion.a>
              <motion.span 
                className="text-xs text-green-600 font-medium flex items-center space-x-1"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>🇮🇳</span>
                <span>Made in India</span>
              </motion.span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};
