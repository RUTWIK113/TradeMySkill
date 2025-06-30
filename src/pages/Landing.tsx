import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Video, 
  Users, 
  Globe, 
  BookOpen,
  Star,
  Play,
  CheckCircle,
  MessageSquare,
  Calendar,
  Award,
  User,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { FloatingElements } from '../components/ui/FloatingElements';
import { ParticleSystem } from '../components/ui/ParticleSystem';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useApp, type User as UserType } from '../contexts/AppContext';

export const Landing: React.FC = () => {
  const { setCurrentPage } = useApp();

  const features = [
    {
      icon: Video,
      title: 'Live Video Sessions',
      description: 'Connect face-to-face with skill partners through high-quality video calls.',
      gradient: 'from-blue-500 to-cyan-500',
      iconColor: '#3B82F6'
    },
    {
      icon: Users,
      title: 'Smart Matchmaking',
      description: 'AI-powered matching system connects you with the perfect skill exchange partners.',
      gradient: 'from-purple-500 to-pink-500',
      iconColor: '#8B5CF6'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Learn from people around the world, anytime, anywhere.',
      gradient: 'from-green-500 to-emerald-500',
      iconColor: '#10B981'
    },
    {
      icon: BookOpen,
      title: 'Gamified Learning',
      description: 'Earn points, badges, and track your progress as you learn and teach.',
      gradient: 'from-orange-500 to-red-500',
      iconColor: '#F97316'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Rodriguez',
      role: 'Graphic Designer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      content: 'I learned Python programming by teaching Spanish. The exchange was incredible!',
      rating: 5
    },
    {
      name: 'James Chen',
      role: 'Marketing Manager',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      content: 'Found amazing guitar teachers while sharing my marketing expertise. Win-win!',
      rating: 5
    },
    {
      name: 'Aisha Patel',
      role: 'Software Engineer',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      content: 'The platform made it so easy to connect with people who want to learn coding.',
      rating: 5
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Skills Exchanged', value: '1M+', icon: Zap },
    { label: 'Countries', value: '180+', icon: Globe },
    { label: 'Success Rate', value: '95%', icon: Target }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Create Your Profile',
      description: 'List your skills and what you want to learn',
      icon: User
    },
    {
      step: '2',
      title: 'Find Your Match',
      description: 'Our AI connects you with perfect partners',
      icon: MessageSquare
    },
    {
      step: '3',
      title: 'Start Learning',
      description: 'Schedule sessions and begin exchanging skills',
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-20 lg:py-32">
        <AnimatedBackground />
        <FloatingElements />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 md:mb-6"
            >
              <Sparkles className="w-2 md:w-16 h-12 md:h-16 mx-auto text-primary-600 dark:text-primary-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6"
            >
              <motion.span
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent bg-300%"
              >
                Trade Skills,
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent"
              >
                Not Money
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto"
            >
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Learn anything from anyone. Globally. Free.
              </motion.span>
              <br />
              <span className="text-base md:text-lg">Connect with people worldwide and exchange your skills for theirs.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" onClick={() => setCurrentPage('explore')} className="relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  Join for Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight size={18} className="ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" onClick={() => setCurrentPage('explore')}>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Play size={18} className="mr-2" />
                  </motion.div>
                  Browse Skills
                </Button>
              </motion.div>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <Icon className="w-6 md:w-8 h-6 md:h-8 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
                    </motion.div>
                    <motion.div 
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Creator Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-12 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-md mx-auto"
            >
              <div className="flex items-center space-x-4">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=RutwikNakkalla"
                  alt="Rutwik Nakkalla"
                  className="w-16 h-16 rounded-full border-2 border-primary-500"
                />
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Meet Rutwik Nakkalla
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Creator & Student @ IIT Madras
                  </p>
                  <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                    Your first friend when you join! 🎉
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Neumorphic Design */}
      <section 
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          background: '#EEEEEE'
        }}
      >
        <ParticleSystem />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-3xl font-bold text-gray-700 mb-4"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Simple, secure, and effective skill exchange in four easy steps
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  {/* Step Number - Neumorphic */}
                  <motion.div 
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                  >

                  </motion.div>

                  {/* Neumorphic Card */}
                  <div 
                    className="pt-16 pb-6 px-6 text-center h-full relative overflow-hidden group rounded-3xl cursor-pointer"
                    style={{
                      background: 'linear-gradient(145deg, #f0f0f0, #cacaca)',
                      boxShadow: `
                        20px 20px 40px #a3b1c6,
                        -20px -20px 40px #ffffff
                      `,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `
                        20px 20px 40px #a3b1c6,
                        -20px -20px 40px #ffffff
                        
                      `;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `
                        inset 10px 10px 20px #a3b1c6,
                        inset -10px -10px 20px #ffffff
                      `;
                    }}
                  >
                    {/* Icon Container - Neumorphic */}
                    <motion.div 
                      className="w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-7 relative z-10"


                      style={{
                        background: 'linear-gradient(145deg, #f0f0f0, #cacaca)',
                        boxShadow: `
                          inset 16px 8px 16px #a3b1c6,
                          inset -8px -8px 16px #ffffff
                        `
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <Icon size={48} 
                      style={{ color: '#4B5563' }} 
                    />
                    </motion.div>
                    
                    <h3 className="text-xl font-bold text-gray-700 mb-4 relative z-10">
                      {feature.title}
                    </h3>
                    <p className="text-base text-gray-600 relative z-10 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Special highlight for step 4 */}
                    {index === 3 && (
                      <motion.div
                        className="absolute inset-2 rounded-2xl pointer-events-none"
                        style={{
                          background: 'linear-gradient(145deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1))',
                          boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.2)'
                        }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start Your Skill Exchange Journey
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {processSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative mb-4 md:mb-6">
                    <motion.div 
                      className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto relative z-10"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(59, 130, 246, 0.3)',
                          '0 0 40px rgba(139, 92, 246, 0.4)',
                          '0 0 20px rgba(59, 130, 246, 0.3)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon size={24} className="text-white" />
                    </motion.div>
                    
                    <motion.div 
                      className="absolute -top-2 -right-2 w-6 md:w-8 h-6 md:h-8 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs md:text-sm font-bold z-20"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {item.step}
                    </motion.div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Join thousands of successful skill exchangers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="p-4 md:p-6 h-full relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  <div className="flex items-center mb-3 md:mb-4 relative z-10">
                    <motion.img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover mr-3 md:mr-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3 md:mb-4 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star size={14} className="text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 relative z-10">
                    "{testimonial.content}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
              'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            Ready to Start Your Skill Exchange?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-6 md:mb-8"
          >
            Join our global community and unlock unlimited learning opportunities
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100 relative overflow-hidden"
              onClick={() => setCurrentPage('explore')}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              Get Started Today
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight size={18} className="ml-2" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
