// Reusable badge component for labels and tags

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md'
}: BadgeProps) {
  const baseClasses = 'rounded-full font-semibold inline-flex items-center justify-center';

  const variantClasses = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-100 text-success-700',
    warning: 'bg-accent-100 text-accent-700',
    neutral: 'bg-neutral-100 text-neutral-700'
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}
