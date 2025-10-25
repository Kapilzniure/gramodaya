import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Message, ChatConversation } from '@/types/chat';
import { mockUsers, mockMessages } from '@/lib/mockData';

interface ChatContextType {
  currentUser: User | null;
  users: User[];
  conversations: Map<string, ChatConversation>;
  selectedUserId: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  selectUser: (userId: string) => void;
  sendMessage: (receiverId: string, content: string) => void;
  markAsRead: (userId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    name: 'You',
    email: 'you@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
    isOnline: true
  });
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [conversations, setConversations] = useState<Map<string, ChatConversation>>(new Map());
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);


  const login = (email: string, password: string): boolean => {
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setSelectedUserId(null);
    setConversations(new Map());
  };

  const selectUser = (userId: string) => {
    setSelectedUserId(userId);
    markAsRead(userId);
  };

  const sendMessage = (receiverId: string, content: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId,
      content,
      timestamp: new Date(),
      read: false
    };

    setConversations(prev => {
      const newConv = new Map(prev);
      const conversation = newConv.get(receiverId) || {
        userId: receiverId,
        messages: [],
        unreadCount: 0
      };

      conversation.messages.push(newMessage);
      newConv.set(receiverId, conversation);
      return newConv;
    });

    // Simulate receiving a response after 2-5 seconds
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: receiverId,
        receiverId: currentUser.id,
        content: generateAutoResponse(content),
        timestamp: new Date(),
        read: selectedUserId === receiverId
      };

      setConversations(prev => {
        const newConv = new Map(prev);
        const conversation = newConv.get(receiverId);
        if (conversation) {
          conversation.messages.push(responseMessage);
          if (selectedUserId !== receiverId) {
            conversation.unreadCount++;
          }
          newConv.set(receiverId, conversation);
        }
        return newConv;
      });
    }, Math.random() * 3000 + 2000);
  };

  const markAsRead = (userId: string) => {
    setConversations(prev => {
      const newConv = new Map(prev);
      const conversation = newConv.get(userId);
      if (conversation) {
        conversation.messages = conversation.messages.map(msg => 
          msg.receiverId === currentUser?.id ? { ...msg, read: true } : msg
        );
        conversation.unreadCount = 0;
        newConv.set(userId, conversation);
      }
      return newConv;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        users: users.filter(u => u.id !== currentUser?.id),
        conversations,
        selectedUserId,
        login,
        logout,
        selectUser,
        sendMessage,
        markAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

function generateAutoResponse(message: string): string {
  const responses = [
    "That's interesting! Tell me more.",
    "I see what you mean.",
    "Thanks for sharing that with me!",
    "Cool! 😊",
    "Got it, thanks!",
    "Awesome! Let's catch up soon.",
    "Haha, that's funny!",
    "Sure thing!",
    "Sounds good to me.",
    "I agree!"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
