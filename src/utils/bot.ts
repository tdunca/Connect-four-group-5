import getRandomInt from "./utils";
type Grid = string[][]; //lokal typ, kanske mer värt att göra en board class?

export default function botMove(
  grid: Grid,
  difficulty: string,
  symbol: string
): string {
  if (difficulty === "easy") {
    let move = getRandomInt(7);
    return String(move); //här returnerar den ut det rekommenderade draget för boten i formen "col"
  } else if (difficulty === "hard") {
    let move = findOptimalMove(grid, symbol);
    return move;
  }
  return "error";
}

function findOptimalMove(grid: Grid, symbol: string): string {
  //Kollar columner från höger till vänster, uppifrån ner
  for (let col = 6; col >= 0; col--) {
    //console.log("checked column " + col);
    for (let row = 0; row <= 5; row++) {
      //console.log("checked row " + row);
      if (grid[row][col] !== " " && grid[row][col] === symbol) {
        //top nivå, hitta första förekomster av symbol
        let moveCandidates = [];
        //titta över och kolla om den är tom
        if (row - 1 >= 0 && grid[row - 1][col] === " ") {
          moveCandidates.push([col, row - 1]);
        }
        //titta till vänster och under om samma symbol, får skriva extra kod utifall [row-1 är undefined]
        if (
          col - 1 >= 0 &&
          grid[row][col - 1] === " " &&
          (row + 1 >= 6 || grid[row + 1][col - 1] !== " ")
        ) {
          moveCandidates.push([col - 1, row]);
        }
        //titta till höger och under om samma symbol
        if (
          col + 1 < 7 &&
          grid[row][col + 1] === " " &&
          (row + 1 >= 6 || grid[row + 1][col + 1] !== " ")
        ) {
          moveCandidates.push([col + 1, row]);
        }

        //om den fick 3 olika kandidater så slumpa vart den lägger ny bricka, kolla också så att den inte är tom
        if (moveCandidates.length !== 0) {
          let rand = getRandomInt(moveCandidates.length);
          return String(moveCandidates[rand]);
        }
        console.log(moveCandidates); //här loggar den ut det rekommenderade draget för boten i formen "col,row"
      }
    }
  }
  let move = getRandomInt(7);
  return String(move); //första draget, slumpa column
}
