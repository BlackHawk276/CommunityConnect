// Main app component with routing

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
import Button from './components/Button';
import { Home } from 'lucide-react';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-neutral-900 mb-4">
          {title}
        </h1>
        <p className="text-2xl text-neutral-600 mb-8">Coming in Layer 3</p>
        <Link to="/">
          <Button variant="primary" size="lg" icon={Home}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
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

        <Route path="/admin/dashboard" element={<PlaceholderPage title="Admin Dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
