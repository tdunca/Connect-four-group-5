import React, { useState, useEffect } from "react";
import { Player } from "../klasser/Player";
import Board from "../components/Board";
import "./Game.css";
//import Board from "../klasser/Board";
//import { validateInput } from "../utils/validateInput";
import { useWinCheck } from "../utils/WinCheck"; // Import the win check hook
import { Options } from "../klasser/Options";

interface GameProps {
  options: Options;
}

export default function Game(props: GameProps) {
  //skrev om från React.FC till default function för att kunna ta emot props från settings
  // a vertical board 7 columns across and 6 rows high
  const rows = 6;
  const columns = 7;
  /* States for the game: */
  //board states. 6 rows and 7 columns
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: rows }, () => Array(columns).fill(""))
  );

  //states for players. (X & O)
  const [players, setPlayers] = useState([
    { name: "Player 1", symbol: "X" },
    { name: "Player 2", symbol: "O" },
  ]);

  //state for tracking the player's turn. (0='X'-player, 1='O'-player)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // gameMode track (PvsP, PvsB - ).
  const [isVsBot, setIsVsBot] = useState(false);

  // state to hold messages
  const [message, setMessage] = useState<string | null>(null);

  //check the win with useWinCheck
  const { winCheck, isFull } = useWinCheck(rows, columns, board);

  // reset the board to it's initial state
  const resetBoard = () => {
    setBoard(Array.from({ length: rows }, () => Array(columns).fill("")));
    setCurrentPlayerIndex(0);
    setMessage(null); // reset any messages.
  };

  // useEffect-hook to reset the game when switching btw PvsP and PvsB modes
  useEffect(() => {
    // PvsBot game mode
    if (isVsBot) {
      // players' names for PvB 'Player 1' & Bot
      setPlayers([
        {
          name: "Player 1",
          symbol: "X",
        },
        {
          name: "Bot",
          symbol: "O",
        },
      ]);
      // PvsP game mode
    } else {
      // players' names for pVsP (Player 1 Player 2)
      setPlayers([
        { name: "Player 1", symbol: "X" },
        { name: "Player 2", symbol: "O" },
      ]);
    }
    //reset the bord when gamemode changes
    resetBoard();
  }, [isVsBot]); // useEffect runs whenever isVsBot changes

  /* Handle click events - cell click and player moves  */
  // the function that handle the click event when a cell is clicked
  const handleCellClick = (column: number) => {
    const currentPlayer = players[currentPlayerIndex]; // get the current player
    //check if a column is full before allowing a move.
    if (board[0][column] !== "") {
      setMessage("This column is full! Try another one!"); //Displays a message when the column is full, prompting the user to choose another column
      return;
    }

    /* function to place a player's symbol in the empty cell */

    const newBoard = [...board]; //a copy of the board array not to modify the original board state
    //loop from bottom to top.iterates upwards to find the lowest empty cell
    for (let row = newBoard.length - 1; row >= 0; row--) {
      //check if the selected cell is empty
      if (newBoard[row][column] === "") {
        //if it's empty place the player's symbol
        newBoard[row][column] = currentPlayer.symbol;
        //when the symbol is placed in the lowest cell, break; the function to prevent further checking
        break;
      }
    }

    //update the board state
    setBoard(newBoard);

    //check if the current player has won the game.
    if (winCheck(currentPlayer.symbol)) {
      setMessage(`${currentPlayer.name} Wins!`);
      // checks if there is no empty cells
    } else if (isFull()) {
      setMessage("It's a draw!");
    } else {
      //if no win the next player turn

      //swithes the current player. toggles btw 0 and 1
      setCurrentPlayerIndex(1 - currentPlayerIndex);
    }
  };

  // toggle game mode (btw PvP and PvB)
  const toggleGameMode = () => {
    setIsVsBot(!isVsBot);
  };

  return (
    <div>
      <div className="C4-text">
        <h1>Connect 4</h1>
      </div>

      <Board board={board} handleCellClick={handleCellClick} />
      {message && <p>{message} </p>}
      <div className="switch">
        <button onClick={toggleGameMode}>
          {isVsBot ? "Switch to PvP" : "Switch to PvB"}
        </button>
      </div>
    </div>
  );
}
