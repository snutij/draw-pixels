import React, { useRef } from "react";

function Square({
  isRandom,
  isErase,
}: {
  isRandom: boolean;
  isErase: boolean;
}) {
  const squareEl = useRef<HTMLDivElement>(null);

  function changeBackgroundColor() {
    let color = "#bdbdbd";
    if (isErase) {
      color = "#fff";
    } else if (isRandom) {
      color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    }
    if (squareEl.current) {
      squareEl.current.style.backgroundColor = color;
    }
  }
  return (
    <div
      className="grid-square"
      ref={squareEl}
      onMouseOver={changeBackgroundColor}
    ></div>
  );
}
export default Square;
