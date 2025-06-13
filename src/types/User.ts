export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified?: boolean;
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string; 
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  bio?: string;
  profileImage?: string;
} 