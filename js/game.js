const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
const HERO = '♆'
const ALIEN = '👽'
const LASER = '⤊'
const FOOTER = `🔶`
const LIFE = `⚰️`
const SKY = 'SKY'
const GROUND = 'GROUND'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}


// Called when game loads
function init() {
    gBoard = createBoard()
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)
    shoot()

    //clearInterval(laserInterval)
}
// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens


function createBoard() {
    const board = []

    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell()
        }
    }
    return board
}
// Render the board as a <table> to the page
function renderBoard(board) {
    var eBoard = document.querySelector(".board")
    var strHTML = ''

    for (var i = 0; i < BOARD_SIZE; i++) {
        strHTML += `<tr>`

        for (var j = 0; j < BOARD_SIZE; j++) {
            var cell = board[i][j].gameObject ? board[i][j].gameObject : ''

            if (i === BOARD_SIZE - 1) strHTML += `<td class="cell ${i} ${j} footer"> ${FOOTER}</td>`
            else strHTML += `<td class="cell-${i}-${j}">${cell}</td>`
        }
        strHTML += `</tr>`
    }
    eBoard.innerHTML = strHTML
}
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

function updateCellHero(nextLocation, gameObject) {

    gBoard[gHero.pos.i][nextLocation.j].gameObject = gameObject
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = null

    gHero.pos.j = nextLocation.j

    var elCell = getElCell(nextLocation.i, nextLocation.j)
    elCell.innerHTML = gameObject || ''
    renderBoard(gBoard)
    console.log(gBoard)
}


function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
    }