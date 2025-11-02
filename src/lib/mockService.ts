import { User, Message, Conversation } from '@/types/chat';

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  timestamp: Date;
  helpful: number;
  translated?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  sellerId: string;
  images: string[];
  reviews: Review[];
  averageRating: number;
}

export interface UserProfile extends User {
  email: string;
  role: 'seller' | 'buyer' | 'guest';
  reviewedProducts: string[]; // Array of product IDs that user has reviewed
  language: string;
  joinedDate: Date;
}

// Mock Users Data
export const mockUsers: UserProfile[] = [
  {
    id: 's1',
    name: "Sarah's Electronics",
    email: 'sarah@electronics.com',
    avatar: '/avatars/seller1.jpg',
    isOnline: true,
    role: 'seller',
    reviewedProducts: [],
    language: 'en',
    joinedDate: new Date('2024-01-01'),
  },
  {
    id: 's2',
    name: 'Tech Hub Store',
    email: 'tech@hub.com',
    avatar: '/avatars/seller2.jpg',
    isOnline: false,
    role: 'seller',
    reviewedProducts: [],
    language: 'en',
    joinedDate: new Date('2024-02-15'),
  },
  {
    id: 'b1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/buyer1.jpg',
    isOnline: true,
    role: 'buyer',
    reviewedProducts: ['p1'],
    language: 'en',
    joinedDate: new Date('2024-03-01'),
  }
];

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    price: 99.99,
    description: 'High-quality wireless headphones with noise cancellation',
    sellerId: 's1',
    images: ['/products/headphones1.jpg'],
    reviews: [],
    averageRating: 0,
  },
  // Add more products...
];

// Mock Conversations
export const mockConversations = new Map<string, Conversation>([
  ['s1', {
    messages: [
      {
        id: 'm1',
        senderId: 's1',
        content: 'Hello! How can I help you today?',
        timestamp: new Date('2024-10-30T10:00:00'),
      },
      {
        id: 'm2',
        senderId: 'currentUser',
        content: 'Hi, I\'m interested in the wireless headphones',
        timestamp: new Date('2024-10-30T10:01:00'),
      },
    ],
    unreadCount: 1,
  }],
]);

// Helper Functions
export const isUserLoggedIn = (): boolean => {
  return !!localStorage.getItem('user');
};

export const getCurrentUser = (): UserProfile | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const login = (email: string, password: string): Promise<UserProfile> => {
  // Mock authentication
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const loginAsGuest = (): Promise<UserProfile> => {
  return new Promise((resolve) => {
    const guestUser: UserProfile = {
      id: `guest_${Date.now()}`,
      name: 'Guest User',
      email: '',
      avatar: '/avatars/guest.jpg',
      isOnline: true,
      role: 'guest',
      reviewedProducts: [],
      language: 'en',
      joinedDate: new Date(),
    };
    localStorage.setItem('user', JSON.stringify(guestUser));
    resolve(guestUser);
  });
};

export const logout = (): void => {
  localStorage.removeItem('user');
};

export const submitReview = (
  productId: string,
  rating: number,
  comment: string
): Promise<Review> => {
  return new Promise((resolve, reject) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      reject(new Error('User not logged in'));
      return;
    }

    // Check if user has already reviewed this product
    if (currentUser.reviewedProducts.includes(productId)) {
      reject(new Error('You have already reviewed this product'));
      return;
    }

    const review: Review = {
      id: `r_${Date.now()}`,
      userId: currentUser.id,
      productId,
      rating,
      comment,
      timestamp: new Date(),
      helpful: 0,
    };

    // Update the product's reviews
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      product.reviews.push(review);
      product.averageRating = calculateAverageRating(product.reviews);

      // Update user's reviewed products
      currentUser.reviewedProducts.push(productId);
      localStorage.setItem('user', JSON.stringify(currentUser));

      resolve(review);
    } else {
      reject(new Error('Product not found'));
    }
  });
};

const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};