import Player from "./player";
import Ship from "./ship";

const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");
const infoContainer = document.querySelector(".info");
const info = document.querySelector(".battle-info");

const globalDragStorage = {
  strg: {},
  selectedShip: null,
  get dragData() {
    return this.strg;
  },
  set dragData(object) {
    this.strg = object;
  },

  get ship() {
    return this.selectedShip;
  },
  set ship(shipContainer) {
    this.selectedShip = shipContainer;
  },
};

document.addEventListener("keydown", (event) => {
  if (event.key === "R" || event.key === "r") {
    rotateOrientation();
  }
});

function rotateOrientation() {
  const draggingShip = globalDragStorage.ship;

  if (draggingShip == null) return;

  const currentOrientation = draggingShip.getAttribute("data-orien");

  const newOrientation = currentOrientation === "Y" ? "X" : "Y";

  draggingShip.setAttribute("data-orien", newOrientation);

  if (newOrientation === "X") {
    draggingShip.style.transform = "rotate(0deg)";
  } else {
    draggingShip.style.transform = "rotate(90deg)";
  }
}

let currentPlayer = "player";
let player = new Player("player");
let computer = new Player("computer");

export default function preGameScreen() {
  const preGameContainer = document.createElement("div");
  preGameContainer.className = "pre-game-container";

  renderPreGameBoard();
  const dragContainer = createDragContainer();
  const randomGeneratorBtn = createRandomGeneratorBtn();

  preGameContainer.appendChild(dragContainer);
  preGameContainer.appendChild(randomGeneratorBtn);
  infoContainer.appendChild(preGameContainer);

  info.textContent = "DRAG SHIP TO YOUR WATERS";
}

function createDragContainer() {
  const dragContainer = document.createElement("div");
  dragContainer.className = "drag-ships-container";

  const carrierContainer = document.createElement("div");
  carrierContainer.className = "carrier-container";
  carrierContainer.setAttribute("data-orien", "Y");
  carrierContainer.draggable = true;

  const battleShipContainer = document.createElement("div");
  battleShipContainer.className = "battleShip-container";
  battleShipContainer.setAttribute("data-orien", "Y");
  battleShipContainer.draggable = true;

  const cruiserContainer = document.createElement("div");
  cruiserContainer.className = "cruiser-container";
  cruiserContainer.setAttribute("data-orien", "Y");
  cruiserContainer.draggable = true;

  const submarineContainer = document.createElement("div");
  submarineContainer.className = "submarine-container";
  submarineContainer.setAttribute("data-orien", "Y");
  submarineContainer.draggable = true;

  const destroyerContainer = document.createElement("div");
  destroyerContainer.className = "destroyer-container";
  destroyerContainer.setAttribute("data-orien", "Y");
  destroyerContainer.draggable = true;

  createShipCells(carrierContainer, 5);
  createShipCells(battleShipContainer, 4);
  createShipCells(cruiserContainer, 3);
  createShipCells(submarineContainer, 3);
  createShipCells(destroyerContainer, 2);

  addDragStartEvent(carrierContainer, "carrier");
  addDragStartEvent(battleShipContainer, "battleShip");
  addDragStartEvent(cruiserContainer, "cruiser");
  addDragStartEvent(submarineContainer, "submarine");
  addDragStartEvent(destroyerContainer, "destroyer");

  dragContainer.appendChild(carrierContainer);
  dragContainer.appendChild(battleShipContainer);
  dragContainer.appendChild(cruiserContainer);
  dragContainer.appendChild(submarineContainer);
  dragContainer.appendChild(destroyerContainer);

  return dragContainer;
}

function addDragStartEvent(container, name) {
  container.addEventListener("dragstart", (event) => {
    const parent = event.target;
    const tempObj = {
      nm: name,
      lngth: parent.childElementCount,
      orien: parent.getAttribute("data-orien"),
    };

    globalDragStorage.dragData = tempObj;
    globalDragStorage.ship = parent;
  });
}

function createShipCells(container, length) {
  for (let i = 0; i < length; i++) {
    const shipCell = document.createElement("div");
    shipCell.className = "drag-ship-cell";
    container.appendChild(shipCell);
  }
}

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

function gameStart() {
  const preGameContainer = document.querySelector(".pre-game-container");
  preGameContainer.remove();
  // player.playerBoard.placeShipsRandomly();
  computer.playerBoard.placeShipsRandomly();

  renderTurnBoards();
  showInfoText();
}

function showInfoText() {
  if (currentPlayer === "player") {
    info.textContent = "YOUR TURN";
  } else if (currentPlayer === "computer") {
    info.textContent = "COMPUTER'S TURN";
  }
}

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

function disableClicks() {
  const computerCells = document.querySelectorAll(".computer-cell");
  computerCells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
}

function renderPreGameBoard() {
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

function addDragOverEvent(cellDiv) {
  cellDiv.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
}

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

    // const dragContainer = document.querySelector(".drag-ships-container");
    // const drag = dragContainer.childElementCount;

    if (isShipPlaced === 0) {
      return;
    } else if (isShipPlaced === 1) {
      const shipDragged = document.querySelector(`.${tempObj.nm}-container`);
      shipDragged.remove();
      renderPreGameBoard();
    }

    globalDragStorage.ship = null;
  });
}

function renderTurnBoards() {
  const playerArray = player.playerBoard.board;
  const computerArray = computer.playerBoard.board;

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

function createCell(cell, user) {
  const cellDiv = document.createElement("div");
  cellDiv.setAttribute("data-coord", `[${cell.coordinate}]`);

  if (user === "computer") {
    cellDiv.className = "computer-cell";
    return cellDiv;
  } else if (user === "player") {
    cellDiv.className = "player-cell";
    return cellDiv;
  }
}

function addComputerCellEvent(cellDiv, cell) {
  cellDiv.classList.add("clickable");
  cellDiv.addEventListener("click", () => {
    playTurn(cell);
  });
}

function playTurn(cell = null) {
  if (currentPlayer === "player") {
    player.attackEnemy(computer, cell.coordinate);
    changeTurn();
  } else if (currentPlayer === "computer") {
    computer.attackEnemy(player);
    changeTurn();
  }
}

function renderCell(cell, cellDiv, user) {
  if (user === "player") {
    if (cell.occupied !== null && cell.hitStatus === false) {
      cellDiv.classList.add("player-ship");
    } else if (cell.occupied !== null && cell.occupied.isSunk()) {
      cellDiv.classList.add("player-ship-sunk");
      cellDiv.textContent = "☠︎︎";
    } else if (cell.occupied !== null && cell.hitStatus === true) {
      cellDiv.classList.add("player-ship-hit");
      cellDiv.textContent = "🔥";
    } else if (cell.occupied === null && cell.hitStatus === true) {
      cellDiv.classList.add("player-miss-hit");
      cellDiv.textContent = "〰️";
    }
  }
  if (user === "computer") {
    if (cell.occupied !== null && cell.occupied.isSunk()) {
      cellDiv.classList.add("computer-ship-sunk");
      cellDiv.textContent = "☠︎︎";
    } else if (cell.occupied !== null && cell.hitStatus === true) {
      cellDiv.classList.add("computer-ship-hit");
      cellDiv.textContent = "🔥";
    } else if (cell.occupied === null && cell.hitStatus === true) {
      cellDiv.classList.add("computer-miss-hit");
      cellDiv.textContent = "〰️";
    }
  }
}

function deleteChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
