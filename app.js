const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

const eraserBtn = document.getElementById('erase-btn')
const clearBtn = document.getElementById('clear-btn')
const sizeBtn = document.getElementById('grid-size-btn')
const sizeBtn16 = document.getElementById('grid-size-btn16')
const sizeBtn25 = document.getElementById('grid-size-btn25')
const sizeBtn30 = document.getElementById('grid-size-btn30')
const grid = document.getElementById('grid')

eraserBtn.onclick = () => setCurrentMode('eraser')
sizeBtn.onclick = () => setupGrid(10)
sizeBtn16.onclick = () => setupGrid(DEFAULT_SIZE)
sizeBtn25.onclick = () => setupGrid(25)
sizeBtn30.onclick = () => setupGrid(30)
clearBtn.onclick = () => reloadGrid()

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        grid.appendChild(gridElement)
    }
}

function activateButton(newMode) {
    if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }