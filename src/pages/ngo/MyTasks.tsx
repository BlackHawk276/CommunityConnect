// My Tasks page for NGOs to manage their volunteer opportunities
import toast from 'react-hot-toast';

import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import { ApplicationCard } from '../../components/ApplicationCard';
import { useAuthStore } from '../../store/authStore';
import { NGOUser, Task } from '../../types';

export const MyTasks: React.FC = () => {
  const { user, tasks, applications, deleteTask, updateApplicationStatus } = useAuthStore();
  const ngoUser = user as NGOUser;
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const myTasks = tasks.filter(task => task.ngoId === ngoUser.id);

  const getTaskApplications = (taskId: string) => {
    return applications.filter(app => app.taskId === taskId);
  };

  const handleDeleteTask = (task: Task) => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"? This action cannot be undone.`)) {
      deleteTask(task.id);
      toast.success('Task deleted successfully!');
    }
  };

  const handleAcceptApplication = (applicationId: string) => {
    updateApplicationStatus(applicationId, 'accepted');
    toast.success('Application accepted!');
  };

  const handleRejectApplication = (applicationId: string) => {
    updateApplicationStatus(applicationId, 'rejected');
    toast.success('Application rejected.');
  };

  const toggleExpanded = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <DashboardLayout userRole="ngo">
      <div>
        <h1 className="text-3xl font-bold font-display text-neutral-900 mb-8">My Tasks</h1>

        {myTasks.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-neutral-600 mb-4">You haven't created any tasks yet.</p>
            <Button variant="primary" onClick={() => window.location.href = '/ngo/create-task'}>
              Create Your First Task
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {myTasks.map(task => {
              const taskApplications = getTaskApplications(task.id);
              const acceptedCount = taskApplications.filter(app => app.status === 'accepted').length;
              const isExpanded = expandedTaskId === task.id;

              return (
                <Card key={task.id} className="border-2 border-neutral-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-neutral-900">{task.title}</h3>
                        <Badge variant={task.status === 'active' ? 'success' : 'neutral'}>
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-neutral-600 mb-3">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span>📍 {task.location}</span>
                        <span>📋 {task.causeArea}</span>
                        <span>⏰ {task.hoursPerWeek}hrs/week for {task.durationMonths}mo</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                    <div className="text-sm">
                      <span className="font-semibold text-neutral-900">{taskApplications.length}</span>
                      <span className="text-neutral-600"> applications</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-success-600">{acceptedCount}</span>
                      <span className="text-neutral-600"> accepted</span>
                    </div>
                    {taskApplications.length > 0 && (
                      <button
                        onClick={() => toggleExpanded(task.id)}
                        className="ml-auto flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                      >
                        {isExpanded ? (
                          <>
                            Hide Applications
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            View Applications
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {isExpanded && taskApplications.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-neutral-200">
                      <h4 className="text-lg font-bold text-neutral-900 mb-4">Applications</h4>
                      <div className="space-y-4">
                        {taskApplications.map(application => (
                          <ApplicationCard
                            key={application.id}
                            application={application}
                            task={task}
                            showActions={true}
                            onAccept={() => handleAcceptApplication(application.id)}
                            onReject={() => handleRejectApplication(application.id)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
