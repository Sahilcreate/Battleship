import Player from "./player";
import renderTurnBoards from "./view";

export default function gameStart() {
  const player = new Player("player");
  const computer = new Player("computer");

  player.playerBoard.placeShipsRandomly();
  computer.playerBoard.placeShipsRandomly();

  renderTurnBoards(player, computer);
}
