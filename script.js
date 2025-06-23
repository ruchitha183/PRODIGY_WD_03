const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const toggleAI = document.getElementById("toggleAI");

let cells = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;
let playVsAI = false;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener("click", handleClick);
    board.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] !== "" || gameOver) return;

  makeMove(index, currentPlayer);

  if (checkWinner(currentPlayer)) {
    status.textContent = `${currentPlayer} Player wins!!`;
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    status.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (playVsAI && currentPlayer === "O" && !gameOver) {
    setTimeout(aiMove, 300);
  }
}

function makeMove(index, player) {
  cells[index] = player;
  renderBoard();
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(i => cells[i] === player)
  );
}

function aiMove() {
  const emptyIndices = cells.map((val, idx) => val === "" ? idx : null).filter(idx => idx !== null);
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");

  if (checkWinner("O")) {
    status.textContent = "O Player wins!!";
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    status.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = "X";
}

function resetGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  status.textContent = "";
  renderBoard();
}

function toggleAIMode() {
  playVsAI = !playVsAI;
  toggleAI.textContent = `Play vs AI: ${playVsAI ? "ON" : "OFF"}`;
  resetGame();
}

resetBtn.addEventListener("click", resetGame);
toggleAI.addEventListener("click", toggleAIMode);

// Initial render
renderBoard();
