function generateBoard() {
  let arr = [];
  for (let i = 0; i <= 9; i++) {
    arr[i] = [];
    for (let j = 0; j <= 9; j++) {
      arr[i][j] = { occupied: null, hitStatus: false };
    }
  }
  return arr;
}

function canPlaceShip(board, coordinate, orientation, shipLength) {
  const [coordinate_x, coordinate_y] = coordinate;
  const board_size = board.length;

  function isCellValid(x, y) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < board_size &&
      y < board_size &&
      board[x][y].occupied === null
    );
  }

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
