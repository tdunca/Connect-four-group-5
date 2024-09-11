import React from "react";
import "./Board.css";


const playerX = "X";
const playerO = "O";

type Grid = string[][];

interface BoardProps {
  handleCellClick: (column: number) => void;
  board: Grid;
}

export default function Board({ handleCellClick, board }: BoardProps) {
  const renderGrid = (): React.ReactNode => {
    return board.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {row.map((cell, colIndex) => (
          <button
            key={colIndex}
            className={`cell ${
              cell === playerX ? "x-cell" : cell === playerO ? "o-cell" : ""
            }`}
            onClick={() => handleCellClick(colIndex)}
          >
            {cell !== " " ? cell : ""}
          </button>
        ))}
      </React.Fragment>
    ));
  };

  return <div className="grid-container">{renderGrid()}</div>;
}
