// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}
function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][dataj='${pos.j}']`)
}