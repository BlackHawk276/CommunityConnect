// Reusable select dropdown component with label and error states

import { SelectHTMLAttributes, forwardRef } from 'react';
import { Video as LucideIcon } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  icon: Icon,
  className = '',
  children,
  ...props
}, ref) => {
  const selectClasses = `
    rounded-xl border-2 px-4 py-3 w-full bg-white cursor-pointer
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
            <Icon size={20} />
          </div>
        )}
        <select ref={ref} className={selectClasses} {...props}>
          {children}
        </select>
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
