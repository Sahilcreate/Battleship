import Player from "./player";
import Ship from "./ship";
import {
  globalDragStorage,
  rotateOrientation,
  createDragContainer,
  disableClicks,
  addDragOverEvent,
  createCell,
  renderCell,
  deleteChildren,
} from "./view-util";

let currentPlayer = "player";
let player = new Player("player");
let computer = new Player("computer");

const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");
const infoContainer = document.querySelector(".info");
const info = document.querySelector(".battle-info");

// Checks if key "R" is pressed to rotate draggable ships
document.addEventListener("keydown", (event) => {
  if (event.key === "R" || event.key === "r") {
    rotateOrientation();
  }
});

// Load Screen before game Start to let player drap their ships
// to their water
export default function preGameScreen() {
  const preGameContainer = document.createElement("div");
  preGameContainer.className = "pre-game-container";

  renderPreGameBoard();
  const dragContainer = createDragContainer();
  const randomGeneratorBtn = createRandomGeneratorBtn();

  preGameContainer.appendChild(dragContainer);
  preGameContainer.appendChild(randomGeneratorBtn);
  infoContainer.appendChild(preGameContainer);

  info.textContent = "DRAG SHIP TO YOUR WATERS. PRESS 'R' TO ROTATE.";
}

// Button to place ships randomly and start the game
function createRandomGeneratorBtn() {
  const btn = document.createElement("button");
  btn.className = "random-gen-btn";
  btn.classList.add("clickable");
  btn.textContent = "... click to place ships randomly";

  btn.addEventListener("click", () => {
    player = new Player("player");
    computer = new Player("computer");
    player.playerBoard.placeShipsRandomly();
    gameStart();
  });

  return btn;
}

// Start the game once
function gameStart() {
  const preGameContainer = document.querySelector(".pre-game-container");
  preGameContainer.remove();

  computer.playerBoard.placeShipsRandomly();

  renderTurnBoards();
  showInfoText();
}

// Handle change info text after each turn
function showInfoText() {
  if (currentPlayer === "player") {
    info.textContent = "YOUR TURN";
  } else if (currentPlayer === "computer") {
    info.textContent = "COMPUTER'S TURN";
  }
}

// Change turn after each move with help of global variable
function changeTurn() {
  if (isGameOver()) return;

  if (currentPlayer === "player") {
    currentPlayer = "computer";
    playTurn();
    renderTurnBoards();
    showInfoText();
  } else {
    currentPlayer = "player";
    renderTurnBoards();
    showInfoText();
  }
}

// Check if all ships in any board are sunk
// and end the game if yes
function isGameOver() {
  if (player.playerBoard.areAllShipsSunk()) {
    info.textContent = "OOPS! YOU LOST.";
    renderTurnBoards();
    disableClicks();
    return true;
  } else if (computer.playerBoard.areAllShipsSunk()) {
    info.textContent = "CONGRATULATIONS! YOU WON";
    renderTurnBoards();
    disableClicks();
    return true;
  }

  return false;
}

// render board before game start to show
// how ships are being placed
function renderPreGameBoard() {
  if (player.playerBoard.shipsArr.length === 5) {
    gameStart();
    return;
  }
  const playerArray = player.playerBoard.board;
  const computerArray = computer.playerBoard.board;

  deleteChildren(playerContainer);
  deleteChildren(computerContainer);

  playerArray.forEach((row) =>
    row.forEach((cell) => {
      const cellDiv = createCell(cell, "player");

      if (cell.occupied === null) {
        addDragOverEvent(cellDiv);
        addDropEvent(cellDiv);
      }

      playerContainer.append(cellDiv);
      renderCell(cell, cellDiv, "player");
    })
  );

  computerArray.forEach((row) =>
    row.forEach((cell) => {
      const cellDiv = createCell(cell, "computer");
      computerContainer.append(cellDiv);
      renderCell(cell, cellDiv, "computer");
    })
  );
}

// add an event in each cell of player board
// which allow player to drop their draggable ships
function addDropEvent(cellDiv) {
  cellDiv.addEventListener("drop", (event) => {
    event.preventDefault();
    const tempObj = globalDragStorage.dragData;
    const coordinate = JSON.parse(event.target.getAttribute("data-coord"));
    let isShipPlaced;

    if (tempObj.nm === "carrier") {
      const carrier = new Ship("Carrier", 5);
      isShipPlaced = player.playerBoard.placeTheShip(
        coordinate,
        tempObj.orien,
        carrier
      );
    } else if (tempObj.nm === "battleShip") {
      const battleShip = new Ship("BattleShip", 4);
      isShipPlaced = player.playerBoard.placeTheShip(
        coordinate,
        tempObj.orien,
        battleShip
      );
    } else if (tempObj.nm === "cruiser") {
      const cruiser = new Ship("Cruiser", 3);
      isShipPlaced = player.playerBoard.placeTheShip(
        coordinate,
        tempObj.orien,
        cruiser
      );
    } else if (tempObj.nm === "submarine") {
      const submarine = new Ship("Submarine", 3);
      isShipPlaced = player.playerBoard.placeTheShip(
        coordinate,
        tempObj.orien,
        submarine
      );
    } else if (tempObj.nm === "destroyer") {
      const destroyer = new Ship("Destroyer", 2);
      isShipPlaced = player.playerBoard.placeTheShip(
        coordinate,
        tempObj.orien,
        destroyer
      );
    }

    // check if ship is placed in the board
    // if yes then delete that ship from
    // draggable ships
    if (isShipPlaced === 0) {
      return;
    } else if (isShipPlaced === 1) {
      const shipDragged = document.querySelector(`.${tempObj.nm}-container`);
      shipDragged.remove();
      renderPreGameBoard();
    }
  });
}

// after game starts, render board after each turn
function renderTurnBoards() {
  const playerArray = player.playerBoard.board;
  const computerArray = computer.playerBoard.board;

  // clear both boards
  deleteChildren(playerContainer);
  deleteChildren(computerContainer);

  playerArray.forEach((row) =>
    row.forEach((cell) => {
      const cellDiv = createCell(cell, "player");
      playerContainer.append(cellDiv);
      renderCell(cell, cellDiv, "player");
    })
  );
  computerArray.forEach((row) =>
    row.forEach((cell) => {
      const cellDiv = createCell(cell, "computer");
      if (cell.hitStatus === false) {
        addComputerCellEvent(cellDiv, cell);
      }
      computerContainer.append(cellDiv);
      renderCell(cell, cellDiv, "computer");
    })
  );
}

// add event that allows player to click on computer
// board cell and attack
function addComputerCellEvent(cellDiv, cell) {
  cellDiv.classList.add("clickable");
  cellDiv.addEventListener("click", () => {
    playTurn(cell);
  });
}

// actually handles attacking of both player
// and cell. Calls change turn after each attack
function playTurn(cell = null) {
  if (currentPlayer === "player") {
    player.attackEnemy(computer, cell.coordinate);
    changeTurn();
  } else if (currentPlayer === "computer") {
    computer.attackEnemy(player);
    changeTurn();
  }
}
