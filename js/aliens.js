const ALIEN_SPEED = 500
var gIntervalAliens
// The following two variables represent the part of the matrix (some rows)
// that we should shift (left, right, and bottom)
// We need to update those when:
// (1) shifting down and (2) last alien was cleared from row
var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 3
var gIsAlienFreeze
var gAliens
var rightDir = true



function createAliens(board) {
    var row = ALIEN_ROW_COUNT - 1 // i =2 
    var col = BOARD_SIZE - ALIEN_ROW_LENGTH

    for (var i = row; i <= ALIEN_ROW_COUNT + 1; i++) {
        for (var j = col; j < BOARD_SIZE; j++) {
            board[i][j] = createCell(ALIEN)
        }
    }
    return board
}


function handleAlienHit() {
    updateEl(".alienCount", --gGame.alienCount)

    gScore += 10
    console.log(gScore);
    updateEl(".score", gScore)

    if (gGame.alienCount === 0) updateEl("victory", "Good Job!, Play Again")
    gameOver()

}
function shiftBoardRight(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = BOARD_SIZE - 1; j >= 0; j--) {
            var cell = board[i][j]

            if (cell.gameObject === HERO) gameOver()

            if (cell.gameObject === LASER) handleAlienHit({ i, j })

            if (cell.gameObject === ALIEN) {
                updateCell({ i, j: j + 1 },ALIEN)
                updateCell({ i, j: j })
            }
            checkIfEdgeRight(board)
        }
    }
}

function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            var currCell = board[i][j];

            if (currCell.gameObject === HERO) gameOver()

            if (currCell.gameObject === LASER) handleAlienHit({ i, j })

            if (currCell.gameObject === ALIEN) {
                updateCell({ i, j: j - 1 }, ALIEN)
                updateCell({ i, j: j })
            }

            // Check if the edge of the board has been reached on the left side
            checkIfEdgeLeft(board);
        }
    }
}

function shiftBoardDown(board, fromI, toI) {
}
// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
// function moveAliens() {
//     if (gIsAlienFreeze) return
//     clearInterval(gIntervalAliens)

// }
function checkIfEdgeRight(board) {
    for (var i = 0; i < BOARD_SIZE; i++) {
        var lastInd = BOARD_SIZE - 1 

        var gameObject = board[i][lastInd].gameObject

        if (gameObject === LASER) handleAlienHit({ i, j: lastInd })

        if (gameObject === ALIEN) {
            clearInterval(gIntervalAliens) 
            rightDir = !rightDir;
            gIntervalAliens = setInterval(shiftBoardDown, 1000, gBoard, gAliensTopRowIdx, gAliensBottomRowIdx) 
        }
    }
}

function moveAliens() {
    if (rightDir) {
        gIntervalAliens = setInterval(shiftBoardRight, 1000, gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    } else {
        gIntervalAliens = setInterval(shiftBoardLeft, 1000, gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    }
}


function checkIfEdgeLeft(board) {
    for (var i = 0; i < BOARD_SIZE; i++) {
        // Check if the leftmost cell in the current row contains a laser, if so, handle alien hit
        if (board[i][0].gameObject === LASER) handleAlienHit({ i, j: 0 })

        if (board[i][0].gameObject === ALIEN) {
            clearInterval(gIntervalAliens)
            rightDir = !rightDir
            gIntervalAliens = setInterval(shiftBoardDown, 1000, gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
        }
    }
}
