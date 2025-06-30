import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glass = false 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  const glassClasses = glass 
    ? 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl dark:bg-gray-900/10 dark:border-gray-700/20' 
    : 'bg-white shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700';
  
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};