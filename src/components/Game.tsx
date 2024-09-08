import React, { useState, useEffect } from "react";
import { Player } from "../klasser/Players";
import Board from "./Board";
import { validateInput } from "../utils/validateInput";

//selects and checks columns a token can be placed
/* function getRandomColumn(board) {
  let column; // random selected column to place a token
  do {
    column = Math.floor(Math.random() * board.colums);
  } while (!board.canPlaceToken(column)); // checks if a token can be placed
  return column;
} */

const Game: React.FC = () => {
  /* States for the game: */
  //board states. 7 rows and 6 columns
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: 6 }, () => Array(7).fill(""))
  );

  //states for players. (X & O)
  const [players, setPlayers] = useState([
    { name: "Player 1", symbol: "X" },
    { name: "Player 2", symbol: "O" },
  ]);

  //state for tracking the player's turn. (0-'X'-player, 1-'O'-player)
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // gameMode track (PvsP, PvsB - ).
  const [isVsBot, setIsVsBot] = useState(false);

  // state to hold messages
  const [message, setMessage] = useState<string | null>(null);

  // reset the board to it's initial state
  const resetBoard = () => {
    setBoard(Array.from({ length: 6 }, () => Array(7).fill("")));
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

  /* Handle click event.  */
  const handleCellClick = (column: number) => {
    const currentPlayer = players;
  };
};
