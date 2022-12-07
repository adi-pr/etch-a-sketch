const DEFAULT_COLOUR = '#333333'
const DEFAULT_MODE = 'colour'
const DEFAULT_SIZE = 16

let currentColour = DEFAULT_COLOUR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColour(newColour) {
    currentColour = newColour
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

const eraserBtn = document.getElementById('erase-btn')
const colourBtn = document.getElementById('colour')
const clearBtn = document.getElementById('clear-btn')
const sizeBtn = document.getElementById('grid-size-btn')
const sizeBtn16 = document.getElementById('grid-size-btn16')
const sizeBtn25 = document.getElementById('grid-size-btn25')
const sizeBtn30 = document.getElementById('grid-size-btn30')
const grid = document.getElementById('grid')

eraserBtn.onclick = () => setCurrentMode('eraser')
colourBtn.onclick = () => setCurrentMode('colour')
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
        gridElement.addEventListener('mouseover', changeColour)
        gridElement.addEventListener('mousedown', changeColour)
        grid.appendChild(gridElement)
    }
}

function changeColour(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'colour') {
        e.target.style.backgroundColor = '#000000'
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
    if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    } else if (currentMode === 'colour') {
        colourBtn.classList.remove('active')
    }

    if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    } else if (newMode === 'colour') {
        colourBtn.classList.add('active')
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }