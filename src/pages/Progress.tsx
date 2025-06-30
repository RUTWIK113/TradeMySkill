import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Star, 
  Target,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Flame,
  Users,
  BookOpen,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sidebar } from '../components/layout/Sidebar';

export const Progress: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const progressStats = {
    totalHours: 47,
    skillsLearned: 8,
    skillsTaught: 12,
    averageRating: 4.9,
    currentStreak: 12,
    longestStreak: 28,
    sessionsCompleted: 35,
    partnersConnected: 23
  };

  const skillProgress = [
    {
      skill: 'Spanish',
      category: 'Language',
      progress: 75,
      hoursSpent: 18,
      sessionsCompleted: 12,
      rating: 4.8,
      trend: 'up',
      change: '+15%',
      nextMilestone: 'Conversational Level',
      milestoneProgress: 75
    },
    {
      skill: 'Guitar',
      category: 'Music',
      progress: 45,
      hoursSpent: 12,
      sessionsCompleted: 8,
      rating: 4.6,
      trend: 'up',
      change: '+8%',
      nextMilestone: 'Intermediate Chords',
      milestoneProgress: 45
    },
    {
      skill: 'Cooking',
      category: 'Lifestyle',
      progress: 30,
      hoursSpent: 8,
      sessionsCompleted: 5,
      rating: 4.5,
      trend: 'down',
      change: '-5%',
      nextMilestone: 'Basic Techniques',
      milestoneProgress: 30
    },
    {
      skill: 'Photography',
      category: 'Creative',
      progress: 85,
      hoursSpent: 22,
      sessionsCompleted: 15,
      rating: 4.9,
      trend: 'up',
      change: '+12%',
      nextMilestone: 'Advanced Editing',
      milestoneProgress: 85
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5, sessions: 1 },
    { day: 'Tue', hours: 1.5, sessions: 1 },
    { day: 'Wed', hours: 3.0, sessions: 2 },
    { day: 'Thu', hours: 0, sessions: 0 },
    { day: 'Fri', hours: 2.0, sessions: 1 },
    { day: 'Sat', hours: 4.0, sessions: 2 },
    { day: 'Sun', hours: 1.5, sessions: 1 }
  ];

  const recentFeedback = [
    {
      from: 'Maria Rodriguez',
      skill: 'Spanish',
      rating: 5,
      comment: 'Excellent progress! Your pronunciation is getting much better.',
      date: '2 days ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      from: 'David Kim',
      skill: 'Guitar',
      rating: 5,
      comment: 'Great dedication to practice. Keep working on those chord transitions.',
      date: '1 week ago',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      from: 'Alex Thompson',
      skill: 'JavaScript',
      rating: 5,
      comment: 'You taught React concepts very clearly. Thank you!',
      date: '1 week ago',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    }
  ];

  const learningStreak = Array.from({ length: 28 }, (_, i) => ({
    date: new Date(Date.now() - (27 - i) * 24 * 60 * 60 * 1000),
    active: Math.random() > 0.3,
    intensity: Math.floor(Math.random() * 4) + 1
  }));

  const getStreakColor = (intensity: number) => {
    switch (intensity) {
      case 1: return 'bg-green-200 dark:bg-green-900';
      case 2: return 'bg-green-300 dark:bg-green-800';
      case 3: return 'bg-green-400 dark:bg-green-700';
      case 4: return 'bg-green-500 dark:bg-green-600';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Learning Progress
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Track your skill development and achievements
              </p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              {(['week', 'month', 'year'] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="capitalize"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4 mb-6 md:mb-8">
            <Card className="p-3 md:p-4 text-center">
              <Clock size={16} md:size={20} className="mx-auto mb-2 text-blue-600" />
              <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {progressStats.totalHours}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Total Hours
              </div>
            </Card>

            <Card className="p-3 md:p-4 text-center">
              <BookOpen size={16} md:size={20} className="mx-auto mb-2 text-green-600" />
              <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {progressStats.skillsLearned}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Skills Learned
              </div>
            </Card>

            <Card className="p-3 md:p-4 text-center">
              <Users size={16} md:size={20} className="mx-auto mb-2 text-purple-600" />
              <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {progressStats.skillsTaught}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Skills Taught
              </div>
            </Card>

            <Card className="p-3 md:p-4 text-center">
              <Star size={16} md:size={20} className="mx-auto mb-2 text-yellow-600" />
              <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {progressStats.averageRating}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Avg Rating
              </div>
            </Card>

            <Card className="p-3 md:p-4 text-center">
              <Flame size={16} md:size={20} className="mx-auto mb-2 text-orange-600" />
              <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {progressStats.currentStreak}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Day Streak
              </div>
            </Card>

            <Card className="p-3 md:p-4 text-center">
              <Target size={16} md:size={20} className="mx-auto mb-2 text-red-600" />
              <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {progressStats.longestStreak}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Best Streak
              </div>
            </Card>

            <Card className="p-3 md:p-4 text-center">
              <CheckCircle size={16} md:size={20} className="mx-auto mb-2 text-teal-600" />
              <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {progressStats.sessionsCompleted}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Sessions
              </div>
            </Card>

            <Card className="p-3 md:p-4 text-center">
              <Users size={16} md:size={20} className="mx-auto mb-2 text-indigo-600" />
              <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {progressStats.partnersConnected}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Partners
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skill Progress */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                    Skill Progress
                  </h3>
                  <BarChart3 size={20} className="text-gray-400" />
                </div>

                <div className="space-y-4 md:space-y-6">
                  {skillProgress.map((skill, index) => (
                    <motion.div
                      key={skill.skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                            {skill.skill}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                            {skill.category}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`flex items-center space-x-1 text-xs font-medium ${
                            skill.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {skill.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            <span>{skill.change}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {skill.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 dark:text-gray-400">
                            Progress to {skill.nextMilestone}
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {skill.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>{skill.hoursSpent} hours spent</span>
                        <span>{skill.sessionsCompleted} sessions completed</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Weekly Activity */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                    Weekly Activity
                  </h3>
                  <Activity size={20} className="text-gray-400" />
                </div>

                <div className="grid grid-cols-7 gap-2 md:gap-4">
                  {weeklyActivity.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {day.day}
                      </div>
                      <div
                        className="bg-primary-100 dark:bg-primary-900 rounded-lg mx-auto mb-2 transition-all duration-300 hover:bg-primary-200 dark:hover:bg-primary-800"
                        style={{
                          height: `${Math.max(day.hours * 20, 8)}px`,
                          width: '100%',
                          maxHeight: '80px'
                        }}
                      ></div>
                      <div className="text-xs font-medium text-gray-900 dark:text-white">
                        {day.hours}h
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {day.sessions} sessions
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Learning Streak */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    Learning Streak
                  </h3>
                  <Flame size={18} className="text-orange-500" />
                </div>

                <div className="text-center mb-4">
                  <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {progressStats.currentStreak}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    days in a row
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-4">
                  {learningStreak.map((day, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${
                        day.active ? getStreakColor(day.intensity) : 'bg-gray-100 dark:bg-gray-800'
                      }`}
                      title={day.date.toDateString()}
                    ></div>
                  ))}
                </div>

                <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  Last 4 weeks activity
                </div>
              </Card>

              {/* Recent Feedback */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Feedback
                  </h3>
                  <Star size={18} className="text-yellow-500" />
                </div>

                <div className="space-y-4">
                  {recentFeedback.map((feedback, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={feedback.avatar}
                          alt={feedback.from}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white text-xs md:text-sm">
                              {feedback.from}
                            </h4>
                            <div className="flex">
                              {[...Array(feedback.rating)].map((_, i) => (
                                <Star key={i} size={10} md:size={12} className="text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-primary-600 dark:text-primary-400 mb-1">
                            {feedback.skill}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">
                            "{feedback.comment}"
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {feedback.date}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="primary" size="sm" className="w-full">
                    <Target size={14} className="mr-2" />
                    Set New Goal
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <PieChart size={14} className="mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Award size={14} className="mr-2" />
                    View Achievements
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};