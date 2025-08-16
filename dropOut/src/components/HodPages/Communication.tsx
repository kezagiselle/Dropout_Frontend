import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useTheme } from '../Hod';

const Communication = () => {
  const { theme } = useTheme();
  const [selectedMessage, setSelectedMessage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const messages = [
    {
      id: 0,
      sender: 'John Smith',
      subject: 'Parent-Teacher Conference Schedule',
      preview: 'Hi Sarah, I wanted to discuss the upcoming parent-teacher conference...',
      timestamp: '2 hours ago',
      isSelected: true
    },
    {
      id: 1,
      sender: 'Maria Rodriguez',
      subject: 'Math Assignment Question',
      preview: 'Could you please clarify the requirements for the math project...',
      timestamp: 'Yesterday',
      isSelected: false
    },
    {
      id: 2,
      sender: 'Alex Chen',
      subject: 'Science Project Submission',
      preview: 'I\'ve completed my science project and wanted to submit it early...',
      timestamp: '2 days ago',
      isSelected: false
    }
  ];

  const chatMessages = [
    {
      id: 1,
      type: 'incoming',
      text: 'Hi Sarah, I wanted to discuss the upcoming parent-teacher conference for Emma. Would next Tuesday at 3 PM work for you?',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'outgoing',
      text: 'Hi John, that time works perfectly for me. Should I bring anything specific to discuss about Emma\'s progress?',
      timestamp: '1 hour ago'
    },
    {
      id: 3,
      type: 'incoming',
      text: 'Great! Please bring any questions you have about her math progress. I\'ll have her recent assignments and test scores ready to review.',
      timestamp: '1 hour ago'
    }
  ];

  const handleMessageSelect = (messageId: number) => {
    setSelectedMessage(messageId);
    // Update the selected state for all messages
    messages.forEach(msg => {
      msg.isSelected = msg.id === messageId;
    });
    // On mobile, open the chat when a message is selected
    if (window.innerWidth < 768) {
      setIsMobileChatOpen(true);
    }
  };

  const closeMobileChat = () => {
    setIsMobileChatOpen(false);
  };

  return (
    <div className={`flex flex-col lg:flex-row h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Left Panel - Message List */}
      <div className={`w-full lg:w-80 xl:w-96 border-r flex flex-col transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      } ${isMobileChatOpen ? 'hidden lg:flex' : 'flex'}`}>
        <div className={`p-3 sm:p-6 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-200 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Messages</h1>
            <button className="lg:hidden bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors">
              <FaPlus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'border-gray-300'
              }`}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 sm:p-4 border-b cursor-pointer transition-colors duration-200 ${
                message.isSelected 
                  ? theme === 'dark'
                    ? 'bg-orange-900 border-l-4 border-l-orange-500'
                    : 'bg-orange-50 border-l-4 border-l-orange-500'
                  : theme === 'dark'
                    ? 'border-gray-700 hover:bg-gray-700'
                    : 'border-gray-100 hover:bg-gray-50'
              }`}
              onClick={() => handleMessageSelect(message.id)}
            >
              <div className="flex justify-between items-start mb-2">
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
        <div className={`p-3 sm:p-6 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        } flex justify-between items-start`}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <button 
                onClick={closeMobileChat}
                className="lg:hidden bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <h2 className={`text-lg sm:text-xl font-semibold transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{messages[selectedMessage].sender}</h2>
                <p className={`text-sm transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                } truncate`}>{messages[selectedMessage].subject}</p>
              </div>
            </div>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base">
            <FaPlus className="text-sm" />
            <span className="hidden sm:inline">Compose New Message</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
          <div className="space-y-3 sm:space-y-4">
            {chatMessages.map((chatMsg) => (
              <div
                key={chatMsg.id}
                className={`flex ${chatMsg.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs sm:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg ${
                  chatMsg.type === 'incoming' 
                    ? theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                    : 'bg-orange-300 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{chatMsg.text}</p>
                  <span className={`text-xs mt-2 block ${
                    chatMsg.type === 'incoming' 
                      ? theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      : 'text-orange-700'
                  }`}>
                    {chatMsg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Input Area */}
        <div className={`border-t transition-colors duration-200 ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        } p-3 sm:p-4`}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'border-gray-300'
              }`}
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay for Chat */}
      {isMobileChatOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileChat} />
      )}
    </div>
  );
};

export default Communication;
