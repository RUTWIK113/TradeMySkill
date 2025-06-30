import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Target,
  Star,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  X
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import UserAvatar from '../components/ui/UserAvatar';
import { useApp } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export const ProfileSetup: React.FC = () => {
  const { user, completeProfile } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    username: '',
    bio: '',
    location: '',
    education: '',
    currentRole: '',
    experience: '',
    avatar: user?.avatar || 'https://api.dicebear.com/7.x/notionists/svg?seed=User',
    skills: [] as string[],
    learningGoals: [] as string[],
    linkedin: '',
    github: '',
    portfolio: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const totalSteps = 4;

  const popularSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'UI/UX Design', 'Photography',
    'Spanish', 'French', 'Guitar', 'Piano', 'Cooking', 'Marketing',
    'Data Science', 'Machine Learning', 'Graphic Design', 'Writing',
    'Public Speaking', 'Project Management', 'Excel', 'Photoshop'
  ];

  const popularGoals = [
    'Web Development', 'Mobile Development', 'Data Analysis', 'Digital Marketing',
    'Language Learning', 'Music Production', 'Video Editing', 'Business Strategy',
    'Leadership Skills', 'Creative Writing', 'Photography', 'Cooking',
    'Fitness Training', 'Yoga', 'Meditation', 'Public Speaking'
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (newAvatar: string) => {
    setProfileData(prev => ({ ...prev, avatar: newAvatar }));
  };

  const addSkill = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addGoal = (goal: string) => {
    if (goal && !profileData.learningGoals.includes(goal)) {
      setProfileData(prev => ({
        ...prev,
        learningGoals: [...prev.learningGoals, goal]
      }));
      setNewGoal('');
    }
  };

  const removeGoal = (goal: string) => {
    setProfileData(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.filter(g => g !== goal)
    }));
  };

  const generateUsername = () => {
    if (profileData.name) {
      const username = '@' + profileData.name.toLowerCase().replace(/\s+/g, '');
      setProfileData(prev => ({ ...prev, username }));
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profileData.name.trim() && profileData.username.trim();
      case 2:
        return profileData.location.trim() && profileData.currentRole.trim();
      case 3:
        return profileData.skills.length > 0;
      case 4:
        return profileData.learningGoals.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (canProceed()) {
      completeProfile(profileData);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Let's start with the basics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about yourself so others can find and connect with you
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <UserAvatar
                username={profileData.name || 'User'}
                currentAvatar={profileData.avatar}
                size="xl"
                editable={true}
                onAvatarChange={handleAvatarChange}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <Input
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="text-center"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username *
                </label>
                <div className="flex space-x-2">
                  <Input
                    value={profileData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="@username"
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={generateUsername}>
                    Generate
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio (Optional)
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell others about yourself..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
                  rows={3}
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Where are you from?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Help others understand your background and experience
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Location *
                </label>
                <Input
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Briefcase size={16} className="inline mr-2" />
                  Current Role *
                </label>
                <Input
                  value={profileData.currentRole}
                  onChange={(e) => handleInputChange('currentRole', e.target.value)}
                  placeholder="e.g., Software Developer, Student, Designer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <GraduationCap size={16} className="inline mr-2" />
                  Education (Optional)
                </label>
                <Input
                  value={profileData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="e.g., Computer Science at MIT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Star size={16} className="inline mr-2" />
                  Experience (Optional)
                </label>
                <Input
                  value={profileData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 3+ years in Web Development"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                What skills can you teach?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add skills you're confident teaching to others
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill you can teach"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
                  className="flex-1"
                />
                <Button onClick={() => addSkill(newSkill)} disabled={!newSkill.trim()}>
                  <Plus size={16} />
                </Button>
              </div>

              {profileData.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Your Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-primary-500 hover:text-primary-700"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Popular Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.filter(skill => !profileData.skills.includes(skill)).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                What do you want to learn?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add skills you'd like to learn from others
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Add something you want to learn"
                  onKeyPress={(e) => e.key === 'Enter' && addGoal(newGoal)}
                  className="flex-1"
                />
                <Button onClick={() => addGoal(newGoal)} disabled={!newGoal.trim()}>
                  <Plus size={16} />
                </Button>
              </div>

              {profileData.learningGoals.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">Learning Goals:</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.learningGoals.map((goal, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center px-3 py-1 bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300 rounded-full text-sm"
                      >
                        {goal}
                        <button
                          onClick={() => removeGoal(goal)}
                          className="ml-2 text-secondary-500 hover:text-secondary-700"
                        >
                          <X size={14} />
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Popular Learning Goals:</h4>
                <div className="flex flex-wrap gap-2">
                  {popularGoals.filter(goal => !profileData.learningGoals.includes(goal)).map((goal) => (
                    <button
                      key={goal}
                      onClick={() => addGoal(goal)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-secondary-100 dark:hover:bg-secondary-900 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors"
                    >
                      + {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Social Links (Optional):</h4>
                <div className="space-y-3">
                  <Input
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="LinkedIn profile URL"
                  />
                  <Input
                    value={profileData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    placeholder="GitHub profile URL"
                  />
                  <Input
                    value={profileData.portfolio}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    placeholder="Portfolio website URL"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 md:p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center"
            >
              Next
              <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleComplete}
              disabled={!canProceed()}
              className="flex items-center"
            >
              Complete Profile
              <Check size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};