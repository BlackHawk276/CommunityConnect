import React from 'react';
import { Video as LucideIcon } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, actionLabel, onAction }) => {
  return (
    <div className="text-center py-16">
      <Icon className="w-24 h-24 text-neutral-300 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 mb-6 max-w-md mx-auto">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
