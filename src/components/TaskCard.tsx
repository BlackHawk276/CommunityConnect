// Reusable task card component for displaying volunteer opportunities

import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Task } from '../types';
import Card from './Card';
import Badge from './Badge';

interface TaskCardProps {
  task: Task;
  showNGO?: boolean;
  onApply?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, showNGO = true, onApply }) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      {showNGO && (
        <div className="flex items-center gap-3 mb-4">
          {task.ngo.logo ? (
            <img
              src={task.ngo.logo}
              alt={task.ngo.organizationName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">
                {task.ngo.organizationName.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-semibold text-neutral-900">{task.ngo.organizationName}</p>
            <p className="text-sm text-neutral-600">{task.ngo.city}</p>
          </div>
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-xl font-bold font-display text-neutral-900">{task.title}</h3>
          <Badge variant="primary" className="shrink-0">{task.causeArea}</Badge>
        </div>

        <p className="text-neutral-600 mb-4 line-clamp-3">{task.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-neutral-400" />
          <span className="text-sm text-neutral-600">{task.location}</span>
        </div>

        {task.requiredSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {task.requiredSkills.map((skill, index) => (
              <Badge key={index} variant="neutral" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
          <Clock className="w-4 h-4" />
          <span>
            {task.hoursPerWeek} hours/week for {task.durationMonths} {task.durationMonths === 1 ? 'month' : 'months'}
          </span>
        </div>
      </div>

      {onApply && (
        <button
          onClick={onApply}
          className="w-full bg-accent-600 text-white font-semibold py-3 rounded-lg hover:bg-accent-700 transition-colors mt-4"
        >
          Apply Now
        </button>
      )}
    </Card>
  );
};
