import React from 'react';
import { cn } from '../utils/cn.js';
import { GlyphCard } from './GlyphCard.js';
import { GlyphDeck } from './GlyphDeck.js';
import { AudiencePanel } from './AudiencePanel.js';
import { ScoreCalculator } from './ScoreCalculator.js';

export function Game({
  hand,
  selectedGlyphs,
  audiences,
  reactions,
  stats,
  roundTime,
  gameState,
  showHiddenSensitivity,
  showScoreCalc,
  lastJokeScore,
  onGlyphSelect,
  onDeliverJoke,
  onScoreComplete,
  onNextRound,
  onBackToMenu,
  onRemoveGlyph
}) {
  const isDelivering = gameState === 'delivering';
  const isResult = gameState === 'result';

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col' },
    
    // Header
    React.createElement(
      'div',
      { className: 'p-4 bg-black/30 backdrop-blur-sm border-b border-white/10' },
      React.createElement(
        'div',
        { className: 'max-w-6xl mx-auto flex items-center justify-between' },
        React.createElement(
          'div',
          { className: 'flex items-center gap-4' },
          React.createElement('div', { className: 'text-2xl' }, '🎭'),
          React.createElement(
            'div',
            null,
            React.createElement('div', { className: 'text-white font-bold' },
              'Influence: ',
              React.createElement('span', { className: 'text-yellow-400' }, stats.influence)
            ),
            React.createElement('div', { className: 'text-xs text-gray-400' },
              `Jokes: ${stats.successfulJokes}/${stats.totalJokes}`
            )
          )
        ),
        
        React.createElement(
          'div',
          { className: 'flex items-center gap-4' },
          React.createElement(
            'div',
            {
              className: cn(
                'text-4xl font-bold text-white',
                roundTime <= 10 && 'text-red-400 animate-pulse'
              )
            },
            `${roundTime}s`
          ),
          React.createElement(
            'button',
            {
              onClick: onBackToMenu,
              className: 'px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors'
            },
            'Menu'
          )
        )
      )
    ),

    // Main game area
    React.createElement(
      'div',
      { className: 'flex-1 flex flex-col' },
      
      // Audience panel
      React.createElement(
        'div',
        { className: 'p-4' },
        React.createElement(AudiencePanel, {
          audiences,
          reactions,
          isProcessing: isDelivering,
          showHiddenSensitivity
        })
      ),

      // Joke area
      React.createElement(
        'div',
        { className: 'p-4 bg-black/20' },
        React.createElement(
          'div',
          { className: 'max-w-4xl mx-auto' },
          React.createElement(
            'div',
            { className: 'flex items-center justify-between mb-2' },
            React.createElement('h3', { className: 'text-white font-bold' },
              `Your Joke (${selectedGlyphs.length}/5)`
            ),
            selectedGlyphs.length > 0 && React.createElement(
              'button',
              {
                onClick: onDeliverJoke,
                disabled: isDelivering || isResult,
                className: 'px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50'
              },
              '🎤 Deliver Joke!'
            )
          ),
          React.createElement(
            'div',
            { className: 'flex gap-2 min-h-[100px] items-center justify-center bg-black/30 rounded-xl p-4' },
            selectedGlyphs.length === 0
              ? React.createElement('p', { className: 'text-gray-500 italic' },
                  'Select glyphs from your hand to build your joke...'
                )
              : React.createElement(
                  'div',
                  { className: 'flex gap-2 flex-wrap justify-center' },
                  selectedGlyphs.map((glyph, index) =>
                    React.createElement(
                      'div',
                      { key: `${glyph.id}-${index}`, className: 'relative' },
                      React.createElement(GlyphCard, { glyph, size: 'lg' }),
                      React.createElement(
                        'button',
                        {
                          onClick: () => onRemoveGlyph(index),
                          className: 'absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600'
                        },
                        '×'
                      )
                    )
                  )
                )
          )
        )
      ),

      // Hand
      React.createElement(
        'div',
        { className: 'flex-1 p-4' },
        React.createElement(
          'div',
          { className: 'max-w-4xl mx-auto' },
          React.createElement('h3', { className: 'text-white font-bold mb-2' }, 'Your Hand'),
          React.createElement(GlyphDeck, {
            glyphs: hand,
            onGlyphSelect,
            selectedGlyphs,
            disabled: false
          })
        )
      )
    ),

    // Score calculator overlay
    showScoreCalc && selectedGlyphs.length > 0 && React.createElement(ScoreCalculator, {
      jokeGlyphs: selectedGlyphs,
      audience: audiences[0],
      onComplete: onScoreComplete
    }),

    // Result modal
    gameState === 'result' && lastJokeScore && React.createElement(
      'div',
      { className: 'fixed inset-0 bg-black/80 flex items-center justify-center z-50' },
      React.createElement(
        'div',
        { className: 'bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-8 max-w-md text-center space-y-6 border border-purple-500/50 shadow-2xl' },
        React.createElement('div', { className: 'text-6xl' },
          lastJokeScore.total > 50 ? '🎉' : lastJokeScore.total > 0 ? '😊' : '😐'
        ),
        React.createElement(
          'div',
          null,
          React.createElement('div', { className: 'text-3xl font-bold text-white mb-2' },
            `${Math.round(lastJokeScore.total)} Points`
          ),
          React.createElement('p', { className: 'text-gray-300' }, lastJokeScore.details)
        ),
        
        React.createElement(
          'div',
          { className: 'flex gap-2 justify-center text-sm' },
          Object.entries(reactions).map(([id, reaction]) => {
            const audience = audiences.find(a => a.id === id);
            return React.createElement(
              'div',
              { key: id, className: 'bg-black/30 rounded-lg px-3 py-2' },
              React.createElement('div', { className: 'text-lg' }, audience?.emoji),
              React.createElement('div', { className: 'text-xs text-gray-400' },
                reaction.delight > reaction.disgust ? '😄' : '😕'
              )
            );
          })
        ),

        React.createElement(
          'button',
          {
            onClick: onNextRound,
            className: 'w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all'
          },
          'Next Round →'
        ),

        stats.consecutiveFailures >= 3 && React.createElement(
          'div',
          { className: 'text-yellow-400 text-sm animate-pulse' },
          '✨ Self-Awareness Unlocked! Hidden preferences revealed!'
        )
      )
    )
  );
}