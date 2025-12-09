import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (min: number, inc: number) => void;
  isFlipped: boolean;
}

export const SettingsModal = ({
  isOpen,
  onClose,
  onConfirm,
  isFlipped,
}: Props) => {
  const [customMin, setCustomMin] = useState("10");
  const [customInc, setCustomInc] = useState("5");

  if (!isOpen) return null;

  const handleCustomStart = () => {
    onConfirm(parseInt(customMin) || 10, parseInt(customInc) || 0);
    onClose();
  };

  const presets = [
    { m: 1, i: 0 },
    { m: 3, i: 0 },
    { m: 3, i: 2 },
    { m: 5, i: 0 },
    { m: 10, i: 0 },
    { m: 15, i: 10 },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: isFlipped ? "rotate(180deg)" : "none" }}
      >
        <h2 className="modal-title">Time Control</h2>

        <div className="preset-grid">
          {presets.map((p) => (
            <button
              key={`${p.m}-${p.i}`}
              className="preset-btn"
              onClick={() => {
                onConfirm(p.m, p.i);
                onClose();
              }}
            >
              {p.m}+{p.i}
            </button>
          ))}
        </div>

        <div className="custom-time-section">
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-label">Minutes</span>
              <input
                type="number"
                className="time-input"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <span className="input-label">Increment</span>
              <input
                type="number"
                className="time-input"
                value={customInc}
                onChange={(e) => setCustomInc(e.target.value)}
              />
            </div>
          </div>
          <button className="start-custom-btn" onClick={handleCustomStart}>
            START CUSTOM
          </button>
        </div>

        <button
          className="close-btn"
          onClick={onClose}
          style={{ marginTop: "15px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
