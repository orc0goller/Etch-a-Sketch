// ELEMENTS
const grid = document.querySelector(".grid");
const gridNodes = createGrid();

// EVENT LISTENERS
// Paints all squares that you touch with mouse
gridNodes.forEach((node) => node.addEventListener("mouseover", paintSquare));

// Creates grid
function createGrid(gridSize=16) {
    for (let column = 0; column < gridSize; column++) {
        for (let row = 0; row < gridSize; row++) {
            const square = document.createElement("div");
            square.style.cssText = "width:10px;height:10px;border: 1px solid black;";
            grid.appendChild(square);
        }
    }
    // Returns a nodeList of all squares in the grid
    return document.querySelectorAll(".grid > *");
}

// Paints a square
function paintSquare() {
    this.style.cssText += `background-color: black;`;
}