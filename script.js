const gameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  const placeMark = (index, player) => {
    if (board[index] === "") board[index] = player;
  };

  const getBoard = () => [...board];

  return { placeMark, getBoard };
})();

const Player = (name, marker) => {
  return { name, marker };
};

const gameController = (function () {
  let player1 = Player("Youssef", "X");
  let player2 = Player("Ahmed", "O");
  let activePlayer;

  const gameStarter = (starter = player1) => {
    activePlayer = starter;
    console.log(`Game started ${activePlayer.name} goes first.`);
  };

  const switchPlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const playRound = (index) => {
    if (!activePlayer) {
      console.log("Please start the game first");
      return;
    }

    gameBoard.placeMark(index, activePlayer.marker);
    console.log(`${activePlayer.name} marked index ${index}`);

    switchPlayer();
  };

  return { playRound, gameStarter };
})();
