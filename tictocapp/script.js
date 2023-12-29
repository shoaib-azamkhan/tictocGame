const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const cells = [];
let currentPlayer = 'X';
let winner = null;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    if (cells.every(cell => cell !== null)) {
        return 'draw';
    }

    return null;
}

function handleClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (cells[index] || winner) {
        return;
    }

    cells[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    winner = checkWinner();

    if (winner === 'X' || winner === 'O') {
        message.textContent = `Player ${winner} wins!`;
    } else if (winner === 'draw') {
        message.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function restartGame() {
    cells.length = 0;
    currentPlayer = 'X';
    winner = null;
    message.textContent = '';
    board.innerHTML = '';
    createBoard();
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(null);
    }
}

createBoard();
restartButton.addEventListener('click', restartGame);
