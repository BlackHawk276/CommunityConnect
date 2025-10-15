// Mock data for volunteer tasks - to be used in Layer 2

import { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    ngoId: 'ngo-1',
    ngo: {
      organizationName: 'Hope Foundation',
      city: 'Mumbai',
      logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=100&fit=crop'
    },
    title: 'English Teacher for Underprivileged Children',
    description: 'We are looking for passionate volunteers to teach English to children from underprivileged backgrounds. Help them build a better future through education.',
    causeArea: 'Education & Literacy',
    requiredSkills: ['Teaching & Tutoring', 'Content Writing'],
    location: 'Mumbai',
    hoursPerWeek: 5,
    durationMonths: 6,
    status: 'active',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    ngoId: 'ngo-2',
    ngo: {
      organizationName: 'Green Earth Initiative',
      city: 'Bangalore',
      logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop'
    },
    title: 'Environmental Awareness Campaign Volunteer',
    description: 'Join us in creating awareness about environmental conservation. Help organize community drives and educational workshops.',
    causeArea: 'Environment & Wildlife',
    requiredSkills: ['Event Management', 'Social Media Management'],
    location: 'Bangalore',
    hoursPerWeek: 8,
    durationMonths: 3,
    status: 'active',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '3',
    ngoId: 'ngo-3',
    ngo: {
      organizationName: 'Healthcare For All',
      city: 'Delhi',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop'
    },
    title: 'Medical Camp Coordinator',
    description: 'Assist in organizing free medical camps in rural areas. Help with registration, patient coordination, and basic administrative tasks.',
    causeArea: 'Healthcare & Medical',
    requiredSkills: ['Administrative Support', 'Medical & Healthcare'],
    location: 'Delhi',
    hoursPerWeek: 10,
    durationMonths: 4,
    status: 'active',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '4',
    ngoId: 'ngo-1',
    ngo: {
      organizationName: 'Hope Foundation',
      city: 'Mumbai',
      logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=100&fit=crop'
    },
    title: 'Social Media Manager for NGO',
    description: 'Help us grow our online presence and reach more people. Create engaging content and manage our social media platforms.',
    causeArea: 'Community Development',
    requiredSkills: ['Social Media Management', 'Graphic Design', 'Content Writing'],
    location: 'Remote',
    hoursPerWeek: 6,
    durationMonths: 12,
    status: 'active',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '5',
    ngoId: 'ngo-4',
    ngo: {
      organizationName: 'Women Empower India',
      city: 'Pune',
      logo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop'
    },
    title: 'Skill Development Trainer',
    description: 'Train women in vocational skills like tailoring, handicrafts, and computer basics. Help them become financially independent.',
    causeArea: 'Women Empowerment',
    requiredSkills: ['Skill Development & Training', 'Teaching & Tutoring'],
    location: 'Pune',
    hoursPerWeek: 7,
    durationMonths: 6,
    status: 'active',
    createdAt: new Date('2024-01-25')
  },
  {
    id: '6',
    ngoId: 'ngo-5',
    ngo: {
      organizationName: 'Paws & Claws Rescue',
      city: 'Chennai',
      logo: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=100&h=100&fit=crop'
    },
    title: 'Animal Shelter Volunteer',
    description: 'Help care for rescued animals at our shelter. Assist with feeding, cleaning, and providing love to animals in need.',
    causeArea: 'Animal Welfare',
    requiredSkills: ['Manual Labor & Field Work'],
    location: 'Chennai',
    hoursPerWeek: 4,
    durationMonths: 3,
    status: 'active',
    createdAt: new Date('2024-02-05')
  }
];
