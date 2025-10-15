// Dashboard layout component with sidebar navigation for NGOs and Volunteers

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Plus, ClipboardList, Search, FileText, LogOut, Heart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'ngo' | 'volunteer';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const ngoLinks = [
    { to: '/ngo/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/ngo/create-task', label: 'Create Task', icon: Plus },
    { to: '/ngo/my-tasks', label: 'My Tasks', icon: ClipboardList }
  ];

  const volunteerLinks = [
    { to: '/volunteer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/volunteer/browse-tasks', label: 'Browse Tasks', icon: Search },
    { to: '/volunteer/my-applications', label: 'My Applications', icon: FileText }
  ];

  const links = userRole === 'ngo' ? ngoLinks : volunteerLinks;

  const getUserName = () => {
    if (!user) return '';
    if (user.role === 'ngo') return user.organizationName;
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="fixed top-0 w-full bg-white border-b border-neutral-200 z-40 h-16">
        <div className="h-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary-600" />
            <span className="font-display font-bold text-xl text-neutral-900">CommunityConnect</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600 font-medium">{getUserName()}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <aside className="fixed left-0 top-16 w-64 bg-white border-r border-neutral-200 h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="p-4 space-y-2">
          {links.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="ml-64 mt-16 p-8">
        {children}
      </main>
    </div>
  );
};
