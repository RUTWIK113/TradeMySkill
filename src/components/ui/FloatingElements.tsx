import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Music, Globe, Camera, Utensils } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  const elements = [
    { icon: Code, color: 'text-blue-500', delay: 0 },
    { icon: Palette, color: 'text-purple-500', delay: 1 },
    { icon: Music, color: 'text-green-500', delay: 2 },
    { icon: Globe, color: 'text-orange-500', delay: 3 },
    { icon: Camera, color: 'text-pink-500', delay: 4 },
    { icon: Utensils, color: 'text-yellow-500', delay: 5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => {
        const Icon = element.icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-20`}
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index * 10)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay,
            }}
          >
            <Icon size={32} />
          </motion.div>
        );
      })}
    </div>
  );
};