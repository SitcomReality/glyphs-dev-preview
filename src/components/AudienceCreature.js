import React from 'react';
import { cn } from '../utils/cn.js';

function getReactionEmoji(reactions) {
  const total = reactions.delight - reactions.disgust;
  if (total > 50) return '😂';
  if (total > 20) return '🙂';
  if (total > -20) return '😐';
  if (total > -50) return '😕';
  return '🤢';
}

function getBubbleAnimation(reactions, isProcessing) {
  if (isProcessing) {
    return 'animate-pulse scale-110';
  }
  const total = reactions.delight - reactions.disgust;
  if (total > 30) return 'animate-bounce';
  if (total < -30) return 'animate-pulse';
  return '';
}

function getCreatureBg(audienceId) {
  switch (audienceId) {
    case 'glimmerbeast': return 'from-cyan-400 to-blue-600';
    case 'murkling': return 'from-gray-600 to-gray-900';
    case 'static-council': return 'from-amber-400 to-orange-600';
    case 'echo': return 'from-slate-300 to-slate-500';
    case 'void-watcher': return 'from-purple-900 to-black';
    case 'giggle-golem': return 'from-stone-400 to-stone-600';
    case 'philosopher-fungus': return 'from-amber-600 to-red-800';
    case 'chaos-sprite': return 'from-pink-400 to-purple-600';
    default: return 'from-gray-400 to-gray-600';
  }
}

function ReactionBar({ label, value, color }) {
  return React.createElement(
    'div',
    { className: 'flex items-center gap-1' },
    React.createElement('span', { className: 'text-[10px] text-gray-400 w-12' }, label),
    React.createElement(
      'div',
      { className: 'flex-1 h-2 bg-gray-700 rounded-full overflow-hidden' },
      React.createElement('div', {
        className: cn('h-full rounded-full transition-all duration-500', color),
        style: { width: `${value}%` }
      })
    ),
    React.createElement('span', { className: 'text-[10px] text-gray-300 w-8 text-right' }, Math.round(value))
  );
}

export function AudienceCreature({ audience, reactions, isProcessing, showHiddenSensitivity }) {
  return React.createElement(
    'div',
    { className: 'flex flex-col items-center gap-2' },
    
    // Creature
    React.createElement(
      'div',
      {
        className: cn(
          'relative w-24 h-24 rounded-full bg-gradient-to-br flex items-center justify-center',
          'shadow-xl transition-all duration-500',
          getCreatureBg(audience.id),
          getBubbleAnimation(reactions, isProcessing)
        )
      },
      React.createElement('span', { className: 'text-4xl' }, audience.emoji),
      
      // Reaction bubble
      React.createElement(
        'div',
        {
          className: cn(
            'absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white',
            'flex items-center justify-center text-xl',
            'shadow-lg border-2 border-gray-200',
            'transition-transform duration-300',
            isProcessing && 'animate-spin'
          )
        },
        getReactionEmoji(reactions)
      ),
      
      // Processing indicator
      isProcessing && React.createElement(
        'div',
        { className: 'absolute -bottom-1 left-1/2 -translate-x-1/2' },
        React.createElement(
          'div',
          { className: 'flex gap-1' },
          React.createElement('span', { className: 'w-2 h-2 bg-yellow-400 rounded-full animate-bounce', style: { animationDelay: '0ms' } }),
          React.createElement('span', { className: 'w-2 h-2 bg-yellow-400 rounded-full animate-bounce', style: { animationDelay: '150ms' } }),
          React.createElement('span', { className: 'w-2 h-2 bg-yellow-400 rounded-full animate-bounce', style: { animationDelay: '300ms' } })
        )
      )
    ),
    
    // Name
    React.createElement(
      'div',
      { className: 'text-center' },
      React.createElement('h3', { className: 'font-bold text-white text-sm' }, audience.name),
      React.createElement('p', { className: 'text-xs text-gray-400 max-w-[120px]' }, audience.description)
    ),
    
    // Sensitivity glyphs
    React.createElement(
      'div',
      { className: 'flex gap-1 mt-1' },
      audience.sensitivityGlyphs.map((glyphId, i) =>
        React.createElement(
          'div',
          {
            key: i,
            className: cn(
              'w-6 h-6 rounded-full flex items-center justify-center text-xs',
              'bg-gradient-to-br from-gray-700 to-gray-900 border border-gray-600',
              showHiddenSensitivity && 'ring-2 ring-yellow-400'
            ),
            title: glyphId
          },
          glyphId.substring(0, 3).toUpperCase()
        )
      )
    ),
    
    // Reaction meters
    React.createElement(
      'div',
      { className: 'w-full max-w-[140px] space-y-1 mt-2' },
      React.createElement(ReactionBar, { label: 'Delight', value: reactions.delight, color: 'bg-green-500' }),
      React.createElement(ReactionBar, { label: 'Confusion', value: reactions.confusion, color: 'bg-yellow-500' }),
      React.createElement(ReactionBar, { label: 'Disgust', value: reactions.disgust, color: 'bg-red-500' })
    )
  );
}