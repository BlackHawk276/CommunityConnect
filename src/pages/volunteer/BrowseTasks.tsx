// Browse Tasks page with advanced filters

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../../components/DashboardLayout';
import { TaskCard } from '../../components/TaskCard';
import { FilterSidebar } from '../../components/FilterSidebar';
import { EmptyState } from '../../components/EmptyState';
import { useAuthStore } from '../../store/authStore';
import { VolunteerUser } from '../../types';
import { Search } from 'lucide-react';

export const BrowseTasks: React.FC = () => {
  const { user, tasks, applications, applyToTask } = useAuthStore();
  const volunteerUser = user as VolunteerUser;

  const [filters, setFilters] = useState({
    search: '',
    city: '',
    causeArea: '',
    skills: [] as string[]
  });

  const myApplications = applications.filter(app => app.volunteerId === volunteerUser.id);
  const appliedTaskIds = myApplications.map(app => app.taskId);

  const activeTasks = tasks.filter(task => task.status === 'active');

  const filteredTasks = activeTasks.filter(task => {
    if (filters.search && !(
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.causeArea.toLowerCase().includes(filters.search.toLowerCase())
    )) return false;

    if (filters.city && task.location !== filters.city && task.location !== 'Remote') return false;

    if (filters.causeArea && task.causeArea !== filters.causeArea) return false;

    if (filters.skills.length > 0 && !filters.skills.some(skill => task.requiredSkills.includes(skill))) return false;

    return true;
  });

  const handleApply = async (taskId: string) => {
    const alreadyApplied = appliedTaskIds.includes(taskId);
    if (alreadyApplied) {
      toast.error('You have already applied to this task!');
      return;
    }
    try {
      await applyToTask(taskId);
      toast.success('Application submitted successfully!');
      await new Promise(resolve => setTimeout(resolve, 500));
      window.location.reload();
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const isTaskApplied = (taskId: string) => appliedTaskIds.includes(taskId);

  return (
    <DashboardLayout userRole="volunteer">
      <div>
        <h1 className="text-3xl font-bold font-display text-neutral-900 mb-8">Browse Opportunities</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            taskCount={filteredTasks.length}
          />

          <div className="flex-1">
            {filteredTasks.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No tasks found"
                description="Try adjusting your filters to see more opportunities"
                actionLabel="Clear Filters"
                onAction={() => setFilters({ search: '', city: '', causeArea: '', skills: [] })}
              />
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredTasks.map(task => {
                  const applied = isTaskApplied(task.id);
                  return (
                    <div key={task.id} className="relative">
                      <TaskCard
                        task={task}
                        showNGO={true}
                        onApply={applied ? undefined : () => handleApply(task.id)}
                      />
                      {applied && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Applied ✓
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
