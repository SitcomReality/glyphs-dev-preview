import React from 'react';
import { AudienceCreature } from './AudienceCreature.js';

export function AudiencePanel({ audiences, reactions, isProcessing, showHiddenSensitivity }) {
  return React.createElement(
    'div',
    { className: 'grid grid-cols-1 md:grid-cols-3 gap-4 p-4' },
    audiences.map(audience =>
      React.createElement(AudienceCreature, {
        key: audience.id,
        audience,
        reactions: reactions[audience.id] || { delight: 0, disgust: 0, confusion: 0 },
        isProcessing,
        showHiddenSensitivity
      })
    )
  );
}