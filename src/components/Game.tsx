import { useState, useEffect } from "react";
import { Player } from "../klasser/Player";
import Board from "../components/GameBoard";
//import Board from "../components/Board";
import botMove from "../utils/bot";
import "./Game.css";
import { Options } from "../klasser/Options";
import { useWinCheck } from "../utils/WinCheck";

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

  // Сбрасываем состояние игры
  const resetBoard = () => {
    setBoard(Array.from({ length: rows }, () => Array(columns).fill(" ")));
    setCurrentPlayerIndex(0);
    setMessage(null);
  };

  // Проверяем, можно ли поставить жетон в колонку
  const canPlaceToken = (column: number): boolean => {
    return board[0][column] === " "; // Если верхняя ячейка пуста, можно ставить жетон
  };

  // useEffect-hook to reset the game when switching btw PvsP and PvsB modes
  useEffect(() => {
    // PvsBot game mode
    if (props.options.gamemode === "pvc") {
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

      // let player = new Player("Player 1","X")
      setPlayers([
        { name: "Player 1", symbol: "X" },
        { name: "Player 2", symbol: "O" },
      ]);
    } //Skriv om till props då alla settings sätts där
    //reset the bord when gamemode changes
    resetBoard();
  }, [props.options.gamemode === "pvc"]); // useEffect runs whenever isVsBot changes

  /* Handle click events - cell click and player moves  */
  // the function that handle the click event when a cell is clicked

  const currentPlayer = players[currentPlayerIndex]; // get the current player
  //check if a column is full before allowing a move.

  // Функция для размещения жетона
  const placeToken = (column: number) => {
    const currentPlayer = players[currentPlayerIndex];
    const newBoard = board.map((row) => [...row]);

    // Ищем последнюю свободную ячейку в колонке
    for (let row = rows - 1; row >= 0; row--) {
      if (newBoard[row][column] === " ") {
        newBoard[row][column] = currentPlayer.symbol; // Ставим жетон
        break;
      }
    }

    setBoard(newBoard); // Обновляем доску

    // Проверяем, есть ли победитель
    if (winCheck(currentPlayer.symbol)) {
      setMessage(`${currentPlayer.name} Wins!`);
    } else if (isFull()) {
      setMessage("It's a draw!");
    } else {
      setCurrentPlayerIndex(1 - currentPlayerIndex); // Меняем игрока
    }
  };

  // Обработка клика на колонке
  const handleCellClick = (column: number) => {
    if (message) return; // Если игра завершена, не делаем ничего
    if (!canPlaceToken(column)) {
      setMessage("This column is full! Try another one!"); // Колонка заполнена
      return;
    }
    placeToken(column); // Размещаем жетон
  };

  return (
    <div>
      <Board board={board} handleCellClick={handleCellClick} />
      {message && <p>{message}</p>}
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
}
