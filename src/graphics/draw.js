
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

    // highlight hovered tile
    if( !toolbarHovered ){
        if (isTileOnMap(mouseTileX,mouseTileY)) {
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

    // Reset the transformation
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    drawToolbar();

    // Draw FPS on the screen
    ctx.font = "25px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("FPS: " + fps, 10, 30);
    //ctx.fillText("canvas pos: " + canvasMouseX + ", " + canvasMouseY, 10, 60);
    //ctx.fillText("virtual pos: " + virtualMouseX + ", " + virtualMouseY, 10, 90);
}