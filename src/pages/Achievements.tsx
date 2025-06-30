import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Star, 
  Trophy, 
  Medal, 
  Crown, 
  Target,
  Users,
  Clock,
  BookOpen,
  Flame,
  Zap,
  Heart,
  Globe,
  TrendingUp,
  CheckCircle,
  Lock
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sidebar } from '../components/layout/Sidebar';

export const Achievements: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'learning' | 'teaching' | 'community' | 'milestones'>('all');

  const userStats = {
    totalAchievements: 15,
    unlockedAchievements: 12,
    points: 2450,
    level: 8,
    nextLevelPoints: 2800,
    rank: 'Expert Exchanger'
  };

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first skill exchange session',
      icon: Target,
      category: 'learning',
      points: 50,
      unlocked: true,
      unlockedDate: '2 weeks ago',
      rarity: 'common',
      progress: 100
    },
    {
      id: 2,
      title: 'Social Butterfly',
      description: 'Connect with 10 different skill partners',
      icon: Users,
      category: 'community',
      points: 150,
      unlocked: true,
      unlockedDate: '1 week ago',
      rarity: 'uncommon',
      progress: 100
    },
    {
      id: 3,
      title: 'Time Master',
      description: 'Spend 50 hours in skill exchange sessions',
      icon: Clock,
      category: 'learning',
      points: 200,
      unlocked: true,
      unlockedDate: '3 days ago',
      rarity: 'rare',
      progress: 100
    },
    {
      id: 4,
      title: 'Knowledge Sharer',
      description: 'Teach 5 different skills to others',
      icon: BookOpen,
      category: 'teaching',
      points: 250,
      unlocked: true,
      unlockedDate: '2 days ago',
      rarity: 'rare',
      progress: 100
    },
    {
      id: 5,
      title: 'Streak Master',
      description: 'Maintain a 30-day learning streak',
      icon: Flame,
      category: 'milestones',
      points: 300,
      unlocked: false,
      rarity: 'epic',
      progress: 40,
      requirement: '12/30 days'
    },
    {
      id: 6,
      title: 'Five Star Teacher',
      description: 'Receive 50 five-star ratings as a teacher',
      icon: Star,
      category: 'teaching',
      points: 400,
      unlocked: true,
      unlockedDate: '1 day ago',
      rarity: 'epic',
      progress: 100
    },
    {
      id: 7,
      title: 'Global Connector',
      description: 'Exchange skills with people from 20 different countries',
      icon: Globe,
      category: 'community',
      points: 500,
      unlocked: false,
      rarity: 'legendary',
      progress: 65,
      requirement: '13/20 countries'
    },
    {
      id: 8,
      title: 'Lightning Learner',
      description: 'Complete 10 skills in a single month',
      icon: Zap,
      category: 'learning',
      points: 350,
      unlocked: false,
      rarity: 'epic',
      progress: 30,
      requirement: '3/10 skills'
    },
    {
      id: 9,
      title: 'Community Hero',
      description: 'Help 100 people learn new skills',
      icon: Heart,
      category: 'community',
      points: 600,
      unlocked: false,
      rarity: 'legendary',
      progress: 75,
      requirement: '75/100 people'
    },
    {
      id: 10,
      title: 'Skill Master',
      description: 'Reach expert level in 5 different skills',
      icon: Crown,
      category: 'milestones',
      points: 800,
      unlocked: false,
      rarity: 'legendary',
      progress: 60,
      requirement: '3/5 skills'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Chen', points: 4250, avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2' },
    { rank: 2, name: 'Maria Rodriguez', points: 3890, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2' },
    { rank: 3, name: 'David Kim', points: 3456, avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2' },
    { rank: 4, name: 'You', points: 2450, avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2', isUser: true },
    { rank: 5, name: 'Emma Davis', points: 2234, avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2' }
  ];

  const categories = [
    { id: 'all', label: 'All', count: achievements.length },
    { id: 'learning', label: 'Learning', count: achievements.filter(a => a.category === 'learning').length },
    { id: 'teaching', label: 'Teaching', count: achievements.filter(a => a.category === 'teaching').length },
    { id: 'community', label: 'Community', count: achievements.filter(a => a.category === 'community').length },
    { id: 'milestones', label: 'Milestones', count: achievements.filter(a => a.category === 'milestones').length }
  ];

  const filteredAchievements = activeCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
      case 'uncommon': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'rare': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'epic': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400';
      case 'legendary': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-200 dark:border-gray-700';
      case 'uncommon': return 'border-green-200 dark:border-green-800';
      case 'rare': return 'border-blue-200 dark:border-blue-800';
      case 'epic': return 'border-purple-200 dark:border-purple-800';
      case 'legendary': return 'border-yellow-200 dark:border-yellow-800';
      default: return 'border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Achievements & Rewards
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Celebrate your learning milestones and unlock rewards
            </p>
          </div>

          {/* User Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card className="p-4 md:p-6 text-center">
              <Trophy size={24} md:size={32} className="mx-auto mb-3 text-yellow-600" />
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.unlockedAchievements}/{userStats.totalAchievements}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Achievements Unlocked
              </div>
            </Card>

            <Card className="p-4 md:p-6 text-center">
              <Star size={24} md:size={32} className="mx-auto mb-3 text-blue-600" />
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.points.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Total Points
              </div>
            </Card>

            <Card className="p-4 md:p-6 text-center">
              <TrendingUp size={24} md:size={32} className="mx-auto mb-3 text-green-600" />
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Level {userStats.level}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Current Level
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userStats.points / userStats.nextLevelPoints) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {userStats.nextLevelPoints - userStats.points} points to next level
              </div>
            </Card>

            <Card className="p-4 md:p-6 text-center">
              <Crown size={24} md:size={32} className="mx-auto mb-3 text-purple-600" />
              <div className="text-sm md:text-base font-bold text-gray-900 dark:text-white">
                {userStats.rank}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Current Rank
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Achievements */}
            <div className="lg:col-span-2">
              {/* Category Tabs */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id as any)}
                      className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredAchievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`p-4 md:p-6 relative overflow-hidden border-2 ${getRarityBorder(achievement.rarity)} ${
                          achievement.unlocked ? 'opacity-100' : 'opacity-60'
                        }`}
                      >
                        {/* Rarity Indicator */}
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </div>

                        {/* Lock Overlay for Locked Achievements */}
                        {!achievement.unlocked && (
                          <div className="absolute inset-0 bg-gray-900/20 dark:bg-gray-100/10 flex items-center justify-center">
                            <Lock size={24} className="text-gray-400" />
                          </div>
                        )}

                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl ${
                            achievement.unlocked 
                              ? 'bg-primary-100 dark:bg-primary-900' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            <Icon size={20} md:size={24} className={
                              achievement.unlocked 
                                ? 'text-primary-600 dark:text-primary-400' 
                                : 'text-gray-400'
                            } />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm md:text-base">
                              {achievement.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {achievement.description}
                            </p>
                            
                            {achievement.unlocked ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                  <CheckCircle size={12} md:size={14} className="text-green-500" />
                                  <span className="text-xs text-green-600 dark:text-green-400">
                                    Unlocked {achievement.unlockedDate}
                                  </span>
                                </div>
                                <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                                  +{achievement.points} pts
                                </span>
                              </div>
                            ) : (
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {achievement.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                                  <div
                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${achievement.progress}%` }}
                                  ></div>
                                </div>
                                {achievement.requirement && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {achievement.requirement}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                    Leaderboard
                  </h3>
                  <Trophy size={18} className="text-yellow-500" />
                </div>

                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        user.isUser ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' : ''
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1 ? 'bg-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-gray-400 text-white' :
                        user.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {user.rank}
                      </div>
                      
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <h4 className={`font-medium text-xs md:text-sm ${
                          user.isUser ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'
                        }`}>
                          {user.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {user.points.toLocaleString()} pts
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Full Leaderboard
                </Button>
              </Card>

              {/* Recent Achievements */}
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Unlocks
                </h3>

                <div className="space-y-3">
                  {achievements
                    .filter(a => a.unlocked)
                    .slice(0, 3)
                    .map((achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                            <Icon size={14} className="text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white text-xs md:text-sm">
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {achievement.unlockedDate}
                            </p>
                          </div>
                          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                            +{achievement.points}
                          </span>
                        </motion.div>
                      );
                    })}
                </div>
              </Card>

              {/* Next Achievement */}
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Next Achievement
                </h3>

                {(() => {
                  const nextAchievement = achievements.find(a => !a.unlocked);
                  if (!nextAchievement) return null;
                  
                  const Icon = nextAchievement.icon;
                  return (
                    <div className="text-center">
                      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl mb-3">
                        <Icon size={32} className="mx-auto text-gray-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {nextAchievement.title}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {nextAchievement.description}
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${nextAchievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {nextAchievement.progress}% complete
                      </p>
                    </div>
                  );
                })()}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};