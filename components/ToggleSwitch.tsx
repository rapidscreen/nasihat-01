'use client';

import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  ariaLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  size = 'medium',
  disabled = false,
  ariaLabel
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          track: 'w-12 h-6',
          circle: 'w-5 h-5',
          translate: isOn ? 'translate-x-6' : 'translate-x-0.5'
        };
      case 'medium':
        return {
          track: 'w-16 h-8',
          circle: 'w-7 h-7',
          translate: isOn ? 'translate-x-8' : 'translate-x-0.5'
        };
      case 'large':
        return {
          track: 'w-20 h-10',
          circle: 'w-9 h-9',
          translate: isOn ? 'translate-x-10' : 'translate-x-0.5'
        };
      default:
        return {
          track: 'w-16 h-8',
          circle: 'w-7 h-7',
          translate: isOn ? 'translate-x-8' : 'translate-x-0.5'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  return (
    <button
      type="button"
      className={`
        ${sizeClasses.track}
        ${isOn ? 'toggle-track-on' : 'toggle-track-off'}
        relative inline-flex items-center rounded-full
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={!disabled ? onToggle : undefined}
      aria-pressed={isOn}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <span
        className={`
          ${sizeClasses.circle}
          ${sizeClasses.translate}
          toggle-circle
          inline-block rounded-full
          transition-transform duration-300 ease-in-out
        `}
      />
    </button>
  );
};

export default ToggleSwitch;