const LASER_SPEED = 80
var gHero =
    { pos: { i: 12, j: 8 }, isShoot: false }


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
    if (!gGame.isOn) return
    if (ev.key === 'ArrowRight') moveHero(1)
    if (ev.key === 'ArrowLeft') moveHero(-1)
    if (ev.keyCode === 32) shoot()
    else return
}
// Move the hero right (1) or left (-1)
function moveHero(dir) {
    var newPos = gHero.pos.j + dir
    if (newPos < 0 || newPos > BOARD_SIZE - 1) return

    var nextPos = {
        i: gHero.pos.i,
        j: newPos
    }
    updateCell(nextPos, HERO)
    updateCell(gHero.pos)
    gHero.pos.j = newPos
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {

    if (gHero.isShoot) return
    gHero.isShoot = true
    var nextPos = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }
    laserInterval = setInterval(function () { blinkLaser(nextPos); }, 100)
}

function blinkLaser(nextPos) {
    --nextPos.i
    if (gBoard[nextPos.i][nextPos.j].gameObject) {
        updateCell(nextPos)
        clearInterval(laserInterval)
        handleAlienHit()
        return
    }

    updateCell(nextPos, LASER)

    if (nextPos.i <= 0) {
        updateCell(nextPos)
        clearInterval(laserInterval)
        gHero.isShoot = false
        return
    } else {
        setTimeout(function () {
            updateCell(nextPos)
        }, 1000)
    }
}

