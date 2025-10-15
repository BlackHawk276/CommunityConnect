// My Applications page for volunteers to track their application status

import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import Card from '../../components/Card';
import { ApplicationCard } from '../../components/ApplicationCard';
import Button from '../../components/Button';
import { useAuthStore } from '../../store/authStore';
import { VolunteerUser, ApplicationStatus } from '../../types';

type FilterTab = 'all' | ApplicationStatus;

export const MyApplications: React.FC = () => {
  const { user, tasks, applications } = useAuthStore();
  const volunteerUser = user as VolunteerUser;
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const myApplications = applications.filter(app => app.volunteerId === volunteerUser.id);

  const filteredApplications =
    activeTab === 'all'
      ? myApplications
      : myApplications.filter(app => app.status === activeTab);

  const getTask = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };

  const tabs: { value: FilterTab; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const getTabCount = (tab: FilterTab) => {
    if (tab === 'all') return myApplications.length;
    return myApplications.filter(app => app.status === tab).length;
  };

  return (
    <DashboardLayout userRole="volunteer">
      <div>
        <h1 className="text-3xl font-bold font-display text-neutral-900 mb-8">My Applications</h1>

        <div className="flex gap-2 mb-8">
          {tabs.map(tab => {
            const count = getTabCount(tab.value);
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm capitalize transition-all ${
                  activeTab === tab.value
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>

        {filteredApplications.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-neutral-600 mb-4">
              {activeTab === 'all'
                ? "You haven't applied to any tasks yet."
                : `No ${activeTab} applications.`}
            </p>
            {activeTab === 'all' && (
              <Button variant="primary" onClick={() => window.location.href = '/volunteer/browse-tasks'}>
                Browse Tasks
              </Button>
            )}
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map(application => {
              const task = getTask(application.taskId);
              if (!task) return null;

              return (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  task={task}
                  showActions={false}
                />
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
