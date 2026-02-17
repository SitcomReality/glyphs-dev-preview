export const AUDIENCES = [
  {
    id: 'glimmerbeast',
    name: 'The Glimmerbeast',
    creature: 'A crystalline entity that hums with judgmental light',
    emoji: '💎',
    sensitivityGlyphs: ['body', 'violation', 'timing'],
    hates: ['body', 'violation'],
    loves: ['recognition', 'timing', 'self-deprecation'],
    reactionPattern: 'delight',
    influenceReward: 50,
    reactionWindow: 2000,
    description: 'Hates bodily humor. Loves clever misdirection. High reward, tiny window.'
  },
  {
    id: 'murkling',
    name: 'The Murkling',
    creature: 'A shadowy blob that absorbs light and expectations',
    emoji: '🌫️',
    sensitivityGlyphs: ['body', 'emotion', 'timing'],
    hates: ['recognition', 'cosmic'],
    loves: ['body', 'emotion', 'timing'],
    reactionPattern: 'confusion',
    influenceReward: 40,
    reactionWindow: 4000,
    specialAbility: 'Confusion meter is actually delight in disguise',
    description: 'Only responds to body + sadness combos. Needs 4+ card jokes. Confusion = delight.'
  },
  {
    id: 'static-council',
    name: 'The Static Council',
    creature: 'Three judges, each voting independently from different frequencies',
    emoji: '📻',
    sensitivityGlyphs: ['self-deprecation', 'timing', 'recognition'],
    hates: ['violation', 'body'],
    loves: ['self-deprecation', 'recognition'],
    reactionPattern: 'mixed',
    influenceReward: 60,
    reactionWindow: 3000,
    specialAbility: 'One loves self-deprecation, one hates it, one is random',
    description: 'Forces hedging bets. Success requires pleasing all three simultaneously.'
  },
  {
    id: 'echo',
    name: 'The Echo',
    creature: 'A mirror that reflects your last joke structure back at you',
    emoji: '🪞',
    sensitivityGlyphs: ['timing', 'recognition', 'cosmic'],
    hates: ['repetition'],
    loves: ['timing', 'recognition'],
    reactionPattern: 'delight',
    influenceReward: 45,
    reactionWindow: 2500,
    specialAbility: 'Mirrors your last successful joke structure. Punishes repetition.',
    description: 'Teaches adaptation. Repeat a joke and face the consequences.'
  },
  {
    id: 'void-watcher',
    name: 'The Void Watcher',
    creature: 'An eye that sees through all pretense to the cosmic joke',
    emoji: '👁️',
    sensitivityGlyphs: ['cosmic', 'emotion', 'logic'],
    hates: ['body', 'violation'],
    loves: ['cosmic', 'emotion', 'logic'],
    reactionPattern: 'delight',
    influenceReward: 55,
    reactionWindow: 3500,
    description: 'Only appreciates the truly absurd. Mundane humor is invisible to it.'
  },
  {
    id: 'giggle-golem',
    name: 'The Giggle Golem',
    creature: 'A stone construct powered entirely by suppressed laughter',
    emoji: '🗿',
    sensitivityGlyphs: ['timing', 'body', 'surprise'],
    hates: ['logic', 'emotion'],
    loves: ['timing', 'body', 'surprise'],
    reactionPattern: 'disgust',
    influenceReward: 35,
    reactionWindow: 3000,
    description: 'Simple creature. Likes physical comedy. Overthinks make it crumble.'
  },
  {
    id: 'philosopher-fungus',
    name: 'The Philosopher Fungus',
    creature: 'A sentient mushroom that questions the nature of humor itself',
    emoji: '🍄',
    sensitivityGlyphs: ['logic', 'recognition', 'self-deprecation'],
    hates: ['body', 'violation'],
    loves: ['logic', 'recognition', 'self-deprecation'],
    reactionPattern: 'confusion',
    influenceReward: 50,
    reactionWindow: 5000,
    specialAbility: 'Requires logical consistency to appreciate',
    description: 'Only laughs at jokes that make philosophical sense. A true intellectual.'
  },
  {
    id: 'chaos-sprite',
    name: 'The Chaos Sprite',
    creature: 'A tiny vortex of pure unpredictability',
    emoji: '🧚',
    sensitivityGlyphs: ['cosmic', 'timing', 'surprise'],
    hates: ['logic', 'repetition'],
    loves: ['cosmic', 'timing', 'surprise'],
    reactionPattern: 'delight',
    influenceReward: 40,
    reactionWindow: 1500,
    specialAbility: 'Reaction is amplified but fleeting',
    description: 'Loves chaos. Hates predictability. The more absurd, the better.'
  }
];

export function getRandomAudience(count = 3) {
  const shuffled = [...AUDIENCES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}