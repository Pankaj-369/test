import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Send } from 'lucide-react';
import { mockMessages } from '../data/mockData';
import { useUser } from '../context/UserContext';

const Messages: React.FC = () => {
  const { user } = useUser();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-2">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be signed in to view your messages.
          </p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  const userMessages = mockMessages.filter(
    message => message.senderId === user.id || message.receiverId === user.id
  );

  const chats = userMessages.reduce((acc, message) => {
    const chatPartnerId = message.senderId === user.id ? message.receiverId : message.senderId;
    if (!acc[chatPartnerId]) {
      acc[chatPartnerId] = [];
    }
    acc[chatPartnerId].push(message);
    return acc;
  }, {} as Record<string, typeof mockMessages>);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // In a real app, this would send the message to the backend
    console.log('Sending message:', newMessage, 'to:', selectedChat);
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-12 divide-x dark:divide-gray-700 h-[calc(100vh-12rem)]">
          {/* Chat List */}
          <div className="col-span-4 flex flex-col">
            <div className="p-4 border-b dark:border-gray-700">
              <h1 className="text-xl font-bold mb-4">Messages</h1>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {Object.entries(chats).map(([partnerId, messages]) => {
                const lastMessage = messages[messages.length - 1];
                const unreadCount = messages.filter(m => !m.read && m.receiverId === user.id).length;
                
                return (
                  <button
                    key={partnerId}
                    onClick={() => setSelectedChat(partnerId)}
                    className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                      selectedChat === partnerId ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 font-medium">
                        {partnerId[0].toUpperCase()}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{partnerId}</p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {format(new Date(lastMessage.timestamp), 'MMM d')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {lastMessage.content}
                        </p>
                      </div>
                      {unreadCount > 0 && (
                        <span className="ml-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-8 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 font-medium">
                      {selectedChat[0].toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h2 className="font-medium">{selectedChat}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active now</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chats[selectedChat].map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.senderId === user.id
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}
                      >
                        <p className="mb-1">{message.content}</p>
                        <p className="text-xs opacity-75">
                          {format(new Date(message.timestamp), 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;