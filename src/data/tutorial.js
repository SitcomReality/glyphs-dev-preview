export const TUTORIAL_GLYPHS = [
  { id: 'tutorial-1', symbol: '⧖', name: 'Temporal Displacement', category: 'timing', description: 'Perfect timing, or the absence thereof', color: 'blue' },
  { id: 'tutorial-2', symbol: '⧙', name: 'Recognition Flip', category: 'recognition', description: 'Seeing familiar things anew', color: 'purple' },
  { id: 'tutorial-3', symbol: '⧛', name: 'Self Deprecation', category: 'self-deprecation', description: 'Laughing at your own expense', color: 'green' },
  { id: 'tutorial-4', symbol: '⧗', name: 'Social Violation', category: 'violation', description: 'Breaking the unspoken rules', color: 'red' },
  { id: 'tutorial-5', symbol: '⏸', name: 'The Pregnant Pause', category: 'timing', description: 'Suspense that grows teeth', color: 'blue' },
  { id: 'tutorial-6', symbol: '↻', name: 'Recontextualization', category: 'recognition', description: 'Moving the goalposts of meaning', color: 'purple' },
  { id: 'tutorial-7', symbol: 'SAD', name: 'Melancholy Rain', category: 'emotion', description: 'Sadness with a smile', color: 'purple' },
  { id: 'tutorial-8', symbol: 'ABS', name: 'Pure Absurdity', category: 'cosmic', description: 'Logic need not apply', color: 'green' },
];

export const TUTORIAL_AUDIENCE = {
  id: 'tutorial-glimmerbeast',
  name: 'The Glimmerbeast',
  creature: 'A crystalline entity that hums with judgmental light',
  emoji: '💎',
  sensitivityGlyphs: ['body', 'violation', 'timing'],
  hates: ['body', 'violation'],
  loves: ['recognition', 'timing', 'self-deprecation'],
  reactionPattern: 'delight',
  influenceReward: 50,
  reactionWindow: 2000,
  description: 'Hates bodily humor. Loves clever misdirection.',
};

export const TUTORIAL_STEPS = [
  {
    title: 'Welcome to the Stage!',
    instruction: 'You are a comedian in a world where humor is expressed through mystical glyphs. Your goal: make the audience laugh by combining glyphs into jokes!',
    action: 'next',
  },
  {
    title: 'Your Hand',
    instruction: 'These are the glyphs in your hand. Click on them to select them for your joke. Try selecting the blue ⧖ (Temporal Displacement) and purple ⧙ (Recognition Flip).',
    highlight: 'select',
  },
  {
    title: 'Building Your Joke',
    instruction: 'Great! Now add the green ⧛ (Self Deprecation) to complete a perfect setup-twist-release structure!',
    highlight: 'select',
  },
  {
    title: 'The Audience',
    instruction: 'This is The Glimmerbeast - a crystalline judge. It HATES red glyphs (violation) but LOVES blue (timing) and purple (recognition). Watch its reactions!',
    action: 'next',
  },
  {
    title: 'Deliver Your Joke',
    instruction: 'You\'ve selected 3 glyphs! Click "Deliver Joke" to see how the audience reacts. Watch the score calculation - it\'s a beautiful thing.',
    highlight: 'deliver',
  },
  {
    title: 'Score Breakdown',
    instruction: 'Each glyph contributes to Delight, Confusion, and Disgust! Synergies like Timing + Self-Deprecation create "Awkward Charm" bonuses!',
    action: 'next',
  },
  {
    title: 'Ready for the Real Show?',
    instruction: 'You\'ve learned the basics! In the real game, you\'ll face multiple audiences with hidden preferences. Gain Influence to unlock new glyph dialects!',
    action: 'next',
  },
];