import { useState } from 'react';
import { FaSearch, FaPlus, FaUser, FaPaperclip, FaSmile, FaEllipsisV } from 'react-icons/fa';
import { useTheme } from '../Hod';

const Communication = () => {
  const { theme } = useTheme();
  const [selectedMessage, setSelectedMessage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    {
      id: 0,
      sender: 'Sarah Johnson',
      subject: 'Student Performance Discussion',
      preview: 'I wanted to discuss the recent performance of some students in our department...',
      timestamp: '2 min ago',
      avatar: 'SJ'
    },
    {
      id: 1,
      sender: 'Michael Chen',
      subject: 'Curriculum Updates',
      preview: 'The new curriculum changes have been approved and will be implemented next semester...',
      timestamp: '1 hour ago',
      avatar: 'MC'
    },
    {
      id: 2,
      sender: 'Emily Rodriguez',
      subject: 'Research Collaboration',
      preview: 'I have an interesting research proposal that might benefit our department...',
      timestamp: '3 hours ago',
      avatar: 'ER'
    },
    {
      id: 3,
      sender: 'David Kim',
      subject: 'Faculty Meeting',
      preview: 'Reminder about the upcoming faculty meeting scheduled for next week...',
      timestamp: '1 day ago',
      avatar: 'DK'
    },
    {
      id: 4,
      sender: 'Lisa Wang',
      subject: 'Student Concerns',
      preview: 'Several students have raised concerns about the grading system...',
      timestamp: '2 days ago',
      avatar: 'LW'
    }
  ];

  const chatMessages = [
    {
      id: 1,
      type: 'incoming',
      text: 'Hello! I wanted to discuss the recent performance of some students in our department. I\'ve noticed some concerning trends that we should address.',
      timestamp: '2:30 PM',
      sender: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'outgoing',
      text: 'Hi Sarah, I\'ve been reviewing the data as well. Which specific areas are you most concerned about?',
      timestamp: '2:32 PM',
      sender: 'You'
    },
    {
      id: 3,
      type: 'incoming',
      text: 'The attendance rates have dropped significantly, especially in the advanced courses. Also, the assignment submission rates are lower than expected.',
      timestamp: '2:35 PM',
      sender: 'Sarah Johnson'
    },
    {
      id: 4,
      type: 'outgoing',
      text: 'I see. Have you identified any patterns in terms of which students are most affected?',
      timestamp: '2:37 PM',
      sender: 'You'
    },
    {
      id: 5,
      type: 'incoming',
      text: 'Yes, it seems to be primarily affecting students in their second and third years. We should consider implementing some intervention strategies.',
      timestamp: '2:40 PM',
      sender: 'Sarah Johnson'
    }
  ];

  const handleMessageSelect = (messageId: number) => {
    setSelectedMessage(messageId);
    if (window.innerWidth < 1024) {
      setIsMobileChatOpen(true);
    }
  };

  const closeMobileChat = () => {
    setIsMobileChatOpen(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className={`p-4 sm:p-6 border-b transition-colors duration-200 ${
        theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Communication Channel
            </h1>
            <p className={`text-sm sm:text-base transition-colors duration-200 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Connect with your team and students
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base">
              <FaPlus className="text-sm" />
              <span className="hidden sm:inline">New Message</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Message List */}
        <div className={`w-full lg:w-1/3 border-r transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
        } ${isMobileChatOpen ? 'hidden lg:flex' : 'flex'} flex-col`}>
          {/* Search Bar */}
          <div className="p-4 border-b transition-colors duration-200 border-gray-200 dark:border-gray-700">
            <div className="relative">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border-b cursor-pointer transition-colors duration-200 ${
                  selectedMessage === message.id
                    ? theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-orange-50 border-orange-200'
                    : theme === 'dark'
                      ? 'border-gray-700 hover:bg-gray-800'
                      : 'border-gray-100 hover:bg-gray-100'
                }`}
                onClick={() => handleMessageSelect(message.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex items-center justify-center">
                    <FaUser className="text-blue-800 text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-semibold text-sm transition-colors duration-200 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{message.sender}</h3>
                      <span className={`text-xs transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{message.timestamp}</span>
                    </div>
                    <h4 className={`font-medium text-sm mb-1 transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}>{message.subject}</h4>
                    <p className={`text-xs line-clamp-2 transition-colors duration-200 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{message.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div className={`flex-1 flex flex-col transition-colors duration-200 ${
          theme === 'dark' 
            ? 'bg-gray-900' 
            : 'bg-white'
        } ${isMobileChatOpen ? 'flex' : 'hidden lg:flex'}`}>
          {/* Chat Header */}
          <div className={`p-4 sm:p-6 border-b transition-colors duration-200 ${
            theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          } flex justify-between items-center`}>
            <div className="flex items-center space-x-4">
              <button 
                onClick={closeMobileChat}
                className="lg:hidden bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center justify-center">
                <FaUser className="text-blue-800 text-2xl" />
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-semibold transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{messages[selectedMessage].sender}</h2>
              </div>
            </div>
            <button className={`p-2 rounded-lg transition-colors duration-200 ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 text-gray-400' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}>
              <FaEllipsisV className="text-lg" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="space-y-4">
              {chatMessages.map((chatMsg) => (
                <div
                  key={chatMsg.id}
                  className={`flex ${chatMsg.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-xs sm:max-w-md ${chatMsg.type === 'outgoing' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                    {chatMsg.type === 'incoming' && (
                      <div className="flex items-center justify-center">
                        <FaUser className="text-blue-800 text-lg" />
                      </div>
                    )}
                    {chatMsg.type === 'outgoing' && (
                      <div className="flex items-center justify-center">
                        <FaUser className="text-blue-800 text-lg" />
                      </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl ${
                      chatMsg.type === 'incoming' 
                        ? theme === 'dark'
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                        : 'bg-orange-200 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{chatMsg.text}</p>
                      <span className={`text-xs mt-1 block ${
                        chatMsg.type === 'incoming' 
                          ? theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          : 'text-orange-700'
                      }`}>
                        {chatMsg.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Input Area */}
          <div className={`border-t transition-colors duration-200 ${
            theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          } p-6`}>
            <div className="flex items-end space-x-4">
              <button className={`p-3 rounded-xl transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}>
                <FaPaperclip className="text-lg" />
              </button>
              <div className="flex-1">
                <textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  className={`w-full px-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 resize-none ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  rows={3}
                />
              </div>
              <button 
                onClick={handleSendMessage}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <span className="text-sm">Send</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Overlay for Chat */}
        {isMobileChatOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileChat} />
        )}
      </div>
    </div>
  );
};

export default Communication;