import Player from "../player";

test("1.1. expect human to attack computer at [0,9] coordinate and update the cell hitStatus", () => {
  const human = new Player("Yuan");
  const computer = new Player("Computer");

  human.attackEnemy(computer, [0, 9]);
  expect(computer.playerBoard.board[0][9].hitStatus).toBe(true);
});

test("1.2. expect computer to attack human 100 times, all human cell to have hitStatus as true", () => {
  const human = new Player("Yuan");
  const computer = new Player("Computer");

  for (let i = 0; i <= 99; i++) {
    computer.attackEnemy(human);
  }

  expect(
    human.playerBoard.board.every((row) =>
      row.every((cell) => cell.hitStatus === true)
    )
  ).toBe(true);
});
