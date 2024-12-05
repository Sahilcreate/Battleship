import Ship from "../ship";

test("ship carrier", () => {
  let carrier = new Ship("Carrier", 5);
  carrier.hit();
  expect(carrier.hitCounter).toBe(1);
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  expect(carrier.isSunk).toBeTruthy();
});

test("ship destroyer", () => {
  let destroyer = new Ship("Destroyer", 2);
  expect(destroyer.length).toBe(2);
  destroyer.hit();
  destroyer.hit();
  expect(destroyer.hitCounter).toBe(2);
  expect(destroyer.isSunk).toBeTruthy();
});
