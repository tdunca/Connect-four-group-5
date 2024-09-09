import React, { useState } from "react";
import "./Board.css";

const rows = 6;
const columns = 7;
const playerX = "X";
const player0 = "0";

type Grid = string[][];

const createGrid = (): Grid =>
  Array.from({ length: rows }, () => Array(columns).fill(" "));

//Håller koll på grid och nuvarande spelare
export const Board: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(createGrid);
  const [currentPlayer, setCurrentPlayer] = useState<string>(playerX);
  const [winner, setWinner] = useState<string | null>(null);

  //Placerar bricka i specifik column
  const placeToken = (column: number): void => {
    if (winner || !canPlaceToken(column)) return;

    const newGrid = [...grid];
    //Hittar första lediga cellen i column
    for (let row = rows - 1; row >= 0; row--) {
      if (newGrid[row][column] === " ") {
        newGrid[row][column] = currentPlayer;
        setGrid(newGrid);

        //Kollar om nuvarande spelare vinner ----- Måste mergas ihop med Jens WinChecker
        if (checkWin(currentPlayer, newGrid)) {
          setWinner(currentPlayer);
        } else {
          setCurrentPlayer(currentPlayer === playerX ? player0 : playerX);
        }
        break;
      }
    }
  };
  //Kollar om en bricka kan bli placerad i specifik column
  const canPlaceToken = (column: number): boolean => grid[0][column] === " ";

  //Resettar spelet
  const resetGame = (): void => {
    setGrid(createGrid());
    setCurrentPlayer(playerX);
    setWinner(null);
  };

  //Renderar grid och kontrollerar spelet
  const renderGrid = (): React.ReactNode => {
    return grid.map((row, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {row.map((cell, colIndex) => (
          <React.Fragment key={colIndex}>
            <button onClick={() => placeToken(colIndex)}>{cell}</button>
          </React.Fragment>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <div>
      {renderGrid()}
      {winner && <p>{`Player ${winner} wins!`}</p>}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default Board;
