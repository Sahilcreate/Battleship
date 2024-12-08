import Gameboard from "./gameboard";

export default class Player {
  constructor(name) {
    this.name = name;
    this.playerBoard = new Gameboard();
    this.previousAttack = new Set();
  }

  getRandomCoordinate() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.previousAttack.has(`${x},${y}`));
    this.previousAttack.add(`${x},${y}`);
    return [x, y];
  }

  attackEnemy(enemy, coordinate = null) {
    if (this.name === "computer") {
      coordinate = this.getRandomCoordinate();
    }
    enemy.playerBoard.receiveAttack(coordinate);
  }
}
