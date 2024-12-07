# BattleShip Notes

## 2024-12-05

- I set up the environment for working with Jest and Webpack(thanks the template option!).
- Set up different classes for `ship` and `gameboard` with properties and methods.
- Set up different tests for testing methods and pure functions. I ran across some problems during the tests, specifically concerning mocks. If i am testing a method, which calls a standalone function, i wasn't able to mock the standalone function but ran the test anyway. Don't know if they can be called `unit tests` anyone or will be counted in `integrated tests`
- instead of `missedAttacks`, what i did was to store an object in each cell which can sufficiently describe any state of a cell

```
{
    occupied: null or ship,
    hitStatus: true or false,
}
```

## 2024-12-06

- added `Player` logic for both computer and user
- wrote pseudo-code for gameflow to give me a better direction
- configured webpack to use css, png, svg, fonts, etc. and set a template Html file for gitHub pages
- wrote some more tests for gameboard and player
- when i was writing `areAllShipsSunk()`, at first I thought of traversing the 2D array and check if `(cell.occupied !== null && cell.hitStatus === true) || cell.occupied === null` return true. If it did, that means all ships were sunk and game should end. But then i thought that i have to check this condition for every `receiveAttack` call, which although works but wasn't in no way efficient. Another method was to use pre-established `isSunk()` function of `instanceOf Ship()` class. whenever a valid ship is placed in `placeTheShip()`, i push it in `shipsArr` property of `instanceOf Gameboard()` and traversing this array, check if every ship `isSunk()` or not.

## 2024-12-07

Didn't add much today. Just finalized the design and tried working on it. Ran into some problem of adding event listener, like should i `data-coord` as an attribute for each `cellDiv` or this can be done by passing `Player` as a whole to function.
