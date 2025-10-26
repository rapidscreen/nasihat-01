import React from 'react';

interface ButtonProps {
  variant: 'green' | 'blue' | 'white' | 'grey' | 'black';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  // Variant classes for dark and light themes
  const variantClasses = {
    green: 'bg-button-green-dark hover:bg-[#1f4a37] text-white dark:bg-button-green-dark dark:hover:bg-[#1f4a37] dark:text-white light:bg-button-green-light light:hover:bg-[#d4f5df] light:text-button-black focus:ring-green-500',
    blue: 'bg-button-blue-dark hover:bg-[#172f4a] text-white dark:bg-button-blue-dark dark:hover:bg-[#172f4a] dark:text-white light:bg-button-blue-light light:hover:bg-[#d1e7fd] light:text-button-black focus:ring-blue-500',
    white: 'bg-white hover:bg-gray-50 text-button-black border border-gray-200 dark:bg-white dark:hover:bg-gray-50 dark:text-button-black dark:border-gray-200 light:bg-white light:hover:bg-gray-50 light:text-button-black light:border-gray-200 focus:ring-gray-500',
    grey: 'bg-slate-600 hover:bg-slate-500 text-white dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white light:bg-button-grey-light light:hover:bg-[#e8e8e8] light:text-button-black focus:ring-gray-500',
    black: 'bg-button-black hover:bg-black text-white dark:bg-button-black dark:hover:bg-black dark:text-white light:bg-button-black light:hover:bg-black light:text-white focus:ring-gray-500'
  };

  const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-current';

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      style={{ 
        fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif' 
      }}
    >
      {children}
    </button>
  );
};

export default Button;