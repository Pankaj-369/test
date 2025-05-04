import { User, Campaign, Organization, Event, Message, Notification } from '../types';

export const mockCauses = [
  'Education', 'Environment', 'Health', 'Poverty', 'Hunger', 'Human Rights', 
  'Animal Welfare', 'Disaster Relief', 'Community Development', 'Arts & Culture',
  'Children & Youth', 'Elderly Care', 'Disability Support', 'Refugees', 'Homelessness'
];

export const mockSkills = [
  'Teaching', 'Mentoring', 'Web Development', 'Graphic Design', 'Social Media', 
  'Fundraising', 'Event Planning', 'Photography', 'Writing', 'Translation',
  'Medical', 'Legal', 'Accounting', 'Construction', 'Cooking', 'Driving',
  'Counseling', 'Project Management', 'Research', 'Public Speaking'
];

export const mockLocations = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Remote'
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    bio: 'Passionate about education and environmental conservation. Looking to make a difference in my community.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userType: 'volunteer',
    location: 'New York, NY',
    skills: ['Teaching', 'Web Development', 'Graphic Design'],
    causes: ['Education', 'Environment'],
    availability: {
      weekends: true,
      remotely: true,
      hours: 5
    },
    verified: true,
    createdAt: '2023-01-15T08:30:00',
    stats: {
      campaignsJoined: 8,
      hoursContributed: 64,
      impactPoints: 230,
      endorsements: 12
    }
  },
  {
    id: 'user-2',
    name: 'Jamie Smith',
    email: 'jamie@example.com',
    bio: 'Software engineer passionate about using technology for social good. Experienced in web development and app design.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userType: 'volunteer',
    location: 'San Francisco, CA',
    website: 'https://jamiesmith.dev',
    skills: ['Web Development', 'Mobile Development', 'Mentoring'],
    causes: ['Education', 'Technology Access', 'Community Development'],
    availability: {
      weekdays: true,
      weekends: true,
      remotely: true,
      hours: 10
    },
    verified: true,
    createdAt: '2022-11-20T14:45:00',
    stats: {
      campaignsJoined: 12,
      hoursContributed: 97,
      impactPoints: 345,
      endorsements: 18
    }
  },
  {
    id: 'org-1',
    name: 'GreenEarth Foundation',
    email: 'contact@greenearth.org',
    bio: 'Dedicated to environmental conservation and sustainable living practices. We organize clean-ups and awareness campaigns.',
    avatar: 'https://images.pexels.com/photos/5340270/pexels-photo-5340270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userType: 'organization',
    location: 'Chicago, IL',
    website: 'https://greenearthfoundation.org',
    causes: ['Environment', 'Community Development', 'Education'],
    verified: true,
    createdAt: '2021-05-10T09:15:00',
    stats: {
      volunteersHelped: 245,
      campaignsCreated: 18,
      impactPoints: 1240
    }
  },
  {
    id: 'org-2',
    name: 'EduAccess Initiative',
    email: 'info@eduaccess.org',
    bio: 'Working to provide quality education to underserved communities. We focus on tutoring, mentorship, and educational resources.',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    userType: 'organization',
    location: 'Boston, MA',
    website: 'https://eduaccess.org',
    causes: ['Education', 'Children & Youth', 'Poverty'],
    verified: true,
    createdAt: '2022-01-25T11:20:00',
    stats: {
      volunteersHelped: 178,
      campaignsCreated: 12,
      impactPoints: 920
    }
  }
];

export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'GreenEarth Foundation',
    email: 'contact@greenearth.org',
    description: 'Dedicated to environmental conservation and sustainable living practices. We organize clean-ups and awareness campaigns.',
    logo: 'https://images.pexels.com/photos/5340270/pexels-photo-5340270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    website: 'https://greenearthfoundation.org',
    location: 'Chicago, IL',
    causes: ['Environment', 'Community Development', 'Education'],
    size: '15-50 employees',
    foundedYear: 2008,
    verified: true,
    socialLinks: {
      facebook: 'https://facebook.com/greenearth',
      twitter: 'https://twitter.com/greenearth',
      instagram: 'https://instagram.com/greenearth',
      linkedin: 'https://linkedin.com/company/greenearth'
    },
    stats: {
      volunteersHelped: 245,
      campaignsCreated: 18,
      totalHours: 2450
    }
  },
  {
    id: 'org-2',
    name: 'EduAccess Initiative',
    email: 'info@eduaccess.org',
    description: 'Working to provide quality education to underserved communities. We focus on tutoring, mentorship, and educational resources.',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    website: 'https://eduaccess.org',
    location: 'Boston, MA',
    causes: ['Education', 'Children & Youth', 'Poverty'],
    size: '5-15 employees',
    foundedYear: 2015,
    verified: true,
    socialLinks: {
      facebook: 'https://facebook.com/eduaccess',
      twitter: 'https://twitter.com/eduaccess',
      instagram: 'https://instagram.com/eduaccess'
    },
    stats: {
      volunteersHelped: 178,
      campaignsCreated: 12,
      totalHours: 1680
    }
  },
  {
    id: 'org-3',
    name: 'Health For All',
    email: 'contact@healthforall.org',
    description: 'Providing healthcare services and education to underserved communities worldwide. We organize medical camps and awareness programs.',
    logo: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    website: 'https://healthforall.org',
    location: 'Seattle, WA',
    causes: ['Health', 'Poverty', 'Education'],
    size: '50-100 employees',
    foundedYear: 2005,
    verified: true,
    socialLinks: {
      facebook: 'https://facebook.com/healthforall',
      twitter: 'https://twitter.com/healthforall',
      linkedin: 'https://linkedin.com/company/healthforall'
    },
    stats: {
      volunteersHelped: 320,
      campaignsCreated: 25,
      totalHours: 3800
    }
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    title: 'Urban Tree Planting Initiative',
    organizationId: 'org-1',
    description: 'Join us in our mission to green urban spaces! We\'re looking for volunteers to help plant trees throughout the city, creating a more sustainable and beautiful environment for all residents.',
    image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Chicago, IL',
    isRemote: false,
    startDate: '2025-04-10T09:00:00',
    endDate: '2025-04-25T17:00:00',
    skills: ['Physical Work', 'Gardening'],
    causes: ['Environment', 'Community Development'],
    requiredHours: 6,
    openings: 25,
    applicants: ['user-1', 'user-2'],
    volunteers: [],
    status: 'upcoming',
    createdAt: '2025-03-01T10:15:00',
    updatedAt: '2025-03-01T10:15:00',
    urgencyLevel: 'medium'
  },
  {
    id: 'campaign-2',
    title: 'After-School Tutoring Program',
    organizationId: 'org-2',
    description: 'Make a difference in a child\'s life by volunteering as a tutor in our after-school program. Help students with homework, reading, and math skills in a supportive environment.',
    image: 'https://images.pexels.com/photos/8423001/pexels-photo-8423001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Boston, MA',
    isRemote: false,
    startDate: '2025-03-15T15:00:00',
    endDate: '2025-06-15T18:00:00',
    skills: ['Teaching', 'Mentoring'],
    causes: ['Education', 'Children & Youth'],
    requiredHours: 3,
    openings: 15,
    applicants: ['user-1'],
    volunteers: ['user-2'],
    status: 'active',
    createdAt: '2025-02-20T09:30:00',
    updatedAt: '2025-02-28T14:00:00',
    urgencyLevel: 'high'
  },
  {
    id: 'campaign-3',
    title: 'Website Development for Health Awareness',
    organizationId: 'org-3',
    description: 'Help us create an informative website to raise awareness about preventative healthcare measures in underserved communities. Looking for volunteers with web development and content creation skills.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Remote',
    isRemote: true,
    startDate: '2025-03-10T00:00:00',
    endDate: '2025-04-30T23:59:59',
    skills: ['Web Development', 'Content Creation', 'Graphic Design'],
    causes: ['Health', 'Education', 'Technology Access'],
    requiredHours: 20,
    openings: 5,
    applicants: [],
    volunteers: ['user-2'],
    status: 'active',
    createdAt: '2025-02-25T11:45:00',
    updatedAt: '2025-03-02T16:20:00',
    urgencyLevel: 'medium'
  },
  {
    id: 'campaign-4',
    title: 'Community Food Bank Assistance',
    organizationId: 'org-1',
    description: 'Support our local food bank by helping to sort and distribute food packages to families in need. This is a hands-on opportunity to directly impact food security in our community.',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Chicago, IL',
    isRemote: false,
    startDate: '2025-03-05T09:00:00',
    endDate: '2025-03-05T15:00:00',
    skills: ['Physical Work', 'Organization'],
    causes: ['Hunger', 'Poverty', 'Community Development'],
    requiredHours: 6,
    openings: 20,
    applicants: ['user-1'],
    volunteers: ['user-2'],
    status: 'active',
    createdAt: '2025-02-15T13:10:00',
    updatedAt: '2025-02-28T09:45:00',
    urgencyLevel: 'high'
  },
  {
    id: 'campaign-5',
    title: 'Virtual English Tutoring for Refugees',
    organizationId: 'org-2',
    description: 'Help refugees improve their English language skills through online tutoring sessions. This remote opportunity allows volunteers to make a global impact from anywhere.',
    image: 'https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Remote',
    isRemote: true,
    startDate: '2025-04-01T00:00:00',
    endDate: '2025-06-30T23:59:59',
    skills: ['Teaching', 'Language Skills', 'Mentoring'],
    causes: ['Education', 'Refugees', 'Human Rights'],
    requiredHours: 2,
    openings: 30,
    applicants: ['user-2'],
    volunteers: [],
    status: 'upcoming',
    createdAt: '2025-03-01T16:40:00',
    updatedAt: '2025-03-01T16:40:00',
    urgencyLevel: 'medium'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Environmental Awareness Workshop',
    organizationId: 'org-1',
    description: 'Join us for an interactive workshop on environmental conservation and sustainable practices. Learn how you can make a difference in your community.',
    image: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-03-22T14:00:00',
    location: 'Chicago Community Center, Chicago, IL',
    attendees: 45,
    campaignId: 'campaign-1',
    isVirtual: false
  },
  {
    id: 'event-2',
    title: 'Virtual Volunteer Orientation',
    organizationId: 'org-2',
    description: 'New to volunteering? Join our virtual orientation session to learn about opportunities, expectations, and how to make the most impact.',
    image: 'https://images.pexels.com/photos/3183173/pexels-photo-3183173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-03-10T18:30:00',
    location: 'Online',
    attendees: 78,
    isVirtual: true,
    link: 'https://zoom.us/j/example'
  },
  {
    id: 'event-3',
    title: 'Healthcare Volunteer Training',
    organizationId: 'org-3',
    description: 'Specialized training for volunteers interested in supporting healthcare initiatives. Learn basic protocols and how to assist in medical outreach programs.',
    image: 'https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-04-08T09:00:00',
    location: 'Health For All Headquarters, Seattle, WA',
    attendees: 32,
    campaignId: 'campaign-3',
    isVirtual: false
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'user-1',
    receiverId: 'org-1',
    content: 'Hello, I\'m interested in your tree planting initiative. Could you provide more details about the scheduling?',
    timestamp: '2025-03-02T14:30:00',
    read: true
  },
  {
    id: 'msg-2',
    senderId: 'org-1',
    receiverId: 'user-1',
    content: 'Hi Alex! Thank you for your interest. The tree planting sessions are scheduled for weekends from 9 AM to 3 PM. You can choose any day that works for you. Would you like to sign up for a specific date?',
    timestamp: '2025-03-02T15:45:00',
    read: true
  },
  {
    id: 'msg-3',
    senderId: 'user-2',
    receiverId: 'org-2',
    content: 'I have experience in web development and would like to help with your website project. Is this opportunity still available?',
    timestamp: '2025-03-01T11:20:00',
    read: false
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'application',
    content: 'Your application for "Urban Tree Planting Initiative" has been received! We\'ll review it shortly.',
    relatedId: 'campaign-1',
    timestamp: '2025-03-02T14:35:00',
    read: false
  },
  {
    id: 'notif-2',
    userId: 'user-2',
    type: 'acceptance',
    content: 'Congratulations! Your application for "After-School Tutoring Program" has been accepted.',
    relatedId: 'campaign-2',
    timestamp: '2025-02-28T16:20:00',
    read: true
  },
  {
    id: 'notif-3',
    userId: 'user-2',
    type: 'message',
    content: 'You have a new message from EduAccess Initiative.',
    relatedId: 'org-2',
    timestamp: '2025-03-01T11:25:00',
    read: false
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'reminder',
    content: 'Reminder: Environmental Awareness Workshop is tomorrow at 2 PM.',
    relatedId: 'event-1',
    timestamp: '2025-03-21T10:00:00',
    read: false
  }
];