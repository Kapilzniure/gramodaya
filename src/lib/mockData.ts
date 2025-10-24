import { User, Message } from '@/types/chat';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    isOnline: true
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000)
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
    isOnline: true
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    isOnline: true
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    isOnline: false,
    lastSeen: new Date(Date.now() - 7200000)
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
    isOnline: true
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: '2',
    receiverId: '1',
    content: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 86400000),
    read: true
  },
  {
    id: 'm2',
    senderId: '1',
    receiverId: '2',
    content: 'Hi Bob! I\'m doing great, thanks for asking!',
    timestamp: new Date(Date.now() - 86000000),
    read: true
  },
  {
    id: 'm3',
    senderId: '3',
    receiverId: '1',
    content: 'Did you see the new project updates?',
    timestamp: new Date(Date.now() - 43200000),
    read: false
  },
  {
    id: 'm4',
    senderId: '4',
    receiverId: '1',
    content: 'Let\'s schedule a meeting for tomorrow',
    timestamp: new Date(Date.now() - 21600000),
    read: false
  }
];
