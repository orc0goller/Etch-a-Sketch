const grid = document.querySelector(".grid");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
const colorPicker = document.querySelector("#color-picker");
const colorModeButtons = document.querySelectorAll(".settings button");

const GRID_DIMENSIONS = grid.clientWidth;
const colorModes = {isNormal: true, isRainbow: false, isEraser: false, isDarken: false};

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

// Selects coloring mode based on what button was selected
function setColorMode(event) {
    Object.keys(colorModes).forEach(key => colorModes[key] = false);

    colorModeButtons.forEach(button => button.classList.remove("settings--selected"));
    colorPicker.classList.remove("settings--selected");
    let mode = event.target.id;
    switch (mode) {
        case "normal-btn":
            colorModes.isNormal = true;
            colorPicker.classList.add("settings--selected");
            break;
        case "rainbow-btn":
            colorModes.isRainbow = true;
            break;
        case "eraser-btn":
            colorModes.isEraser = true;
            break;
        case "darken-btn":
            colorModes.isDarken = true;
            break;
    }
    event.target.classList.add("settings--selected");  
}

// Paints a square based on what color mode is selected
function paintNode(event) {
    // Selected color
    if (colorModes.isNormal){
        if (isMouseDown || (event.type === "mousedown" && event.target !== grid)) { // Only paint if holding down mouse button
            event.target.style.cssText += `background-color: ${color};`;
        }
    }
    // Random color
    else if (colorModes.isRainbow) {
        if (isMouseDown || (event.type === "mousedown" && event.target !== grid)) { // Only paint if holding down mouse button
            event.target.style.cssText += `background-color: rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()});`;
        }
    }
    // Eraser
    else if (colorModes.isEraser) {
        if (isMouseDown || (event.type === "mousedown" && event.target !== grid)) { // Only paint if holding down mouse button
            event.target.style.cssText += `background-color: white;`;
        }
    }
    // Darken
    else if (colorModes.isDarken) {
        if (isMouseDown || (event.type === "mousedown" && event.target !== grid)) { // Only paint if holding down mouse button
            let rgb = [];
            rgb = getBackgroundColors(event.target);
            rgb = darkenColors(rgb);
            event.target.style.cssText += `background-color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});`;
        }
    }
    
}

function getBackgroundColors(node) {
    let r = node.style.backgroundColor.match(/\d+/g)[0];
    let g = node.style.backgroundColor.match(/\d+/g)[1];
    let b = node.style.backgroundColor.match(/\d+/g)[2];
    return [r, g, b];
}

function darkenColors(rgb=[]) {
    for(let i = 0; i < 3; i++) {
        rgb[i] = Math.floor(rgb[i] * 0.9);
    }
    return rgb;
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
    gridNodes.forEach(node => node.style.backgroundColor = "rgb(255, 255, 255)");
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

function getRandomColorValue() {
    return Math.floor(Math.random() * 256);
}

function updateSliderValue() {
    sliderValue.textContent = slider.value + " x " + slider.value;
}

function createGrid() {
    let gridSize = getGridSize();       
    eraseGrid();                        
    populateGrid(gridSize);             
}