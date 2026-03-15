import "./App.css";
import { type ReactElement, useEffect, useState } from "react";
import Square from "./Square";

const CANVAS_SIZE = 500;
const DEFAULT_DIMENSION = 16;

const getActiveTagName = (): string => {
  if (document.activeElement instanceof HTMLElement) {
    return document.activeElement.tagName.toLowerCase();
  }
  return "";
};

const handleResetDraw = (): void => {
  const elements = document.querySelectorAll<HTMLElement>(".grid-square");
  for (const element of elements) {
    element.style.background = "";
  }
};

const App = (): ReactElement => {
  const [dimension, setDimension] = useState<number>(DEFAULT_DIMENSION);
  const [random, setRandom] = useState<boolean>(false);
  const [erase, setErase] = useState<boolean>(false);

  const handleDimensionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDimension(Number(event.target.value));
  };

  const handleRandomColor = (): void => {
    setErase(false);
    setRandom(!random);
  };

  const handleErase = (): void => {
    setRandom(false);
    setErase(!erase);
  };

  const applyModeSwitch = (key: string): void => {
    if (key === "e") {
      setRandom(false);
      setErase((prev) => !prev);
    } else if (key === "r") {
      setErase(false);
      setRandom((prev) => !prev);
    } else if (key === "n") {
      setRandom(false);
      setErase(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      const tag = getActiveTagName();
      if (tag === "input" || tag === "textarea") {
        return;
      }
      applyModeSwitch(event.key);
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return (): void => {
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
            gridTemplateColumns: `repeat(${dimension}, ${CANVAS_SIZE / dimension}px)`,
            gridTemplateRows: `repeat(${dimension}, ${CANVAS_SIZE / dimension}px)`,
          }}
        >
          {Array.from({ length: dimension * dimension }, (_element, index) => (
            <Square key={index} isRandom={random} isErase={erase} />
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
          <button
            className={`btn${!erase && !random ? " active" : ""}`}
            onClick={() => {
              setRandom(false);
              setErase(false);
            }}
          >
            normal <kbd>n</kbd>
          </button>
          <button className={`btn${erase ? " active" : ""}`} onClick={handleErase}>
            erase <kbd>e</kbd>
          </button>
          <button className={`btn${random ? " active" : ""}`} onClick={handleRandomColor}>
            random <kbd>r</kbd>
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
};

export default App;
