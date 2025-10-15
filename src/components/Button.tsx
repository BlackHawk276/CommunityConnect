// Reusable button component with variants, sizes, and animations

import { motion } from 'framer-motion';
import { Video as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-white border-2 border-primary-200 hover:bg-primary-50 text-primary-600',
    outline: 'border-2 border-white text-white hover:bg-white/10',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  const widthClass = fullWidth ? 'w-full' : '';

  const className = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass}`;

  return (
    <motion.button
      type={type}
      className={className}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      {children}
    </motion.button>
  );
}
