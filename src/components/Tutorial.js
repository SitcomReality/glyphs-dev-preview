import React from 'react';
import { GlyphCard } from './GlyphCard.js';
import { GlyphDeck } from './GlyphDeck.js';
import { AudiencePanel } from './AudiencePanel.js';
import { ScoreCalculator } from './ScoreCalculator.js';
import { TUTORIAL_STEPS } from '../data/tutorial.js';

export function Tutorial({
  tutorialStep,
  hand,
  selectedGlyphs,
  audiences,
  reactions,
  showScoreCalc,
  onGlyphSelect,
  onDeliverJoke,
  onScoreComplete
}) {
  const step = TUTORIAL_STEPS[tutorialStep];

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col' },
    
    React.createElement(
      'div',
      { className: 'p-4 bg-black/30 backdrop-blur-sm border-b border-white/10' },
      React.createElement(
        'div',
        { className: 'max-w-6xl mx-auto flex items-center justify-between' },
        React.createElement('div', { className: 'text-2xl' }, '📖 Tutorial'),
        React.createElement('div', { className: 'text-white font-bold' },
          `Step ${tutorialStep + 1} of ${TUTORIAL_STEPS.length}`
        )
      )
    ),

    React.createElement(
      'div',
      { className: 'flex-1 flex flex-col p-4' },
      
      React.createElement(
        'div',
        { className: 'max-w-4xl mx-auto mb-6' },
        React.createElement(
          'div',
          { className: 'bg-gradient-to-r from-purple-800/50 to-indigo-800/50 rounded-2xl p-6 border border-purple-500/30' },
          React.createElement('h2', { className: 'text-2xl font-bold text-white mb-2' }, step.title),
          React.createElement('p', { className: 'text-gray-300' }, step.instruction)
        )
      ),

      tutorialStep >= 3 && React.createElement(
        'div',
        { className: 'p-4' },
        React.createElement(AudiencePanel, {
          audiences,
          reactions,
          isProcessing: false,
          showHiddenSensitivity: false
        })
      ),

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
            selectedGlyphs.length > 0 && tutorialStep >= 4 && React.createElement(
              'button',
              {
                onClick: onDeliverJoke,
                className: 'px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all'
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
                      React.createElement(GlyphCard, { glyph, size: 'lg' })
                    )
                  )
                )
          )
        )
      ),

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

    showScoreCalc && selectedGlyphs.length > 0 && React.createElement(ScoreCalculator, {
      jokeGlyphs: selectedGlyphs,
      audience: audiences[0],
      onComplete: onScoreComplete
    })
  );
}