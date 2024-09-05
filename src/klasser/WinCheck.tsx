import React, { useState } from "react";

export const useWinCheck = (
  rows: number,
  columns: number,
  grid: string[][]
) => {
  const checkHorizontalWin = (symbol: string): boolean => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= columns - 4; col++) {
        if (
          grid[row][col] === symbol &&
          grid[row][col + 1] === symbol &&
          grid[row][col + 2] === symbol &&
          grid[row][col + 3] === symbol
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const checkVerticalWin = (symbol: string): boolean => {
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row <= rows - 4; row++) {
        if (
          grid[row][col] === symbol &&
          grid[row + 1][col] === symbol &&
          grid[row + 2][col] === symbol &&
          grid[row + 3][col] === symbol
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const checkDiagonalWinTLBR = (symbol: string): boolean => {
    for (let row = 0; row <= rows - 4; row++) {
      for (let col = 0; col <= columns - 4; col++) {
        if (
          grid[row][col] === symbol &&
          grid[row + 1][col + 1] === symbol &&
          grid[row + 2][col + 2] === symbol &&
          grid[row + 3][col + 3] === symbol
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const checkDiagonalWinBLTR = (symbol: string): boolean => {
    for (let row = 3; row < rows; row++) {
      for (let col = 0; col <= columns - 4; col++) {
        if (
          grid[row][col] === symbol &&
          grid[row - 1][col + 1] === symbol &&
          grid[row - 2][col + 2] === symbol &&
          grid[row - 3][col + 3] === symbol
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const isFull = (): boolean => {
    return grid.every((row) => row.every((cell) => cell !== " "));
  };

  const winCheck = (symbol: string): boolean => {
    return (
      checkHorizontalWin(symbol) ||
      checkVerticalWin(symbol) ||
      checkDiagonalWinTLBR(symbol) ||
      checkDiagonalWinBLTR(symbol)
    );
  };

  return { winCheck, isFull };
};
