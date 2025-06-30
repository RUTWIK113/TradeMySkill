import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Globe, 
  Mail,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  Save,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sidebar } from '../components/layout/Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, updateUser, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'account'>('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [profileSettings, setProfileSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    username: '@rutwik',
    bio: 'Passionate about technology and skill sharing.',
    location: 'Hyderabad, India',
    timezone: 'Asia/Kolkata',
    language: 'English',
    isProfilePublic: true,
    showEmail: false,
    showLocation: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    friendRequests: true,
    sessionReminders: true,
    skillMatches: true,
    weeklyDigest: true,
    marketingEmails: false,
    soundEnabled: true,
    desktopNotifications: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    skillsVisibility: 'public',
    activityStatus: true,
    searchable: true,
    allowMessages: 'everyone',
    allowFriendRequests: 'everyone',
    dataSharing: false,
    analyticsOptOut: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'account', label: 'Account', icon: Lock }
  ];

  const handleProfileSave = () => {
    updateUser({
      name: profileSettings.name,
      email: profileSettings.email
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    console.log('Account deletion requested');
    logout();
  };

  const handleExportData = () => {
    // In a real app, this would trigger a data export
    console.log('Data export requested');
  };

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Manage your account preferences and privacy settings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors text-sm md:text-base ${
                          activeTab === tab.id
                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon size={18} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Profile Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <Input
                          value={profileSettings.name}
                          onChange={(e) => setProfileSettings(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Username
                        </label>
                        <Input
                          value={profileSettings.username}
                          onChange={(e) => setProfileSettings(prev => ({ ...prev, username: e.target.value }))}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={profileSettings.email}
                          onChange={(e) => setProfileSettings(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          value={profileSettings.bio}
                          onChange={(e) => setProfileSettings(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Location
                        </label>
                        <Input
                          value={profileSettings.location}
                          onChange={(e) => setProfileSettings(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Timezone
                        </label>
                        <select
                          value={profileSettings.timezone}
                          onChange={(e) => setProfileSettings(prev => ({ ...prev, timezone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                          <option value="America/New_York">America/New_York (EST)</option>
                          <option value="Europe/London">Europe/London (GMT)</option>
                          <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Visibility Settings
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">Public Profile</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Allow others to find and view your profile
                            </p>
                          </div>
                          <button
                            onClick={() => setProfileSettings(prev => ({ ...prev, isProfilePublic: !prev.isProfilePublic }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              profileSettings.isProfilePublic ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                profileSettings.isProfilePublic ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">Show Email</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Display your email address on your profile
                            </p>
                          </div>
                          <button
                            onClick={() => setProfileSettings(prev => ({ ...prev, showEmail: !prev.showEmail }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              profileSettings.showEmail ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                profileSettings.showEmail ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button variant="primary" onClick={handleProfileSave}>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Notification Preferences
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Email Notifications
                        </h4>
                        <div className="space-y-4">
                          {[
                            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                            { key: 'friendRequests', label: 'Friend Requests', desc: 'Get notified when someone sends you a friend request' },
                            { key: 'sessionReminders', label: 'Session Reminders', desc: 'Reminders for upcoming skill exchange sessions' },
                            { key: 'skillMatches', label: 'Skill Matches', desc: 'Notifications when new skill matches are found' },
                            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of your activity and opportunities' },
                            { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional emails and feature updates' }
                          ].map((setting) => (
                            <div key={setting.key} className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">{setting.label}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                              </div>
                              <button
                                onClick={() => setNotificationSettings(prev => ({ 
                                  ...prev, 
                                  [setting.key]: !prev[setting.key as keyof typeof prev] 
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  notificationSettings[setting.key as keyof typeof notificationSettings] 
                                    ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    notificationSettings[setting.key as keyof typeof notificationSettings] 
                                      ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Push Notifications
                        </h4>
                        <div className="space-y-4">
                          {[
                            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications on your device' },
                            { key: 'soundEnabled', label: 'Sound', desc: 'Play sound for notifications' },
                            { key: 'desktopNotifications', label: 'Desktop Notifications', desc: 'Show notifications on desktop' }
                          ].map((setting) => (
                            <div key={setting.key} className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">{setting.label}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                              </div>
                              <button
                                onClick={() => setNotificationSettings(prev => ({ 
                                  ...prev, 
                                  [setting.key]: !prev[setting.key as keyof typeof prev] 
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  notificationSettings[setting.key as keyof typeof notificationSettings] 
                                    ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    notificationSettings[setting.key as keyof typeof notificationSettings] 
                                      ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'privacy' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Privacy & Security
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Profile Visibility
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Who can see your profile?
                            </label>
                            <select
                              value={privacySettings.profileVisibility}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                              <option value="public">Everyone</option>
                              <option value="friends">Friends Only</option>
                              <option value="private">Only Me</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Who can message you?
                            </label>
                            <select
                              value={privacySettings.allowMessages}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowMessages: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                              <option value="everyone">Everyone</option>
                              <option value="friends">Friends Only</option>
                              <option value="none">No One</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Activity & Data
                        </h4>
                        <div className="space-y-4">
                          {[
                            { key: 'activityStatus', label: 'Show Activity Status', desc: 'Let others see when you\'re online' },
                            { key: 'searchable', label: 'Searchable Profile', desc: 'Allow others to find you in search results' },
                            { key: 'dataSharing', label: 'Data Sharing', desc: 'Share anonymized data for platform improvement' },
                            { key: 'analyticsOptOut', label: 'Opt-out of Analytics', desc: 'Disable usage analytics tracking' }
                          ].map((setting) => (
                            <div key={setting.key} className="flex items-center justify-between">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">{setting.label}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                              </div>
                              <button
                                onClick={() => setPrivacySettings(prev => ({ 
                                  ...prev, 
                                  [setting.key]: !prev[setting.key as keyof typeof prev] 
                                }))}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  privacySettings[setting.key as keyof typeof privacySettings] 
                                    ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    privacySettings[setting.key as keyof typeof privacySettings] 
                                      ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'account' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-6">
                      Account Settings
                    </h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Appearance
                        </h4>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="flex items-center space-x-3">
                            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white">Theme</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Current: {theme === 'light' ? 'Light' : 'Dark'} mode
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" onClick={toggleTheme}>
                            Switch to {theme === 'light' ? 'Dark' : 'Light'}
                          </Button>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h4 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Data Management
                        </h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <Download size={20} className="text-blue-600" />
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">Export Data</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Download a copy of your data
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" onClick={handleExportData}>
                              Export
                            </Button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <Upload size={20} className="text-green-600" />
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">Import Data</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Import data from another platform
                                </p>
                              </div>
                            </div>
                            <Button variant="outline">
                              Import
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h4 className="text-base md:text-lg font-medium text-red-600 dark:text-red-400 mb-4">
                          Danger Zone
                        </h4>
                        <div className="space-y-4">
                          <div className="p-4 border border-red-200 dark:border-red-800 rounded-xl bg-red-50 dark:bg-red-900/20">
                            <div className="flex items-start space-x-3">
                              <AlertTriangle size={20} className="text-red-600 dark:text-red-400 mt-0.5" />
                              <div className="flex-1">
                                <h5 className="font-medium text-red-900 dark:text-red-100">Delete Account</h5>
                                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                                  Permanently delete your account and all associated data. This action cannot be undone.
                                </p>
                                {!showDeleteConfirm ? (
                                  <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={() => setShowDeleteConfirm(true)}
                                  >
                                    <Trash2 size={14} className="mr-2" />
                                    Delete Account
                                  </Button>
                                ) : (
                                  <div className="space-y-3">
                                    <p className="text-sm font-medium text-red-900 dark:text-red-100">
                                      Are you absolutely sure? This action cannot be undone.
                                    </p>
                                    <div className="flex space-x-3">
                                      <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={handleDeleteAccount}
                                      >
                                        Yes, Delete My Account
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => setShowDeleteConfirm(false)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};