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
      // throw new Error("Ship can't be placed here!");
      return 0;
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

    return 1;
  }

  placeShipsRandomly() {
    const carrier = new Ship("Carrier", 5);
    const battleShip = new Ship("BattleShip", 4);
    const cruiser = new Ship("Cruiser", 3);
    const submarine = new Ship("Submariner", 3);
    const destroyer = new Ship("Destroyer", 2);

    const shipsNotPlaced = [carrier, battleShip, cruiser, submarine, destroyer];

    while (shipsNotPlaced.length > 0) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientationArr = ["X", "Y"];
      const orientationNum = Math.floor(Math.random() * orientationArr.length);
      this.placeTheShip(
        [x, y],
        orientationArr[orientationNum],
        shipsNotPlaced[0]
      );

      if (this.shipsArr.includes(shipsNotPlaced[0])) {
        shipsNotPlaced.shift();
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
      // return "Miss!";
    } else if (cell.occupied != null && cell.hitStatus === false) {
      cell.occupied.hit();
      cell.hitStatus = true;
      // return "Hit!";
    }
    // else {
    //   return "Cell already attacked!";
    // }
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
