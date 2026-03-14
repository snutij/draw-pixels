import { useState } from "react";
import Square from "./Square";
import "./App.css";

function App() {
  const [dimension, setDimension] = useState<number>(16);
  const [random, setRandom] = useState<boolean>(false);
  const [erase, setErase] = useState<boolean>(false);

  const handleDimensionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDimension(Number(event.target.value));
  };

  const handleResetDraw = () => {
    const elements = document.querySelectorAll<HTMLElement>(".grid-square");
    elements.forEach((element: HTMLElement) => {
      element.style.background = "";
    });
  };

  const handleRandomColor = () => {
    setErase(false);
    setRandom(!random);
  };

  const handleErase = () => {
    setRandom(false);
    setErase(!erase);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">
          draw<span>pixels</span>
        </h1>
        <p className="dimension-readout">
          {dimension} × {dimension}
        </p>
      </header>

      <div className="canvas-wrapper">
        <div
          className="grid-container"
          style={{
            gridTemplateColumns: `repeat(${dimension}, ${500 / dimension}px)`,
            gridTemplateRows: `repeat(${dimension}, ${500 / dimension}px)`,
          }}
        >
          {Array.from(Array(dimension * dimension), (_e, i) => (
            <Square key={i} isRandom={random} isErase={erase} />
          ))}
        </div>
      </div>

      <div className="toolbar">
        <div className="toolbar-group">
          <div className="dimension-control">
            <span className="dimension-label">{dimension}</span>
            <input
              type="range"
              min="2"
              max="50"
              value={dimension}
              onChange={handleDimensionChange}
            />
          </div>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button className={`btn${erase ? " active" : ""}`} onClick={handleErase}>
            erase
          </button>
          <button className={`btn${random ? " active" : ""}`} onClick={handleRandomColor}>
            random
          </button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button className="btn btn-reset" onClick={handleResetDraw}>
            reset
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;
