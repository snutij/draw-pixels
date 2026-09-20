import { type ReactElement, useRef } from "react";

const COLOR_RANGE = 0x01_00_00_00;
const DEFAULT_COLOR = "#cbfe00";
const HEX_LENGTH = 6;
const HEX_RADIX = 16;

const Square = ({ isRandom, isErase }: { isErase: boolean; isRandom: boolean }): ReactElement => {
  const squareEl = useRef<HTMLDivElement>(null);

  const changeBackgroundColor = (): void => {
    let color = DEFAULT_COLOR;
    if (isErase) {
      color = "";
    } else if (isRandom) {
      color = `#${Math.trunc(COLOR_RANGE * Math.random())
        .toString(HEX_RADIX)
        .padStart(HEX_LENGTH, "0")}`;
    }
    if (squareEl.current) {
      squareEl.current.style.backgroundColor = color;
    }
  };

  return <div className="grid-square" ref={squareEl} onMouseOver={changeBackgroundColor}></div>;
};

export default Square;
