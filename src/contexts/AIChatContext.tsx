
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, User } from '@/types/chat';
import { AIMock, EnhancedAIMock } from '@/lib/aiMockEnhanced';

interface Conversation {
  messages: Message[];
  unreadCount: number;
}

interface AIChatContextType {
  users: User[];
  conversations: Map<string, Conversation>;
  selectedUserId: string | null;
  selectUser: (userId: string) => void;
  sendMessage: (content: string) => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const AIChatProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [conversations, setConversations] = useState<Map<string, Conversation>>(new Map());
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const initialUsers: User[] = [
      { id: 'ai-bargain-bot', name: 'AI Bargain Bot', avatar: '/placeholder.svg', isOnline: true },
      { id: 'ai-mentor', name: 'AI Mentor', avatar: '/placeholder.svg', isOnline: true },
    ];
    setUsers(initialUsers);

    const initialConversations = new Map<string, Conversation>();
    initialUsers.forEach(user => {
      initialConversations.set(user.id, {
        messages: [
          {
            id: 'initial-message-' + user.id,
            senderId: user.id,
            content: `Hello! I am the ${user.name}. How can I assist you today?`,
            timestamp: new Date(),
          },
        ],
        unreadCount: 1,
      });
    });
    setConversations(initialConversations);
    setSelectedUserId(initialUsers[0].id);
  }, []);

  const selectUser = (userId: string) => {
    setSelectedUserId(userId);
    setConversations(prev => {
      const newConversations = new Map(prev);
      const conversation = newConversations.get(userId);
      if (conversation) {
        conversation.unreadCount = 0;
      }
      return newConversations;
    });
  };

  const sendMessage = (content: string) => {
    if (!selectedUserId) return;

    const newMessage: Message = {
      id: 'msg-' + Date.now(),
      senderId: 'currentUser',
      content,
      timestamp: new Date(),
    };

    const updatedConversations = new Map(conversations);
    const conversation = updatedConversations.get(selectedUserId);

    if (conversation) {
      conversation.messages.push(newMessage);
      updatedConversations.set(selectedUserId, conversation);
      setConversations(updatedConversations);

      // AI Response
      setTimeout(() => {
        const aiUser = users.find(u => u.id === selectedUserId);
        if (!aiUser) return;

        let aiResponse: string;
        if (aiUser.id === 'ai-bargain-bot') {
          aiResponse = EnhancedAIMock.getBargainResponse(content);
        } else {
          aiResponse = AIMock.getResponse(content);
        }
        
        const aiMessage: Message = {
          id: 'ai-msg-' + Date.now(),
          senderId: aiUser.id,
          content: aiResponse,
          timestamp: new Date(),
        };

        const updatedConversationsWithAI = new Map(conversations);
        const conversationWithAI = updatedConversationsWithAI.get(selectedUserId);
        if (conversationWithAI) {
          conversationWithAI.messages.push(aiMessage);
          if (selectedUserId !== selectedUserId) {
            conversationWithAI.unreadCount += 1;
          }
          updatedConversationsWithAI.set(selectedUserId, conversationWithAI);
          setConversations(updatedConversationsWithAI);
        }
      }, 1000);
    }
  };

  return (
    <AIChatContext.Provider value={{ users, conversations, selectedUserId, selectUser, sendMessage }}>
      {children}
    </AIChatContext.Provider>
  );
};

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (context === undefined) {
    throw new Error('useAIChat must be used within a AIChatProvider');
  }
  return context;
};
