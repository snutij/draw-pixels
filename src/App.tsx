import React, { BaseSyntheticEvent, useState } from "react";
import Square from "./Square";
import "./App.css";

function App() {
  const [dimension, setDimension] = useState<number>(10);
  const [random, setRandom] = useState<boolean>(false);
  const [erase, setErase] = useState<boolean>(false);

  const handleDimensionChange = (event: BaseSyntheticEvent) => {
    setDimension(event.target.value);
  };

  const handleResetDraw = () => {
    const elements = document.querySelectorAll<HTMLElement>(".grid-square");
    elements.forEach((element: HTMLElement) => {
      element.style.background = "white";
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
    <div>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${dimension}, ${500 / dimension}px)`,
        }}
      >
        {Array.from(Array(dimension * dimension), (_e, i) => (
          <Square key={i} isRandom={random} isErase={erase}></Square>
        ))}
      </div>
      <input
        onChange={(e) => handleDimensionChange(e)}
        value={dimension}
        type="number"
        placeholder="change dimension"
        step="5"
      ></input>

      <button onClick={handleResetDraw}>reset draw</button>
      <button onClick={handleErase}>Erase mode : {erase ? "ON" : "OFF"}</button>
      <button onClick={handleRandomColor}>
        Random mode : {random ? "ON" : "OFF"}
      </button>
    </div>
  );
}
export default App;
