import Gameboard from "../gameboard";
import { canPlaceShip, generateBoard } from "../gameboard-logic";
import Ship from "../ship";

test("gameboard generation", () => {
  const board = generateBoard();
  const expectedObject = {
    occupied: null,
    hitStatus: false,
    coordinate: "[4, 5]",
  };
  expect(board[4][5]).toMatchObject(expectedObject);
});

test("can I place ship here?", () => {
  const board = generateBoard();
  const orientation = "X";
  const shipLength = 5;
  const coordinate = [0, 0];
  const isShipPlacementValid = canPlaceShip(
    board,
    coordinate,
    orientation,
    shipLength
  );

  expect(isShipPlacementValid).toBeTruthy();
});

test("can i place ship here? - 2", () => {
  const board = generateBoard();
  const orientation = "X";
  const shipLength = 5;
  const coordinate = [0, 9];
  const isShipPlacementValid = canPlaceShip(
    board,
    coordinate,
    orientation,
    shipLength
  );

  expect(isShipPlacementValid).not.toBeTruthy();
});

test("can i place ship here? - 3", () => {
  const board = generateBoard();
  const orientation = "Y";
  const shipLength = 5;
  const coordinate = [0, 9];
  const isShipPlacementValid = canPlaceShip(
    board,
    coordinate,
    orientation,
    shipLength
  );

  expect(isShipPlacementValid).toBeTruthy();
});

test("is ship placed?", () => {
  const gameboard = new Gameboard();
  const orientation = "Y";
  const coordinate = [0, 9];
  const carrier = { name: "carrier", length: 5 };

  gameboard.placeTheShip(coordinate, orientation, carrier);

  expect(gameboard.board[0][9].occupied).toBe(carrier);
  expect(gameboard.board[1][9].occupied).toBe(carrier);
  expect(gameboard.board[2][9].occupied).toBe(carrier);
  expect(gameboard.board[3][9].occupied).toBe(carrier);
  expect(gameboard.board[4][9].occupied).toBe(carrier);
});

// test("is ship placed? - 2", () => {
//   const gameboard = new Gameboard();
//   const orientation = "X";
//   const coordinate = [0, 9];
//   const carrier = { name: "carrier", length: 5 };

//   expect(() => {
//     gameboard.placeTheShip(coordinate, orientation, carrier);
//   }).toThrow("Ship can't be placed here!");

//   expect(
//     gameboard.board.every((row) => row.every((cell) => cell.occupied === null))
//   ).toBeTruthy();
// });

test("attack miss", () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack([0, 0]);
  expect(gameboard.board[0][0].hitStatus).toBeTruthy;
});

test("attack hit", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship("Carrier", 5);

  gameboard.placeTheShip([0, 0], "X", carrier);
  expect(gameboard.board[0][0].occupied).toBe(carrier);

  gameboard.receiveAttack([0, 0]);
  expect(gameboard.board[0][0].hitStatus).toBeTruthy;

  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);

  gameboard.receiveAttack([0, 3]);
  expect(carrier.isSunk()).not.toBeTruthy;

  gameboard.receiveAttack([0, 4]);
  expect(carrier.hitCounter).toBe(5);
  expect(carrier.isSunk()).toBeTruthy;
});

test("all ships sunk", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship("Carrier", 5);
  const destroyer = new Ship("Destroyer", 2);

  gameboard.placeTheShip([0, 0], "X", carrier);
  gameboard.placeTheShip([3, 4], "Y", destroyer);

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([0, 3]);
  gameboard.receiveAttack([0, 4]);

  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([4, 4]);

  expect(gameboard.areAllShipsSunk()).toBeTruthy();
});

test("all ships not sunk", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship("Carrier", 5);
  const destroyer = new Ship("Destroyer", 2);

  gameboard.placeTheShip([0, 0], "X", carrier);
  gameboard.placeTheShip([3, 4], "Y", destroyer);

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([0, 3]);
  gameboard.receiveAttack([0, 4]);

  expect(gameboard.areAllShipsSunk()).not.toBeTruthy();
});

test("are ships placed randomly", () => {
  const gameboard = new Gameboard();
  const carrier = new Ship("Carrier", 5);
  const battleShip = new Ship("BattleShip", 4);
  const cruiser = new Ship("Cruiser", 3);
  const submarine = new Ship("Submariner", 3);
  const destroyer = new Ship("Destroyer", 2);
  gameboard.placeShipsRandomly();

  console.log(gameboard.board);
  console.log(gameboard.shipsArr);

  expect(gameboard.shipsArr.length).toBe(5);

  // expect(gameboard.shipsArr.includes()).toBe(true);
  // expect(gameboard.shipsArr.includes(battleShip)).toBe(true);
  // expect(gameboard.shipsArr.includes(cruiser)).toBe(true);
  // expect(gameboard.shipsArr.includes(submarine)).toBe(true);
  // expect(gameboard.shipsArr.includes(destroyer)).toBe(true);
});
