import { useState } from "react";
import { useChessGame } from "./hooks/useChessGame";
import { SettingsModal } from "./components/SettingsModal";
import {
  PlayIcon,
  PauseIcon,
  ResetIcon,
  SettingsIcon,
  FlipIcon,
} from "./components/Icons";
import "./index.css";

function App() {
  // Use our new Hook
  const game = useChessGame();

  // UI State only
  const [showSettings, setShowSettings] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`app-container ${isFlipped ? "flipped" : ""}`}>
      {/* --- OPPONENT (Top) --- */}
      <div
        className={`timer-section timer-top ${
          game.activeTurn === "black" ? "timer-active" : ""
        } ${game.blackTime < 20 ? "timer-low-time" : ""}`}
        onClick={() => game.switchTurn("black")}
      >
        {game.formatTime(game.blackTime)}
      </div>

      {/* --- CONTROLS --- */}
      <div className="controls-bar">
        <button className="icon-btn" onClick={game.resetGame} title="Reset">
          <ResetIcon />
        </button>

        <button
          className="icon-btn"
          onClick={game.togglePause}
          title="Pause/Play"
        >
          {game.isPaused || !game.activeTurn ? <PlayIcon /> : <PauseIcon />}
        </button>

        <button
          className="icon-btn"
          onClick={() => setIsFlipped(!isFlipped)}
          title="Flip View"
        >
          <FlipIcon />
        </button>

        <button
          className="icon-btn"
          onClick={() => setShowSettings(true)}
          title="Settings"
        >
          <SettingsIcon />
        </button>
      </div>

      {/* --- YOU (Bottom) --- */}
      <div
        className={`timer-section timer-bottom ${
          game.activeTurn === "white" ? "timer-active" : ""
        } ${game.whiteTime < 20 ? "timer-low-time" : ""}`}
        onClick={() => game.switchTurn("white")}
      >
        {game.formatTime(game.whiteTime)}
      </div>

      {/* --- MODAL --- */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onConfirm={game.configureGame}
        isFlipped={isFlipped}
      />
    </div>
  );
}

export default App;
