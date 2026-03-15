import "./App.css";
import { useEffect, useState, type ReactElement } from "react";
import Square from "./Square";

function App(): ReactElement {
  const [dimension, setDimension] = useState<number>(16);
  const [random, setRandom] = useState<boolean>(false);
  const [erase, setErase] = useState<boolean>(false);

  const handleDimensionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDimension(Number(event.target.value));
  };

  const handleResetDraw = (): void => {
    const elements = document.querySelectorAll<HTMLElement>(".grid-square");
    for (const element of elements) {
      element.style.background = "";
    }
  };

  const handleRandomColor = (): void => {
    setErase(false);
    setRandom(!random);
  };

  const handleErase = (): void => {
    setRandom(false);
    setErase(!erase);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      let tag: string | undefined;
      if (document.activeElement instanceof HTMLElement) {
        tag = document.activeElement.tagName.toLowerCase();
      }
      if (tag === "input" || tag === "textarea") {
        return;
      }

      if (event.key === "e") {
        setRandom(false);
        setErase((prev) => !prev);
      } else if (event.key === "r") {
        setErase(false);
        setRandom((prev) => !prev);
      } else if (event.key === "n") {
        setRandom(false);
        setErase(false);
      }
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
            gridTemplateColumns: `repeat(${dimension}, ${500 / dimension}px)`,
            gridTemplateRows: `repeat(${dimension}, ${500 / dimension}px)`,
          }}
        >
          {Array.from({ length: dimension * dimension }, (_e, i) => (
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
}
export default App;
