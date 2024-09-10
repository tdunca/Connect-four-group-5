import React from "react";
import "./Board.css";

interface BoardProps {
  board: string[][];
  handleCellClick: (column: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, handleCellClick }) => {
  const renderGrid = (): React.ReactNode => {
    return board.map((row, rowIndex) => (
      <div className="row" key={rowIndex}>
        {row.map((cell, colIndex) => (
          <button
            key={colIndex}
            className="cell"
            onClick={() => handleCellClick(colIndex)}
          >
            {cell}
          </button>
        ))}
      </div>
    ));
  };

  return <div className="grid-container">{renderGrid()}</div>;
};

export default Board;
