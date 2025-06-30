import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'book' | 'brain' | 'zap';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'brain' 
}) => {
  const sizes = {
    sm: 24,
    md: 32,
    lg: 48
  };

  const icons = {
    book: BookOpen,
    brain: Brain,
    zap: Zap
  };

  const Icon = icons[variant];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative"
      >
        <Icon 
          size={sizes[size]} 
          className="text-primary-600 dark:text-primary-400" 
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary-200 dark:border-primary-800"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};