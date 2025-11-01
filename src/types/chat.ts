<<<<<<< HEAD
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface ChatConversation {
  userId: string;
  messages: Message[];
  unreadCount: number;
}
=======

export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
  }
  
  export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  }
  
>>>>>>> kapilz
