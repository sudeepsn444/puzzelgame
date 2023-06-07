function openpopup() {
  document.getElementById("popupForm").style.display = "block";
}
function closepopup() {
  document.getElementById("popupForm").style.display = "none";
}

var moves = 0;
var table;
var rows;
var columns;
var textMoves;
var createanarrayforboard;
var time = 0;
var checkWin = false;



function startTheGame() {
  checkWin = false;
  var button = document.getElementById("newGame");
  button.addEventListener("click", startNewGame, false);
  textMoves = document.getElementById("moves");
  table = document.getElementById("table");
  rows = 4;
  columns = 4;
  startNewGame();
}


function startNewGame() {
  var arrayOfNumbers = new Array();
  var arrayNumberisUsed;
  var randomNumber = 0;
  var count = 0;
  moves = 0;
  time = 0;
  rows = 4;
  columns = 4;
  textMoves.innerHTML = moves;
  checkWin = false;

  // Create the board size.
  createanarrayforboard = new Array(rows);
  for (var i = 0; i < rows; i++) {
    createanarrayforboard[i] = new Array(columns);

  }
  // Set up an array for the unique numbers.
  arrayNumberisUsed = new Array(rows * columns);
  for (var i = 0; i < rows * columns; i++) {
    arrayNumberisUsed[i] = 0;
  }

  // Assign random numbers to the board.
  for (var i = 0; i < rows * columns; i++) {
    randomNumber = Math.floor(Math.random() * rows * columns);
    // If our random numer is unique, add it to the board.
    if (arrayNumberisUsed[randomNumber] == 0) {
      arrayNumberisUsed[randomNumber] = 1;
      arrayOfNumbers.push(randomNumber);
    }
    else // Our number is not unique. Try again.
    {
      i--;
    }
  }

  // add numbers to the game board.
  count = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      createanarrayforboard[i][j] = arrayOfNumbers[count];

      count++;
    }
  }
  displayTable();


}

function simpleGame() {
  var arrayOfNumbers = new Array();
  var arrayNumberisUsed;
  var randomNumber = 0;
  var count = 0;
  moves = 0;
  time = 0;
  rows = 4;
  columns = 4;
  textMoves.innerHTML = moves;
  checkWin = false;

  // Create the proper board size.
  createanarrayforboard = new Array(rows);
  for (var i = 0; i < rows; i++) {
    createanarrayforboard[i] = new Array(columns);

  }
  // Set up an array for the unique numbers.
  arrayNumberisUsed = new Array(rows * columns);
  for (var i = 0; i < rows * columns; i++) {
    arrayNumberisUsed[i] = 0;
  }

  // Assign random numbers to the board.
  for (var i = 0; i < rows * columns; i++) {
    randomNumber = i;
    console.log(randomNumber);
    // If our random numer is unique, add it to the board.
    if (arrayNumberisUsed[randomNumber] == 0) {
      arrayNumberisUsed[randomNumber] = 1;
      arrayOfNumbers.push(randomNumber);
    }
    else {
      i--;
    }
  }

  arrayOfNumbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];
  // Assign numbers to the game board.
  count = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {

      createanarrayforboard[i][j] = arrayOfNumbers1[count];

      count++;
    }
  }
  displayTable();

}


function displayTable() {
  console.log(createanarrayforboard);
  var outputString = "";
  for (var i = 0; i < rows; i++) {
    outputString += "<tr>";

    for (var j = 0; j < columns; j++) {
      if (createanarrayforboard[i][j] == 0) {
        outputString += "<td class=\"blank\"> </td>";
      }
      else {
        outputString += "<td class=\"tile\" onclick=\"moveTile(" + i + ", " + j + ")\">" + createanarrayforboard[i][j] + "</td>";
      }
    }
    outputString += "</tr>";
  }

  table.innerHTML = outputString;
}




function moveTile(tableRow, tableColumn) {
  if (checkIfTilesMoveable(tableRow, tableColumn, "up") ||
    checkIfTilesMoveable(tableRow, tableColumn, "down") ||
    checkIfTilesMoveable(tableRow, tableColumn, "left") ||
    checkIfTilesMoveable(tableRow, tableColumn, "right")) {
    incrementMoves();
  }
  else {
    alert("ERROR: Cannot move tile!\nTile must be next to a blank space.");
  }

  if (checkWinner()) {
    checkWin = true;
    alert("Congratulations! You solved the puzzle in " + moves + " moves.");

    startNewGame();
  }
}

function checkIfTilesMoveable(rowCoordinate, columnCoordinate, direction) {

  rowOffset = 0;
  columnOffset = 0;
  if (direction == "up") {
    rowOffset = -1;
  }
  else if (direction == "down") {
    rowOffset = 1;
  }
  else if (direction == "left") {
    columnOffset = -1;
  }
  else if (direction == "right") {
    columnOffset = 1;
  }

  // Check if the tile can be moved to the spot. If it can, move it and return true.
  if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
    rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns
  ) {
    if (createanarrayforboard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0) {
      createanarrayforboard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = createanarrayforboard[rowCoordinate][columnCoordinate];
      createanarrayforboard[rowCoordinate][columnCoordinate] = 0;
      displayTable();
      return true;
    }
  }
  return false;
}

function checkWinner() {
  var count = 1;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if (createanarrayforboard[i][j] != count) {
        if (!(count === rows * columns && createanarrayforboard[i][j] === 0)) {
          return false;
        }
      }
      count++;
    }
  }

  return true;
}

function incrementMoves() {
  moves++;
  if (textMoves) {
    textMoves.innerHTML = moves;
  }
}

function startTimer() {
  window.setInterval("updateTimer()", 1000);
}

function updateTimer() {
  ++time;
  document.getElementById("time").innerHTML = time + '&nbsp;Seconds';
}

window.addEventListener("load", startTheGame, false);
window.addEventListener("load", startTimer, false);