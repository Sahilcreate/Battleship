// storage for information about currently dragged ship
const globalDragStorage = {
  strg: {},
  get dragData() {
    return this.strg;
  },
  set dragData(object) {
    this.strg = object;
  },
};

// change attribute to show rotation of draggable ships
function rotateOrientation() {
  const shipsContainer = document.querySelector(".drag-ships-container");
  const currentOrientation = shipsContainer.getAttribute("data-direction");

  const orientationElements = document.querySelectorAll(
    `[data-orien=${currentOrientation}]`
  );

  let newOrientation = currentOrientation === "X" ? "Y" : "X";

  shipsContainer.setAttribute("data-direction", `${newOrientation}`);
  orientationElements.forEach((el) => {
    el.setAttribute("data-orien", `${newOrientation}`);
  });
}

// create container that house draggable ships
// along with each ships
function createDragContainer() {
  const dragContainer = document.createElement("div");
  dragContainer.className = "drag-ships-container";
  dragContainer.setAttribute("data-direction", "Y");

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

// add event listener to ship that make them draggable.
// also set information of draggable ship in
// globalDragStorage
function addDragStartEvent(container, name) {
  container.addEventListener("dragstart", (event) => {
    const parent = event.target;
    const tempObj = {
      nm: name,
      lngth: parent.childElementCount,
      orien: parent.getAttribute("data-orien"),
    };

    globalDragStorage.dragData = tempObj;
  });
}

// create individual cell of draggable ship
function createShipCells(container, length) {
  for (let i = 0; i < length; i++) {
    const shipCell = document.createElement("div");
    shipCell.className = "drag-ship-cell";
    container.appendChild(shipCell);
  }
}

// after game ends, disable clicks on computer board
function disableClicks() {
  const computerCells = document.querySelectorAll(".computer-cell");
  computerCells.forEach((cell) => cell.replaceWith(cell.cloneNode(true)));
}

// prevent default behaivour of 'dragover' event
function addDragOverEvent(cellDiv) {
  cellDiv.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
}

//create individual cell for player and computer board
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

// handle class naming of individual cell of player and computer board
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

// delete all child nodes
function deleteChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export {
  globalDragStorage,
  rotateOrientation,
  createDragContainer,
  disableClicks,
  addDragOverEvent,
  createCell,
  renderCell,
  deleteChildren,
};
