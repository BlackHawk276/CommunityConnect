// Authentication store with Supabase integration

import { create } from 'zustand';
import { User, NGOUser, VolunteerUser, Task, Application } from '../types';
import { supabase } from '../lib/supabase';
import type { NGOProfile, VolunteerProfile, Task as DBTask, Application as DBApplication } from '../types/database';

interface AuthState {
  user: User | null;
  tasks: Task[];
  applications: Application[];
  isLoading: boolean;
  initialized: boolean;

  initialize: () => Promise<void>;
  login: (email: string, password: string, role: 'ngo' | 'volunteer') => Promise<void>;
  logout: () => Promise<void>;
  registerNGO: (data: Partial<NGOUser>) => Promise<void>;
  registerVolunteer: (data: Partial<VolunteerUser>) => Promise<void>;

  fetchTasks: () => Promise<void>;
  fetchApplications: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;

  applyToTask: (taskId: string, message?: string) => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => Promise<void>;
}

function mapNGOProfile(profile: NGOProfile, email: string): NGOUser {
  return {
    id: profile.id,
    email,
    role: 'ngo' as const,
    organizationName: profile.organization_name,
    contactPerson: profile.contact_person,
    phone: profile.phone,
    city: profile.city,
    description: profile.description,
    causeAreas: profile.cause_areas,
    website: profile.website,
    logo: profile.logo,
    createdAt: new Date(profile.created_at)
  };
}

function mapVolunteerProfile(profile: VolunteerProfile, email: string): VolunteerUser {
  return {
    id: profile.id,
    email,
    role: 'volunteer' as const,
    firstName: profile.first_name,
    lastName: profile.last_name,
    phone: profile.phone,
    city: profile.city,
    bio: profile.bio,
    skills: profile.skills,
    availability: profile.availability,
    createdAt: new Date(profile.created_at)
  };
}

function mapDBTask(task: DBTask, ngoProfile: NGOProfile): Task {
  return {
    id: task.id,
    ngoId: task.ngo_id,
    ngo: {
      organizationName: ngoProfile.organization_name,
      city: ngoProfile.city,
      logo: ngoProfile.logo
    },
    title: task.title,
    description: task.description,
    causeArea: task.cause_area,
    requiredSkills: task.required_skills,
    location: task.location,
    hoursPerWeek: task.hours_per_week,
    durationMonths: task.duration_months,
    status: task.status,
    createdAt: new Date(task.created_at)
  };
}

function mapDBApplication(app: DBApplication, volunteerProfile: VolunteerProfile): Application {
  return {
    id: app.id,
    taskId: app.task_id,
    volunteerId: app.volunteer_id,
    volunteer: {
      firstName: volunteerProfile.first_name,
      lastName: volunteerProfile.last_name,
      city: volunteerProfile.city,
      skills: volunteerProfile.skills
    },
    message: app.message,
    status: app.status,
    appliedAt: new Date(app.created_at)
  };
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tasks: [],
  applications: [],
  isLoading: false,
  initialized: false,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.user) {
      const { data: ngoProfile } = await supabase
        .from('ngo_profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (ngoProfile) {
        const user = mapNGOProfile(ngoProfile, session.user.email!);
        set({ user, initialized: true });
        await get().fetchTasks();
        await get().fetchApplications();
        return;
      }

      const { data: volunteerProfile } = await supabase
        .from('volunteer_profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      if (volunteerProfile) {
        const user = mapVolunteerProfile(volunteerProfile, session.user.email!);
        set({ user, initialized: true });
        await get().fetchTasks();
        await get().fetchApplications();
        return;
      }
    }

    set({ initialized: true });
  },

  login: async (email: string, password: string, role: 'ngo' | 'volunteer') => {
    set({ isLoading: true });

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      set({ isLoading: false });
      throw authError;
    }

    if (role === 'ngo') {
      const { data: profile, error: profileError } = await supabase
        .from('ngo_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        set({ isLoading: false });
        throw new Error('NGO profile not found');
      }

      const user = mapNGOProfile(profile, email);
      set({ user, isLoading: false });
      await get().fetchTasks();
      await get().fetchApplications();
    } else {
      const { data: profile, error: profileError } = await supabase
        .from('volunteer_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        set({ isLoading: false });
        throw new Error('Volunteer profile not found');
      }

      const user = mapVolunteerProfile(profile, email);
      set({ user, isLoading: false });
      await get().fetchTasks();
      await get().fetchApplications();
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, tasks: [], applications: [] });
  },

  registerNGO: async (data: Partial<NGOUser>) => {
    set({ isLoading: true });

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email!,
      password: data.password!
    });

    if (authError || !authData.user) {
      set({ isLoading: false });
      throw authError || new Error('Failed to create user');
    }

    const { error: profileError } = await supabase.from('ngo_profiles').insert({
      id: authData.user.id,
      organization_name: data.organizationName!,
      contact_person: data.contactPerson!,
      phone: data.phone!,
      city: data.city!,
      description: data.description!,
      cause_areas: data.causeAreas || [],
      website: data.website
    });

    if (profileError) {
      set({ isLoading: false });
      throw profileError;
    }

    const user: NGOUser = {
      id: authData.user.id,
      email: data.email!,
      role: 'ngo',
      organizationName: data.organizationName!,
      contactPerson: data.contactPerson!,
      phone: data.phone!,
      city: data.city!,
      description: data.description!,
      causeAreas: data.causeAreas || [],
      website: data.website,
      createdAt: new Date()
    };

    set({ user, isLoading: false });
  },

  registerVolunteer: async (data: Partial<VolunteerUser>) => {
    set({ isLoading: true });

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email!,
      password: data.password!
    });

    if (authError || !authData.user) {
      set({ isLoading: false });
      throw authError || new Error('Failed to create user');
    }

    const { error: profileError } = await supabase.from('volunteer_profiles').insert({
      id: authData.user.id,
      first_name: data.firstName!,
      last_name: data.lastName!,
      phone: data.phone!,
      city: data.city!,
      bio: data.bio!,
      skills: data.skills || [],
      availability: data.availability!
    });

    if (profileError) {
      set({ isLoading: false });
      throw profileError;
    }

    const user: VolunteerUser = {
      id: authData.user.id,
      email: data.email!,
      role: 'volunteer',
      firstName: data.firstName!,
      lastName: data.lastName!,
      phone: data.phone!,
      city: data.city!,
      bio: data.bio!,
      skills: data.skills || [],
      availability: data.availability!,
      createdAt: new Date()
    };

    set({ user, isLoading: false });
  },

  fetchTasks: async () => {
    const { data: tasksData, error } = await supabase
      .from('tasks')
      .select('*, ngo_profiles(*)')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const tasks = tasksData?.map(t => mapDBTask(t, t.ngo_profiles)) || [];
    set({ tasks });
  },

  fetchApplications: async () => {
    const user = get().user;
    if (!user) return;

    if (user.role === 'ngo') {
      const { data: appsData, error } = await supabase
        .from('applications')
        .select('*, volunteer_profiles(*), tasks!inner(ngo_id)')
        .eq('tasks.ngo_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const applications = appsData?.map(a => mapDBApplication(a, a.volunteer_profiles)) || [];
      set({ applications });
    } else {
      const { data: appsData, error } = await supabase
        .from('applications')
        .select('*, volunteer_profiles(*)')
        .eq('volunteer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const applications = appsData?.map(a => mapDBApplication(a, a.volunteer_profiles)) || [];
      set({ applications });
    }
  },

  createTask: async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const user = get().user as NGOUser;

    const { error } = await supabase.from('tasks').insert({
      ngo_id: user.id,
      title: taskData.title,
      description: taskData.description,
      cause_area: taskData.causeArea,
      required_skills: taskData.requiredSkills,
      location: taskData.location,
      hours_per_week: taskData.hoursPerWeek,
      duration_months: taskData.durationMonths,
      status: taskData.status
    });

    if (error) throw error;

    await get().fetchTasks();
  },

  updateTask: async (taskId: string, updates: Partial<Task>) => {
    const dbUpdates: any = {};
    if (updates.title) dbUpdates.title = updates.title;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.status) dbUpdates.status = updates.status;

    const { error } = await supabase
      .from('tasks')
      .update(dbUpdates)
      .eq('id', taskId);

    if (error) throw error;

    await get().fetchTasks();
  },

  deleteTask: async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;

    await get().fetchTasks();
    await get().fetchApplications();
  },

  applyToTask: async (taskId: string, message?: string) => {
    const user = get().user as VolunteerUser;

    const { error } = await supabase.from('applications').insert({
      task_id: taskId,
      volunteer_id: user.id,
      message,
      status: 'pending'
    });

    if (error) throw error;

    await get().fetchApplications();
  },

  updateApplicationStatus: async (applicationId: string, status: 'accepted' | 'rejected') => {
    const { error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', applicationId);

    if (error) throw error;

    await get().fetchApplications();
  }
}));
