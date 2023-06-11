

// Initialize the game
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // position hud elements
    toolbarX = canvas.width/2 - toolbarThickness*toolbarSlotCount/2;
    toolbarY = canvas.height - toolbarThickness;

    // Add event listeners
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("wheel", mouseWheel);
    canvas.addEventListener("click", leftClick);
    canvas.addEventListener('contextmenu', rightClick);

    // Start the game loop
    requestAnimationFrame(gameLoop);
    }

    // Main game loop
    let secondsPassed;
    let oldTimeStamp;
    let fps;
    function gameLoop(timeStamp) {
    var msPassed = 0;
    if (oldTimeStamp) {
      msPassed = timeStamp - oldTimeStamp;
    }
    var secondsPassed = msPassed / 1000;
    oldTimeStamp = timeStamp;
    var fps = Math.round(1 / secondsPassed);


    msPassed = Math.min(msPassed,200)

    update(msPassed);
    draw(fps);

    requestAnimationFrame(gameLoop);
}


// Initialize the game
init();