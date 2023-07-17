const grid = document.querySelector(".grid");


// Creates grid
function createGrid(gridSize=16) {
    for (let column = 0; column < gridSize; column++) {
        for (let row = 0; row < gridSize; row++) {
            const square = document.createElement("div");
            square.style.cssText = "width:10px;height:10px;border: 1px solid black;";
            grid.appendChild(square);
        }
    }
}

createGrid();