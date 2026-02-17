import React from 'react';
import { getRandomGlyphs } from './data/glyphs.js';
import { getRandomAudience } from './data/audiences.js';
import { calculateJokeScore } from './utils/scoring.js';
import { TUTORIAL_GLYPHS, TUTORIAL_AUDIENCE, TUTORIAL_STEPS } from './data/tutorial.js';
import { Menu } from './components/Menu.js';
import { Game } from './components/Game.js';
import { Tutorial } from './components/Tutorial.js';

export function App() {
  const [gameState, setGameState] = React.useState('menu');
  const [hand, setHand] = React.useState([]);
  const [selectedGlyphs, setSelectedGlyphs] = React.useState([]);
  const [audiences, setAudiences] = React.useState([]);
  const [reactions, setReactions] = React.useState({});
  const [stats, setStats] = React.useState({
    influence: 0,
    totalJokes: 0,
    successfulJokes: 0,
    consecutiveFailures: 0,
    highScore: 0,
  });
  const [lastJokeScore, setLastJokeScore] = React.useState(null);
  const [showHiddenSensitivity, setShowHiddenSensitivity] = React.useState(false);
  const [roundTime, setRoundTime] = React.useState(60);
  
  const [tutorialStep, setTutorialStep] = React.useState(0);
  const [isFirstRound, setIsFirstRound] = React.useState(true);
  const [showScoreCalc, setShowScoreCalc] = React.useState(false);

  const startGame = React.useCallback(() => {
    setGameState('tutorial');
    setTutorialStep(0);
    setHand(TUTORIAL_GLYPHS);
    setAudiences([TUTORIAL_AUDIENCE]);
    setSelectedGlyphs([]);
    setReactions({});
    setStats({ influence: 0, totalJokes: 0, successfulJokes: 0, consecutiveFailures: 0, highScore: 0 });
    setShowHiddenSensitivity(false);
    setRoundTime(60);
    setIsFirstRound(true);
  }, []);

  const selectGlyph = React.useCallback((glyph) => {
    setSelectedGlyphs(prev => {
      const isSelected = prev.some(g => g.id === glyph.id && g.symbol === glyph.symbol);
      if (isSelected) {
        return prev.filter((_, i) => i !== prev.findIndex(pg => pg.id === glyph.id && pg.symbol === glyph.symbol));
      } else if (prev.length < 5) {
        return [...prev, glyph];
      }
      return prev;
    });
  }, []);

  const deliverJoke = React.useCallback(() => {
    if (selectedGlyphs.length === 0) return;
    
    setGameState('delivering');
    setShowScoreCalc(true);
    
    const newReactions = {};
    audiences.forEach(audience => {
      const score = calculateJokeScore(selectedGlyphs, audience);
      newReactions[audience.id] = {
        delight: score.delight,
        disgust: score.disgust,
        confusion: score.confusion,
      };
    });
    
    setReactions(newReactions);
  }, [selectedGlyphs, audiences]);

  const handleScoreComplete = React.useCallback((score) => {
    setShowScoreCalc(false);
    
    const totalScore = score.total;
    
    let feedback = '';
    if (totalScore > 100) feedback = 'LEGENDARY! The audience is transcendent!';
    else if (totalScore > 50) feedback = 'Brilliant! They love it!';
    else if (totalScore > 0) feedback = 'Nice! A solid laugh!';
    else if (totalScore > -50) feedback = 'Meh. Some smiles, mostly confusion.';
    else if (totalScore > -100) feedback = 'Oof. They\'re not feeling it.';
    else feedback = 'CATASTROPHIC! The audience has left!';
    
    setLastJokeScore({
      total: totalScore,
      details: feedback,
    });
    
    const isSuccessful = totalScore > 0;
    setStats(prev => {
      const newConsecutive = isSuccessful ? 0 : prev.consecutiveFailures + 1;
      const newInfluence = prev.influence + (isSuccessful ? Math.round(totalScore / 10) : -10);
      
      return {
        ...prev,
        influence: Math.max(0, newInfluence),
        totalJokes: prev.totalJokes + 1,
        successfulJokes: prev.successfulJokes + (isSuccessful ? 1 : 0),
        consecutiveFailures: newConsecutive,
        highScore: Math.max(prev.highScore, prev.influence + (isSuccessful ? Math.round(totalScore / 10) : 0)),
      };
    });
    
    if (stats.consecutiveFailures >= 2) {
      setShowHiddenSensitivity(true);
    }
    
    setTimeout(() => {
      setGameState('result');
    }, 2000);
  }, [stats.consecutiveFailures]);

  const handleTutorialScoreComplete = React.useCallback((score) => {
    setShowScoreCalc(false);
    setLastJokeScore({
      total: score.total,
      details: 'Tutorial complete! Ready for the real show?',
    });
    setTimeout(() => {
      setGameState('result');
    }, 1500);
  }, []);

  const nextRound = React.useCallback(() => {
    if (isFirstRound) {
      setIsFirstRound(false);
      setHand(getRandomGlyphs(8));
      setAudiences(getRandomAudience(3));
      setSelectedGlyphs([]);
      setReactions({});
      setLastJokeScore(null);
      setRoundTime(60);
      setGameState('playing');
    } else {
      setHand(getRandomGlyphs(8));
      setSelectedGlyphs([]);
      setReactions({});
      setLastJokeScore(null);
      setRoundTime(60);
      setGameState('playing');
    }
  }, [isFirstRound]);

  const advanceTutorial = React.useCallback(() => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep(prev => prev + 1);
    } else {
      setIsFirstRound(false);
      setHand(getRandomGlyphs(8));
      setAudiences(getRandomAudience(3));
      setSelectedGlyphs([]);
      setReactions({});
      setLastJokeScore(null);
      setRoundTime(60);
      setGameState('playing');
    }
  }, [tutorialStep]);

  React.useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'tutorial') return;
    
    const timer = setInterval(() => {
      setRoundTime(prev => {
        if (prev <= 1) {
          if (selectedGlyphs.length > 0) {
            deliverJoke();
          } else {
            setGameState('result');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState, selectedGlyphs, deliverJoke]);

  React.useEffect(() => {
    if (gameState !== 'tutorial') return;
    
    const step = TUTORIAL_STEPS[tutorialStep];
    if (!step) return;
    
    if (step.action === 'next') {
      const timer = setTimeout(advanceTutorial, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState, tutorialStep, advanceTutorial]);

  if (gameState === 'menu') {
    return React.createElement(Menu, {
      onStartGame: startGame,
      stats
    });
  }

  if (gameState === 'tutorial') {
    return React.createElement(Tutorial, {
      tutorialStep,
      hand,
      selectedGlyphs,
      audiences,
      reactions,
      showScoreCalc,
      onGlyphSelect: selectGlyph,
      onDeliverJoke: deliverJoke,
      onScoreComplete: handleTutorialScoreComplete
    });
  }

  return React.createElement(Game, {
    hand,
    selectedGlyphs,
    audiences,
    reactions,
    stats,
    roundTime,
    gameState,
    showHiddenSensitivity,
    showScoreCalc,
    lastJokeScore,
    onGlyphSelect: selectGlyph,
    onDeliverJoke: deliverJoke,
    onScoreComplete: handleScoreComplete,
    onNextRound: nextRound,
    onBackToMenu: () => setGameState('menu'),
    onRemoveGlyph: (index) => setSelectedGlyphs(prev => prev.filter((_, i) => i !== index))
  });
}