import getRandomInt from "./utils";
type Grid = string[][]; //lokal typ, kanske mer värt att göra en board class?

export default function botMove(grid: Grid, difficulty: string): string {
  if (difficulty === "easy") {
    let move = getRandomInt(7);
    return String(move);
  } else if (difficulty === "hard") {
    //hitta optimala draget från grid, där om det ligger liknande bricka antingen
    //vertikalt eller horisontellt så välj den positionen brevid/över
    //console.log(grid);
    let move = findOptimalMove(grid);

    return move;
  }
  return "error";
}

function findOptimalMove(grid: Grid): string {
  //Just nu kommer botten bara spela som "O", måste skriva om sen för att kunna
  //spela botvsbot
  //check column from right to left, check from top to bottom row
  for (let col = 6; col >= 0; col--) {
    console.log("checked column " + col);
    for (let row = 0; row <= 5; row++) {
      //console.log("checked row " + row);
      if (grid[row][col] !== " " && grid[row][col] !== "X") {
        let move = row + "," + (col - 1); //här gör jag logiskt fel, den gör movet
        //på samma ställe som ett potentiellt X ändå, får skriva mer logik ToDo
        return move;
      }
    }
  }
  //check row
  return "none";
}

// 0
// :
// (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
// 1
// :
// (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
// 2
// :
// (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
// 3
// :
// (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
// 4
// :
// (7) [' ', ' ', ' ', ' ', ' ', ' ', ' ']
// 5
// :
// (7) [' ', ' ', ' ', 'X', ' ', ' ', 'O']
