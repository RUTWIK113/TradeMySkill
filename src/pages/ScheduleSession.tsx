import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Video, 
  Globe, 
  User, 
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Sidebar } from '../components/layout/Sidebar';

export const ScheduleSession: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const availablePeople = [
    {
      id: 1,
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'JavaScript',
      wantsToLearn: 'Photography',
      timezone: 'PST (UTC-8)',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Maria Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Spanish',
      wantsToLearn: 'UI/UX Design',
      timezone: 'CET (UTC+1)',
      rating: 4.8
    },
    {
      id: 3,
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      skill: 'Guitar',
      wantsToLearn: 'React',
      timezone: 'JST (UTC+9)',
      rating: 4.7
    }
  ];

  const getWeekDates = (offset = 0) => {
    const today = new Date();
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + (offset * 7));
    
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentWeekOffset);
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime && selectedPerson) {
      setShowConfirmation(true);
    }
  };

  const confirmSchedule = () => {
    setShowConfirmation(false);
    // Reset form
    setSelectedTime('');
    setSelectedPerson(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Schedule a Session
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Book a skill exchange session with your matches
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Select Date & Time
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                    >
                      <ArrowLeft size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                    >
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>

                {/* Week View */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {weekDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        isSameDate(date, selectedDate)
                          ? 'bg-primary-600 text-white'
                          : isToday(date)
                          ? 'bg-primary-50 text-primary-600 border-2 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-semibold">
                        {date.getDate()}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Available Times for {formatDate(selectedDate)}
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg text-center transition-colors ${
                          selectedTime === time
                            ? 'bg-primary-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        <Clock size={16} className="mx-auto mb-1" />
                        <div className="text-sm font-medium">{time}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Person Selection */}
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Select Partner
                </h3>
                <div className="space-y-3">
                  {availablePeople.map((person) => (
                    <motion.button
                      key={person.id}
                      onClick={() => setSelectedPerson(person)}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${
                        selectedPerson?.id === person.id
                          ? 'bg-primary-50 border-2 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={person.avatar}
                          alt={person.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {person.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {person.skill} ↔ {person.wantsToLearn}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Globe size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {person.timezone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Session Details */}
                {selectedPerson && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Session Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {formatDate(selectedDate)} at {selectedTime || 'Select time'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Video size={14} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Video call (1 hour)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User size={14} className="text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          With {selectedPerson.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Schedule Button */}
                <Button
                  variant="primary"
                  className="w-full mt-6"
                  onClick={handleSchedule}
                  disabled={!selectedDate || !selectedTime || !selectedPerson}
                >
                  Schedule Session
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Session Scheduled!"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Your session has been scheduled!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You'll receive a confirmation email with the video call link.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <img
                src={selectedPerson?.avatar}
                alt={selectedPerson?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {selectedPerson?.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(selectedDate)} at {selectedTime}
                </p>
              </div>
            </div>
          </div>
          <Button variant="primary" onClick={confirmSchedule} className="w-full">
            Got it!
          </Button>
        </div>
      </Modal>
    </div>
  );
};