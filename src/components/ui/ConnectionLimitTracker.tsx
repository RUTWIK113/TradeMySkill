import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, AlertCircle } from 'lucide-react';

interface ConnectionLimitTrackerProps {
  connectionsToday: number;
  maxConnections: number;
  resetTime?: string;
}

export const ConnectionLimitTracker: React.FC<ConnectionLimitTrackerProps> = ({
  connectionsToday,
  maxConnections,
  resetTime = "12:00 AM UTC"
}) => {
  const percentage = (connectionsToday / maxConnections) * 100;
  const remaining = maxConnections - connectionsToday;
  
  const getStatusColor = () => {
    if (percentage >= 90) return 'text-red-600 dark:text-red-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getProgressColor = () => {
    if (percentage >= 90) return 'from-red-500 to-red-600';
    if (percentage >= 70) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Users size={18} className={getStatusColor()} />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Daily Connections
          </h3>
        </div>
        {remaining <= 5 && remaining > 0 && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertCircle size={18} className="text-yellow-500" />
          </motion.div>
        )}
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">
            {connectionsToday} of {maxConnections} used
          </span>
          <span className={`font-medium ${getStatusColor()}`}>
            {remaining} remaining
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor()}`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Clock size={12} />
          <span>Resets at {resetTime}</span>
        </div>
        <span>{Math.round(percentage)}% used</span>
      </div>

      {remaining === 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
        >
          <p className="text-sm text-red-700 dark:text-red-300">
            Daily limit reached. New connections available after reset.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};