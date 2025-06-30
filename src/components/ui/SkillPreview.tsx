import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, Clock, Users, Play } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

interface SkillPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  skill: {
    id: number;
    name: string;
    teacher: string;
    avatar: string;
    rating: number;
    students: number;
    category: string;
    location: string;
    wantsToLearn: string[];
    tags: string[];
    availability: string;
    experience: string;
    description?: string;
    sampleLessons?: string[];
    testimonials?: Array<{
      name: string;
      content: string;
      rating: number;
    }>;
  } | null;
}

export const SkillPreview: React.FC<SkillPreviewProps> = ({ isOpen, onClose, skill }) => {
  if (!isOpen || !skill) return null;

  const sampleLessons = skill.sampleLessons || [
    "Introduction to fundamentals",
    "Hands-on practice session",
    "Advanced techniques",
    "Real-world applications"
  ];

  const testimonials = skill.testimonials || [
    {
      name: "Alex Johnson",
      content: "Amazing teacher! Very patient and knowledgeable.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      content: "Learned so much in just a few sessions.",
      rating: 5
    }
  ];

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
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {skill.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Teacher Info */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={skill.avatar}
              alt={skill.teacher}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {skill.teacher}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {skill.experience} experience
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span>{skill.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>{skill.students} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{skill.availability}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              About This Skill
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {skill.description || `Learn ${skill.name} from an experienced professional. This comprehensive course covers everything from basics to advanced techniques, with hands-on practice and real-world applications.`}
            </p>
          </div>

          {/* Sample Lessons */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              What You'll Learn
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleLessons.map((lesson, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <Play size={14} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{lesson}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Tags */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Skills Covered
            </h4>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Exchange Info */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Skills Exchange
            </h4>
            <Card className="p-4">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                <strong>{skill.teacher}</strong> wants to learn:
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.wantsToLearn.map((want, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-sm rounded-full"
                  >
                    {want}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Testimonials */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Student Reviews
            </h4>
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </span>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    "{testimonial.content}"
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button variant="primary" className="flex-1">
              Send Friend Request
            </Button>
            <Button variant="outline" className="flex-1">
              Start Exchange
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};