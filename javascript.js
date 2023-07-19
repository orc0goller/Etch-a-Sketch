const grid = document.querySelector(".grid");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#sliderValue");

const GRID_DIMENSIONS = grid.clientWidth;
let isMouseDown = false;

// Create initial grid
populateGrid();

slider.addEventListener("change", createGrid);
slider.addEventListener("input", updateSliderValue);
document.body.addEventListener("mousedown", () => isMouseDown = true);
document.body.addEventListener("mouseup", () => isMouseDown = false);
grid.addEventListener("mousedown", paintNode)

// Fill grid with divs
function populateGrid(gridSize=16) {
    let squaresInGrid = gridSize**2;
    let squareDimension = GRID_DIMENSIONS / gridSize;

    for (let squareNumber = 0; squareNumber < squaresInGrid; squareNumber++) {
        const square = document.createElement("div");
        square.style.cssText = `width:${squareDimension}px;height:${squareDimension}px;border-top: 1px solid black;border-left: 1px solid black;`;
        grid.appendChild(square);
    }
    // Adds eventlisteners to the divs
    let gridNodes = document.querySelectorAll(".grid > *");
    gridNodes.forEach((node) => node.addEventListener("mouseenter", paintNode));
}

function eraseGrid() {
    while (grid.firstChild) grid.removeChild(grid.lastChild);
}

// Gets user input for the grid dimensions (e.g. 16 for a 16x16 grid)
function getGridSize() {
    // let gridSize = parseInt(prompt("Enter grid size (1-100)"));// || (gridSize > 101) || (typeof gridSize === "number"));
    let gridSize = slider.value;
    if (gridSize < 1 || gridSize > 100 || !gridSize) {
        gridSize = 16;
    }
    return gridSize;
}

// Paints a square
function paintNode(event) {
    if (isMouseDown || event.type === "mousedown") {
        // this.style.cssText += `background-color: black;`;
        event.target.style.cssText += `background-color: black;`;
        // event.stopPropagation();
    }
}

function updateSliderValue() {
    sliderValue.textContent = slider.value;
}


function createGrid() {
    let gridSize = getGridSize();       
    eraseGrid();                        
    populateGrid(gridSize);             
}