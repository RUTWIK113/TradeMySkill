import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Heart, MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface FriendRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    name: string;
    avatar: string;
    skill: string;
  } | null;
  onSend: (message: string) => void;
}

export const FriendRequestModal: React.FC<FriendRequestModalProps> = ({
  isOpen,
  onClose,
  recipient,
  onSend
}) => {
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const messageTemplates = [
    "Hi! I'd love to learn from you and share my skills in return.",
    "Your expertise looks amazing! I think we could have a great skill exchange.",
    "I'm interested in learning your skill. Let's connect and see how we can help each other!",
    "Hello! I noticed we have complementary skills. Would you like to exchange knowledge?"
  ];

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
      onClose();
    }
  };

  const handleTemplateSelect = (template: string) => {
    setMessage(template);
    setSelectedTemplate(template);
  };

  if (!isOpen || !recipient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Send Friend Request
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Recipient Info */}
          <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <img
              src={recipient.avatar}
              alt={recipient.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {recipient.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Teaches {recipient.skill}
              </p>
            </div>
          </div>

          {/* Message Templates */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Templates
            </label>
            <div className="space-y-2">
              {messageTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateSelect(template)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedTemplate === template
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                  }`}
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {template}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Personal Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a personal message..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex-1"
            >
              <Heart size={16} className="mr-2" />
              Send Request
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};