import React from 'react';
import { cn } from '../utils/cn.js';

const colorClasses = {
  red: 'bg-gradient-to-br from-red-600 to-red-800 border-red-400',
  blue: 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400',
  green: 'bg-gradient-to-br from-green-600 to-green-800 border-green-400',
  purple: 'bg-gradient-to-br from-purple-600 to-purple-800 border-purple-400',
  gold: 'bg-gradient-to-br from-amber-500 to-amber-700 border-amber-400',
};

const glowClasses = {
  red: 'card-glow-red',
  blue: 'card-glow-blue',
  green: 'card-glow-green',
  purple: 'card-glow-purple',
  gold: 'card-glow-gold',
};

export function GlyphCard({ glyph, onClick, selected, disabled, size = 'md', showBack = false }) {
  const sizeClasses = {
    sm: 'w-12 h-16 text-lg',
    md: 'w-16 h-24 text-2xl',
    lg: 'w-20 h-28 text-3xl',
  };

  if (showBack) {
    return React.createElement(
      'div',
      {
        className: cn(
          sizeClasses[size],
          'rounded-xl border-2 border-purple-400 bg-gradient-to-br from-purple-600 to-purple-900',
          'flex items-center justify-center',
          'shadow-lg shadow-purple-500/30',
          'transition-transform duration-200'
        )
      },
      React.createElement('span', { className: 'text-3xl opacity-50' }, '🎭')
    );
  }

  return React.createElement(
    'button',
    {
      onClick,
      disabled,
      className: cn(
        sizeClasses[size],
        'rounded-xl border-2',
        colorClasses[glyph.color],
        'flex flex-col items-center justify-center gap-1',
        'shadow-lg',
        glowClasses[glyph.color],
        'transition-all duration-200',
        'hover:scale-105 hover:shadow-xl',
        selected && 'ring-4 ring-white ring-opacity-80 scale-110',
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
      )
    },
    React.createElement('span', { className: 'text-white font-bold drop-shadow-lg' }, glyph.symbol),
    React.createElement('span', { className: 'text-[8px] text-white/80 font-medium leading-tight px-1 text-center' }, glyph.name)
  );
}