// Volunteer Dashboard page showing overview stats and recommended tasks

import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock, Search } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import Card from '../../components/Card';
import { TaskCard } from '../../components/TaskCard';
import Button from '../../components/Button';
import { useAuthStore } from '../../store/authStore';
import { VolunteerUser } from '../../types';

export const VolunteerDashboard: React.FC = () => {
  const { user, tasks, applications, applyToTask } = useAuthStore();
  const volunteerUser = user as VolunteerUser;

  const myApplications = applications.filter(app => app.volunteerId === volunteerUser.id);
  const acceptedApplications = myApplications.filter(app => app.status === 'accepted');
  const pendingApplications = myApplications.filter(app => app.status === 'pending');

  const appliedTaskIds = myApplications.map(app => app.taskId);

  const recommendedTasks = tasks
    .filter(task =>
      task.status === 'active' &&
      !appliedTaskIds.includes(task.id) &&
      (task.location === volunteerUser.city ||
       task.requiredSkills.some(skill => volunteerUser.skills.includes(skill)))
    )
    .slice(0, 3);

  const stats = [
    {
      icon: FileText,
      label: 'Applications Submitted',
      value: myApplications.length,
      color: 'text-primary-600 bg-primary-100'
    },
    {
      icon: CheckCircle,
      label: 'Accepted',
      value: acceptedApplications.length,
      color: 'text-success-600 bg-success-100'
    },
    {
      icon: Clock,
      label: 'Pending',
      value: pendingApplications.length,
      color: 'text-accent-600 bg-accent-100'
    }
  ];

  const handleApply = (taskId: string) => {
    const alreadyApplied = appliedTaskIds.includes(taskId);
    if (alreadyApplied) {
      toast.error('You have already applied to this task!');
      return;
    }
    applyToTask(taskId);
    toast.success('Application submitted successfully!');
  };

  return (
    <DashboardLayout userRole="volunteer">
      <div>
        <h1 className="text-3xl font-bold font-display text-neutral-900 mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <div className={`inline-flex p-4 rounded-full ${stat.color} mb-4`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-4xl font-bold font-display text-neutral-900 mb-2">{stat.value}</p>
              <p className="text-neutral-600 font-medium">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display text-neutral-900">Recommended for You</h2>
            <Link to="/volunteer/browse-tasks">
              <Button variant="secondary" size="sm">Browse All Tasks</Button>
            </Link>
          </div>

          {recommendedTasks.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {recommendedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  showNGO={true}
                  onApply={() => handleApply(task.id)}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <p className="text-neutral-600 mb-4">No recommended tasks at the moment.</p>
              <Link to="/volunteer/browse-tasks">
                <Button variant="primary">
                  <Search className="w-4 h-4 mr-2" />
                  Browse All Tasks
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
