export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  userType: 'volunteer' | 'organization';
  location?: string;
  website?: string;
  skills?: string[];
  causes?: string[];
  availability?: Availability;
  verified?: boolean;
  createdAt: string;
  stats?: UserStats;
}

export interface UserStats {
  campaignsJoined?: number;
  hoursContributed?: number;
  impactPoints?: number;
  endorsements?: number;
  volunteersHelped?: number; // for organizations
  campaignsCreated?: number; // for organizations
}

export interface Availability {
  weekdays?: boolean;
  weekends?: boolean;
  remotely?: boolean;
  inPerson?: boolean;
  hours?: number; // hours per week
}

export interface Campaign {
  id: string;
  title: string;
  organizationId: string;
  description: string;
  image?: string;
  location: string;
  isRemote: boolean;
  startDate: string;
  endDate?: string;
  skills: string[];
  causes: string[];
  requiredHours: number;
  openings: number;
  applicants: string[]; // array of user IDs
  volunteers: string[]; // array of accepted user IDs
  status: 'active' | 'completed' | 'upcoming' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  urgencyLevel?: 'low' | 'medium' | 'high';
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  description?: string;
  logo?: string;
  website?: string;
  location?: string;
  causes: string[];
  size?: string;
  foundedYear?: number;
  verified: boolean;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  stats?: {
    volunteersHelped: number;
    campaignsCreated: number;
    totalHours: number;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Event {
  id: string;
  title: string;
  organizationId: string;
  description: string;
  image?: string;
  date: string;
  location: string;
  attendees: number;
  campaignId?: string;
  isVirtual: boolean;
  link?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application' | 'message' | 'acceptance' | 'reminder' | 'announcement';
  content: string;
  relatedId?: string; // campaign, message, or event ID
  timestamp: string;
  read: boolean;
}

export interface Filter {
  search?: string;
  causes?: string[];
  skills?: string[];
  location?: string;
  remote?: boolean;
  duration?: [number, number]; // min/max hours
  status?: ('active' | 'completed' | 'upcoming')[];
  urgency?: ('low' | 'medium' | 'high')[];
  sortBy?: 'newest' | 'popularity' | 'urgency' | 'endingSoon';
}