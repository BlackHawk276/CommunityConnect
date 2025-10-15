// Top navigation bar with logo and auth buttons

import { motion } from 'framer-motion';
import { Heart, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.role === 'ngo') return '/ngo/dashboard';
    if (user.role === 'volunteer') return '/volunteer/dashboard';
    return '/admin/dashboard';
  };

  const getUserName = () => {
    if (!user) return '';
    if (user.role === 'ngo') return user.organizationName;
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              className="w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-md flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Heart className="w-6 h-6 text-white fill-white" />
            </motion.div>
            <span className="text-2xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              CommunityConnect
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              How It Works
            </a>
            <a
              href="#for-ngos"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              For NGOs
            </a>
            <a
              href="#for-volunteers"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors"
            >
              For Volunteers
            </a>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-neutral-700 hidden md:inline">
                  {getUserName()}
                </span>
                <Link to={getDashboardPath()}>
                  <Button variant="secondary" size="sm" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" icon={LogOut} onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm" icon={LogIn}>
                    Login
                  </Button>
                </Link>
                <Link to="/register-volunteer">
                  <Button variant="accent" size="sm" icon={UserPlus}>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
