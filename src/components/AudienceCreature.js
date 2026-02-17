import { cn } from '../utils/cn.js';

function getReactionEmoji(reactions) {
  const total = (reactions?.delight || 0) - (reactions?.disgust || 0);
  if (total > 50) return '😂';
  if (total > 20) return '🙂';
  if (total > -20) return '😐';
  if (total > -50) return '😕';
  return '🤢';
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

export function AudienceCreatureHTML({ audience, reactions, isProcessing, showHiddenSensitivity }) {
  return `
    <div class="flex flex-col items-center gap-2">
      <div class="relative w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center shadow-xl transition-all duration-500 ${getCreatureBg(audience.id)} ${isProcessing ? 'animate-pulse scale-110' : ''}">
        <span class="text-3xl">${audience.emoji}</span>
        <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center text-lg shadow-lg border-2 border-gray-200">
          ${getReactionEmoji(reactions)}
        </div>
      </div>
      <div class="text-center">
        <h3 class="font-bold text-white text-xs">${audience.name}</h3>
        <p class="text-[10px] text-gray-400 max-w-[100px] leading-tight">${audience.description}</p>
      </div>
      <div class="flex gap-1 mt-1">
        ${audience.sensitivityGlyphs.map(id => `
          <div class="w-5 h-5 rounded-full flex items-center justify-center text-[8px] bg-gray-800 border border-gray-600 ${showHiddenSensitivity ? 'ring-1 ring-yellow-400' : ''}">
            ${id.substring(0, 3).toUpperCase()}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}