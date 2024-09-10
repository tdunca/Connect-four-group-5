import { useState, useEffect } from "react";
//import { Player } from "../klasser/Player";
import Board from "../components/Board_1";
import "./Game.css";
import { useWinCheck } from "../utils/WinCheck"; // Import the win check hook
import { Options } from "../klasser/Options";

interface GameProps {
  options: Options;
}

export default function Game(props: GameProps) {
  //skrev om från React.FC till default function för att kunna ta emot props från settings
  const rows = 6;
  const columns = 7;
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: rows }, () => Array(columns).fill(""))
  );

  const [players, setPlayers] = useState([
    { name: "Player 1", symbol: "X" },
    { name: "Player 2", symbol: "O" },
  ]);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isVsBot, setIsVsBot] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { winCheck, isFull } = useWinCheck(rows, columns, board);

  // reset the board to it's initial state
  const resetBoard = () => {
    setBoard(Array.from({ length: rows }, () => Array(columns).fill("")));
    setCurrentPlayerIndex(0);
    setMessage(null); // reset any messages.
  };

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
  }, [isVsBot]);

  /* Handle click events - cell click and player moves  */
  const handleCellClick = (column: number) => {
    if (message) return;
    const currentPlayer = players[currentPlayerIndex];

    if (board[0][column] !== "") {
      setMessage("This column is full! Try another one!");
      return;
    }

    /* function to place a player's symbol in the empty cell */
    const newBoard = [...board];
    for (let row = newBoard.length - 1; row >= 0; row--) {
      if (newBoard[row][column] === "") {
        newBoard[row][column] = currentPlayer.symbol;

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
      {message && <p>{message}</p>}
      <div className="switch">
        <button onClick={toggleGameMode}>
          {isVsBot ? "Switch to PvP" : "Switch to PvB"}
        </button>
      </div>
    </div>
  );
}
