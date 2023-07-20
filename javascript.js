const grid = document.querySelector(".grid");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#sliderValue");
const colorPicker = document.querySelector("#colorPicker");
const rainbowBtn = document.querySelector("#rainbowBtn");
const normalBtn = document.querySelector("#normalBtn");
const colorModeButtons = document.querySelectorAll(".settings button.color-mode");

const GRID_DIMENSIONS = grid.clientWidth;
const colorModes = {isNormal: true, isRainbow: false, isEraser: false};

let isMouseDown = false;
let color = "#000000";


// Create initial grid
populateGrid();

// SETTINGS EVENT LISTENERS 
// Creates new grid and updates slider value when the range element is changed
slider.addEventListener("change", createGrid);
slider.addEventListener("input", updateSliderValue);
// Listens if mouse is up or down
document.body.addEventListener("mousedown", () => isMouseDown = true);
document.body.addEventListener("mouseup", () => isMouseDown = false);
// Paints selected square
grid.addEventListener("mousedown", paintNode);
// Updates color when new color is selected
colorPicker.addEventListener("change", (event) => color = event.target.value);
// Selects coloring mode when one of the buttons is clicked
colorModeButtons.forEach((Btn) => Btn.addEventListener("click", setColorMode));


function setColorMode(event) {
    Object.keys(colorModes).forEach(key => colorModes[key] = false);

    
    let mode = event.target.id;
    switch (mode) {
        case "rainbowBtn":
            colorModes.isRainbow = true;
            break;
        case "normalBtn":
            colorModes.isNormal = true;
            break;
    }  
}

// Fill grid with divs
function populateGrid(gridSize=16) {
    let squaresInGrid = gridSize**2;
    let squareDimension = GRID_DIMENSIONS / gridSize;

    for (let squareNumber = 0; squareNumber < squaresInGrid; squareNumber++) {
        const square = document.createElement("div");
        square.style.cssText = `width:${squareDimension}px;height:${squareDimension}px;border-top: 1px solid black;border-left: 1px solid black;`;
        grid.appendChild(square);
    }
    // Paints squares if mouse pointer enters them
    let gridNodes = document.querySelectorAll(".grid > *");
    gridNodes.forEach((node) => node.addEventListener("mouseenter", paintNode));
}

// Removes squares in grid
function eraseGrid() {
    while (grid.firstChild) grid.removeChild(grid.lastChild);
}

// Gets user input for the grid dimensions (e.g. 16 for a 16x16 grid)
function getGridSize() {
    let gridSize = slider.value;
    if (gridSize < 1 || gridSize > 100 || !gridSize) {
        gridSize = 16;
    }
    return gridSize;
}

// Paints a square based on what color mode is selected
function paintNode(event) {
    // Selected color
    if (colorModes.isNormal){
        // Only paint if holding down mouse button
        if (isMouseDown || (event.type === "mousedown" && event.target !== grid)) {
            event.target.style.cssText += `background-color: ${color};`;
        }
    }
    // Random color
    else if (colorModes.isRainbow) {
        if (isMouseDown || (event.type === "mousedown" && event.target !== grid)) {
            event.target.style.cssText += `background-color: rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()});`;
        }
    }
}

function getRandomColorValue() {
    return Math.floor(Math.random() * 256);
}

function updateSliderValue() {
    sliderValue.textContent = slider.value;
}

function createGrid() {
    let gridSize = getGridSize();       
    eraseGrid();                        
    populateGrid(gridSize);             
}