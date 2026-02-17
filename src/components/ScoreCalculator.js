import React from 'react';
import { cn } from '../utils/cn.js';
import { calculateJokeScore } from '../utils/scoring.js';

function getScoreDescription(total) {
  if (total > 100) return { text: 'LEGENDARY!', color: 'text-yellow-300', emoji: '🌟' };
  if (total > 50) return { text: 'Brilliant!', color: 'text-green-300', emoji: '✨' };
  if (total > 0) return { text: 'Nice!', color: 'text-blue-300', emoji: '👍' };
  if (total > -50) return { text: 'Meh...', color: 'text-gray-300', emoji: '😐' };
  if (total > -100) return { text: 'Oof...', color: 'text-orange-300', emoji: '😅' };
  return { text: 'CATASTROPHIC!', color: 'text-red-300', emoji: '💀' };
}

export function ScoreCalculator({ jokeGlyphs, audience, onComplete }) {
  const [floatingScores, setFloatingScores] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [runningTotal, setRunningTotal] = React.useState({ delight: 0, disgust: 0, confusion: 0, total: 0 });
  const [isProcessing, setIsProcessing] = React.useState(true);

  React.useEffect(() => {
    if (currentIndex >= jokeGlyphs.length || !isProcessing) return;

    const glyph = jokeGlyphs[currentIndex];
    const score = calculateJokeScore([glyph], audience);
    
    // Calculate synergy with previously processed glyphs
    let synergyBonus = 0;
    const synergyTexts = [];
    
    jokeGlyphs.slice(0, currentIndex).forEach(prevGlyph => {
      if ((prevGlyph.category === 'violation' && glyph.category === 'recognition') ||
          (prevGlyph.category === 'recognition' && glyph.category === 'violation')) {
        synergyBonus += 15;
        synergyTexts.push('Dark Humor!');
      }
      if ((prevGlyph.category === 'timing' && glyph.category === 'self-deprecation') ||
          (glyph.category === 'timing' && prevGlyph.category === 'self-deprecation')) {
        synergyBonus += 10;
        synergyTexts.push('Awkward Charm!');
      }
      if ((prevGlyph.category === 'body' && glyph.category === 'emotion') ||
          (glyph.category === 'body' && prevGlyph.category === 'emotion')) {
        synergyBonus += 12;
        synergyTexts.push('Melancholy Gold!');
      }
      if (prevGlyph.category === 'violation' && glyph.category === 'violation') {
        synergyBonus -= 30;
        synergyTexts.push('Audience Walks Out!');
      }
    });

    const totalValue = score.total + synergyBonus;
    
    const newFloating = {
      id: Date.now() + currentIndex,
      text: `${glyph.name}${synergyTexts.length > 0 ? ` + ${synergyTexts.join(', ')}` : ''}`,
      value: totalValue,
      color: totalValue > 0 ? 'text-green-400' : totalValue < 0 ? 'text-red-400' : 'text-yellow-400',
      x: 50 + (Math.random() - 0.5) * 100,
      y: 50,
    };

    setFloatingScores(prev => [...prev, newFloating]);
    
    const newTotal = {
      delight: runningTotal.delight + score.delight,
      disgust: runningTotal.disgust + score.disgust,
      confusion: runningTotal.confusion + score.confusion,
      total: runningTotal.total + totalValue,
    };
    
    setRunningTotal(newTotal);
    setCurrentIndex(prev => prev + 1);

    setTimeout(() => {
      setFloatingScores(prev => prev.filter(f => f.id !== newFloating.id));
    }, 1500);

  }, [currentIndex, jokeGlyphs, audience, isProcessing, runningTotal]);

  React.useEffect(() => {
    if (currentIndex >= jokeGlyphs.length && isProcessing) {
      setIsProcessing(false);
      setTimeout(() => {
        onComplete(runningTotal);
      }, 1000);
    }
  }, [currentIndex, jokeGlyphs.length, isProcessing, onComplete, runningTotal]);

  const description = getScoreDescription(runningTotal.total);

  return React.createElement(
    'div',
    { className: 'fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-hidden' },
    
    React.createElement('div', { className: 'absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-black/50' }),
    
    React.createElement(
      'div',
      { className: 'absolute inset-0 overflow-hidden' },
      [...Array(5)].map((_, i) =>
        React.createElement('div', {
          key: i,
          className: 'absolute rounded-full border border-purple-500/20 animate-ping',
          style: {
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.3}s`,
            animationDuration: '3s',
          }
        })
      )
    ),

    React.createElement(
      'div',
      { className: 'relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full px-8' },
      
      React.createElement(
        'div',
        { className: 'flex flex-col items-center gap-4' },
        React.createElement('div', { className: 'text-6xl animate-bounce-in' }, audience.emoji),
        React.createElement('h2', { className: 'text-2xl font-bold text-white' }, audience.name),
        React.createElement('p', { className: 'text-gray-400 text-center text-sm' }, audience.description)
      ),

      React.createElement(
        'div',
        { className: 'relative w-full h-64 flex items-center justify-center' },
        
        floatingScores.map(score =>
          React.createElement(
            'div',
            {
              key: score.id,
              className: cn('floating-score text-2xl', score.color),
              style: {
                left: `${score.x}%`,
                top: `${score.y}px`,
                animation: 'float-up 1.5s ease-out forwards',
              }
            },
            score.text,
            ' ',
            React.createElement('span', { className: score.color }, `${score.value > 0 ? '+' : ''}${score.value}`)
          )
        ),

        currentIndex < jokeGlyphs.length && isProcessing && React.createElement(
          'div',
          { className: 'relative' },
          React.createElement(
            'div',
            { className: 'w-24 h-32 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 border-2 border-purple-400 flex flex-col items-center justify-center shadow-2xl animate-pulse-glow' },
            React.createElement('span', { className: 'text-4xl text-white font-bold' }, jokeGlyphs[currentIndex].symbol),
            React.createElement('span', { className: 'text-xs text-white/80 mt-2 text-center px-2' }, jokeGlyphs[currentIndex].name)
          ),
          React.createElement(
            'div',
            { className: 'absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1' },
            React.createElement('span', { className: 'w-2 h-2 bg-yellow-400 rounded-full animate-bounce', style: { animationDelay: '0ms' } }),
            React.createElement('span', { className: 'w-2 h-2 bg-yellow-400 rounded-full animate-bounce', style: { animationDelay: '150ms' } }),
            React.createElement('span', { className: 'w-2 h-2 bg-yellow-400 rounded-full animate-bounce', style: { animationDelay: '300ms' } })
          )
        ),

        !isProcessing && React.createElement(
          'div',
          { className: 'text-center animate-bounce-in' },
          React.createElement('div', { className: 'text-6xl mb-4' }, description.emoji),
          React.createElement('div', { className: cn('text-4xl font-bold', description.color) },
            `${runningTotal.total > 0 ? '+' : ''}${Math.round(runningTotal.total)}`
          ),
          React.createElement('div', { className: cn('text-xl mt-2', description.color) }, description.text)
        )
      ),

      React.createElement(
        'div',
        { className: 'w-full grid grid-cols-4 gap-4' },
        React.createElement(
          'div',
          { className: 'bg-black/50 rounded-xl p-4 text-center border border-green-500/30' },
          React.createElement('div', { className: 'text-green-400 text-sm' }, 'Delight'),
          React.createElement('div', { className: 'text-2xl font-bold text-green-300' }, Math.round(runningTotal.delight))
        ),
        React.createElement(
          'div',
          { className: 'bg-black/50 rounded-xl p-4 text-center border border-yellow-500/30' },
          React.createElement('div', { className: 'text-yellow-400 text-sm' }, 'Confusion'),
          React.createElement('div', { className: 'text-2xl font-bold text-yellow-300' }, Math.round(runningTotal.confusion))
        ),
        React.createElement(
          'div',
          { className: 'bg-black/50 rounded-xl p-4 text-center border border-red-500/30' },
          React.createElement('div', { className: 'text-red-400 text-sm' }, 'Disgust'),
          React.createElement('div', { className: 'text-2xl font-bold text-red-300' }, Math.round(runningTotal.disgust))
        ),
        React.createElement(
          'div',
          { className: 'bg-black/50 rounded-xl p-4 text-center border border-purple-500/30' },
          React.createElement('div', { className: 'text-purple-400 text-sm' }, 'Total'),
          React.createElement('div', { className: cn('text-2xl font-bold', runningTotal.total > 0 ? 'text-green-300' : 'text-red-300') },
            `${runningTotal.total > 0 ? '+' : ''}${Math.round(runningTotal.total)}`
          )
        )
      )
    )
  );
}