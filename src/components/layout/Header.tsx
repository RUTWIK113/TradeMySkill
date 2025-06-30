import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Bell, MessageSquare, Search, UserPlus } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { AuthModal } from '../ui/AuthModal';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { currentPage, setCurrentPage, isAuthenticated, user, logout, login } = useApp();

  const navigation = [
    { name: 'Home', id: 'landing' },
    { name: 'Explore', id: 'explore' },
    { name: 'How it Works', id: 'how-it-works' },
    { name: 'Community', id: 'community' },
  ];

  const dashboardNavigation = [
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'Explore', id: 'explore' },
    { name: 'Schedule', id: 'schedule' },
    { name: 'Messages', id: 'chat' },
    { name: 'Friends', id: 'friends' },
  ];

  const activeNavigation = isAuthenticated ? dashboardNavigation : navigation;

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div
                className="flex items-center space-x-2 md:space-x-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setCurrentPage(isAuthenticated ? 'dashboard' : 'landing')}
              >
                <img 
                  src="/trademyskill logo.png" 
                  alt="Trade My Skill Logo" 
                  className="w-6 md:w-8 h-6 md:h-8"
                />
                <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Trade My Skill
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8">
              {activeNavigation.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.id
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {isAuthenticated && (
                <>
                  <motion.button 
                    className="p-1.5 md:p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search size={18} md:size={20} />
                  </motion.button>
                  
                  <motion.button 
                    className="p-1.5 md:p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bell size={18} md:size={20} />
                    <motion.span 
                      className="absolute -top-1 -right-1 w-2.5 md:w-3 h-2.5 md:h-3 bg-accent-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => setCurrentPage('chat')}
                    className="p-1.5 md:p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageSquare size={18} md:size={20} />
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => setCurrentPage('friends')}
                    className="p-1.5 md:p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <UserPlus size={18} md:size={20} />
                  </motion.button>
                </>
              )}
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-1.5 md:p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'light' ? <Moon size={18} md:size={20} /> : <Sun size={18} md:size={20} />}
              </motion.button>

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 md:space-x-3">
                  <motion.img
                    src={user?.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'}
                    alt="Profile"
                    className="w-6 md:w-8 h-6 md:h-8 rounded-full object-cover cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <Button variant="ghost" size="xs" onClick={logout} className="hidden md:inline-flex">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="hidden md:flex space-x-2 md:space-x-3">
                  <Button variant="outline" size="sm" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleLogin}>
                    Join Free
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-1.5 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              <div className="space-y-3">
                {activeNavigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      currentPage === item.id
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                {!isAuthenticated && (
                  <div className="pt-3 space-y-2">
                    <Button variant="outline" className="w-full" size="sm" onClick={handleLogin}>
                      Login
                    </Button>
                    <Button variant="primary" className="w-full" size="sm" onClick={handleLogin}>
                      Join Free
                    </Button>
                  </div>
                )}

                {isAuthenticated && (
                  <div className="pt-3">
                    <Button variant="ghost" className="w-full" size="sm" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={login}
      />
    </>
  );
};