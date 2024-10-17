const sudokuGrid = document.getElementById('sudoku-grid');

// Function to create the 9x9 Sudoku grid
function createGrid() {
    for (let row = 0; row < 9; row++) {
        let tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.id = `cell-${row}-${col}`;
            td.appendChild(input);
            tr.appendChild(td);
        }
        sudokuGrid.appendChild(tr);
    }
}

// Initialize the grid on page load
createGrid();

// Backtracking algorithm to solve the Sudoku puzzle
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }
    
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function getBoardFromInput() {
    let board = [];
    for (let row = 0; row < 9; row++) {
        let rowArray = [];
        for (let col = 0; col < 9; col++) {
            let cellValue = document.getElementById(`cell-${row}-${col}`).value;
            rowArray.push(cellValue === '' ? 0 : parseInt(cellValue));
        }
        board.push(rowArray);
    }
    return board;
}

function setBoardToInput(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.getElementById(`cell-${row}-${col}`).value = board[row][col] === 0 ? '' : board[row][col];
        }
    }
}

document.getElementById('solve-button').addEventListener('click', () => {
    let board = getBoardFromInput();
    if (solveSudoku(board)) {
        setBoardToInput(board);
    } else {
        alert("No solution exists for this Sudoku puzzle!");
    }
});

document.getElementById('reset-button').addEventListener('click', () => {
    sudokuGrid.innerHTML = '';
    createGrid();
});
