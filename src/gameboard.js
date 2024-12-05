import Ship from "./ship";
import { canPlaceShip, generateBoard } from "./gameboard-logic";

export default class Gameboard {
  constructor() {
    this.board = generateBoard();
    this.missedAttacks = [];
  }

  placeTheShip(coordinate, orientation, ship) {
    if (!canPlaceShip(this.board, coordinate, orientation, ship.length)) {
      throw new Error("Ship can't be placed here!");
    }
    const coordinate_x = coordinate[0];
    const coordinate_y = coordinate[1];
    for (let i = 0; i < ship.length; i++) {
      if (orientation == "X") {
        this.board[coordinate_x][coordinate_y + i].occupied = ship;
      } else {
        this.board[coordinate_x + i][coordinate_y].occupied = ship;
      }
    }
  }

  receiveAttack(coordinate) {
    const [coordinate_x, coordinate_y] = coordinate;

    const cell = this.board[coordinate_x][coordinate_y];

    if (cell.occupied === null && cell.hitStatus === false) {
      cell.hitStatus = true;
    } else if (cell.occupied != null && cell.hitStatus === false) {
      cell.occupied.hit();
      cell.hitStatus = true;
    } else {
      throw new Error(`Invalid move. Cell already attacked.`);
    }
  }
}
