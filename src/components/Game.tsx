import { useState, useEffect } from "react";
import { Player } from "../klasser/Player";
import Board from "../components/GameBoard";
import botMove from "../utils/bot";
import "./Game.css";
import { Options } from "../klasser/Options";
import { useWinCheck } from "../utils/WinCheck";
import { DropAnimation } from "./DropAnimation"; // Import the animateDrop function

interface GameProps {
  options: Options;
}

export default function Game(props: GameProps) {
  const rows = 6;
  const columns = 7;
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: rows }, () => Array(columns).fill(" "))
  );
  const [players, setPlayers] = useState([
    { name: "Player 1", symbol: "X" },
    { name: "Player 2", symbol: "O" },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const { winCheck, isFull } = useWinCheck(rows, columns, board);

  // Reset the game
  const resetBoard = () => {
    setBoard(Array.from({ length: rows }, () => Array(columns).fill(" ")));
    setCurrentPlayerIndex(0);
    setMessage(null);
  };

  // Check if we can place a token in the column
  const canPlaceToken = (column: number): boolean => {
    return board[0][column] === " "; // Only allow placing if the top is empty
  };

  // useEffect hook to reset the game when switching between modes
  useEffect(() => {
    if (props.options.gamemode === "pvc") {
      setPlayers([
        { name: "Player 1", symbol: "X" },
        { name: "Bot", symbol: "O" },
      ]);
    } else {
      setPlayers([
        { name: "Player 1", symbol: "X" },
        { name: "Player 2", symbol: "O" },
      ]);
    }
    resetBoard();
  }, [props.options.gamemode]);

  const currentPlayer = players[currentPlayerIndex]; // Get the current player

  // Function to handle the logic after token placement
  const afterTokenPlacement = () => {
    if (winCheck(currentPlayer.symbol)) {
      setMessage(`${currentPlayer.name} Wins!`);
    } else if (isFull()) {
      setMessage("It's a draw!");
    } else {
      setCurrentPlayerIndex(1 - currentPlayerIndex); // Switch players
    }
  };

  // Handle cell click
  const handleCellClick = (column: number) => {
    if (message) return; // Do nothing if the game is over
    if (!canPlaceToken(column)) {
      setMessage("This column is full! Try another one!");
      return;
    }

    DropAnimation(
      board,
      column,
      currentPlayer.symbol,
      setBoard,
      afterTokenPlacement
    );
  };

  return (
    <div>
      <Board board={board} handleCellClick={handleCellClick} />
      {message && <p>{message}</p>}
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
}
