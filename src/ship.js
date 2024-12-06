export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hitCounter = 0;
  }

  //if not sunk, increase hitCounter
  hit() {
    if (!this.isSunk()) {
      this.hitCounter = this.hitCounter + 1;
    }
  }

  //check if ship is sunk
  isSunk() {
    return this.length === this.hitCounter;
  }
}
