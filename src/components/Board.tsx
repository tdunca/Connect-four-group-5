import React, { useState } from "react";

const rows = 6;
const columns = 7;
const playerX = "X";
const player0 = "0";

type Grid = string[][];

const createGrid = (): Grid => Array.from({ length: rows }, () => Array(columns).fill(" "));

//Håller koll på grid och nuvarande spelare
//
const Board: React.FC = () => {
	const [grid, setGrid] = useState<Grid>(createGrid);
	const [currentPlayer, setCurrentPlayer] = useState<string>(playerX);
	const [winner, setWinner] = useState<string | null>(null);
}

