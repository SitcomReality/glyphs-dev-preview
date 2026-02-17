import { TUTORIAL_STEPS } from '../data/tutorial.js';
import { Game } from './Game.js';

export function Tutorial(state) {
  const { tutorialStep, onAdvance } = state;
  const step = TUTORIAL_STEPS[tutorialStep];
  
  // Reuse the Game layout but with instructional overlay
  const gameView = Game(state);
  
  const overlay = document.createElement('div');
  overlay.className = 'fixed top-16 left-4 right-4 z-40';
  overlay.innerHTML = `
    <div class="bg-gradient-to-r from-purple-800/90 to-indigo-800/90 rounded-xl p-4 border border-purple-400 shadow-2xl">
      <h2 class="text-sm font-bold text-white mb-1">${step.title}</h2>
      <p class="text-xs text-gray-200">${step.instruction}</p>
      ${step.action === 'next' ? `<button id="tut-next" class="mt-2 text-[10px] text-yellow-400 font-bold uppercase tracking-wider">Tap to continue...</button>` : ''}
    </div>
  `;
  
  const btn = overlay.querySelector('#tut-next');
  if (btn) btn.onclick = onAdvance;
  
  gameView.appendChild(overlay);
  return gameView;
}