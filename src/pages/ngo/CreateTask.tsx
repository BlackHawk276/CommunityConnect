// Create Task page for NGOs to post volunteer opportunities
import toast from 'react-hot-toast';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, MapPin, Clock, Calendar } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { useAuthStore } from '../../store/authStore';
import { INDIAN_CITIES, CAUSE_AREAS, SKILLS } from '../../data/constants';
import { NGOUser } from '../../types';

const taskSchema = z.object({
  title: z.string().min(10, 'Task title must be at least 10 characters'),
  description: z.string().min(100, 'Description must be at least 100 characters'),
  causeArea: z.string().min(1, 'Please select a cause area'),
  requiredSkills: z.array(z.string()).min(1, 'Please select at least one skill'),
  location: z.string().min(1, 'Please select a location'),
  hoursPerWeek: z.number().min(1, 'Hours per week must be at least 1').max(40, 'Hours per week cannot exceed 40'),
  durationMonths: z.number().min(1, 'Duration must be at least 1 month').max(24, 'Duration cannot exceed 24 months')
});

type TaskFormData = z.infer<typeof taskSchema>;

export const CreateTask: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { user, createTask } = useAuthStore();
  const navigate = useNavigate();
  const ngoUser = user as NGOUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      requiredSkills: []
    }
  });

  const handleSkillToggle = (skill: string) => {
    const updated = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updated);
    setValue('requiredSkills', updated, { shouldValidate: true });
  };

  const onSubmit = (data: TaskFormData) => {
    createTask({
      ...data,
      ngoId: ngoUser.id,
      ngo: {
        organizationName: ngoUser.organizationName,
        city: ngoUser.city,
        logo: ngoUser.logo
      },
      status: 'active'
    });

    toast.success('Task created successfully!');
    navigate('/ngo/my-tasks');
  };

  return (
    <DashboardLayout userRole="ngo">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold font-display text-neutral-900 mb-8">Create New Task</h1>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Task Title
              </label>
              <Input
                {...register('title')}
                placeholder="e.g., Teaching Assistant for English Classes"
                error={errors.title?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Task Description
              </label>
              <textarea
                {...register('description')}
                rows={6}
                placeholder="Provide a detailed description of the volunteer opportunity, responsibilities, and impact..."
                className={`w-full px-4 py-3 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 transition-all ${
                  errors.description
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-200'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Cause Area
                </label>
                <Select
                  {...register('causeArea')}
                  error={errors.causeArea?.message}
                >
                  <option value="">Select Cause Area</option>
                  {CAUSE_AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Location
                </label>
                <Select
                  {...register('location')}
                  error={errors.location?.message}
                >
                  <option value="">Select Location</option>
                  {INDIAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Hours Per Week
                </label>
                <Input
                  {...register('hoursPerWeek', { valueAsNumber: true })}
                  type="number"
                  min="1"
                  max="40"
                  placeholder="e.g., 10"
                  error={errors.hoursPerWeek?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Duration (Months)
                </label>
                <Input
                  {...register('durationMonths', { valueAsNumber: true })}
                  type="number"
                  min="1"
                  max="24"
                  placeholder="e.g., 6"
                  error={errors.durationMonths?.message}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Required Skills (Select at least one)
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {SKILLS.map(skill => (
                  <label
                    key={skill}
                    className="flex items-center gap-2 p-3 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillToggle(skill)}
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-200"
                    />
                    <span className="text-sm text-neutral-700">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.requiredSkills && (
                <p className="mt-2 text-sm text-red-600">{errors.requiredSkills.message}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" size="lg">
                Create Task
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => navigate('/ngo/my-tasks')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};
