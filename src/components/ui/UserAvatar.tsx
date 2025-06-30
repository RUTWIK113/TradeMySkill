import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, RefreshCw, Save, X } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';

interface UserAvatarProps {
  username?: string;
  currentAvatar?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  editable?: boolean;
  onAvatarChange?: (newAvatar: string) => void;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  username = 'guest', 
  currentAvatar,
  size = 'md',
  editable = false,
  onAvatarChange,
  className = ''
}) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarSeed, setAvatarSeed] = useState(username);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20
  };

  // Pre-included avatar options using Dicebear API with different styles and seeds
  const preIncludedAvatars = [
    // Notionists style
    { url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex', seed: 'Alex' },
    { url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Maria', seed: 'Maria' },
    { url: 'https://api.dicebear.com/7.x/notionists/svg?seed=David', seed: 'David' },
    { url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarah', seed: 'Sarah' },
    { url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Emma', seed: 'Emma' },
    { url: 'https://api.dicebear.com/7.x/notionists/svg?seed=James', seed: 'James' },
    
    // Adventurer style
    { url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna', seed: 'Luna' },
    { url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix', seed: 'Felix' },
    { url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe', seed: 'Zoe' },
    { url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Max', seed: 'Max' },
    { url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lily', seed: 'Lily' },
    { url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Oliver', seed: 'Oliver' },
    
    // Avataaars style
    { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie', seed: 'Sophie' },
    { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan', seed: 'Ryan' },
    { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya', seed: 'Maya' },
    { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas', seed: 'Lucas' },
    { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ava', seed: 'Ava' },
    { url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah', seed: 'Noah' },
    
    // Personas style
    { url: 'https://api.dicebear.com/7.x/personas/svg?seed=Isabella', seed: 'Isabella' },
    { url: 'https://api.dicebear.com/7.x/personas/svg?seed=Ethan', seed: 'Ethan' },
    { url: 'https://api.dicebear.com/7.x/personas/svg?seed=Grace', seed: 'Grace' },
    { url: 'https://api.dicebear.com/7.x/personas/svg?seed=Mason', seed: 'Mason' },
    { url: 'https://api.dicebear.com/7.x/personas/svg?seed=Chloe', seed: 'Chloe' },
    { url: 'https://api.dicebear.com/7.x/personas/svg?seed=Logan', seed: 'Logan' },
    
    // Fun style
    { url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Happy', seed: 'Happy' },
    { url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Cool', seed: 'Cool' },
    { url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Smart', seed: 'Smart' },
    { url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Creative', seed: 'Creative' },
    { url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Friendly', seed: 'Friendly' },
    { url: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Awesome', seed: 'Awesome' }
  ];

  // Generate avatar URL using Dicebear API
  const generateAvatarUrl = (seed: string) => {
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}`;
  };

  const currentAvatarUrl = currentAvatar || generateAvatarUrl(avatarSeed);

  const handleAvatarSelect = (avatarUrl: string, seed: string) => {
    setSelectedAvatar(avatarUrl);
    setAvatarSeed(seed);
  };

  const handleSaveAvatar = () => {
    if (selectedAvatar && onAvatarChange) {
      onAvatarChange(selectedAvatar);
    }
    setShowAvatarModal(false);
  };

  const handleGenerateCustom = () => {
    const newUrl = generateAvatarUrl(avatarSeed);
    setSelectedAvatar(newUrl);
  };

  return (
    <>
      <div className={`relative inline-block ${className}`}>
        <img
          src={currentAvatarUrl}
          alt={`${username}'s avatar`}
          className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-sm object-cover`}
        />
        
        {editable && (
          <motion.button
            onClick={() => setShowAvatarModal(true)}
            className={`absolute -bottom-1 -right-1 bg-primary-600 text-white rounded-full p-1 hover:bg-primary-700 transition-colors shadow-lg`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Camera size={iconSizes[size]} />
          </motion.button>
        )}
      </div>

      {/* Avatar Selection Modal */}
      <Modal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        title="Choose Your Avatar"
      >
        <div className="space-y-6">
          {/* Current Selection */}
          <div className="text-center">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Current Selection
            </h4>
            <div className="flex justify-center">
              <img
                src={selectedAvatar || currentAvatarUrl}
                alt="Selected avatar"
                className="w-20 h-20 rounded-full border-4 border-primary-500 shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Pre-included Avatars */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Choose from our collection
            </h4>
            
            <div className="grid grid-cols-6 gap-3 max-h-80 overflow-y-auto p-2">
              {preIncludedAvatars.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAvatarSelect(option.url, option.seed)}
                  className={`relative rounded-full border-2 transition-all ${
                    selectedAvatar === option.url
                      ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-800'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={option.url}
                    alt={`Avatar option ${index + 1}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {selectedAvatar === option.url && (
                    <div className="absolute inset-0 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Custom Generator */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Or create a custom avatar
            </h4>
            <div className="flex space-x-2">
              <input
                type="text"
                value={avatarSeed}
                onChange={(e) => setAvatarSeed(e.target.value)}
                placeholder="Enter any text..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateCustom}
              >
                <RefreshCw size={14} className="mr-2" />
                Generate
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Try your name, nickname, or any word to generate a unique avatar
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={() => {
                setShowAvatarModal(false);
                setSelectedAvatar('');
              }}
              className="flex-1"
            >
              <X size={16} className="mr-2" />
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveAvatar}
              disabled={!selectedAvatar}
              className="flex-1"
            >
              <Save size={16} className="mr-2" />
              Save Avatar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserAvatar;