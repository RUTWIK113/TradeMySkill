import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Clock, 
  Users, 
  MessageSquare,
  UserPlus,
  Heart
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Sidebar } from '../components/layout/Sidebar';
import { useApp, rutwikProfile } from '../contexts/AppContext';

export const FriendRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'friends'>('friends');
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user, acceptFriendRequest, rejectFriendRequest, setCurrentPage } = useApp();

  // Mock data - in a real app, this would come from your backend
  const mockReceivedRequests = [
    {
      id: 1,
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'JavaScript',
      wantsToLearn: 'Photography',
      message: "Hi! I'd love to learn photography from you and can teach you JavaScript in return.",
      timestamp: '2 hours ago',
      mutualFriends: 3
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Spanish',
      wantsToLearn: 'UI/UX Design',
      message: "Your design portfolio is amazing! I'd love to exchange Spanish lessons for design tips.",
      timestamp: '5 hours ago',
      mutualFriends: 1
    },
    {
      id: 3,
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Guitar',
      wantsToLearn: 'React',
      message: "I noticed we have complementary skills. Would you like to exchange knowledge?",
      timestamp: '1 day ago',
      mutualFriends: 0
    }
  ];

  const mockSentRequests = [
    {
      id: 4,
      name: 'Sarah Wilson',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Cooking',
      wantsToLearn: 'Photography',
      message: "Hi! I'd love to learn photography and can teach you cooking in return.",
      timestamp: '3 hours ago',
      status: 'pending'
    },
    {
      id: 5,
      name: 'James Chen',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Marketing',
      wantsToLearn: 'React',
      message: "Your React skills look impressive! I can help with marketing strategies.",
      timestamp: '1 day ago',
      status: 'pending'
    }
  ];

  // Load friends from localStorage, including Rutwik as the first friend
  useEffect(() => {
    const loadFriends = () => {
      const savedFriends = JSON.parse(localStorage.getItem('userFriends') || '[]');
      
      // Always include Rutwik as the first friend if user is authenticated
      if (user && !savedFriends.find((f: any) => f.id === rutwikProfile.id)) {
        const friendsWithRutwik = [
          {
            ...rutwikProfile,
            lastActive: 'Online now',
            exchangeCount: 0,
            friendshipDate: new Date().toISOString(),
            status: 'accepted'
          },
          ...savedFriends
        ];
        setFriends(friendsWithRutwik);
        localStorage.setItem('userFriends', JSON.stringify(friendsWithRutwik));
      } else {
        setFriends(savedFriends);
      }
    };

    loadFriends();
    setReceivedRequests(mockReceivedRequests);
    setSentRequests(mockSentRequests);
  }, [user]);

  const handleAcceptRequest = async (id: number) => {
    try {
      await acceptFriendRequest(id.toString());
      setReceivedRequests(prev => prev.filter(req => req.id !== id));
      // Add to friends list
      const acceptedRequest = mockReceivedRequests.find(req => req.id === id);
      if (acceptedRequest) {
        const newFriend = {
          ...acceptedRequest,
          lastActive: 'Just connected',
          exchangeCount: 0,
          friendshipDate: new Date().toISOString(),
          status: 'accepted'
        };
        setFriends(prev => {
          const updated = [...prev, newFriend];
          localStorage.setItem('userFriends', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (id: number) => {
    try {
      await rejectFriendRequest(id.toString());
      setReceivedRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleCancelRequest = (id: number) => {
    setSentRequests(prev => prev.filter(req => req.id !== id));
  };

  const tabs = [
    { id: 'friends', label: 'Friends', count: friends.length },
    { id: 'received', label: 'Received', count: receivedRequests.length },
    { id: 'sent', label: 'Sent', count: sentRequests.length }
  ];

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Friends & Connections
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your skill exchange connections and friend requests
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'friends' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {friends.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No friends yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start connecting with people to build your skill exchange network!
                    </p>
                    <Button 
                      variant="primary" 
                      className="mt-4"
                      onClick={() => setCurrentPage('explore')}
                    >
                      Explore Skills
                    </Button>
                  </div>
                ) : (
                  friends.map((friend, index) => (
                    <motion.div
                      key={friend.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card hover className="p-6 text-center relative">
                        {/* Special badge for Rutwik */}
                        {friend.id === rutwikProfile.id && (
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Creator ✨
                          </div>
                        )}
                        
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {friend.name}
                        </h3>
                        
                        {friend.id === rutwikProfile.id && (
                          <p className="text-xs text-orange-600 dark:text-orange-400 mb-2 font-medium">
                            🎓 IIT Madras • Platform Creator
                          </p>
                        )}
                        
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <p>Teaches: <strong>{friend.skills?.[0] || friend.skill}</strong></p>
                          <p>Learning: <strong>{friend.learningGoals?.[0] || friend.wantsToLearn}</strong></p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <span>{friend.lastActive}</span>
                          <span>•</span>
                          <span>{friend.exchangeCount} exchanges</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setCurrentPage('chat')}
                          >
                            <MessageSquare size={14} className="mr-1" />
                            Chat
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setCurrentPage('schedule')}
                          >
                            Schedule
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'received' && (
              <div className="space-y-4">
                {receivedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No friend requests
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      When people send you friend requests, they'll appear here.
                    </p>
                  </div>
                ) : (
                  receivedRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={request.avatar}
                            alt={request.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {request.name}
                              </h3>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {request.timestamp}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                              <span>Teaches: <strong>{request.skill}</strong></span>
                              <span>Wants: <strong>{request.wantsToLearn}</strong></span>
                              {request.mutualFriends > 0 && (
                                <span className="flex items-center space-x-1">
                                  <Users size={14} />
                                  <span>{request.mutualFriends} mutual friends</span>
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                              "{request.message}"
                            </p>
                            
                            <div className="flex space-x-3">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleAcceptRequest(request.id)}
                              >
                                <Check size={16} className="mr-2" />
                                Accept
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <X size={16} className="mr-2" />
                                Decline
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => setCurrentPage('chat')}>
                                <MessageSquare size={16} className="mr-2" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'sent' && (
              <div className="space-y-4">
                {sentRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No pending requests
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Friend requests you send will appear here.
                    </p>
                  </div>
                ) : (
                  sentRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={request.avatar}
                            alt={request.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {request.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <Clock size={14} className="text-yellow-500" />
                                <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                                  Pending
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                              <span>Teaches: <strong>{request.skill}</strong></span>
                              <span>Wants: <strong>{request.wantsToLearn}</strong></span>
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                              "{request.message}"
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Sent {request.timestamp}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelRequest(request.id)}
                              >
                                Cancel Request
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};