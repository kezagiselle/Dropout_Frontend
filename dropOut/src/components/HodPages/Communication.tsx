import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './Communication.css';

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
    <div className="communication-dashboard">
      {/* Left Sidebar Navigation */}
      <div className="sidebar">
        <h1 className="sidebar-title">Communication</h1>
        <nav className="sidebar-nav">
          <div className="nav-item">
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">👥</span>
            <span className="nav-text">Students</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">👨‍🏫</span>
            <span className="nav-text">Teachers</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">📅</span>
            <span className="nav-text">Courses & Timetables</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">📈</span>
            <span className="nav-text">Attendance & Performance</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">📄</span>
            <span className="nav-text">Reports</span>
          </div>
          <div className="nav-item active">
            <span className="nav-icon">💬</span>
            <span className="nav-text">Communication</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </div>
        </nav>
      </div>

      {/* Middle Panel - Message List */}
      <div className="message-list">
        <div className="search-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-item ${message.isSelected ? 'selected' : ''}`}
              onClick={() => handleMessageSelect(message.id)}
            >
              <div className="message-content">
                <div className="message-header">
                  <h3 className="sender-name">{message.sender}</h3>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
                <h4 className="message-subject">{message.subject}</h4>
                <p className="message-preview">{message.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Window */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-contact-info">
            <h2 className="contact-name">{messages[selectedMessage].sender}</h2>
            <p className="contact-subject">{messages[selectedMessage].subject}</p>
          </div>
          <button className="compose-btn">
            <FaPlus className="compose-icon" />
            Compose New Message
          </button>
        </div>
        
        <div className="chat-messages">
          {chatMessages.map((chatMsg) => (
            <div
              key={chatMsg.id}
              className={`chat-message ${chatMsg.type}`}
            >
              <div className="message-bubble">
                <p className="message-text">{chatMsg.text}</p>
                <span className="message-time">{chatMsg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communication;
