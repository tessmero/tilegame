function updateMousePos(event){
    
    if( event ){
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;
        canvasMouseX = (event.clientX - rect.left) * scaleX;
        canvasMouseY = (event.clientY - rect.top) * scaleY;
    }
    
    virtualMouseX = canvasMouseX / (tileSize * zoomLevel) + cameraX;
    virtualMouseY = canvasMouseY / (tileSize * zoomLevel) + cameraY;
    mouseTileX = Math.floor(virtualMouseX);
    mouseTileY = Math.floor(virtualMouseY);
    
    // hover over ui element 
    if( uiHovered() ){
        hoveredBlock = null
        
    //hover over block on map
    } else if( isTileOnMap(mouseTileX,mouseTileY) ) {
        hoveredBlock = tileMap[mouseTileX][mouseTileY]
        
    } else {
        hoveredBlock = null
    }
    
    
}

function mouseMove(event) {
    updateMousePos(event)
}

function mouseWheel(event){
    if( gameState != GameState.Playing ){
        return
    }
    
    var oldZoomLevel = zoomLevel;
    
    var delta = Math.sign(event.deltaY) * zoomSpeed;
    zoomLevel -= delta;
    if (zoomLevel < minZoom) zoomLevel = minZoom;

    // keep virtual mouse position consistent
    cameraX += canvasMouseX * (1 / (tileSize * oldZoomLevel) - 1 / (tileSize * zoomLevel))
    cameraY += canvasMouseY * (1 / (tileSize * oldZoomLevel) - 1 / (tileSize * zoomLevel))
    
    event.preventDefault();
}

function leftClick(event){
    updateMousePos(event)
    
    // click ui element 
    if( uiClicked() ){
        return;
    }
    
    // place block
    else if( (gameState == GameState.Playing) 
            && (selectedToolbarSlotIndex < toolbarBlocks.length) ){
            
        attemptPlaceBlock(
            mouseTileX,mouseTileY,
            allDirections[selectedDirectionIndex],
            toolbarBlocks[selectedToolbarSlotIndex]
        )
    }
}

function rightClick(event){
    updateMousePos(event)
    
    attemptDeleteBlock(
        mouseTileX,mouseTileY
    )
        
    event.preventDefault();
}