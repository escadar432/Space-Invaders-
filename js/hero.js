const LASER_SPEED = 80
var gHero =
    { pos: { i: 12, j: 5 }, isShoot: false }


var gLASER =
    { pos: { i: 12, j: 5 }, status: false }

var laserInterval

// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j] = {
        type: SKY,
        gameObject: HERO
    }
}

// Handle game keys
function onKeyDown(ev) {

    //if (!gGame.isOn) return
    if (ev.key === 'ArrowRight') moveHero(1)
    if (ev.key === 'ArrowLeft') moveHero(-1)
    else return
}
// Move the hero right (1) or left (-1)
function moveHero(dir) {

    var newCell = gHero.pos.j + dir
    if (newCell < 0 || newCell > BOARD_SIZE - 1) return

    var nextLocation = {
        i: gHero.pos.i,
        j: newCell
    }

    updateCellHero(nextLocation, HERO)
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {


    laserInterval = setInterval(blinkLaser, 1000)

}


// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {


    // var dir = gHero.pos.i--

    // gBoard[gHero.pos.i--][gHero.pos.j] = {
    //     type: SKY,
    //     gameObject: LASER
    // }

    // var laserDir = gHero.pos.i--
    // updateLaser(laserDir, gLASER)
}
