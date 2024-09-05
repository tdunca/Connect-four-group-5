import React, { useState } from "react";

const rows = 6;
const columns = 7;
const playerX = "X";
const player0 = "0";

type Grid = string[][];

const createGrid = (): Grid => Array.from({ length: rows }, () => Array(columns).fill(" "));

//Håller koll på grid och nuvarande spelare - Keeps track of grid and current player
const Board: React.FC = () => {
	const [grid, setGrid] = useState<Grid>(createGrid);
	const [currentPlayer, setCurrentPlayer] = useState<string>(playerX);
	const [winner, setWinner] = useState<string | null>(null);

//Placerar bricka i specifik column
	const placeToken = (column: number): void => {
		if (winner || !canPlaceToken(column)) return;

		const newGrid = [...grid];
//Hittar första lediga cellen i column
		for (let row = rows - 1; row >=0; row--) {
			if (newGrid[row][column] === " ") {
				newGrid[row][column] = currentPlayer;
				setGrid(newGrid);

//Kollar om nuvarande spelare vinner ----- Hur gör vi med detta? Måste mergas ihop med Jens WinChecker
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

};

