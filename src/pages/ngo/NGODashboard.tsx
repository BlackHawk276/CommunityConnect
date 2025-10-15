// NGO Dashboard page showing overview stats and recent tasks

import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Activity, Clock, Plus } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import Card from '../../components/Card';
import { TaskCard } from '../../components/TaskCard';
import Button from '../../components/Button';
import { useAuthStore } from '../../store/authStore';
import { NGOUser } from '../../types';

export const NGODashboard: React.FC = () => {
  const { user, tasks, applications } = useAuthStore();
  const ngoUser = user as NGOUser;

  const myTasks = tasks.filter(task => task.ngoId === ngoUser.id);
  const activeTasks = myTasks.filter(task => task.status === 'active');
  const myTaskIds = myTasks.map(task => task.id);
  const pendingApplications = applications.filter(
    app => myTaskIds.includes(app.taskId) && app.status === 'pending'
  );

  const stats = [
    {
      icon: ClipboardList,
      label: 'Total Tasks',
      value: myTasks.length,
      color: 'text-primary-600 bg-primary-100'
    },
    {
      icon: Activity,
      label: 'Active Tasks',
      value: activeTasks.length,
      color: 'text-success-600 bg-success-100'
    },
    {
      icon: Clock,
      label: 'Pending Applications',
      value: pendingApplications.length,
      color: 'text-accent-600 bg-accent-100'
    }
  ];

  const recentTasks = myTasks.slice(-3).reverse();

  return (
    <DashboardLayout userRole="ngo">
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

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display text-neutral-900">Recent Tasks</h2>
            <Link to="/ngo/my-tasks">
              <Button variant="secondary" size="sm">View All Tasks</Button>
            </Link>
          </div>

          {recentTasks.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {recentTasks.map(task => (
                <TaskCard key={task.id} task={task} showNGO={false} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <p className="text-neutral-600 mb-4">You haven't created any tasks yet.</p>
              <Link to="/ngo/create-task">
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Task
                </Button>
              </Link>
            </Card>
          )}
        </div>

        <div>
          <Link to="/ngo/create-task">
            <Button variant="primary" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create New Task
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
