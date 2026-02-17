import { TUTORIAL_STEPS } from '../data/tutorial.js';
import { Game } from './Game.js';

export function Tutorial(state) {
  const { tutorialStep, onAdvance } = state;
  const step = TUTORIAL_STEPS[tutorialStep];
  
  // Reuse the Game layout but with instructional overlay
  const gameView = Game({
    ...state,
    tutorialHighlight: step.highlight
  });
  
  const overlay = document.createElement('div');
  overlay.className = 'fixed top-1/2 left-4 right-4 -translate-y-1/2 z-40 pointer-events-none';
  overlay.innerHTML = `
    <div class="bg-gradient-to-r from-purple-800/95 to-indigo-800/95 rounded-xl p-6 border border-purple-400 shadow-2xl pointer-events-auto transform transition-all animate-bounce-in">
      <h2 class="text-lg font-bold text-white mb-2">${step.title}</h2>
      <p class="text-sm text-gray-200 leading-relaxed">${step.instruction}</p>
      ${step.action === 'next' ? `
        <button id="tut-next" class="mt-4 w-full py-2 bg-yellow-500 text-black font-bold rounded-lg text-xs uppercase tracking-widest hover:bg-yellow-400 transition-colors">
          Tap to continue
        </button>
      ` : ''}
    </div>
  `;
  
  const btn = overlay.querySelector('#tut-next');
  if (btn) btn.onclick = onAdvance;
  
  gameView.appendChild(overlay);
  return gameView;
}