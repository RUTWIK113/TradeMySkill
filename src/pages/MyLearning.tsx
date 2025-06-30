import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Pause, 
  Clock, 
  Calendar,
  Star,
  FileText,
  Bookmark,
  TrendingUp,
  Award,
  Target,
  CheckCircle,
  RotateCcw
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sidebar } from '../components/layout/Sidebar';

export const MyLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'completed' | 'saved'>('current');

  const currentLearning = [
    {
      id: 1,
      skill: 'Spanish Conversation',
      teacher: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      progress: 75,
      totalSessions: 10,
      completedSessions: 7,
      nextSession: 'Tomorrow at 3 PM',
      lastActivity: '2 days ago',
      notes: 3,
      bookmarks: 5,
      status: 'active'
    },
    {
      id: 2,
      skill: 'Guitar Basics',
      teacher: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      progress: 45,
      totalSessions: 8,
      completedSessions: 4,
      nextSession: 'Today at 6 PM',
      lastActivity: '1 day ago',
      notes: 2,
      bookmarks: 3,
      status: 'active'
    },
    {
      id: 3,
      skill: 'Cooking Fundamentals',
      teacher: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      progress: 30,
      totalSessions: 6,
      completedSessions: 2,
      nextSession: 'Friday at 7 PM',
      lastActivity: '5 days ago',
      notes: 1,
      bookmarks: 2,
      status: 'paused'
    }
  ];

  const completedLearning = [
    {
      id: 4,
      skill: 'React Fundamentals',
      teacher: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      completedDate: '2 weeks ago',
      totalSessions: 12,
      rating: 5,
      certificate: true,
      notes: 8,
      bookmarks: 12
    },
    {
      id: 5,
      skill: 'Photography Basics',
      teacher: 'Sarah Wilson',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      completedDate: '1 month ago',
      totalSessions: 8,
      rating: 5,
      certificate: true,
      notes: 5,
      bookmarks: 7
    }
  ];

  const savedContent = [
    {
      id: 1,
      type: 'link',
      title: 'Spanish Grammar Rules',
      url: 'https://example.com/spanish-grammar',
      skill: 'Spanish',
      savedDate: '3 days ago',
      notes: 'Useful for verb conjugations'
    },
    {
      id: 2,
      type: 'note',
      title: 'Guitar Chord Progressions',
      content: 'Common progressions: I-V-vi-IV, vi-IV-I-V...',
      skill: 'Guitar',
      savedDate: '1 week ago',
      notes: 'Practice these daily'
    },
    {
      id: 3,
      type: 'video',
      title: 'React Hooks Tutorial',
      url: 'https://example.com/react-hooks',
      skill: 'React',
      savedDate: '2 weeks ago',
      notes: 'Advanced useState patterns'
    }
  ];

  const learningStats = {
    totalHours: 47,
    skillsInProgress: 3,
    skillsCompleted: 5,
    currentStreak: 12,
    longestStreak: 28,
    averageRating: 4.9
  };

  const tabs = [
    { id: 'current', label: 'Current Learning', count: currentLearning.length },
    { id: 'completed', label: 'Completed', count: completedLearning.length },
    { id: 'saved', label: 'Saved Content', count: savedContent.length }
  ];

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Learning Journey
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Track your progress and continue learning
            </p>
          </div>

          {/* Learning Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
            <Card className="p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-primary-600 dark:text-primary-400">
                {learningStats.totalHours}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Total Hours
              </div>
            </Card>
            
            <Card className="p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                {learningStats.skillsInProgress}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                In Progress
              </div>
            </Card>
            
            <Card className="p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-green-600 dark:text-green-400">
                {learningStats.skillsCompleted}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Completed
              </div>
            </Card>
            
            <Card className="p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-orange-600 dark:text-orange-400">
                {learningStats.currentStreak}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Day Streak
              </div>
            </Card>
            
            <Card className="p-3 md:p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-purple-600 dark:text-purple-400">
                {learningStats.longestStreak}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Best Streak
              </div>
            </Card>
            
            <Card className="p-3 md:p-4 text-center">
              <div className="flex items-center justify-center space-x-1">
                <Star size={14} md:size={16} className="text-yellow-400 fill-current" />
                <span className="text-lg md:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {learningStats.averageRating}
                </span>
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Avg Rating
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mb-6 md:mb-8">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                      : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 md:space-y-6">
            {activeTab === 'current' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {currentLearning.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 md:p-6">
                      <div className="flex items-start space-x-3 md:space-x-4 mb-4">
                        <img
                          src={course.avatar}
                          alt={course.teacher}
                          className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                            {course.skill}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            with {course.teacher}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.status === 'active' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                              {course.status === 'active' ? 'Active' : 'Paused'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs md:text-sm mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {course.completedSessions}/{course.totalSessions} sessions
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>{course.progress}% complete</span>
                          <span>Last activity: {course.lastActivity}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4 text-xs md:text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} md:size={14} className="text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Next: {course.nextSession}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <FileText size={12} md:size={14} />
                            <span>{course.notes} notes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bookmark size={12} md:size={14} />
                            <span>{course.bookmarks} saved</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 md:space-x-3">
                        <Button variant="primary" size="sm" className="flex-1">
                          {course.status === 'active' ? (
                            <>
                              <Play size={12} md:size={14} className="mr-1 md:mr-2" />
                              Continue
                            </>
                          ) : (
                            <>
                              <RotateCcw size={12} md:size={14} className="mr-1 md:mr-2" />
                              Resume
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText size={12} md:size={14} className="mr-1 md:mr-2" />
                          Notes
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {completedLearning.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 md:p-6">
                      <div className="flex items-start space-x-3 md:space-x-4 mb-4">
                        <img
                          src={course.avatar}
                          alt={course.teacher}
                          className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                            {course.skill}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            with {course.teacher}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <CheckCircle size={12} md:size={14} className="text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Completed {course.completedDate}
                            </span>
                          </div>
                        </div>
                        {course.certificate && (
                          <Award size={16} md:size={20} className="text-yellow-500" />
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(course.rating)].map((_, i) => (
                            <Star key={i} size={12} md:size={14} className="text-yellow-400 fill-current" />
                          ))}
                          <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 ml-1">
                            ({course.rating}.0)
                          </span>
                        </div>
                        <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                          {course.totalSessions} sessions
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 md:space-x-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <FileText size={12} md:size={14} />
                            <span>{course.notes} notes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bookmark size={12} md:size={14} />
                            <span>{course.bookmarks} saved</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 md:space-x-3">
                        <Button variant="outline" size="sm" className="flex-1">
                          <FileText size={12} md:size={14} className="mr-1 md:mr-2" />
                          View Notes
                        </Button>
                        {course.certificate && (
                          <Button variant="primary" size="sm">
                            <Award size={12} md:size={14} className="mr-1 md:mr-2" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {savedContent.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 md:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {item.type === 'link' && <BookOpen size={14} md:size={16} className="text-blue-500" />}
                          {item.type === 'note' && <FileText size={14} md:size={16} className="text-green-500" />}
                          {item.type === 'video' && <Play size={14} md:size={16} className="text-red-500" />}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.type === 'link' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                            item.type === 'note' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {item.type}
                          </span>
                        </div>
                        <Bookmark size={14} md:size={16} className="text-yellow-500 fill-current" />
                      </div>

                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                        {item.title}
                      </h3>

                      {item.content && (
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {item.content}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <span className="font-medium text-primary-600 dark:text-primary-400">
                          {item.skill}
                        </span>
                        <span>{item.savedDate}</span>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 italic">
                          "{item.notes}"
                        </p>
                      )}

                      <Button variant="outline" size="sm" className="w-full">
                        {item.type === 'link' || item.type === 'video' ? 'Open Link' : 'View Note'}
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};