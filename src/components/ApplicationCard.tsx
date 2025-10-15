// Application card component for displaying volunteer applications

import React from 'react';
import { format } from 'date-fns';
import { Application, Task } from '../types';
import Card from './Card';
import { StatusBadge } from './StatusBadge';
import Badge from './Badge';

interface ApplicationCardProps {
  application: Application;
  task: Task;
  showActions?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  task,
  showActions = false,
  onAccept,
  onReject
}) => {
  return (
    <Card className="border-2 border-neutral-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {showActions ? (
            <>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">
                {application.volunteer.firstName} {application.volunteer.lastName}
              </h3>
              <p className="text-sm text-neutral-600">{application.volunteer.city}</p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">{task.title}</h3>
              <p className="text-sm text-neutral-600">{task.ngo.organizationName}</p>
            </>
          )}
        </div>
        <StatusBadge status={application.status} />
      </div>

      {showActions && application.volunteer.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {application.volunteer.skills.map((skill, index) => (
            <Badge key={index} variant="neutral" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      )}

      {application.message && (
        <div className="bg-neutral-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-neutral-700 italic">{application.message}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500">
          Applied on {format(new Date(application.appliedAt), 'MMM dd, yyyy')}
        </p>
        {application.respondedAt && (
          <p className="text-sm text-neutral-500">
            Responded on {format(new Date(application.respondedAt), 'MMM dd, yyyy')}
          </p>
        )}
      </div>

      {showActions && application.status === 'pending' && onAccept && onReject && (
        <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-200">
          <button
            onClick={onAccept}
            className="flex-1 bg-success-600 text-white font-semibold py-2 rounded-lg hover:bg-success-700 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={onReject}
            className="flex-1 bg-white text-red-600 border-2 border-red-600 font-semibold py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </Card>
  );
};
