// Reusable card wrapper component with hover effects

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Card({
  children,
  hover = false,
  onClick,
  className = ''
}: CardProps) {
  const baseClasses = 'bg-white rounded-2xl shadow-soft p-6';
  const hoverClasses = hover
    ? 'hover:shadow-soft-lg hover:-translate-y-1 cursor-pointer transition-all duration-300'
    : '';
  const clickClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
