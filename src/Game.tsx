
import React, { useState, useEffect } from React;
import { Player } from './Player'
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