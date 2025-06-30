import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MapPin, Clock, Heart, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sidebar } from '../components/layout/Sidebar';
import { SkillPreview } from '../components/ui/SkillPreview';
import { FriendRequestModal } from '../components/ui/FriendRequestModal';
import { ConnectionLimitTracker } from '../components/ui/ConnectionLimitTracker';
import { useApp } from '../contexts/AppContext';

export const ExploreSkills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showSkillPreview, setShowSkillPreview] = useState(false);
  const [showFriendRequest, setShowFriendRequest] = useState(false);
  const [friendRequestRecipient, setFriendRequestRecipient] = useState(null);
  const [connectionsToday, setConnectionsToday] = useState(12);
  const { sendFriendRequest } = useApp();

  const maxConnections = 35;

  const categories = [
    { id: 'all', name: 'All Skills', count: 1234 },
    { id: 'tech', name: 'Technology', count: 456 },
    { id: 'language', name: 'Languages', count: 234 },
    { id: 'music', name: 'Music', count: 123 },
    { id: 'design', name: 'Design', count: 89 },
    { id: 'business', name: 'Business', count: 67 },
    { id: 'cooking', name: 'Cooking', count: 45 },
    { id: 'fitness', name: 'Fitness', count: 34 }
  ];

  const skills = [
    {
      id: 1,
      name: 'JavaScript Programming',
      teacher: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.9,
      students: 156,
      category: 'tech',
      location: 'San Francisco, CA',
      wantsToLearn: ['Spanish', 'Guitar'],
      tags: ['React', 'Node.js', 'Full Stack'],
      availability: 'Available Now',
      experience: '5+ years',
      description: 'Learn modern JavaScript programming from fundamentals to advanced concepts. I specialize in React, Node.js, and full-stack development with hands-on projects.',
      sampleLessons: [
        'JavaScript Fundamentals & ES6+',
        'React Components & Hooks',
        'Node.js & Express Backend',
        'Full-Stack Project Development'
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          content: 'Alex is an amazing teacher! His explanations are clear and he provides great real-world examples.',
          rating: 5
        },
        {
          name: 'Mike Chen',
          content: 'Learned more in 3 sessions than I did in months of self-study. Highly recommend!',
          rating: 5
        }
      ]
    },
    {
      id: 2,
      name: 'Spanish Conversation',
      teacher: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.8,
      students: 89,
      category: 'language',
      location: 'Barcelona, Spain',
      wantsToLearn: ['Photography', 'Marketing'],
      tags: ['Native Speaker', 'Conversational', 'Business Spanish'],
      availability: 'Available Tomorrow',
      experience: 'Native Speaker',
      description: 'Native Spanish speaker offering conversational practice and cultural insights. Perfect for improving fluency and confidence in speaking.',
      sampleLessons: [
        'Basic Conversation & Greetings',
        'Travel & Tourism Spanish',
        'Business Spanish Communication',
        'Cultural Context & Expressions'
      ]
    },
    {
      id: 3,
      name: 'Guitar Lessons',
      teacher: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.7,
      students: 67,
      category: 'music',
      location: 'Nashville, TN',
      wantsToLearn: ['Python', 'Web Development'],
      tags: ['Acoustic', 'Electric', 'Beginner Friendly'],
      availability: 'Available This Week',
      experience: '10+ years',
      description: 'Professional guitarist with 10+ years of experience teaching all levels. From beginner chords to advanced techniques.',
      sampleLessons: [
        'Basic Chords & Strumming',
        'Fingerpicking Techniques',
        'Music Theory for Guitar',
        'Song Performance & Style'
      ]
    },
    {
      id: 4,
      name: 'UI/UX Design',
      teacher: 'Sarah Kim',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.9,
      students: 134,
      category: 'design',
      location: 'London, UK',
      wantsToLearn: ['Italian', 'Cooking'],
      tags: ['Figma', 'Adobe Creative Suite', 'Prototyping'],
      availability: 'Available Now',
      experience: '7+ years',
      description: 'Senior UX Designer at a leading tech company. Specializing in user research, wireframing, prototyping, and design systems.',
      sampleLessons: [
        'Design Thinking Process',
        'User Research & Personas',
        'Wireframing & Prototyping',
        'Design Systems & Handoff'
      ]
    },
    {
      id: 5,
      name: 'Digital Marketing',
      teacher: 'Michael Brown',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.6,
      students: 98,
      category: 'business',
      location: 'New York, NY',
      wantsToLearn: ['French', 'Piano'],
      tags: ['SEO', 'Social Media', 'Analytics'],
      availability: 'Available Next Week',
      experience: '8+ years',
      description: 'Digital marketing expert with proven track record in SEO, social media marketing, and data analytics. Helped 100+ businesses grow online.',
      sampleLessons: [
        'SEO Fundamentals & Strategy',
        'Social Media Marketing',
        'Google Analytics & Data',
        'Content Marketing Strategy'
      ]
    },
    {
      id: 6,
      name: 'Photography',
      teacher: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.8,
      students: 76,
      category: 'design',
      location: 'Sydney, Australia',
      wantsToLearn: ['Mandarin', 'Yoga'],
      tags: ['Portrait', 'Landscape', 'Lightroom'],
      availability: 'Available Now',
      experience: '6+ years',
      description: 'Professional photographer specializing in portrait and landscape photography. Expert in both technical skills and creative composition.',
      sampleLessons: [
        'Camera Basics & Settings',
        'Composition & Lighting',
        'Portrait Photography',
        'Post-Processing in Lightroom'
      ]
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedSkills = [...filteredSkills].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return b.students - a.students;
      case 'newest':
        return b.id - a.id;
      default:
        return b.students - a.students; // popularity
    }
  });

  const handleViewProfile = (skill) => {
    setSelectedSkill(skill);
    setShowSkillPreview(true);
  };

  const handleConnect = (skill) => {
    if (connectionsToday >= maxConnections) {
      alert('Daily connection limit reached! Please try again tomorrow.');
      return;
    }

    setFriendRequestRecipient({
      name: skill.teacher,
      avatar: skill.avatar,
      skill: skill.name
    });
    setShowFriendRequest(true);
  };

  const handleSendFriendRequest = async (message: string) => {
    try {
      if (friendRequestRecipient) {
        await sendFriendRequest('recipient-id', message);
        setConnectionsToday(prev => prev + 1);
        
        // Save to localStorage
        localStorage.setItem('connectionsToday', (connectionsToday + 1).toString());
        localStorage.setItem('lastConnectionDate', new Date().toDateString());
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  // Load connections from localStorage
  useEffect(() => {
    const savedConnections = localStorage.getItem('connectionsToday');
    const lastDate = localStorage.getItem('lastConnectionDate');
    const today = new Date().toDateString();

    if (lastDate === today && savedConnections) {
      setConnectionsToday(parseInt(savedConnections));
    } else {
      // Reset for new day
      setConnectionsToday(0);
      localStorage.setItem('connectionsToday', '0');
      localStorage.setItem('lastConnectionDate', today);
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Explore Skills
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Discover amazing skills from our global community
            </p>
          </div>

          {/* Connection Limit Tracker */}
          <div className="mb-6 md:mb-8">
            <ConnectionLimitTracker
              connectionsToday={connectionsToday}
              maxConnections={maxConnections}
            />
          </div>

          {/* Search and Filters */}
          <div className="mb-6 md:mb-8 space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search skills, teachers, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-sm md:text-base"
                  />
                </div>
              </div>
              <div className="flex gap-2 md:gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 md:px-4 py-2 md:py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm md:text-base"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="students">Most Students</option>
                </select>
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-1 md:mr-2" />
                  <span className="hidden md:inline">Filters</span>
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 md:mb-6">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Showing {sortedSkills.length} of {skills.length} skills
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sortedSkills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card hover className="p-4 md:p-6 h-full">
                  <div className="flex items-start space-x-3 md:space-x-4 mb-3 md:mb-4">
                    <img
                      src={skill.avatar}
                      alt={skill.teacher}
                      className="w-12 md:w-16 h-12 md:h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {skill.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                        by {skill.teacher}
                      </p>
                      <div className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star size={12} md:size={14} className="text-yellow-400 fill-current" />
                          <span>{skill.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>•</span>
                          <span>{skill.students} students</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1.5 md:p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart size={16} md:size={18} />
                    </button>
                  </div>

                  <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                    <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      <MapPin size={12} md:size={14} />
                      <span>{skill.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      <Clock size={12} md:size={14} />
                      <span>{skill.availability}</span>
                    </div>

                    <div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Wants to learn:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {skill.wantsToLearn.map((want, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 text-xs rounded-full"
                          >
                            {want}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1">
                        {skill.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 md:space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs md:text-sm"
                      onClick={() => handleViewProfile(skill)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="flex-1 text-xs md:text-sm"
                      onClick={() => handleConnect(skill)}
                      disabled={connectionsToday >= maxConnections}
                    >
                      {connectionsToday >= maxConnections ? 'Limit Reached' : 'Connect'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {sortedSkills.length > 0 && (
            <div className="text-center mt-6 md:mt-8">
              <Button variant="outline" size="lg">
                Load More Skills
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Skill Preview Modal */}
      <SkillPreview
        isOpen={showSkillPreview}
        onClose={() => setShowSkillPreview(false)}
        skill={selectedSkill}
      />

      {/* Friend Request Modal */}
      <FriendRequestModal
        isOpen={showFriendRequest}
        onClose={() => setShowFriendRequest(false)}
        recipient={friendRequestRecipient}
        onSend={handleSendFriendRequest}
      />
    </div>
  );
};