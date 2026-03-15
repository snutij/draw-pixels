import { useRef, type ReactElement } from "react";

function Square({ isRandom, isErase }: { isRandom: boolean; isErase: boolean }): ReactElement {
  const squareEl = useRef<HTMLDivElement>(null);

  function changeBackgroundColor(): void {
    let color = "#cbfe00";
    if (isErase) {
      color = "";
    } else if (isRandom) {
      color = `#${Math.trunc((1 << 24) * Math.random())
        .toString(16)
        .padStart(6, "0")}`;
    }
    if (squareEl.current) {
      squareEl.current.style.backgroundColor = color;
    }
  }
  return <div className="grid-square" ref={squareEl} onMouseOver={changeBackgroundColor}></div>;
}
export default Square;
