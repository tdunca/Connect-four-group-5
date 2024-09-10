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
  //Kollar columner från höger till vänster, uppifrån ner
  for (let col = 6; col >= 0; col--) {
    console.log("checked column " + col);
    for (let row = 0; row <= 5; row++) {
      //console.log("checked row " + row);
      if (grid[row][col] !== " " && grid[row][col] === "O") {
        //top nivå, hitta första förekomster av symbol
        let moveCandidates = [];
        //titta över och kolla om den är tom
        if (grid[row - 1][col] === " ") {
          moveCandidates.push([col, row - 1]);
        }
        //titta till vänster och under om samma symbol, får skriva extra kod utifall [row-1 är undefined]
        if (grid[row][col - 1] === " " && grid[row + 1][col - 1] !== " ") {
          moveCandidates.push([col - 1, row]);
        }
        //titta till höger och under om samma symbol
        if (grid[row][col + 1] === " " && grid[row + 1][col + 1] !== " ") {
          moveCandidates.push([col + 1, row]);
        }
        //om den fick 3 olika kandidater så slumpa vart den lägger ny bricka, kolla också så att den inte är tom
        if (moveCandidates.length !== 0) {
          let rand = getRandomInt(moveCandidates.length);
          return String(moveCandidates[rand]);
        }
        //ToDo, felhantering av out of bounds och generell felhantering
        console.log(moveCandidates);
        return "temp";
      }
    }
  }
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
