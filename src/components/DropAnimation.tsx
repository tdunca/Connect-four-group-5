import { Dispatch, SetStateAction } from "react";

export const DropAnimation = (
  board: string[][],
  column: number,
  currentPlayerSymbol: string,
  setBoard: Dispatch<SetStateAction<string[][]>>,
  callback: () => void
) => {
  const rows = board.length;
  const newBoard = board.map((row) => [...row]);
  let rowToPlace = -1;

  // Find the first empty row in the selected column
  for (let row = rows - 1; row >= 0; row--) {
    if (newBoard[row][column] === " ") {
      rowToPlace = row;
      break;
    }
  }

  if (rowToPlace === -1) return; // No space available, return

  newBoard[0][column] = currentPlayerSymbol;
  setBoard(newBoard); // Set token at the top row

  setTimeout(() => {
    newBoard[0][column] = " ";

    newBoard[rowToPlace][column] = currentPlayerSymbol;
    setBoard(newBoard);
    callback();
  }, 100);
};
