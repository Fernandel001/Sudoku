window.onload = function(){
    setTimeout(GameStart, 1000);
    ButtonPut();
    solveSudoku(board);
}

const board = [
    ["5", "3", ".", "6", "7", "8", "9", "1", "2"],
    ["6", "7", "2", "1", "9", "5", ".", "4", "8"],
    ["1", "9", "8", "3", ".", "2", "5", "6", "7"],
    [".", "5", "9", "7", "6", "1", "4", "2", "."],
    ["4", "2", "6", "8", ".", "3", "7", "9", "1"],
    ["7", "1", "3", ".", "2", "4", "8", ".", "6"],
    ["9", "6", "1", "5", ".", "7", "2", "8", "4"],
    ["2", "8", ".", "4", "1", "9", "6", "3", "5"],
    ["3", "4", "5", "2", "8", "6", "1", ".", "9"]
];

const board2 = [
    ["5", "3", ".", "6", "7", "8", "9", "1", "2"],
    ["6", "7", "2", "1", "9", "5", ".", "4", "8"],
    ["1", "9", "8", "3", ".", "2", "5", "6", "7"],
    [".", "5", "9", "7", "6", "1", "4", "2", "."],
    ["4", "2", "6", "8", ".", "3", "7", "9", "1"],
    ["7", "1", "3", ".", "2", "4", "8", ".", "6"],
    ["9", "6", "1", "5", ".", "7", "2", "8", "4"],
    ["2", "8", ".", "4", "1", "9", "6", "3", "5"],
    ["3", "4", "5", "2", "8", "6", "1", ".", "9"]
];

const empty = '.';
let counterrors = 0;

function GameStart(){
    const error = document.querySelector('h2');
    const visibleboard = document.getElementById('board');

    for(let i = 0; i < 9; i++){
        let block = document.createElement('div');
        visibleboard.appendChild(block);

        for(let j = 0; j < 9; j++){
            let cell = document.createElement('div');
            cell.id = i.toString() + '-' + j.toString();
            block.appendChild(cell);
            cell.value = board[i][j];
            if(board2[i][j] != empty){
                cell.innerText = board2[i][j];
            }
            cell.addEventListener('click', PutButton);
            cell.addEventListener('click', checkSolution);
        }
    }
}

function ButtonPut(){
    const buttons = document.querySelector('.buttons');
    for(let i = 0; i < 9; i++){
        let number = document.createElement('div');
        number.id = i.toString();
        number.value = i + 1;
        number.textContent = i + 1;
        buttons.appendChild(number);
        number.addEventListener('click', SelectedButton);
    }
}

let valueforcell = empty;
const SelectedButton = function(){
    let lastSelectednumber = document.querySelector('.selected');
    if(lastSelectednumber){
        lastSelectednumber.classList.remove('selected');
    }
    this.classList.add('selected');
    valueforcell = this.innerText;
}

const PutButton = function(){
    if(valueforcell !== empty){
        this.innerText = valueforcell;
    } 
}

const checkSolution = function(){
    const error = document.querySelector('h2');
    if(this.value !== this.innerText && valueforcell !== empty){
        this.classList.add('red');
        counterrors -= 1;
        error.innerText = counterrors;
    } else if(this.value === this.innerText && valueforcell !== empty){
        counterrors += 1;
        this.classList.add('green');
        error.innerText = counterrors;
    }
}

function isValid(row, col, number, board){
    // check rows and columns
    for(let i = 0; i < 9; i++){
        if(board[row][i] === number || board[i][col] === number){
            return false;
        }
    }
    // check for block
    let startrow = Math.floor(row / 3) * 3;
    let startcol = Math.floor(col / 3) * 3;
    for(let i = startrow; i < startrow + 3; i++){
        for(let j = startcol; j < startcol + 3; j++){
            if(board[i][j] === number){
                return false;
            }
        }
    }
    return true;
}

const possiblenumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
function solveSudoku(board){
    let emptySpaces = [];
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] === empty){
                emptySpaces.push({row: i, col: j});
            }
        }
    }
    // recursive function
    function recurse(emptySpaceIndex){
        if(emptySpaceIndex >= emptySpaces.length){
            return true;
        }
        let {row, col} = emptySpaces[emptySpaceIndex];
        for(let i = 0; i < possiblenumbers.length; i++){
            let number = possiblenumbers[i];
            if(isValid(row, col, number, board)){
                board[row][col] = number;
                // The recursive call
                if(recurse(emptySpaceIndex + 1)){
                    return true;
                }
                // Backtracking logic
                board[row][col] = empty;
            }
        }
        return false;
    }
    recurse(0);
    return board;
}
