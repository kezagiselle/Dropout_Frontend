import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';

const Communication = () => {
  const [selectedMessage, setSelectedMessage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

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
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel - Message List */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                message.isSelected ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
              }`}
              onClick={() => handleMessageSelect(message.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{message.sender}</h3>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <h4 className="font-medium text-gray-800 text-sm mb-1">{message.subject}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">{message.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{messages[selectedMessage].sender}</h2>
            <p className="text-sm text-gray-600">{messages[selectedMessage].subject}</p>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
            <FaPlus className="text-sm" />
            Compose New Message
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {chatMessages.map((chatMsg) => (
              <div
                key={chatMsg.id}
                className={`flex ${chatMsg.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
              >
                                 <div className={`max-w-md px-4 py-3 rounded-lg ${
                   chatMsg.type === 'incoming' 
                     ? 'bg-gray-100 text-gray-900' 
                     : 'bg-orange-300 text-gray-900'
                 }`}>
                  <p className="text-sm leading-relaxed">{chatMsg.text}</p>
                                     <span className={`text-xs mt-2 block ${
                      chatMsg.type === 'incoming' ? 'text-gray-500' : 'text-orange-700'
                    }`}>
                     {chatMsg.timestamp}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
