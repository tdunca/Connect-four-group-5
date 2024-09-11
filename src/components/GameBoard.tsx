import React, { useState } from "react";
import "./GameBoard.css";

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
        {row.map((cell, colIndex) => {
          const isHovered = hoveredColumn === colIndex && cell === " "; // Only hover empty cells

          // Apply player-specific classes or hover class
          const playerClass =
            cell === playerX ? "playerX" : cell === playerO ? "playerO" : "";
          const hoverClass = isHovered ? "hovered" : "";

          return (
            <button
              key={colIndex}
              className={`cell ${playerClass} ${hoverClass}`}
              onClick={() => props.handleCellClick(colIndex)}
              onMouseEnter={() => setHoveredColumn(colIndex)} // Set the entire column as hovered
              onMouseLeave={() => setHoveredColumn(null)} // Remove hover effect on mouse leave
            >
              {cell !== " " ? <span className="star">★</span> : ""}
            </button>
          );
        })}
      </React.Fragment>
    ));
  };

  return <div className="grid-container">{renderGrid()}</div>;
}
