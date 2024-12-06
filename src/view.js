const playerContainer = document.querySelector(".player-container");
const computerContainer = document.querySelector(".computer-container");
const info = document.querySelector(".info");

//create two boards for player and computer
// Each board have 100 cell as div and each div
// have data-coord as [x,y].

//Before the game starts, player can drag and drop
//ships on player's board or place randomly(randomFn)
//    Carrier - 5
//    BattleShip - 4
//    Cruiser - 3
//    Submarine - 3
//    Destroyer - 2

//Before game starts, computer's board is fully empty
//and can't be clicked

//After game starts, Computer's board is filled with ships
//at random(randomFn)

//Player can click computer's board(P-turn)
// -miss
// -hit

//Computer click player's board(C-turn)(function call)
// -miss
// -hit

//When one board's allShipsAreSunk() is true, end the game
// declare other as winner.
