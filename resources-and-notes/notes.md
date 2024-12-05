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
