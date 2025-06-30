import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  Clock, 
  Star, 
  Plus,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Target
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sidebar } from '../components/layout/Sidebar';
import { useApp } from '../contexts/AppContext';

export const Dashboard: React.FC = () => {
  const { setCurrentPage, user } = useApp();

  const todaysMatches = [
    {
      id: 1,
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'JavaScript',
      wantsToLearn: 'Mechanical Engineering',
      rating: 4.9,
      time: '2:00 PM',
      status: 'available'
    },
    {
      id: 2,
      name: 'Maya Patel',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Spanish',
      wantsToLearn: 'Python Programming',
      rating: 4.8,
      time: '4:30 PM',
      status: 'busy'
    },
    {
      id: 3,
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Guitar',
      wantsToLearn: 'Project Management',
      rating: 4.7,
      time: '6:00 PM',
      status: 'available'
    }
  ];

  const learningGoals = [
    { skill: 'Web Development', progress: 75, sessions: 12, nextSession: 'Tomorrow at 3 PM' },
    { skill: 'Spanish', progress: 45, sessions: 8, nextSession: 'Today at 6 PM' },
    { skill: 'Guitar', progress: 30, sessions: 5, nextSession: 'Friday at 7 PM' }
  ];

  const mySkills = [
    { name: 'Mechanical Engineering', level: 'Expert', students: 25, rating: 4.9 },
    { name: 'Project Management', level: 'Advanced', students: 18, rating: 4.8 },
    { name: 'Python Programming', level: 'Intermediate', students: 12, rating: 4.7 },
    { name: 'MATLAB', level: 'Advanced', students: 15, rating: 4.8 }
  ];

  const stats = [
    { label: 'Skills Taught', value: '15', change: '+3', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Skills Learned', value: '8', change: '+1', icon: Target, color: 'text-green-600' },
    { label: 'Total Hours', value: '52', change: '+7', icon: Clock, color: 'text-purple-600' },
    { label: 'Rating', value: '4.9', change: '+0.1', icon: Star, color: 'text-yellow-600' }
  ];

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.name || 'Rutwik'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You have 3 new skill matches today
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                        <TrendingUp size={14} className="mr-1" />
                        {stat.change} this week
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700`}>
                      <Icon size={24} className={stat.color} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Today's Matches */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Today's Matches
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage('explore')}>
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {todaysMatches.map((match) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={match.avatar}
                            alt={match.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            match.status === 'available' ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {match.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Teaches {match.skill} • Wants {match.wantsToLearn}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star size={14} className="text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {match.rating}
                            </span>
                            <Clock size={14} className="text-gray-400 ml-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {match.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage('chat')}>
                          <MessageSquare size={16} className="mr-1" />
                          Chat
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => setCurrentPage('schedule')}>
                          <Calendar size={16} className="mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="primary" className="w-full" onClick={() => setCurrentPage('explore')}>
                    <Plus size={16} className="mr-2" />
                    Find New Skills
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setCurrentPage('schedule')}>
                    <Calendar size={16} className="mr-2" />
                    Schedule Session
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setCurrentPage('chat')}>
                    <MessageSquare size={16} className="mr-2" />
                    View Messages
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <Award size={16} className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Completed Web Development lesson
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        New match found
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Star size={16} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Received 5-star rating
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Learning Goals */}
          <div className="mt-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Learning Goals Progress
                </h2>
                <Button variant="outline" size="sm">
                  <Plus size={16} className="mr-2" />
                  Add Goal
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learningGoals.map((goal, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {goal.skill}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {goal.sessions} sessions completed
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      Next: {goal.nextSession}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};