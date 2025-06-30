import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Star,
  Calendar,
  Bot,
  Download,
  Trash2
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Sidebar } from '../components/layout/Sidebar';
import { TranslationWidget } from '../components/ui/TranslationWidget';
import { useApp } from '../contexts/AppContext';
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
  isBot?: boolean;
  timestamp: string;
}

export const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, sendMessage } = useApp();

  // Bot users that are automatically available
  const botUsers = [
    {
      id: 'bot-1',
      name: 'Alex Thompson (AI)',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'JavaScript',
      isBot: true,
      responses: [
        "That's a great question about JavaScript! Let me explain...",
        "I'd be happy to help you with that concept.",
        "Here's a practical example you might find useful:",
        "Have you tried using the developer console to debug this?",
        "That's exactly the right approach! Keep practicing."
      ]
    },
    {
      id: 'bot-2',
      name: 'Maria Rodriguez (AI)',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Spanish',
      isBot: true,
      responses: [
        "¡Excelente! Your Spanish is improving every day.",
        "Let me help you with that pronunciation.",
        "That's a common mistake, but easy to fix!",
        "¿Te gustaría practicar más conversación?",
        "Your grammar is getting much better!"
      ]
    },
    {
      id: 'bot-3',
      name: 'David Kim (AI)',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Guitar',
      isBot: true,
      responses: [
        "Great chord progression! Try adding a capo for different keys.",
        "Your strumming pattern is improving nicely.",
        "Let's work on that fingerpicking technique.",
        "Remember to keep your wrist relaxed while playing.",
        "That song choice is perfect for your skill level!"
      ]
    }
  ];

  const conversations = [
    {
      id: 1,
      name: 'Alex Thompson (AI)',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      lastMessage: 'Great! Looking forward to our JavaScript session tomorrow.',
      time: '2m ago',
      unread: 2,
      online: true,
      skill: 'JavaScript',
      isBot: true
    },
    {
      id: 2,
      name: 'Maria Rodriguez (AI)',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      lastMessage: '¡Hola! Ready for our Spanish conversation practice?',
      time: '15m ago',
      unread: 0,
      online: true,
      skill: 'Spanish',
      isBot: true
    },
    {
      id: 3,
      name: 'David Kim (AI)',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      lastMessage: 'Thanks for the React tutorial link!',
      time: '1h ago',
      unread: 0,
      online: false,
      skill: 'Guitar',
      isBot: true
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      lastMessage: 'The design mockups look fantastic!',
      time: '2h ago',
      unread: 1,
      online: false,
      skill: 'UI/UX Design',
      isBot: false
    }
  ];

  const initialMessages = [
    {
      id: 1,
      sender: 'Alex Thompson (AI)',
      content: 'Hey! I saw you wanted to learn JavaScript. I\'d love to help you out!',
      time: '10:30 AM',
      isMe: false,
      isBot: true,
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      sender: 'me',
      content: 'That sounds amazing! I\'ve been wanting to dive deeper into React.',
      time: '10:32 AM',
      isMe: true,
      timestamp: new Date().toISOString()
    },
    {
      id: 3,
      sender: 'Alex Thompson (AI)',
      content: 'Perfect! I can teach you React fundamentals, and maybe you can help me with some photography tips?',
      time: '10:35 AM',
      isMe: false,
      isBot: true,
      timestamp: new Date().toISOString()
    },
    {
      id: 4,
      sender: 'me',
      content: 'Absolutely! I\'d love to share what I know about portrait photography.',
      time: '10:37 AM',
      isMe: true,
      timestamp: new Date().toISOString()
    },
    {
      id: 5,
      sender: 'Alex Thompson (AI)',
      content: 'Great! Looking forward to our JavaScript session tomorrow. I\'ll prepare some practical examples.',
      time: '10:40 AM',
      isMe: false,
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ];

  useEffect(() => {
    // Load messages from session storage
    const savedMessages = sessionStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages.length > 0 ? parsedMessages : initialMessages);
      } catch (error) {
        setMessages(initialMessages);
      }
    } else {
      setMessages(initialMessages);
    }

    // Listen for logout event to export chats
    const handleExportChats = () => {
      exportChatsToPDF();
    };

    window.addEventListener('exportAndClearChats', handleExportChats);
    return () => window.removeEventListener('exportAndClearChats', handleExportChats);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Save messages to session storage whenever they change
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const currentChat = conversations.find(chat => chat.id === selectedChat);
  const currentBot = botUsers.find(bot => bot.id === `bot-${selectedChat}`);

  const exportChatsToPDF = async () => {
    if (messages.length === 0) return;

    try {
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.height;
      let yPosition = 20;

      // Title
      pdf.setFontSize(16);
      pdf.text('Trade My Skill - Chat Export', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.text(`Exported on: ${new Date().toLocaleString()}`, 20, yPosition);
      yPosition += 10;

      pdf.text(`User: ${user?.name || 'Unknown'}`, 20, yPosition);
      yPosition += 15;

      // Messages
      pdf.setFontSize(10);
      messages.forEach((msg) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        const sender = msg.isMe ? 'You' : msg.sender;
        const timestamp = new Date(msg.timestamp).toLocaleString();
        
        pdf.text(`[${timestamp}] ${sender}:`, 20, yPosition);
        yPosition += 5;
        
        // Split long messages
        const splitText = pdf.splitTextToSize(msg.content, 170);
        pdf.text(splitText, 25, yPosition);
        yPosition += splitText.length * 5 + 5;
      });

      // Save PDF
      const pdfBlob = pdf.output('blob');
      const pdfBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(pdfBlob);
      });

      // Send email using EmailJS
      if (user?.email) {
        await emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          {
            to_email: user.email,
            user_name: user.name,
            pdf_attachment: pdfBase64,
            export_date: new Date().toLocaleString()
          },
          'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
        );

        toast.success('Chat history emailed successfully!');
      } else {
        // Fallback: download PDF
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `trade-my-skill-chats-${new Date().toISOString().split('T')[0]}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        
        toast.success('Chat history downloaded as PDF!');
      }

    } catch (error) {
      console.error('Error exporting chats:', error);
      toast.error('Failed to export chat history');
    }
  };

  const clearChatHistory = () => {
    setMessages([]);
    sessionStorage.removeItem('chatMessages');
    toast.success('Chat history cleared');
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: messages.length + 1,
        sender: 'me',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessage]);
      
      // Send message through context
      if (currentChat) {
        await sendMessage(currentChat.id.toString(), message);
      }
      
      setMessage('');
      setIsTyping(true);
      
      // Simulate bot response
      setTimeout(() => {
        let responseContent;
        
        if (currentChat?.isBot && currentBot) {
          // Use bot-specific responses
          responseContent = currentBot.responses[Math.floor(Math.random() * currentBot.responses.length)];
        } else {
          // Use generic responses for human users
          const responses = [
            "That's a great question! Let me explain...",
            "I completely agree with that approach.",
            "Have you tried this method before?",
            "That's exactly what I was thinking!",
            "Let me share a resource that might help."
          ];
          responseContent = responses[Math.floor(Math.random() * responses.length)];
        }
        
        const responseMessage: ChatMessage = {
          id: messages.length + 2,
          sender: currentChat?.name || 'Unknown',
          content: responseContent,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
          isBot: currentChat?.isBot || false,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
      }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 flex">
        {/* Conversations List */}
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Messages
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={exportChatsToPDF}>
                  <Download size={14} />
                </Button>
                <Button variant="outline" size="sm" onClick={clearChatHistory}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search conversations..."
                className="pl-10 h-10 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <motion.button
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`w-full p-3 md:p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedChat === conversation.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover"
                    />
                    {conversation.isBot && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                        <Bot size={8} className="text-white" />
                      </div>
                    )}
                    {conversation.online && !conversation.isBot && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm md:text-base">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {conversation.time}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-primary-600 dark:text-primary-400">
                        {conversation.skill}
                      </span>
                      {conversation.unread > 0 && (
                        <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Privacy Notice */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-yellow-50 dark:bg-yellow-900/20">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              🔒 Privacy: Chats are temporary and will be emailed to you on logout, then permanently deleted.
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentChat ? (
            <>
              {/* Chat Header */}
              <div className="p-3 md:p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={currentChat.avatar}
                      alt={currentChat.name}
                      className="w-8 md:w-10 h-8 md:h-10 rounded-full object-cover"
                    />
                    {currentChat.isBot && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
                        <Bot size={6} className="text-white" />
                      </div>
                    )}
                    {currentChat.online && !currentChat.isBot && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      {currentChat.name}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {currentChat.isBot ? 'AI Assistant' : currentChat.online ? 'Online' : 'Last seen 2h ago'} • Teaching {currentChat.skill}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Calendar size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-3 md:px-4 py-2 md:py-3 rounded-2xl relative group ${
                      msg.isMe
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    }`}>
                      {msg.isBot && !msg.isMe && (
                        <div className="flex items-center space-x-1 mb-1">
                          <Bot size={12} className="text-blue-500" />
                          <span className="text-xs text-blue-500 font-medium">AI Assistant</span>
                        </div>
                      )}
                      <p className="text-sm md:text-base">{msg.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${
                          msg.isMe ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {msg.time}
                        </p>
                        {!msg.isMe && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <TranslationWidget text={msg.content} />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white dark:bg-gray-700 shadow-sm px-3 md:px-4 py-2 md:py-3 rounded-2xl max-w-xs">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input - Fixed to bottom */}
              <div className="sticky bottom-0 p-3 md:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <Button variant="ghost" size="sm">
                    <Paperclip size={16} />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-12 text-sm md:text-base"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <Smile size={16} />
                    </Button>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};