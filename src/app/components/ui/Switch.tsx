'use client';

import { useState, useEffect } from 'react';

interface SwitchProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  labelPosition?: 'left' | 'right';
  className?: string;
}

export default function Switch({
  id,
  checked,
  onChange,
  disabled = false,
  size = 'md',
  label,
  labelPosition = 'right',
  className = '',
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    if (!disabled) {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      onChange(newChecked);
    }
  };

  const sizeClasses = {
    sm: 'w-9 h-5 after:h-4 after:w-4',
    md: 'w-11 h-6 after:h-5 after:w-5',
    lg: 'w-14 h-7 after:h-6 after:w-6',
  };

  return (
    <div className={`flex items-center ${className}`}>
      {label && labelPosition === 'left' && (
        <span className="mr-2 text-sm font-medium text-gray-700">{label}</span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleChange}
        className={`relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } ${sizeClasses[size]} ${isChecked ? 'bg-blue-600' : 'bg-gray-200'}`}
        id={id}>
        <span
          className={`absolute transform transition-transform ${
            isChecked
              ? size === 'sm'
                ? 'translate-x-4'
                : size === 'md'
                ? 'translate-x-5'
                : 'translate-x-7'
              : 'translate-x-1'
          } inline-block rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
            sizeClasses[size].split('after:')[1]
          }`}
        />
      </button>
      {label && labelPosition === 'right' && (
        <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
      )}
    </div>
  );
}
