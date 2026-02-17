import { cn } from '../utils/cn.js';
import { GlyphCardHTML } from './GlyphCard.js';
import { AudienceCreatureHTML } from './AudienceCreature.js';
import { ScoreCalculator } from './ScoreCalculator.js';

export function Game(state) {
  const {
    hand, selectedGlyphs, audiences, reactions, stats, roundTime,
    gameState, showHiddenSensitivity, showScoreCalc, lastJokeScore,
    onGlyphSelect, onDeliverJoke, onScoreComplete, onNextRound, onBackToMenu, onRemoveGlyph,
    tutorialHighlight = null
  } = state;

  const container = document.createElement('div');
  container.className = 'min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col';

  container.innerHTML = `
    <!-- Header -->
    <div class="p-4 bg-black/30 backdrop-blur-sm border-b border-white/10 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="text-2xl">🎭</div>
        <div>
          <div class="text-white font-bold text-sm">Influence: <span class="text-yellow-400">${stats.influence}</span></div>
          <div class="text-[10px] text-gray-400">Jokes: ${stats.successfulJokes}/${stats.totalJokes}</div>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div id="timer-display" class="text-2xl font-bold text-white ${roundTime <= 10 ? 'text-red-400 animate-pulse' : ''}">${roundTime}s</div>
        <button id="menu-btn" class="px-3 py-1 bg-gray-700 text-xs text-white rounded hover:bg-gray-600">Menu</button>
      </div>
    </div>

    <!-- Main -->
    <div class="flex-1 flex flex-col overflow-y-auto">
      <div class="grid grid-cols-3 gap-2 p-4">
        ${audiences.map(a => AudienceCreatureHTML({
          audience: a,
          reactions: reactions[a.id],
          isProcessing: gameState === 'delivering',
          showHiddenSensitivity
        })).join('')}
      </div>

      <!-- Joke Bench -->
      <div class="p-4 bg-black/20">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-white font-bold text-sm">Joke Crafting (${selectedGlyphs.length}/5)</h3>
            <button id="deliver-btn" class="px-4 py-2 bg-green-600 text-white font-bold text-xs rounded hover:bg-green-700 disabled:opacity-50 ${tutorialHighlight === 'deliver' ? 'tutorial-highlight-ring' : ''}" ${selectedGlyphs.length === 0 ? 'disabled' : ''}>
              🎤 Deliver!
            </button>
          </div>
          <div class="flex gap-2 min-h-[110px] items-center justify-center bg-black/30 rounded-xl p-2">
            ${selectedGlyphs.length === 0 ? '<p class="text-gray-500 italic text-xs">Tap glyphs to build a joke...</p>' : selectedGlyphs.map((g, i) => `
              <div class="relative">
                ${GlyphCardHTML({ glyph: g, size: 'lg' })}
                <button data-remove-index="${i}" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">×</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Hand -->
      <div class="flex-1 p-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-white font-bold text-sm mb-2">Your Hand</h3>
          <div class="flex flex-wrap gap-2 justify-center p-3 bg-black/30 rounded-2xl ${tutorialHighlight === 'select' ? 'tutorial-highlight-ring' : ''}">
            ${hand.map(g => GlyphCardHTML({
              glyph: g,
              selected: selectedGlyphs.some(sg => sg.id === g.id && sg.symbol === g.symbol),
              size: 'md'
            })).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach internal behaviors
  container.querySelector('#menu-btn').onclick = onBackToMenu;
  const delBtn = container.querySelector('#deliver-btn');
  if (delBtn) delBtn.onclick = onDeliverJoke;

  if (showScoreCalc) {
    const calc = ScoreCalculator({
      jokeGlyphs: selectedGlyphs,
      audience: audiences[0],
      onComplete: onScoreComplete
    });
    container.appendChild(calc);
  }

  if (gameState === 'result' && lastJokeScore) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-6 max-w-xs w-full text-center space-y-4 border border-purple-500/50 shadow-2xl">
        <div class="text-5xl">${lastJokeScore.total > 50 ? '🎉' : lastJokeScore.total > 0 ? '😊' : '😐'}</div>
        <div>
          <div class="text-2xl font-bold text-white">${Math.round(lastJokeScore.total)} Points</div>
          <p class="text-xs text-gray-300 mt-2">${lastJokeScore.details}</p>
        </div>
        <button id="next-round-btn" class="w-full py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700">Next Performance</button>
      </div>
    `;
    modal.querySelector('#next-round-btn').onclick = onNextRound;
    container.appendChild(modal);
  }

  return container;
}