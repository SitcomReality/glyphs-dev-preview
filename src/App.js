import { getRandomGlyphs } from './data/glyphs.js';
import { getRandomAudience } from './data/audiences.js';
import { calculateJokeScore } from './utils/scoring.js';
import { TUTORIAL_GLYPHS, TUTORIAL_AUDIENCE, TUTORIAL_STEPS } from './data/tutorial.js';
import { Menu } from './components/Menu.js';
import { Game } from './components/Game.js';
import { Tutorial } from './components/Tutorial.js';

export class App {
  constructor(container) {
    this.container = container;
    this.state = {
      gameState: 'menu',
      hand: [],
      selectedGlyphs: [],
      audiences: [],
      reactions: {},
      stats: {
        influence: 0,
        totalJokes: 0,
        successfulJokes: 0,
        consecutiveFailures: 0,
        highScore: 0,
      },
      lastJokeScore: null,
      showHiddenSensitivity: false,
      roundTime: 60,
      tutorialStep: 0,
      isFirstRound: true,
      showScoreCalc: false
    };
    this.timer = null;
    this.tutorialTimeout = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  init() {
    this.render();
  }

  startGame = () => {
    this.setState({
      gameState: 'tutorial',
      tutorialStep: 0,
      hand: TUTORIAL_GLYPHS,
      audiences: [TUTORIAL_AUDIENCE],
      selectedGlyphs: [],
      reactions: {},
      roundTime: 60,
      isFirstRound: true
    });
    this.startTimer();

    if (this.tutorialTimeout) clearTimeout(this.tutorialTimeout);
    if (TUTORIAL_STEPS[0].action === 'next') {
      this.tutorialTimeout = setTimeout(this.advanceTutorial, 5000);
    }
  }

  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.state.gameState === 'playing') {
        if (this.state.roundTime <= 0) {
          if (this.state.selectedGlyphs.length > 0) {
            this.deliverJoke();
          } else {
            this.setState({ gameState: 'result' });
          }
        } else {
          this.state.roundTime -= 1;
          const timerEl = this.container.querySelector('#timer-display');
          if (timerEl) {
            timerEl.textContent = `${this.state.roundTime}s`;
            if (this.state.roundTime <= 10) {
              timerEl.classList.add('text-red-400', 'animate-pulse');
            }
          }
        }
      }
    }, 1000);
  }

  selectGlyph = (glyph) => {
    const { selectedGlyphs, gameState, tutorialStep } = this.state;
    const index = selectedGlyphs.findIndex(g => g.id === glyph.id && g.symbol === glyph.symbol);
    
    let newSelected;
    if (index > -1) {
      newSelected = selectedGlyphs.filter((_, i) => i !== index);
    } else if (selectedGlyphs.length < 5) {
      newSelected = [...selectedGlyphs, glyph];
    } else {
      newSelected = selectedGlyphs;
    }
    
    this.setState({ selectedGlyphs: newSelected });

    // Tutorial Progression
    if (gameState === 'tutorial') {
      if (tutorialStep === 1 && newSelected.length >= 2) {
        this.advanceTutorial();
      } else if (tutorialStep === 2 && newSelected.length >= 3) {
        this.advanceTutorial();
      }
    }
  }

  removeGlyph = (index) => {
    this.setState({
      selectedGlyphs: this.state.selectedGlyphs.filter((_, i) => i !== index)
    });
  }

  deliverJoke = () => {
    const { selectedGlyphs, audiences, gameState, tutorialStep } = this.state;
    if (selectedGlyphs.length === 0) return;
    
    const newReactions = {};
    audiences.forEach(audience => {
      const score = calculateJokeScore(selectedGlyphs, audience);
      newReactions[audience.id] = {
        delight: score.delight,
        disgust: score.disgust,
        confusion: score.confusion,
      };
    });
    
    this.setState({
      gameState: 'delivering',
      showScoreCalc: true,
      reactions: newReactions
    });

    if (gameState === 'tutorial' && tutorialStep === 4) {
      this.advanceTutorial();
    }
  }

  handleScoreComplete = (score) => {
    const totalScore = score.total;
    let feedback = '';
    if (totalScore > 100) feedback = 'LEGENDARY! The audience is transcendent!';
    else if (totalScore > 50) feedback = 'Brilliant! They love it!';
    else if (totalScore > 0) feedback = 'Nice! A solid laugh!';
    else if (totalScore > -50) feedback = 'Meh. Some smiles, mostly confusion.';
    else if (totalScore > -100) feedback = 'Oof. They\'re not feeling it.';
    else feedback = 'CATASTROPHIC! The audience has left!';
    
    const isSuccessful = totalScore > 0;
    const newStats = {
      ...this.state.stats,
      influence: Math.max(0, this.state.stats.influence + (isSuccessful ? Math.round(totalScore / 10) : -10)),
      totalJokes: this.state.stats.totalJokes + 1,
      successfulJokes: this.state.stats.successfulJokes + (isSuccessful ? 1 : 0),
      consecutiveFailures: isSuccessful ? 0 : this.state.stats.consecutiveFailures + 1,
    };
    newStats.highScore = Math.max(this.state.stats.highScore, newStats.influence);

    this.setState({
      showScoreCalc: false,
      lastJokeScore: { total: totalScore, details: feedback },
      stats: newStats,
      showHiddenSensitivity: newStats.consecutiveFailures >= 2,
      gameState: 'result'
    });
  }

  nextRound = () => {
    this.setState({
      gameState: 'playing',
      hand: getRandomGlyphs(8),
      audiences: getRandomAudience(3),
      selectedGlyphs: [],
      reactions: {},
      lastJokeScore: null,
      roundTime: 60,
      isFirstRound: false
    });
  }

  advanceTutorial = () => {
    if (this.tutorialTimeout) {
      clearTimeout(this.tutorialTimeout);
      this.tutorialTimeout = null;
    }

    if (this.state.tutorialStep < TUTORIAL_STEPS.length - 1) {
      const nextStep = this.state.tutorialStep + 1;
      this.setState({ tutorialStep: nextStep });
      
      // Auto-advance if it's a "next" action
      if (TUTORIAL_STEPS[nextStep].action === 'next') {
        this.tutorialTimeout = setTimeout(this.advanceTutorial, 5000);
      }
    } else {
      this.nextRound();
    }
  }

  render() {
    this.container.innerHTML = '';
    let element;

    if (this.state.gameState === 'menu') {
      element = Menu({ onStartGame: this.startGame, stats: this.state.stats });
    } else if (this.state.gameState === 'tutorial') {
      element = Tutorial({
        ...this.state,
        onGlyphSelect: this.selectGlyph,
        onDeliverJoke: this.deliverJoke,
        onScoreComplete: this.handleScoreComplete,
        onAdvance: this.advanceTutorial
      });
    } else {
      element = Game({
        ...this.state,
        onGlyphSelect: this.selectGlyph,
        onDeliverJoke: this.deliverJoke,
        onScoreComplete: this.handleScoreComplete,
        onNextRound: this.nextRound,
        onBackToMenu: () => {
          if (this.timer) clearInterval(this.timer);
          this.setState({ gameState: 'menu' });
        },
        onRemoveGlyph: this.removeGlyph
      });
    }

    if (typeof element === 'string') {
      this.container.innerHTML = element;
    } else {
      this.container.appendChild(element);
    }
    
    this.attachEventListeners();
  }

  attachEventListeners() {
    const buttons = this.container.querySelectorAll('[data-click]');
    buttons.forEach(btn => {
      const action = btn.getAttribute('data-click');
      const param = btn.getAttribute('data-param');
      btn.onclick = (e) => {
        e.preventDefault();
        if (this[action]) {
          this[action](param ? JSON.parse(param) : undefined);
        }
      };
    });

    // Special handlers for lists
    // Glyph interaction
    const glyphCards = this.container.querySelectorAll('[data-glyph-id]');
    glyphCards.forEach(card => {
      card.onclick = (e) => {
        e.preventDefault();
        const id = card.getAttribute('data-glyph-id');
        const symbol = card.getAttribute('data-glyph-symbol');
        // Check hand first, then selected
        const glyph = [...this.state.hand, ...this.state.selectedGlyphs].find(g => g.id === id && g.symbol === symbol);
        if (glyph) this.selectGlyph(glyph);
      };
    });

    const removeGlyphBtns = this.container.querySelectorAll('[data-remove-index]');
    removeGlyphBtns.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            this.removeGlyph(parseInt(btn.getAttribute('data-remove-index')));
        };
    });
  }
}