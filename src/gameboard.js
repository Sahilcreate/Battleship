import Ship from "./ship";
import { canPlaceShip, generateBoard } from "./gameboard-logic";

export default class Gameboard {
  constructor() {
    this.board = generateBoard();
    this.shipsArr = [];
  }

  //take pair of coordinates, orientation of ship,
  //and instance of Ship() class as parameters &
  placeTheShip(coordinate, orientation, ship) {
    //determines if ship can be placed on desired coordinates
    if (!canPlaceShip(this.board, coordinate, orientation, ship.length)) {
      throw new Error("Ship can't be placed here!");
    }

    const [coordinate_x, coordinate_y] = coordinate;
    this.shipsArr.push(ship); //Store the ship in an array

    //update the state of cell object
    for (let i = 0; i < ship.length; i++) {
      if (orientation == "X") {
        this.board[coordinate_x][coordinate_y + i].occupied = ship;
      } else {
        this.board[coordinate_x + i][coordinate_y].occupied = ship;
      }
    }
  }

  //Receives a par of coordinates,
  //determines if a ship is hit or shot is miss
  //and update cell accordingly
  receiveAttack(coordinate) {
    const [coordinate_x, coordinate_y] = coordinate;

    const cell = this.board[coordinate_x][coordinate_y];

    if (cell.occupied === null && cell.hitStatus === false) {
      cell.hitStatus = true;
      return "Miss!";
    } else if (cell.occupied != null && cell.hitStatus === false) {
      cell.occupied.hit();
      cell.hitStatus = true;
      return "Hit!";
    } else {
      return "Cell already attacked!";
    }
  }

  //Check if all the ships are Sunk or not.
  areAllShipsSunk() {
    const numShips = this.shipsArr.length;

    for (let i = 0; i < numShips; i++) {
      if (this.shipsArr[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  }
}
