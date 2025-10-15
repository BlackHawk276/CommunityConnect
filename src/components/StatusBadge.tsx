// Status badge component for application status display

import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { ApplicationStatus } from '../types';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = {
    pending: {
      icon: Clock,
      text: 'Pending',
      className: 'bg-accent-100 text-accent-700'
    },
    accepted: {
      icon: CheckCircle,
      text: 'Accepted',
      className: 'bg-success-100 text-success-700'
    },
    rejected: {
      icon: XCircle,
      text: 'Rejected',
      className: 'bg-red-100 text-red-700'
    }
  };

  const { icon: Icon, text, className } = config[status];

  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold text-sm ${className}`}>
      <Icon className="w-4 h-4" />
      {text}
    </span>
  );
};
