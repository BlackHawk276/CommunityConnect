// Database types for Supabase tables

export interface NGOProfile {
  id: string;
  organization_name: string;
  contact_person: string;
  phone: string;
  city: string;
  description: string;
  cause_areas: string[];
  website?: string;
  logo?: string;
  created_at: string;
  updated_at: string;
}

export interface VolunteerProfile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  bio: string;
  skills: string[];
  availability: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  ngo_id: string;
  title: string;
  description: string;
  cause_area: string;
  required_skills: string[];
  location: string;
  hours_per_week: number;
  duration_months: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  task_id: string;
  volunteer_id: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface TaskWithNGO extends Task {
  ngo_profile: NGOProfile;
}

export interface ApplicationWithDetails extends Application {
  task: TaskWithNGO;
  volunteer_profile: VolunteerProfile;
}
