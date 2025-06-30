import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  Calendar, 
  MessageSquare, 
  Settings, 
  User, 
  BookOpen,
  TrendingUp,
  Award,
  Target,
  Users
} from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, user } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'explore', label: 'Explore Skills', icon: Search },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'learning', label: 'My Learning', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-3 mb-8">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {user?.name || 'John Doe'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Skill Exchanger
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Your Stats
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Skills Taught</span>
              <span className="font-medium text-primary-600 dark:text-primary-400">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Skills Learned</span>
              <span className="font-medium text-secondary-600 dark:text-secondary-400">8</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Hours Exchanged</span>
              <span className="font-medium text-accent-600 dark:text-accent-400">47</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};