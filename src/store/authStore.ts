// Authentication store using Zustand for state management
// Handles user auth, task management, and application workflow

import { create } from 'zustand';
import { User, NGOUser, VolunteerUser, Task, Application } from '../types';

interface AuthState {
  user: User | null;
  tasks: Task[];
  applications: Application[];
  isLoading: boolean;

  login: (email: string, password: string, role: 'ngo' | 'volunteer') => Promise<void>;
  logout: () => void;
  registerNGO: (data: Partial<NGOUser>) => Promise<void>;
  registerVolunteer: (data: Partial<VolunteerUser>) => Promise<void>;

  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;

  applyToTask: (taskId: string, message?: string) => void;
  updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => void;
}

const MOCK_USERS = {
  ngo: {
    id: 'ngo-1',
    email: 'ngo@example.com',
    password: 'password123',
    role: 'ngo' as const,
    organizationName: 'Hope Foundation',
    contactPerson: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    description: 'Empowering communities through education and healthcare initiatives since 2015.',
    causeAreas: ['Education & Literacy', 'Healthcare & Medical'],
    website: 'https://hopefoundation.org',
    createdAt: new Date('2024-01-15')
  },
  volunteer: {
    id: 'vol-1',
    email: 'volunteer@example.com',
    password: 'password123',
    role: 'volunteer' as const,
    firstName: 'Priya',
    lastName: 'Sharma',
    phone: '+91 98765 43211',
    city: 'Bangalore',
    bio: 'Passionate about making a difference in my community through education and environmental causes.',
    skills: ['Teaching & Tutoring', 'Content Writing', 'Social Media Management'],
    availability: 'Weekends, 10 hours/week',
    createdAt: new Date('2024-02-10')
  }
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tasks: [],
  applications: [],
  isLoading: false,

  login: async (email: string, password: string, role: 'ngo' | 'volunteer') => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = MOCK_USERS[role];

    if (mockUser.email === email && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      set({ user: userWithoutPassword as User, isLoading: false });
      localStorage.setItem('cc_user', JSON.stringify(userWithoutPassword));

      const storedTasks = localStorage.getItem('cc_tasks');
      const storedApplications = localStorage.getItem('cc_applications');
      if (storedTasks) set({ tasks: JSON.parse(storedTasks) });
      if (storedApplications) set({ applications: JSON.parse(storedApplications) });
    } else {
      set({ isLoading: false });
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ user: null, tasks: [], applications: [] });
    localStorage.removeItem('cc_user');
  },

  registerNGO: async (data: Partial<NGOUser>) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newNGO: NGOUser = {
      id: `ngo-${Date.now()}`,
      role: 'ngo',
      createdAt: new Date(),
      ...data
    } as NGOUser;

    set({ user: newNGO, isLoading: false });
    localStorage.setItem('cc_user', JSON.stringify(newNGO));
  },

  registerVolunteer: async (data: Partial<VolunteerUser>) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newVolunteer: VolunteerUser = {
      id: `vol-${Date.now()}`,
      role: 'volunteer',
      createdAt: new Date(),
      ...data
    } as VolunteerUser;

    set({ user: newVolunteer, isLoading: false });
    localStorage.setItem('cc_user', JSON.stringify(newVolunteer));
  },

  createTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date()
    };

    const updatedTasks = [...get().tasks, newTask];
    set({ tasks: updatedTasks });
    localStorage.setItem('cc_tasks', JSON.stringify(updatedTasks));
  },

  updateTask: (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = get().tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    set({ tasks: updatedTasks });
    localStorage.setItem('cc_tasks', JSON.stringify(updatedTasks));
  },

  deleteTask: (taskId: string) => {
    const updatedTasks = get().tasks.filter(task => task.id !== taskId);
    const updatedApplications = get().applications.filter(app => app.taskId !== taskId);
    set({ tasks: updatedTasks, applications: updatedApplications });
    localStorage.setItem('cc_tasks', JSON.stringify(updatedTasks));
    localStorage.setItem('cc_applications', JSON.stringify(updatedApplications));
  },

  applyToTask: (taskId: string, message?: string) => {
    const user = get().user as VolunteerUser;
    const task = get().tasks.find(t => t.id === taskId);

    if (!task) return;

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      taskId,
      volunteerId: user.id,
      volunteer: {
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        skills: user.skills,
        profilePhoto: user.profilePhoto
      },
      message,
      status: 'pending',
      appliedAt: new Date()
    };

    const updatedApplications = [...get().applications, newApplication];
    set({ applications: updatedApplications });
    localStorage.setItem('cc_applications', JSON.stringify(updatedApplications));
  },

  updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => {
    const updatedApplications = get().applications.map(app =>
      app.id === applicationId
        ? { ...app, status, respondedAt: new Date() }
        : app
    );
    set({ applications: updatedApplications });
    localStorage.setItem('cc_applications', JSON.stringify(updatedApplications));
  }
}));

if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('cc_user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    useAuthStore.setState({ user });

    const storedTasks = localStorage.getItem('cc_tasks');
    const storedApplications = localStorage.getItem('cc_applications');
    if (storedTasks) useAuthStore.setState({ tasks: JSON.parse(storedTasks) });
    if (storedApplications) useAuthStore.setState({ applications: JSON.parse(storedApplications) });
  }
}
