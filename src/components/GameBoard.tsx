import React, { useState } from "react";
import "./Board.css";

const playerX = "X";
const playerO = "O";

type Grid = string[][];

interface BoardProps {
  handleCellClick: (column: number) => void;
  board: Grid;
}

export default function Board(props: BoardProps) {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const renderGrid = (): React.ReactNode => {
    return props.board.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {row.map((cell, colIndex) => (
          <button
            key={colIndex}
            className={`cell ${
              cell === playerX ? "x-cell" : cell === playerO ? "o-cell" : ""
            }`}
            onClick={() => props.handleCellClick(colIndex)}
            onMouseEnter={() => setHoveredColumn(colIndex)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            {cell !== " " ? <span className="star">★</span> : ""}
          </button>
        ))}
      </React.Fragment>
    ));
  };

  return <div className="grid-container">{renderGrid()}</div>;
}
