import { Player } from "../klasser/Players";
import React, { useState, useEffect } from React;
import { Board } from './Board';
import { validateInput } from './Utilities';

//selects and checks columns a token can be placed
function getRandomColumn(board) {
  let column; // random selected column to place a token
  do {
    column = Math.floor(Math.random() * board.colums);
  } while (!board.canPlaceToken(column)) // checks if a token can be placed
  return column;
}

export default function Game() {
  //state variables to control the game logic
  const [board, setBoard] = useState(new Board())
  const [players, setPlayers] = useState([new Player('Player 1', 'X'), new Player('Player 2', 'O')]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);//tracks the turn of the player(either 0 or 1)
  const [isVsBot, setIsVsBot] = useState(false);// determines the gamne vs Bot(false from the beg.)
  const [isGameOver, setIsGameOver] = useState(false); // determines whether game has ended(false from the beg. )
  const [message, setMessage] = useState(''); // various messages (whose turn, who wins etc. ). empty from the beg.

  
  //useEffect to choose the game mode when the component mounted
  useEffect(() => {
    // ask for the game mode 
    const choice = window.prompt('Choose gamemode: 1 for PvP, 2 for PvB');
    setIsVsBot(choice === '2');
    if (choice === '2') {
      setPlayers([new Player('Player 1', 'X'), new Player('Bot', 'O')]);
    }
  }, []);


  //handle column click
  const handleColumnClick = (column) => {
    //check if the game is over. if the game is over it does nothing
    if (isGameOver) return;
  }


  return (
    <>
      <>This is the Game component</>
    </>
  );
}
