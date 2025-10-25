import { User, Message } from '@/types/chat';

export const mockUsers: User[] = [
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    isOnline: true
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    isOnline: true
  },
  {
    id: '5',
    name: 'James Wilson',
    email: 'james.w@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: '6',
    name: 'Olivia Brown',
    email: 'olivia.b@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
    isOnline: true
  },
  {
    id: '7',
    name: 'Alex Taylor',
    email: 'alex.t@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  }
];

export const mockMessages: Message[] = [];
