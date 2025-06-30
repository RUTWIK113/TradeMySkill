import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Edit3, MapPin, Mail, Link, Star, MessageSquare, UserPlus, Camera,
  Github, Linkedin, Globe, Award, Clock, Calendar, Eye, EyeOff, Shield,
  ExternalLink, GraduationCap, Briefcase, Trash2, X
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Sidebar } from '../components/layout/Sidebar';
import UserAvatar from '../components/ui/UserAvatar';
import { useApp } from '../contexts/AppContext';

export const Profile: React.FC = () => {
  const { user, updateUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [linkedInMessage, setLinkedInMessage] = useState('');
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [showAddEndorsementModal, setShowAddEndorsementModal] = useState(false);

  // Dynamic state for sections
  const [skillsOffered, setSkillsOffered] = useState([
    {
      name: 'Mechanical Engineering',
      description: 'Core mechanical engineering principles, design, and analysis',
      tags: ['#engineering', '#design', '#analysis'],
      level: 'Expert',
      rating: 4.9,
      students: 25,
      availability: 'Weekdays 6-9 PM',
      price: 'Skill Exchange'
    },
    {
      name: 'Project Management',
      description: 'Planning, execution, and delivery of engineering projects',
      tags: ['#management', '#planning', '#leadership'],
      level: 'Advanced',
      rating: 4.8,
      students: 18,
      availability: 'Weekends',
      price: 'Free'
    },
    {
      name: 'Python Programming',
      description: 'Data analysis, automation, and engineering applications',
      tags: ['#python', '#programming', '#data'],
      level: 'Intermediate',
      rating: 4.7,
      students: 12,
      availability: 'Flexible',
      price: 'Skill Exchange'
    },
    {
      name: 'MATLAB',
      description: 'Mathematical computing and engineering simulations',
      tags: ['#matlab', '#simulation', '#analysis'],
      level: 'Advanced',
      rating: 4.8,
      students: 15,
      availability: 'Weekdays 7-9 PM',
      price: 'Skill Exchange'
    }
  ]);

  const [tradeHistory, setTradeHistory] = useState({
    pending: [
      {
        id: 1,
        type: 'received',
        from: 'Alex Thompson',
        skill: 'JavaScript',
        wantsToLearn: 'Mechanical Design',
        date: '2 hours ago'
      },
      {
        id: 2,
        type: 'sent',
        to: 'Maria Rodriguez',
        skill: 'Spanish',
        offering: 'Project Management',
        date: '1 day ago'
      }
    ],
    ongoing: [
      {
        id: 3,
        partner: 'David Kim',
        skill: 'Guitar Lessons',
        nextSession: 'Tomorrow 7 PM',
        progress: 60
      }
    ],
    completed: [
      {
        id: 4,
        partner: 'Emma Davis',
        skill: 'Photography',
        learned: 'CAD Design',
        rating: 5,
        date: '1 week ago'
      },
      {
        id: 5,
        partner: 'James Wilson',
        skill: 'Web Development',
        learned: 'MATLAB',
        rating: 5,
        date: '2 weeks ago'
      }
    ]
  });

  const [mediaGallery, setMediaGallery] = useState([
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      title: 'Mechanical Design Project',
      description: 'CAD model of automotive component design'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      title: 'Research Documentation',
      description: 'Technical research paper on sustainable engineering'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      title: 'Team Project',
      description: 'Leading engineering team project at IIT Madras'
    }
  ]);

  const [endorsements, setEndorsements] = useState([
    {
      from: 'Prof. Rajesh Kumar',
      skill: 'Mechanical Engineering',
      comment: 'Exceptional understanding of engineering principles and excellent problem-solving skills.',
      rating: 5
    },
    {
      from: 'Sarah Wilson',
      skill: 'Project Management',
      comment: 'Great leadership and organizational skills. Very reliable team member.',
      rating: 5
    },
    {
      from: 'Alex Thompson',
      skill: 'Python Programming',
      comment: 'Clear explanations and practical approach to programming concepts.',
      rating: 5
    }
  ]);

  // State for new item forms
  const [newSkill, setNewSkill] = useState({
    name: '', description: '', tags: '', level: 'Beginner', rating: 0, students: 0, availability: '', price: ''
  });
  const [newMedia, setNewMedia] = useState({
    url: '', title: '', description: ''
  });
  const [newEndorsement, setNewEndorsement] = useState({
    from: '', skill: '', comment: '', rating: 5
  });

  // Profile editing state
  const [editData, setEditData] = useState({
    name: user?.name || 'Rutwik Nakkalla',
    username: '@rutwik',
    location: user?.location || 'Chennai, Tamil Nadu, India',
    bio: user?.bio || 'Mechanical Engineering student at IIT Madras with a passion for technology, innovation, and skill sharing. Experienced in project management, research, and development. Love to teach and learn new things through collaborative exchanges.',
    email: user?.email || 'rutwik.nakkalla@gmail.com',
    linkedin: user?.linkedin || 'https://www.linkedin.com/in/rutwik-nakkalla-113me27/',
    github: user?.github || 'https://github.com/RUTWIK113',
    portfolio: user?.portfolio || 'https://rutwik.dev',
    education: user?.education || 'IIT Madras - Mechanical Engineering',
    currentRole: user?.currentRole || 'Student & Developer',
    experience: user?.experience || '3+ years in Engineering & Development',
    skills: user?.skills || [],
    learningGoals: user?.learningGoals || [],
    availability: 'Weekdays 6-9 PM IST',
    isEmailPublic: false,
    isProfilePublic: true,
    allowLinkedInConnect: true,
    avatar: user?.avatar || 'https://api.dicebear.com/7.x/notionists/svg?seed=RutwikNakkalla'
  });

  const linkedInMessageTemplates = [
    "Hi Rutwik! I found your profile on Trade My Skill and would love to connect. I'm interested in learning more about mechanical engineering and potentially collaborating.",
    "Hello! I'm also part of the Trade My Skill community. I'd love to connect and explore potential skill exchange opportunities with you.",
    "Hi there! I noticed we have complementary skills on Trade My Skill. Would you be interested in connecting on LinkedIn to discuss potential collaboration?",
    "Hello Rutwik! I'm reaching out from Trade My Skill. I'd love to connect and learn more about your engineering background and projects at IIT Madras."
  ];

  // --- Handlers for CRUD operations ---

  // Skills
  const handleAddSkill = () => {
    setSkillsOffered([...skillsOffered, {
      ...newSkill,
      tags: newSkill.tags.split(',').map(t => t.trim()),
      rating: parseFloat(newSkill.rating),
      students: parseInt(newSkill.students)
    }]);
    setNewSkill({ name: '', description: '', tags: '', level: 'Beginner', rating: 0, students: 0, availability: '', price: '' });
    setShowAddSkillModal(false);
  };
  const handleDeleteSkill = (idx) => {
    setSkillsOffered(skillsOffered.filter((_, i) => i !== idx));
  };

  // Media
  const handleAddMedia = () => {
    setMediaGallery([...mediaGallery, { ...newMedia, type: 'image' }]);
    setNewMedia({ url: '', title: '', description: '' });
    setShowAddMediaModal(false);
  };
  const handleDeleteMedia = (idx) => {
    setMediaGallery(mediaGallery.filter((_, i) => i !== idx));
  };

  // Endorsements
  const handleAddEndorsement = () => {
    setEndorsements([...endorsements, { ...newEndorsement }]);
    setNewEndorsement({ from: '', skill: '', comment: '', rating: 5 });
    setShowAddEndorsementModal(false);
  };
  const handleDeleteEndorsement = (idx) => {
    setEndorsements(endorsements.filter((_, i) => i !== idx));
  };

  // Profile
  const handleSave = () => {
    updateUser({
      name: editData.name,
      skills: editData.skills,
      learningGoals: editData.learningGoals,
      avatar: editData.avatar,
      bio: editData.bio,
      location: editData.location,
      linkedin: editData.linkedin,
      github: editData.github,
      portfolio: editData.portfolio,
      education: editData.education,
      currentRole: editData.currentRole,
      experience: editData.experience
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (newAvatar: string) => {
    setEditData(prev => ({ ...prev, avatar: newAvatar }));
  };

  // LinkedIn
  const handleLinkedInConnect = () => {
    if (!editData.allowLinkedInConnect) {
      alert('LinkedIn connection is not enabled for this profile.');
      return;
    }
    setShowLinkedInModal(true);
  };

  const handleSendLinkedInMessage = () => {
    if (!linkedInMessage.trim()) {
      alert('Please enter a message before connecting.');
      return;
    }
    const linkedInUsername = editData.linkedin.split('/in/')[1]?.replace('/', '') || 'rutwik-nakkalla-113me27';
    const linkedInMessageUrl = `https://www.linkedin.com/messaging/compose/?recipient=${linkedInUsername}&message=${encodeURIComponent(linkedInMessage)}`;
    window.open(linkedInMessageUrl, '_blank');
    setShowLinkedInModal(false);
    setLinkedInMessage('');
  };

  const handleTemplateSelect = (template: string) => {
    setLinkedInMessage(template);
  };

  // --- Render ---
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Profile
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Manage your profile and showcase your skills
              </p>
            </div>
            <Button
              variant={isEditing ? "success" : "primary"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="mt-4 md:mt-0"
            >
              {isEditing ? (
                <>
                  <Shield size={16} className="mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 size={16} className="mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card className="p-4 md:p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <UserAvatar
                      username={editData.name || 'RutwikNakkalla'}
                      currentAvatar={editData.avatar}
                      size="xl"
                      editable={isEditing}
                      onAvatarChange={handleAvatarChange}
                      className="mx-auto"
                    />
                  </div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="text-center font-semibold text-sm md:text-base"
                      />
                      <Input
                        value={editData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className="text-center text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {editData.name}
                      </h2>
                      <p className="text-sm md:text-base text-primary-600 dark:text-primary-400 mb-2">
                        {editData.username}
                      </p>
                    </>
                  )}
                  <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <MapPin size={12} md:size={14} />
                    {isEditing ? (
                      <Input
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="text-center text-xs md:text-sm"
                      />
                    ) : (
                      <span>{editData.location}</span>
                    )}
                  </div>
                  {/* Education & Role */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      <GraduationCap size={12} md:size={14} />
                      <span>{editData.education}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      <Briefcase size={12} md:size={14} />
                      <span>{editData.currentRole}</span>
                    </div>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={editData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white text-xs md:text-sm"
                      rows={4}
                    />
                  ) : (
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {editData.bio}
                    </p>
                  )}
                  <div className="flex justify-center space-x-2 md:space-x-3">
                    <Button variant="primary" size="sm">
                      <MessageSquare size={14} className="mr-1 md:mr-2" />
                      <span className="hidden md:inline">Message</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserPlus size={14} className="mr-1 md:mr-2" />
                      <span className="hidden md:inline">Connect</span>
                    </Button>
                  </div>
                </div>
                {/* Contact Info */}
                <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs md:text-sm">
                      <Mail size={12} md:size={14} className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {editData.isEmailPublic ? editData.email : 'Private'}
                      </span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => handleInputChange('isEmailPublic', !editData.isEmailPublic)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {editData.isEmailPublic ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                    )}
                  </div>
                  {/* LinkedIn Field */}
                  {isEditing && (
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        LinkedIn Profile URL
                      </label>
                      <Input
                        value={editData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="https://www.linkedin.com/in/your-profile"
                        className="text-xs"
                      />
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-600 dark:text-gray-400">
                          Allow LinkedIn connections
                        </label>
                        <button
                          onClick={() => handleInputChange('allowLinkedInConnect', !editData.allowLinkedInConnect)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            editData.allowLinkedInConnect ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              editData.allowLinkedInConnect ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Social Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {editData.allowLinkedInConnect && (
                        <motion.button
                          onClick={handleLinkedInConnect}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Linkedin size={16} md:size={18} />
                          <span className="text-xs">Connect</span>
                          <ExternalLink size={12} />
                        </motion.button>
                      )}
                      <a href={editData.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        <Github size={16} md:size={18} />
                      </a>
                      <a href={editData.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                        <Globe size={16} md:size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
              {/* Stats Card */}
              <Card className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Profile Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Skills Taught</span>
                    <span className="font-medium text-primary-600 dark:text-primary-400">{skillsOffered.length}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Skills Learned</span>
                    <span className="font-medium text-secondary-600 dark:text-secondary-400">8</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Hours</span>
                    <span className="font-medium text-accent-600 dark:text-accent-400">52</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star size={12} md:size={14} className="text-yellow-400 fill-current" />
                      <span className="font-medium text-yellow-600">4.9</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {/* Right Column - Skills & Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skills Offered */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                    Skills Offered
                  </h3>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setShowAddSkillModal(true)}>
                      <UserPlus size={14} className="mr-2" />
                      Add Skill
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {skillsOffered.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl relative"
                    >
                      {isEditing && (
                        <button
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteSkill(index)}
                          title="Delete Skill"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                          {skill.name}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          skill.level === 'Expert' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                          skill.level === 'Advanced' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                          'bg-yellow-100 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {skill.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {skill.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star size={12} className="text-yellow-400 fill-current" />
                          <span>{skill.rating}</span>
                        </div>
                        <span>{skill.students} students</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">{skill.availability}</span>
                        </div>
                        <span className="font-medium text-primary-600 dark:text-primary-400">
                          {skill.price}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
              {/* Trade History */}
              <Card className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Trade History
                </h3>
                <div className="space-y-6">
                  {/* Pending Requests */}
                  <div>
                    <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-white mb-3">
                      Pending Requests ({tradeHistory.pending.length})
                    </h4>
                    <div className="space-y-3">
                      {tradeHistory.pending.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div>
                            <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                              {request.type === 'received' ? `From ${request.from}` : `To ${request.to}`}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {request.type === 'received'
                                ? `Wants to learn ${request.wantsToLearn} for ${request.skill}`
                                : `Offering ${request.offering} for ${request.skill}`
                              }
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{request.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Ongoing Sessions */}
                  <div>
                    <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-white mb-3">
                      Ongoing Sessions ({tradeHistory.ongoing.length})
                    </h4>
                    <div className="space-y-3">
                      {tradeHistory.ongoing.map((session) => (
                        <div key={session.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                              {session.skill} with {session.partner}
                            </p>
                            <span className="text-xs text-blue-600 dark:text-blue-400">{session.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${session.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Next: {session.nextSession}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Completed Trades */}
                  <div>
                    <h4 className="text-sm md:text-base font-medium text-gray-900 dark:text-white mb-3">
                      Completed Trades ({tradeHistory.completed.length})
                    </h4>
                    <div className="space-y-3">
                      {tradeHistory.completed.map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div>
                            <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                              {trade.skill} ↔ {trade.learned} with {trade.partner}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              {[...Array(trade.rating)].map((_, i) => (
                                <Star key={i} size={12} className="text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{trade.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              {/* Media Gallery */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                    Portfolio & Work Samples
                  </h3>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setShowAddMediaModal(true)}>
                      <Camera size={14} className="mr-2" />
                      Add Media
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaGallery.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl"
                    >
                      {isEditing && (
                        <button
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
                          onClick={() => handleDeleteMedia(index)}
                          title="Delete Media"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-3 text-white">
                          <h4 className="font-medium text-xs md:text-sm">{item.title}</h4>
                          <p className="text-xs opacity-90">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
              {/* Endorsements */}
              <Card className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                    Endorsements & Reviews
                  </h3>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={() => setShowAddEndorsementModal(true)}>
                      <Award size={14} className="mr-2" />
                      Add Endorsement
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  {endorsements.map((endorsement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl relative"
                    >
                      {isEditing && (
                        <button
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteEndorsement(index)}
                          title="Delete Endorsement"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                            {endorsement.from}
                          </h4>
                          <p className="text-xs md:text-sm text-primary-600 dark:text-primary-400">
                            {endorsement.skill}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(endorsement.rating)].map((_, i) => (
                            <Star key={i} size={12} md:size={14} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        "{endorsement.comment}"
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Add Skill Modal */}
      <Modal
        isOpen={showAddSkillModal}
        onClose={() => setShowAddSkillModal(false)}
        title="Add Skill"
      >
        <div className="space-y-3">
          <Input placeholder="Skill Name" value={newSkill.name} onChange={e => setNewSkill(s => ({ ...s, name: e.target.value }))} />
          <Input placeholder="Description" value={newSkill.description} onChange={e => setNewSkill(s => ({ ...s, description: e.target.value }))} />
          <Input placeholder="Tags (comma separated)" value={newSkill.tags} onChange={e => setNewSkill(s => ({ ...s, tags: e.target.value }))} />
          <Input placeholder="Level (Beginner/Intermediate/Advanced/Expert)" value={newSkill.level} onChange={e => setNewSkill(s => ({ ...s, level: e.target.value }))} />
          <Input placeholder="Rating" type="number" value={newSkill.rating} onChange={e => setNewSkill(s => ({ ...s, rating: e.target.value }))} />
          <Input placeholder="Students" type="number" value={newSkill.students} onChange={e => setNewSkill(s => ({ ...s, students: e.target.value }))} />
          <Input placeholder="Availability" value={newSkill.availability} onChange={e => setNewSkill(s => ({ ...s, availability: e.target.value }))} />
          <Input placeholder="Price" value={newSkill.price} onChange={e => setNewSkill(s => ({ ...s, price: e.target.value }))} />
          <div className="flex space-x-2 mt-2">
            <Button variant="outline" onClick={() => setShowAddSkillModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddSkill}>Add</Button>
          </div>
        </div>
      </Modal>

      {/* Add Media Modal */}
      <Modal
        isOpen={showAddMediaModal}
        onClose={() => setShowAddMediaModal(false)}
        title="Add Media"
      >
        <div className="space-y-3">
          <Input placeholder="Image URL" value={newMedia.url} onChange={e => setNewMedia(m => ({ ...m, url: e.target.value }))} />
          <Input placeholder="Title" value={newMedia.title} onChange={e => setNewMedia(m => ({ ...m, title: e.target.value }))} />
          <Input placeholder="Description" value={newMedia.description} onChange={e => setNewMedia(m => ({ ...m, description: e.target.value }))} />
          <div className="flex space-x-2 mt-2">
            <Button variant="outline" onClick={() => setShowAddMediaModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddMedia}>Add</Button>
          </div>
        </div>
      </Modal>

      {/* Add Endorsement Modal */}
      <Modal
        isOpen={showAddEndorsementModal}
        onClose={() => setShowAddEndorsementModal(false)}
        title="Add Endorsement"
      >
        <div className="space-y-3">
          <Input placeholder="From (Name)" value={newEndorsement.from} onChange={e => setNewEndorsement(e0 => ({ ...e0, from: e.target.value }))} />
          <Input placeholder="Skill" value={newEndorsement.skill} onChange={e => setNewEndorsement(e0 => ({ ...e0, skill: e.target.value }))} />
          <Input placeholder="Comment" value={newEndorsement.comment} onChange={e => setNewEndorsement(e0 => ({ ...e0, comment: e.target.value }))} />
          <Input placeholder="Rating (1-5)" type="number" value={newEndorsement.rating} onChange={e => setNewEndorsement(e0 => ({ ...e0, rating: parseInt(e.target.value) }))} />
          <div className="flex space-x-2 mt-2">
            <Button variant="outline" onClick={() => setShowAddEndorsementModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddEndorsement}>Add</Button>
          </div>
        </div>
      </Modal>

      {/* LinkedIn Connection Modal */}
      <Modal
        isOpen={showLinkedInModal}
        onClose={() => setShowLinkedInModal(false)}
        title="Connect on LinkedIn"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Linkedin size={24} className="text-blue-600" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Connect with {editData.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Send a personalized connection request on LinkedIn
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message Templates
            </label>
            <div className="space-y-2 mb-4">
              {linkedInMessageTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleTemplateSelect(template)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors text-sm ${
                    linkedInMessage === template
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                  }`}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Personal Message
            </label>
            <textarea
              value={linkedInMessage}
              onChange={(e) => setLinkedInMessage(e.target.value)}
              placeholder="Write a personalized message..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
              rows={4}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This message will be included in your LinkedIn connection request.
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowLinkedInModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSendLinkedInMessage}
              disabled={!linkedInMessage.trim()}
              className="flex-1"
            >
              <Linkedin size={16} className="mr-2" />
              Connect on LinkedIn
            </Button>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            This will open LinkedIn in a new tab with your message pre-filled.
          </div>
        </div>
      </Modal>
    </div>
  );
};
