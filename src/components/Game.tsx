import { useState, useEffect } from "react";
import { Player } from "../klasser/Player";
import Board from "../components/GameBoard";
import botMove from "../utils/bot";
import "./Game.css";
import { Options } from "../klasser/Options";
import { useWinCheck } from "../utils/WinCheck";
import { DropAnimation } from "./DropAnimation";

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

  const currentPlayer = players[currentPlayerIndex];
  console.log("rerender", currentPlayerIndex);

  useEffect(() => {
    console.log("useEffect triggred!");
    console.log(board);
    console.log("Wincheck: ", winCheck(currentPlayer.symbol));
    console.log("Current player: ", currentPlayer.symbol);

    if (winCheck(currentPlayer.symbol === "X" ? "O" : "X")) {
      console.log("if");

      setMessage(`${currentPlayer.name} Wins!`);
    } else if (isFull()) {
      console.log("elseif");

      setMessage("It's a draw!");
    } else {
      console.log("setting player index ", 1 - currentPlayerIndex);

      botPlay();
    }
  }, [board]);

  // Reset the game
  function resetBoard() {
    setBoard(Array.from({ length: rows }, () => Array(columns).fill(" ")));
    setMessage(null);
  }

  function canPlaceToken(column: number): boolean {
    return board[0][column] === " ";
  }
  function handleCellClick(column: number) {
    if (message) return;
    if (!canPlaceToken(column)) {
      setMessage("This column is full! Try another one!");
      return;
    }
    // DropAnimation(
    //   board,
    //   column,
    //   currentPlayer.symbol,
    //   setBoard,

    placeToken(column);
    setCurrentPlayerIndex(1 - currentPlayerIndex);

    // );
  }
  function placeToken(column: number) {
    console.log("placeToken: ", currentPlayerIndex);

    const currentPlayer = players[currentPlayerIndex];
    console.log(currentPlayer);
    const newBoard = board.map((row) => [...row]);

    for (let row = rows - 1; row >= 0; row--) {
      if (newBoard[row][column] === " ") {
        newBoard[row][column] = currentPlayer.symbol;
        break;
      }
    }

    setBoard(newBoard);
  }

  // useEffect-hook to reset the game when switching btw PvsP and PvsB modes
  /* Handle click events - cell click and player moves  */
  // the function that handle the click event when a cell is clicked
  function botPlay() {
    if (
      props.options.gamemode === "pvc" &&
      currentPlayerIndex === 1 &&
      props.options.bot1difficulty !== undefined
    ) {
      let move = botMove(
        board,
        props.options.bot1difficulty,
        players[currentPlayerIndex].symbol
      );
      //easy och hard har olika output men första är col där den vill ha draget, plocka ut col ur hard
      let column = Number(move[0]);
      setTimeout(() => {
        handleCellClick(column);
      }, 100);
    } else if (
      props.options.gamemode === "cvc" &&
      props.options.bot1difficulty !== undefined &&
      props.options.bot2difficulty !== undefined
    ) {
      let move = botMove(
        board,
        props.options.bot1difficulty,
        players[currentPlayerIndex].symbol
      );
      //easy och hard har olika output men första är col där den vill ha draget, plocka ut col ur hard
      let column = Number(move[0]);
      setTimeout(() => {
        //ta bort timeout för felsökning om ni vill
        handleCellClick(column);
      }, 100);
    }
  }
  //check if a column is full before allowing a move.
  //skrev om placeToken till en function för att ha tillgång till den i hela Game, annars måste den ligga i rätt följd

  return (
    <div>
      <h3>
        Current Turn: {currentPlayer.name} ({currentPlayer.symbol})
      </h3>
      <Board board={board} handleCellClick={handleCellClick} />
      {message && <h3>{message}</h3>}
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
}
