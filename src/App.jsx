import './App.css';
import { useState } from 'react';
import GameCanvas from './components/GameCanvas';

const StartScreen = ({ onStartClick }) => {
  return (
    <div className="start-screen">
      
      {/* Animated Title with Heroic Banner */}
      <div className="title-banner">
        <h1 className="title-glitch">RESUME QUEST</h1>
        <div className="hero-subtitle">
          <span className="pixel-arrow">➜</span>
          <span>A HERO AWAITS</span>
          <span className="pixel-arrow">⬌</span>
        </div>
      </div>

      {/* Main Action Area */}
      <div className="action-container">
        <button className="epic-pixel-button" onClick={onStartClick}>
          <span className="button-text">BEGIN THE HUNT</span>
          <span className="button-shine"></span>
        </button>
      </div>

      {/* Scene Container */}
      <div className="pixel-scene">

        {/* Animated Sky */}
        <div className="sky">
          <div className="pixel-star"></div>
          <div className="pixel-star"></div>
          <div className="pixel-star"></div>
          <div className="pixel-moon"></div>
        </div>

        {/* Silhouette Mountains */}
        <div className="mountains">
          <div className="mountain"></div>
          <div className="mountain"></div>
          <div className="mountain"></div>
        </div>

        {/* The Awaiting Hero */}
        <div className="hero-silhouette">
          <div className="hero-head"></div>
          <div className="hero-body"></div>
          <div className="hero-weapon"></div>
          <div className="hero-glow"></div>
        </div>

        {/* Foreground Elements */}
        <div className="foreground">
          <div className="pixel-tree"></div>
          <div className="pixel-rock"></div>
          <div className="pixel-grass"></div>
          <div className="pixel-ruin"></div>
          <div className="pixel-campfire">
            <div className="campfire-sparkles">
              <div className="sparkle"></div>
              <div className="sparkle"></div>
              <div className="sparkle"></div>
            </div>
          </div>
          <div className="pixel-grass"></div>
          <div className="pixel-tree"></div>
        </div>

        {/* Floating Particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

      </div>

      {/* Footer Hint */}
      <div className="footer-hint">
        <p className="footer-text">← [ Your next great hire is here ] →</p>
      </div>
      
    </div>
  );
};

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        <StartScreen onStartClick={handleStartGame} />
      ) : (
        <GameCanvas />
      )}
    </div>
  );
};