//return a 10x10 2D array with each cell as an object
function generateBoard() {
  let arr = [];
  for (let i = 0; i <= 9; i++) {
    arr[i] = [];
    for (let j = 0; j <= 9; j++) {
      arr[i][j] = {
        occupied: null,
        hitStatus: false,
        coordinate: `[${i}, ${j}]`,
      };
    }
  }
  return arr;
}

//check if a ship can be placed at desired coordinates
function canPlaceShip(board, coordinate, orientation, shipLength) {
  const [coordinate_x, coordinate_y] = coordinate;
  const board_size = board.length;

  //check if cell is valid for ship placement
  function isCellValid(x, y) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < board_size &&
      y < board_size &&
      board[x][y].occupied === null
    );
  }

  //condition for both orientation - "X" & "Y"
  //check for each cell required for ship placement
  if (orientation == "X") {
    for (let i = 0; i < shipLength; i++) {
      if (!isCellValid(coordinate_x, coordinate_y + i)) {
        return false;
      }
    }
    return true;
  } else if (orientation == "Y") {
    for (let i = 0; i < shipLength; i++) {
      if (!isCellValid(coordinate_x + i, coordinate_y)) {
        return false;
      }
    }
    return true;
  } else {
    throw new Error(`Invalid orientation: ${orientation}`);
  }
}

export { generateBoard, canPlaceShip };
