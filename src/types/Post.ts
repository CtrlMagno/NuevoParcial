import { User } from './User';
import { MusicTrack } from './Music';

export interface Music {
  id: string;
  songName: string;
  artist: string;
  albumName: string;
  albumCover?: string;
  duration?: number;
  spotifyUrl?: string;
}

export interface Comment {
  id: string;
  userId: string;
  user?: User; 
  content: string;
  createdAt: string; 
}

export interface Post {
  id: string;
  userId: string;
  user?: User; 
  content: string;
  imageUrl?: string; 
  musicTrack?: MusicTrack; 
  music?: Music;
  musicUrl?: string;
  musicTitle?: string;
  musicArtist?: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  comments: Comment[];
  likedBy: string[];
  isLiked?: boolean;
}

export interface CreatePostData {
  content: string;
  imageUrl?: string;
  musicTrack?: MusicTrack;
  musicId?: string;
  musicUrl?: string;
  musicTitle?: string;
  musicArtist?: string;
}

export interface CreateCommentData {
  postId: string;
  content: string;
} 