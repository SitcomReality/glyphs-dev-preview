export function Menu({ onStartGame, stats }) {
  const container = document.createElement('div');
  container.className = 'min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black flex flex-col items-center justify-center p-8';
  
  container.innerHTML = `
    <div class="text-center space-y-8 max-w-2xl">
      <div class="space-y-4">
        <h1 class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
          The Absurd Art
        </h1>
        <h2 class="text-3xl md:text-4xl font-bold text-white">
          of Making Them Laugh
        </h2>
        <p class="text-xl text-gray-300 italic">
          A game of glyphs, giggles, and glorious misinterpretation
        </p>
      </div>

      <div class="flex justify-center gap-4 text-4xl">
        <span class="animate-bounce" style="animation-delay: 0ms">⧖</span>
        <span class="animate-bounce" style="animation-delay: 100ms">⧗</span>
        <span class="animate-bounce" style="animation-delay: 200ms">⧙</span>
        <span class="animate-bounce" style="animation-delay: 300ms">⧛</span>
        <span class="animate-bounce" style="animation-delay: 400ms">🜚</span>
      </div>

      <div class="space-y-4">
        <button id="start-btn" class="w-full max-w-md px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-bold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50">
          🎭 Start Performance
        </button>
        
        ${stats.highScore > 0 ? `
          <div class="text-gray-400">
            High Score: <span class="text-yellow-400 font-bold">${stats.highScore}</span> Influence
          </div>
        ` : ''}
      </div>

      <div class="bg-black/30 rounded-2xl p-6 text-left space-y-4 backdrop-blur-sm">
        <h3 class="text-xl font-bold text-white text-center">How to Play</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div class="text-center space-y-2">
            <div class="text-2xl">🎴</div>
            <p><strong class="text-white">Select Glyphs</strong></p>
            <p>Choose 3-5 symbols to craft your joke</p>
          </div>
          <div class="text-center space-y-2">
            <div class="text-2xl">👁️</div>
            <p><strong class="text-white">Read the Audience</strong></p>
            <p>Each creature has hidden preferences</p>
          </div>
          <div class="text-center space-y-2">
            <div class="text-2xl">🎤</div>
            <p><strong class="text-white">Deliver & Score</strong></p>
            <p>Watch reactions and gain Influence</p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#start-btn').onclick = onStartGame;
  return container;
}