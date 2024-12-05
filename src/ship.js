export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hitCounter = 0;
  }

  hit() {
    if (!this.isSunk()) {
      this.hitCounter = this.hitCounter + 1;
    }
  }

  isSunk() {
    return this.length === this.hitCounter;
  }
}
