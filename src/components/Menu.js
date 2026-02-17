import React from 'react';

export function Menu({ onStartGame, stats }) {
  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex flex-col items-center justify-center p-8' },
    React.createElement(
      'div',
      { className: 'text-center space-y-8 max-w-2xl' },
      
      React.createElement(
        'div',
        { className: 'space-y-4' },
        React.createElement('h1', { className: 'text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500' },
          'The Absurd Art'
        ),
        React.createElement('h2', { className: 'text-3xl md:text-4xl font-bold text-white' },
          'of Making Them Laugh'
        ),
        React.createElement('p', { className: 'text-xl text-gray-300 italic' },
          'A game of glyphs, giggles, and glorious misinterpretation'
        )
      ),

      React.createElement(
        'div',
        { className: 'flex justify-center gap-4 text-4xl' },
        React.createElement('span', { className: 'animate-bounce', style: { animationDelay: '0ms' } }, '⧖'),
        React.createElement('span', { className: 'animate-bounce', style: { animationDelay: '100ms' } }, '⧗'),
        React.createElement('span', { className: 'animate-bounce', style: { animationDelay: '200ms' } }, '⧙'),
        React.createElement('span', { className: 'animate-bounce', style: { animationDelay: '300ms' } }, '⧛'),
        React.createElement('span', { className: 'animate-bounce', style: { animationDelay: '400ms' } }, '🜚')
      ),

      React.createElement(
        'div',
        { className: 'space-y-4' },
        React.createElement(
          'button',
          {
            onClick: onStartGame,
            className: 'w-full max-w-md px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-bold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50'
          },
          '🎭 Start Performance'
        ),
        
        stats.highScore > 0 && React.createElement(
          'div',
          { className: 'text-gray-400' },
          'High Score: ',
          React.createElement('span', { className: 'text-yellow-400 font-bold' }, stats.highScore),
          ' Influence'
        )
      )
    )
  );
}