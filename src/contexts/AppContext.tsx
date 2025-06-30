import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar: string;
  skills: string[];
  learningGoals: string[];
  bio?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  experience?: string;
  education?: string;
  currentRole?: string;
  profileCompleted: boolean;
}

interface AppContextType {
  user: User | null;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
  updateUser: (updates: Partial<User>) => void;
  sendFriendRequest: (recipientId: string, message: string) => Promise<void>;
  acceptFriendRequest: (requestId: string) => Promise<void>;
  rejectFriendRequest: (requestId: string) => Promise<void>;
  sendMessage: (recipientId: string, content: string) => Promise<void>;
  completeProfile: (profileData: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Helper function to check if a string is a valid UUID format
const isValidUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// Pre-built Rutwik user profile - this will be added as a friend after user completes profile
export const rutwikProfile: User = {
  id: 'rutwik-nakkalla-113me27',
  name: 'Rutwik Nakkalla',
  email: 'rutwik.nakkalla@gmail.com',
  username: '@rutwik',
  avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=RutwikNakkalla',
  bio: 'Mechanical Engineering student at IIT Madras with a passion for technology, innovation, and skill sharing. Experienced in project management, research, and development. Love to teach and learn new things through collaborative exchanges.',
  location: 'Chennai, Tamil Nadu, India',
  linkedin: 'https://www.linkedin.com/in/rutwik-nakkalla-113me27/',
  github: 'https://github.com/RUTWIK113',
  portfolio: 'https://rutwik.dev',
  experience: '3+ years in Engineering & Development',
  education: 'IIT Madras - Mechanical Engineering',
  currentRole: 'Student & Developer',
  skills: [
    'Mechanical Engineering',
    'Project Management', 
    'Research & Development',
    'Problem Solving',
    'CAD Design',
    'MATLAB',
    'Python Programming',
    'Data Analysis',
    'Technical Writing',
    'Team Leadership',
    'Innovation',
    'Product Development'
  ],
  learningGoals: [
    'Advanced Machine Learning',
    'Web Development',
    'UI/UX Design',
    'Digital Marketing',
    'Spanish Language',
    'Photography',
    'Guitar Playing',
    'Public Speaking',
    'Entrepreneurship',
    'Finance & Investment'
  ],
  profileCompleted: true
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Fetch user profile from database
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const userData: User = {
              id: profile.id,
              name: profile.name || '',
              email: profile.email,
              username: profile.username || '',
              avatar: profile.avatar_url || '',
              skills: profile.skills || [],
              learningGoals: profile.learning_goals || [],
              bio: profile.bio || '',
              location: profile.location || '',
              linkedin: profile.linkedin || '',
              github: profile.github || '',
              portfolio: profile.portfolio || '',
              experience: profile.experience || '',
              education: profile.education || '',
              currentRole: profile.current_role || '',
              profileCompleted: profile.profile_completed || false
            };
            
            setUser(userData);
            
            // Redirect based on profile completion
            if (!userData.profileCompleted) {
              setCurrentPage('profile-setup');
            } else {
              setCurrentPage('dashboard');
            }
          }
        } else {
          // Check localStorage for saved user
          const savedUser = localStorage.getItem('tradeMySkillUser');
          if (savedUser) {
            try {
              const userData = JSON.parse(savedUser);
              setUser(userData);
              
              if (!userData.profileCompleted) {
                setCurrentPage('profile-setup');
              } else {
                setCurrentPage('dashboard');
              }
            } catch (error) {
              console.error('Error loading saved user:', error);
              localStorage.removeItem('tradeMySkillUser');
            }
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            const userData: User = {
              id: profile.id,
              name: profile.name || '',
              email: profile.email,
              username: profile.username || '',
              avatar: profile.avatar_url || '',
              skills: profile.skills || [],
              learningGoals: profile.learning_goals || [],
              bio: profile.bio || '',
              location: profile.location || '',
              linkedin: profile.linkedin || '',
              github: profile.github || '',
              portfolio: profile.portfolio || '',
              experience: profile.experience || '',
              education: profile.education || '',
              currentRole: profile.current_role || '',
              profileCompleted: profile.profile_completed || false
            };
            
            setUser(userData);
            
            if (!userData.profileCompleted) {
              setCurrentPage('profile-setup');
            } else {
              setCurrentPage('dashboard');
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setCurrentPage('landing');
          localStorage.removeItem('tradeMySkillUser');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (userData: User) => {
    try {
      setUser(userData);
      
      // Save to localStorage for persistence
      localStorage.setItem('tradeMySkillUser', JSON.stringify(userData));
      
      // Redirect based on profile completion
      if (!userData.profileCompleted) {
        setCurrentPage('profile-setup');
      } else {
        setCurrentPage('dashboard');
        
        // Add Rutwik as first friend if profile is completed
        const friends = JSON.parse(localStorage.getItem('userFriends') || '[]');
        if (!friends.find((f: any) => f.id === rutwikProfile.id)) {
          friends.push({
            ...rutwikProfile,
            friendshipDate: new Date().toISOString(),
            status: 'accepted'
          });
          localStorage.setItem('userFriends', JSON.stringify(friends));
        }
      }
      
      // Only save to Supabase if the user ID is a valid UUID (real Supabase user)
      if (isValidUUID(userData.id)) {
        try {
          await supabase.from('users').upsert({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            username: userData.username,
            avatar_url: userData.avatar,
            skills: userData.skills,
            learning_goals: userData.learningGoals,
            bio: userData.bio,
            location: userData.location,
            linkedin: userData.linkedin,
            github: userData.github,
            portfolio: userData.portfolio,
            experience: userData.experience,
            education: userData.education,
            current_role: userData.currentRole,
            profile_completed: userData.profileCompleted
          });
        } catch (error) {
          console.error('Error saving to Supabase:', error);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const completeProfile = async (profileData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { 
      ...user, 
      ...profileData, 
      profileCompleted: true 
    };
    
    setUser(updatedUser);
    localStorage.setItem('tradeMySkillUser', JSON.stringify(updatedUser));
    
    // Add Rutwik as first friend after profile completion
    const friends = JSON.parse(localStorage.getItem('userFriends') || '[]');
    if (!friends.find((f: any) => f.id === rutwikProfile.id)) {
      friends.push({
        ...rutwikProfile,
        friendshipDate: new Date().toISOString(),
        status: 'accepted'
      });
      localStorage.setItem('userFriends', JSON.stringify(friends));
    }
    
    // Save to Supabase if valid UUID
    if (isValidUUID(user.id)) {
      try {
        await supabase.from('users').update({
          ...profileData,
          profile_completed: true
        }).eq('id', user.id);
      } catch (error) {
        console.error('Error updating profile in Supabase:', error);
      }
    }
    
    toast.success('Profile completed! Welcome to Trade My Skill! 🎉');
    setCurrentPage('dashboard');
  };

  const logout = async () => {
    try {
      // Show warning toast about chat export
      toast.loading('Exporting chats and logging out...', { duration: 3000 });
      
      // Export and clear chat messages (will be implemented in chat component)
      const chatExportEvent = new CustomEvent('exportAndClearChats');
      window.dispatchEvent(chatExportEvent);
      
      await supabase.auth.signOut();
      setUser(null);
      setCurrentPage('landing');
      localStorage.removeItem('tradeMySkillUser');
      
      // Clear only chat data, keep persistent data
      localStorage.removeItem('chatMessages');
      localStorage.removeItem('currentChatSession');
      
      toast.success('Logged out successfully. Chats have been emailed to you.');
    } catch (error) {
      console.error('Error during logout:', error);
      // Force logout even if Supabase fails
      setUser(null);
      setCurrentPage('landing');
      localStorage.removeItem('tradeMySkillUser');
      localStorage.removeItem('chatMessages');
      localStorage.removeItem('currentChatSession');
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update localStorage
    localStorage.setItem('tradeMySkillUser', JSON.stringify(updatedUser));
    
    // Only update Supabase if the user ID is a valid UUID (real Supabase user)
    if (isValidUUID(user.id)) {
      try {
        await supabase.from('users').update({
          name: updatedUser.name,
          username: updatedUser.username,
          avatar_url: updatedUser.avatar,
          skills: updatedUser.skills,
          learning_goals: updatedUser.learningGoals,
          bio: updatedUser.bio,
          location: updatedUser.location,
          linkedin: updatedUser.linkedin,
          github: updatedUser.github,
          portfolio: updatedUser.portfolio,
          experience: updatedUser.experience,
          education: updatedUser.education,
          current_role: updatedUser.currentRole
        }).eq('id', user.id);
      } catch (error) {
        console.error('Error updating Supabase:', error);
      }
    }
  };

  const sendFriendRequest = async (recipientId: string, message: string) => {
    if (!user) return;
    
    // Only send to Supabase if both users have valid UUIDs
    if (isValidUUID(user.id) && isValidUUID(recipientId)) {
      try {
        await supabase.from('friend_requests').insert({
          sender_id: user.id,
          receiver_id: recipientId,
          message: message
        });
      } catch (error) {
        console.error('Error sending friend request:', error);
      }
    } else {
      console.log('Friend request sent (demo mode)');
    }
  };

  const acceptFriendRequest = async (requestId: string) => {
    if (isValidUUID(requestId)) {
      try {
        await supabase.from('friend_requests').update({
          status: 'accepted'
        }).eq('id', requestId);
      } catch (error) {
        console.error('Error accepting friend request:', error);
      }
    } else {
      console.log('Friend request accepted (demo mode)');
    }
  };

  const rejectFriendRequest = async (requestId: string) => {
    if (isValidUUID(requestId)) {
      try {
        await supabase.from('friend_requests').update({
          status: 'rejected'
        }).eq('id', requestId);
      } catch (error) {
        console.error('Error rejecting friend request:', error);
      }
    } else {
      console.log('Friend request rejected (demo mode)');
    }
  };

  const sendMessage = async (recipientId: string, content: string) => {
    if (!user) return;
    
    try {
      // Store message in session storage for chat export
      const sessionMessages = JSON.parse(sessionStorage.getItem('chatMessages') || '[]');
      const newMessage = {
        id: Date.now(),
        senderId: user.id,
        recipientId,
        content,
        timestamp: new Date().toISOString(),
        senderName: user.name
      };
      sessionMessages.push(newMessage);
      sessionStorage.setItem('chatMessages', JSON.stringify(sessionMessages));
      
      console.log('Message sent and stored for session');
    } catch (error) {
      console.log('Message sent (demo mode)');
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      currentPage,
      setCurrentPage,
      isAuthenticated,
      login,
      logout,
      loading,
      updateUser,
      sendFriendRequest,
      acceptFriendRequest,
      rejectFriendRequest,
      sendMessage,
      completeProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};