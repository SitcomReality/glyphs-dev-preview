import { calculateJokeScore } from '../utils/scoring.js';
import { cn } from '../utils/cn.js';

export function ScoreCalculator({ jokeGlyphs, audience, onComplete }) {
  const container = document.createElement('div');
  container.className = 'fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-hidden';
  
  let currentIndex = 0;
  let runningTotal = { delight: 0, disgust: 0, confusion: 0, total: 0 };
  
  function update() {
    if (currentIndex >= jokeGlyphs.length) {
      renderFinal();
      return;
    }

    const glyph = jokeGlyphs[currentIndex];
    const score = calculateJokeScore([glyph], audience);
    
    // Synergy simplified for vanilla logic
    let totalValue = score.total;
    
    runningTotal.delight += score.delight;
    runningTotal.disgust += score.disgust;
    runningTotal.confusion += score.confusion;
    runningTotal.total += totalValue;

    renderStep(glyph, totalValue);
    currentIndex++;
    
    setTimeout(update, 800);
  }

  function renderStep(glyph, value) {
    container.innerHTML = `
      <div class="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full px-8">
        <div class="flex flex-col items-center gap-4">
          <div class="text-6xl animate-bounce-in">${audience.emoji}</div>
          <h2 class="text-2xl font-bold text-white">${audience.name}</h2>
        </div>
        <div class="relative w-full h-64 flex items-center justify-center">
          <div class="w-24 h-32 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 border-2 border-purple-400 flex flex-col items-center justify-center shadow-2xl animate-pulse-glow">
            <span class="text-4xl text-white font-bold">${glyph.symbol}</span>
            <span class="text-xs text-white/80 mt-2 text-center px-2">${glyph.name}</span>
          </div>
          <div class="absolute top-0 text-3xl font-bold ${value >= 0 ? 'text-green-400' : 'text-red-400'} animate-float-up">
            ${value >= 0 ? '+' : ''}${value}
          </div>
        </div>
      </div>
    `;
  }

  function renderFinal() {
    container.innerHTML = `
      <div class="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full px-8">
        <div class="text-center animate-bounce-in">
          <div class="text-6xl mb-4">✨</div>
          <div class="text-4xl font-bold text-yellow-400">${runningTotal.total > 0 ? '+' : ''}${Math.round(runningTotal.total)}</div>
          <div class="text-xl mt-2 text-white">Performance Scored!</div>
          <button id="calc-done" class="mt-8 px-8 py-3 bg-purple-600 rounded-xl font-bold hover:bg-purple-700 transition-all">Continue</button>
        </div>
      </div>
    `;
    container.querySelector('#calc-done').onclick = () => onComplete(runningTotal);
  }

  setTimeout(update, 500);
  return container;
}