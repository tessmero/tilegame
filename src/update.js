

// Update game logic
function update(elapsedTime) {
    
    updateMousePos()

    if( gameState == GameState.StartMenu ){

        // automatic camera movement
        startMenuSim.update(elapsedTime)

    } else if( gameState==GameState.Playing ){

        // Camera panning with WASD keys
        if (keys[87]) cameraY -= cameraSpeed * elapsedTime; // W key (up)
        if (keys[83]) cameraY += cameraSpeed * elapsedTime; // S key (down)
        if (keys[65]) cameraX -= cameraSpeed * elapsedTime; // A key (left)
        if (keys[68]) cameraX += cameraSpeed * elapsedTime; // D key (right)

    }
    
    if( gameState != GameState.Paused ){
        // Update simulation
        for (var x = 0; x < mapWidth; x++) {
            for (var y = 0; y < mapHeight; y++) {
                var tileObject = tileMap[x][y];
                if( tileObject ) {
                    tileObject.update(elapsedTime)
                }
          }
        }
    }
}