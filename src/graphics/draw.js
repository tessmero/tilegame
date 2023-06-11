
// Render graphics
function draw(fps) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the camera transformation
    ctx.setTransform(zoomLevel, 0, 0, zoomLevel, -cameraX * tileSize * zoomLevel, -cameraY * tileSize * zoomLevel);

    // Draw the tile map
    for (var x = 0; x < mapWidth; x++) {
        for (var y = 0; y < mapHeight; y++) {
            ctx.lineWidth = .5;
            ctx.strokeStyle = "black";
            ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
            var tileObject = tileMap[x][y];
            if( tileObject ) {
                tileObject.draw(x * tileSize, y * tileSize, tileSize, tileSize)
            }
        }
    }

    // Draw tile object effects
    for (var x = 0; x < mapWidth; x++) {
        for (var y = 0; y < mapHeight; y++) {
            var tileObject = tileMap[x][y];
            if( tileObject ) {
                tileObject.drawChildren()
            }
        }
    }

    if( gameState == GameState.Playing ){
        if( !toolbarHovered ){
            if (isTileOnMap(mouseTileX,mouseTileY)) {
                
                // highlight hovered tile
                ctx.lineWidth = 3;
                ctx.strokeStyle = "black";
                ctx.strokeRect(mouseTileX * tileSize, mouseTileY * tileSize, tileSize, tileSize);

                // draw extra overlays about the hovered block
                if( hoveredBlock ){
                    
                }
                
                // draw block blueprint if player has a block selected
                else if( selectedToolbarSlotIndex < toolbarBlocks.length ){
                    block = toolbarBlocks[selectedToolbarSlotIndex];
                    
                    ctx.globalAlpha = 0.5;
                    block.draw(
                        mouseTileX * tileSize, 
                        mouseTileY * tileSize, 
                        tileSize, tileSize)
                    ctx.globalAlpha = 1;
                }
            } 
        }
    }

    // Reset the transformation
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // draw hud/menu
    if( gameState != GameState.StartMenu ){
        drawToolbar();
    } 
    if( gameState != GameState.Playing ){
        drawMenu();
    }

    // Draw FPS on the screen
    ctx.font = "25px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "black";
    var x = 10
    var y = 30
    ctx.fillText("FPS: " + fps, x, y);
    
    y += 30
    ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}