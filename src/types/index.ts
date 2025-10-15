// Type definitions for CommunityConnect platform

export type UserRole = 'ngo' | 'volunteer';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected';
export type TaskStatus = 'active' | 'inactive';

export interface NGOUser {
  id: string;
  email: string;
  role: 'ngo';
  organizationName: string;
  contactPerson: string;
  phone: string;
  city: string;
  description: string;
  causeAreas: string[];
  website?: string;
  logo?: string;
  createdAt: Date;
}

export interface VolunteerUser {
  id: string;
  email: string;
  role: 'volunteer';
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  bio?: string;
  skills: string[];
  availability?: string;
  profilePhoto?: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  ngoId: string;
  ngo: {
    organizationName: string;
    city: string;
    logo?: string;
  };
  title: string;
  description: string;
  causeArea: string;
  requiredSkills: string[];
  location: string;
  hoursPerWeek: number;
  durationMonths: number;
  status: TaskStatus;
  createdAt: Date;
}

export interface Application {
  id: string;
  taskId: string;
  volunteerId: string;
  volunteer: {
    firstName: string;
    lastName: string;
    city: string;
    skills: string[];
    profilePhoto?: string;
  };
  message?: string;
  status: ApplicationStatus;
  appliedAt: Date;
  respondedAt?: Date;
}

export type User = NGOUser | VolunteerUser;
