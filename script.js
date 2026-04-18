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

    const winnerMark = checkWinner();

    if (winnerMark) {
      console.log(
        `GAME OVER! The winner is ${activePlayer.name} (${winnerMark})`,
      );

      activePlayer = null;
      return;
    }

    if (!gameBoard.getBoard().includes("")) {
      console.log("It's a TIE!");
      activePlayer = null;
      return;
    }

    switchPlayer();
  };

  const checkWinner = () => {
    const board = gameBoard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Returns "X" or "O"
      }
    }
    return null;
  };

  return { playRound, gameStarter };
})();
