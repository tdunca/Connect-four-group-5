import React, { useState } from "react";
import "./Board.css";
import botMove from "../utils/bot";

const rows = 6;
const columns = 7;
const playerX = "X";
const player0 = "O";

type Grid = string[][];

interface BoardProps {
  handleCellClick: (column: number) => void;
  board: Grid;
}

const createGrid = (): Grid =>
  Array.from({ length: rows }, () => Array(columns).fill(" "));

// Board component
export default function Board(props: BoardProps) {
  const [grid, setGrid] = useState<Grid>(createGrid);
  const [currentPlayer, setCurrentPlayer] = useState<string>(playerX);
  const [winner, setWinner] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const placeToken = (column: number): void => {
    setTimeout(() => {
      console.log(botMove(grid, "hard", "O")); //botMove med timeout 1 sec, ska vara i game egentligen
    }, 1000);

    if (winner || !canPlaceToken(column)) return;

    const newGrid = [...grid];
    for (let row = rows - 1; row >= 0; row--) {
      if (newGrid[row][column] === " ") {
        newGrid[row][column] = currentPlayer;
        setGrid(newGrid);
        setCurrentPlayer(currentPlayer === playerX ? player0 : playerX);
        break;
      }
    }
  };

  const canPlaceToken = (column: number): boolean => grid[0][column] === " ";

  const resetGame = (): void => {
    setGrid(createGrid());
    setCurrentPlayer(playerX);
    setWinner(null);
  };

  const renderGrid = (): React.ReactNode => {
    return grid.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {row.map((cell, colIndex) => (
          <button
            key={colIndex}
            className={`cell ${
              cell === playerX
                ? "x-cell"
                : cell === player0
                ? "o-cell"
                : hoveredColumn === colIndex
                ? "hovered-column"
                : ""
            }`}
            onClick={() => placeToken(colIndex)}
            onMouseEnter={() => setHoveredColumn(colIndex)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            {cell !== " " ? <span className="star">★</span> : ""}
          </button>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <div>
      <div className="grid-container">{renderGrid()}</div>
      {winner && <p>{`Player ${winner} wins!`}</p>}
      <div className="reset-btn">
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
}
