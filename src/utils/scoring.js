export function calculateJokeScore(jokeGlyphs, audience) {
  let delight = 0;
  let disgust = 0;
  let confusion = 0;

  jokeGlyphs.forEach(glyph => {
    if (audience.loves.includes(glyph.id)) {
      delight += 20;
    }
    if (audience.hates.includes(glyph.id)) {
      disgust += 25;
    }
    
    // Synergy bonuses
    jokeGlyphs.forEach(other => {
      if (other.id !== glyph.id) {
        // violation + recognition = dark humor
        if ((glyph.category === 'violation' && other.category === 'recognition') ||
            (glyph.category === 'recognition' && other.category === 'violation')) {
          delight += 15;
        }
        // timing + self-deprecation = awkward charm
        if ((glyph.category === 'timing' && other.category === 'self-deprecation') ||
            (glyph.category === 'self-deprecation' && other.category === 'timing')) {
          delight += 10;
        }
        // body + emotion = melancholy gold
        if ((glyph.category === 'body' && other.category === 'emotion') ||
            (glyph.category === 'emotion' && other.category === 'body')) {
          delight += 12;
        }
        // violation + violation = audience walks out
        if (glyph.category === 'violation' && other.category === 'violation') {
          disgust += 30;
        }
      }
    });
  });

  // Position bonuses (setup -> twist -> release)
  if (jokeGlyphs.length >= 3) {
    const first = jokeGlyphs[0].category;
    const second = jokeGlyphs[1].category;
    const third = jokeGlyphs[2].category;
    
    // Good structure: setup -> twist -> release
    if (first === 'timing' && second === 'recognition' && third === 'timing') {
      delight += 25;
    }
    // Callback structure
    if (first === 'recognition' && second === 'violation' && third === 'timing') {
      delight += 20;
    }
  }

  // Base confusion for complex jokes
  if (jokeGlyphs.length >= 4) {
    confusion += jokeGlyphs.length * 5;
  }

  // Cap values
  delight = Math.min(100, Math.max(0, delight));
  disgust = Math.min(100, Math.max(0, disgust));
  confusion = Math.min(100, Math.max(0, confusion));

  const total = delight - disgust - confusion / 2;

  return { delight, disgust, confusion, total };
}