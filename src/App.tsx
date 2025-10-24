// Main app component with routing

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import { Login } from './pages/Login';
import { RegisterNGO } from './pages/RegisterNGO';
import { RegisterVolunteer } from './pages/RegisterVolunteer';
import { NGODashboard } from './pages/ngo/NGODashboard';
import { CreateTask } from './pages/ngo/CreateTask';
import { MyTasks } from './pages/ngo/MyTasks';
import { VolunteerDashboard } from './pages/volunteer/VolunteerDashboard';
import { BrowseTasks } from './pages/volunteer/BrowseTasks';
import { MyApplications } from './pages/volunteer/MyApplications';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';

export default function App() {
  const initialize = useAuthStore(state => state.initialize);
  const initialized = useAuthStore(state => state.initialized);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-ngo" element={<RegisterNGO />} />
        <Route path="/register-volunteer" element={<RegisterVolunteer />} />

        <Route
          path="/ngo/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ngo']}>
              <NGODashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngo/create-task"
          element={
            <ProtectedRoute allowedRoles={['ngo']}>
              <CreateTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngo/my-tasks"
          element={
            <ProtectedRoute allowedRoles={['ngo']}>
              <MyTasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['volunteer']}>
              <VolunteerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/browse-tasks"
          element={
            <ProtectedRoute allowedRoles={['volunteer']}>
              <BrowseTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteer/my-applications"
          element={
            <ProtectedRoute allowedRoles={['volunteer']}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
