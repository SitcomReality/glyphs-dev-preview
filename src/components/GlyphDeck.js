import React from 'react';
import { GlyphCard } from './GlyphCard.js';

export function GlyphDeck({ glyphs, onGlyphSelect, selectedGlyphs, disabled }) {
  return React.createElement(
    'div',
    { className: 'flex flex-wrap gap-2 justify-center p-4 bg-black/30 rounded-2xl backdrop-blur-sm' },
    glyphs.map((glyph, index) =>
      React.createElement(GlyphCard, {
        key: `${glyph.id}-${index}`,
        glyph,
        onClick: () => onGlyphSelect(glyph),
        selected: selectedGlyphs.some(g => g.id === glyph.id && g.symbol === glyph.symbol),
        disabled
      })
    )
  );
}