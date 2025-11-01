
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, User } from '@/types/chat';
import { mockUsers, mockConversations } from '@/lib/mockData';

interface MessageContextType {
  users: User[];
  conversations: Map<string, { messages: Message[] }>;
  selectedUserId: string | null;
  currentUser: User | null;
  selectUser: (userId: string) => void;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<MessageContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[1]);

  useEffect(() => {
    if (mockUsers.length > 0) {
      setSelectedUserId(mockUsers[0].id);
    }
  }, []);

  const selectUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const sendMessage = (content: string) => {
    if (!selectedUserId) return;

    const newMessage: Message = {
      id: 'msg-' + Date.now(),
      senderId: 'currentUser', // In a real app, this would be the logged-in user's ID
      content,
      timestamp: new Date(),
    };

    const updatedConversations = new Map(conversations);
    const conversation = updatedConversations.get(selectedUserId);

    if (conversation) {
      conversation.messages.push(newMessage);
      updatedConversations.set(selectedUserId, conversation);
      setConversations(updatedConversations);

      // Mock receiving a reply
      setTimeout(() => {
        const replyMessage: Message = {
          id: 'reply-' + Date.now(),
          senderId: selectedUserId,
          content: `Thanks for your message! I'll get back to you shortly.`,
          timestamp: new Date(),
        };
        const conversationWithReply = updatedConversations.get(selectedUserId);
        if (conversationWithReply) {
          conversationWithReply.messages.push(replyMessage);
          setConversations(new Map(updatedConversations));
        }
      }, 1500);
    }
  };

  return (
    <ChatContext.Provider value={{ users, conversations, selectedUserId, selectUser, sendMessage, currentUser }}>
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
