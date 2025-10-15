// Reusable input component with label, error states, and icon support

import { Video as LucideIcon } from 'lucide-react';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  const inputClasses = `
    rounded-xl border-2 px-4 py-3 w-full
    transition-all duration-200
    ${Icon ? 'pl-12' : ''}
    ${error
      ? 'border-red-500 focus:ring-red-100 focus:border-red-500'
      : 'border-neutral-200 focus:ring-primary-100 focus:border-primary-500'
    }
    focus:outline-none focus:ring-4
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            <Icon size={20} />
          </div>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
