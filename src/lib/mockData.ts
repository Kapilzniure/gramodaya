<<<<<<< HEAD
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
=======



import { User, Message } from '@/types/chat';



export const products = [

  {

    id: "1",

    name: "Wireless Headphones",

    title: "Wireless Headphones",

    price: 99.99,

    images: ["/hero-shopping.jpg"],

    category: "electronics",

    description: "High-quality wireless headphones with noise cancellation.",

    rating: 4.5,

    inventory: 15,

    seller: { id: "seller1", name: "John Doe" },

    condition: "new",

  },

  {

    id: "2",

    name: "Leather Wallet",

    title: "Leather Wallet",

    price: 49.99,

    images: ["/hero-shopping.jpg"],

    category: "accessories",

    description: "A stylish and durable leather wallet.",

    rating: 4.8,

    inventory: 30,

    seller: { id: "seller2", name: "Jane Smith" },

    condition: "new",

  },

  {

    id: "3",

    name: "Smartwatch",

    title: "Smartwatch",

    price: 199.99,

    images: ["/hero-shopping.jpg"],

    category: "electronics",

    description: "A smartwatch with a variety of features.",

    rating: 4.6,

    inventory: 20,

    seller: { id: "seller1", name: "John Doe" },

    condition: "almostNew",

  },

  {

    id: "4",

    name: "Running Shoes",

    title: "Running Shoes",

    price: 79.99,

    images: ["/hero-shopping.jpg"],

    category: "fashion",

    description: "Comfortable and lightweight running shoes.",

    rating: 4.7,

    inventory: 25,

    seller: { id: "seller2", name: "Jane Smith" },

    condition: "used",

  },

  {

    id: "5",

    name: "Coffee Maker",

    title: "Coffee Maker",

    price: 129.99,

    images: ["/hero-shopping.jpg"],

    category: "home",

    description: "A programmable coffee maker for your daily brew.",

    rating: 4.9,

    inventory: 10,

    seller: { id: "seller1", name: "John Doe" },

    condition: "new",

  },

  {

    id: "6",

    name: "Backpack",

    title: "Backpack",

    price: 59.99,

    images: ["/hero-shopping.jpg"],

    category: "accessories",

    description: "A spacious and durable backpack for everyday use.",

    rating: 4.4,

    inventory: 40,

    seller: { id: "seller2", name: "Jane Smith" },

    condition: "new",

  },

];



export const categories = [

  { id: "electronics", name: "Electronics", icon: "🎧" },

  { id: "fashion", name: "Fashion", icon: "👕" },

  { id: "home", name: "Home", icon: "🏠" },

  { id: "accessories", name: "Accessories", icon: "👜" },

  { id: "sports", name: "Sports", icon: "⚽" },

  { id: "books", name: "Books", icon: "📚" },

];



export const mockUsers: User[] = [

  {

    id: 'seller1',

    name: 'John Doe',

    avatar: '/placeholder.svg',

    isOnline: true,

  },

  {

    id: 'seller2',

    name: 'Jane Smith',

    avatar: '/placeholder.svg',

    isOnline: false,

  },

];



export const mockConversations = new Map<string, { messages: Message[] }>();

mockConversations.set('seller1', {

  messages: [

    {

      id: 'msg1',

      senderId: 'seller1',

      content: 'Hello! I am interested in your product.',

      timestamp: new Date(),

    },

    {

      id: 'msg2',

      senderId: 'currentUser',

      content: 'Hi there! Which product are you interested in?',

      timestamp: new Date(),

    },

  ],

});

mockConversations.set('seller2', {

  messages: [

    {

      id: 'msg3',

      senderId: 'seller2',

      content: 'Hi! Do you have any questions about the product?',

      timestamp: new Date(),

    },

  ],

});
>>>>>>> kapilz
