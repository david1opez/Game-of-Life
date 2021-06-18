/*
    By: David Lopez
    https://github.com/david1opez
*/

//RULES :
// 1. If there are 3 neigbhours it dies
// 2. If there are no neighbours it dies
// 3. If there are 2 neighbours it stays the same
// 4. f there is 1 neighbor it duplicates

var input_grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var elements = [
    [".a .a", ".a .b", ".a .c", ".a .d", ".a .e", ".a .f", ".a .g", ".a .h", ".a .i", ".a .j"],
    [".b .a", ".b .b", ".b .c", ".b .d", ".b .e", ".b .f", ".b .g", ".b .h", ".b .i", ".b .j"],
    [".c .a", ".c .b", ".c .c", ".c .d", ".c .e", ".c .f", ".c .g", ".c .h", ".c .i", ".c .j"],
    [".d .a", ".d .b", ".d .c", ".d .d", ".d .e", ".d .f", ".d .g", ".d .h", ".d .i", ".d .j"],
    [".e .a", ".e .b", ".e .c", ".e .d", ".e .e", ".e .f", ".e .g", ".e .h", ".e .i", ".e .j"],
    [".f .a", ".f .b", ".f .c", ".f .d", ".f .e", ".f .f", ".f .g", ".f .h", ".f .i", ".f .j"],
    [".g .a", ".g .b", ".g .c", ".g .d", ".g .e", ".g .f", ".g .g", ".g .h", ".g .i", ".g .j"],
    [".h .a", ".h .b", ".h .c", ".h .d", ".h .e", ".h .f", ".h .g", ".h .h", ".h .i", ".h .j"],
    [".i .a", ".i .b", ".i .c", ".i .d", ".i .e", ".i .f", ".i .g", ".i .h", ".i .i", ".i .j"],
    [".j .a", ".j .b", ".j .c", ".j .d", ".j .e", ".j .f", ".j .g", ".j .h", ".j .i", ".j .j"]
];

var gen = 0;

draw(input_grid);

document.querySelector("button").addEventListener("click", () => {start()})

function input(coords) {
    input_grid[coords[1]][coords[0]] = 1;

    draw(input_grid);
}

function draw(grid) {
    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 1) {
                document.querySelector(`${elements[x][y]}`).classList.add("black");
                document.querySelector(`${elements[x][y]}`).classList.remove("white");
            }
            else {
                document.querySelector(`${elements[x][y]}`).classList.add("white");
                document.querySelector(`${elements[x][y]}`).classList.remove("black");
            }
        }
    }
}

function evolve(grid) {
    draw(grid);

    if(checkPopulation(grid) != 0) {
        gen++;
    }
    
    document.querySelector("h3").style.display = `block`;
    document.querySelector("h3").innerHTML = `Current Population: ${checkPopulation(grid)}`;
    document.querySelector("h4").style.display = `inline`;
    document.querySelector("h4").innerHTML = `Gen ${gen}`;

    var neighbours = 0;
    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 1) {
                try {
                    if (grid[y - 1][x] == 1) {
                        neighbours++;
                    }
                }
                catch { }
                try {
                    if (grid[y + 1][x] == 1) {
                        neighbours++;
                    }
                }
                catch { }
                try {
                    if (grid[y][x - 1] == 1) {
                        neighbours++;
                    }
                }
                catch { }
                try {
                    if (grid[y][x + 1] == 1) {
                        neighbours++;
                    }
                }
                catch { }


                if (neighbours >= 2) {
                    grid[y][x] = 0;
                }
                else if(neighbours == 0) {
                    grid[y][x] = 0;
                }
                else if (neighbours == 1) {
                    var empty = [];
                    try {
                        if (grid[y - 1][x] == 0) {
                            empty.push([y - 1, x]);
                        }
                    }
                    catch (_e) { }
                    try {
                        if (grid[y + 1][x] == 0) {
                            empty.push([y + 1, x]);
                        }
                    }
                    catch (_f) { }
                    try {
                        if (grid[y][x - 1] == 0) {
                            empty.push([y, x - 1]);
                        }
                    }
                    catch (_g) { }
                    try {
                        if (grid[y][x + 1] == 0) {
                            empty.push([y, x + 1]);
                        }
                    }
                    catch (_h) { }
                    var randomCord = Math.floor(Math.random() * (empty.length - 1 - 0));
                    grid[empty[randomCord][0]][empty[randomCord][1]] = 1;
                }
                neighbours = 0;
            }
        }
    }
    setTimeout(function () { evolve(grid); }, 100);
}

function start() {
    document.querySelector(".grid").style.pointerEvents = "none";
    document.querySelector("button").style.display = "none";
    document.querySelector("h1").style.display = "block"
    document.querySelector("h2").innerHTML = `Starting Population: ${checkPopulation(input_grid)}`

    setTimeout(() => {document.querySelector("h1").innerHTML = "Starting in 4"}, 1000);
    setTimeout(() => {document.querySelector("h1").innerHTML = "Starting in 3"}, 2000);
    setTimeout(() => {document.querySelector("h1").innerHTML = "Starting in 2"}, 3000);
    setTimeout(() => {document.querySelector("h1").innerHTML = "Starting in 1"}, 4000);
    setTimeout(() => {
        document.querySelector("h1").style.display = "none";
        document.querySelector("h2").style.marginTop = "250px";
    }, 5000);
    setTimeout(() => {evolve(input_grid)}, 5000);
}

function checkPopulation(grid) {
    var population = 0;

    for (var y = 0; y < grid.length; y++) {
        for (var x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 1) {
                population++;
            }
        }
    }

    return population;
}
