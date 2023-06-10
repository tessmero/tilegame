function isTileOnMap(tx,ty){
    return (tx >= 0 && tx < mapWidth && ty >= 0 && ty < mapHeight);
}

// player places a single block by left-clicking
// called in src/mouse.js : leftClick
function attemptPlaceBlock(x,y,dir,block){

    if( tileMap[x][y] ){
        return;
    }

    var newBlock = block.getCopy(x,y,dir);
    tileMap[x][y] = newBlock;
    
    // update existing blocks that may be effected
    for( var i = 0 ; i < allDirections.length ; i++ ){
        var td = getTargetAndDistance( x,y,allDirections[i] )
        if( td[0] ){
            td[0].mapUpdated()
        }
    }
    
    
    newBlock.justPlaced();

}

// destroy a single block
// called in src/mouse.js : rightClick
// called in src/blocks/wall.js : hitByLaser
function attemptDeleteBlock(x,y){
    tileMap[x][y] = null
    
    // update existing blocks that may be effected
    for( var i = 0 ; i < allDirections.length ; i++ ){
        var td = getTargetAndDistance( x,y,allDirections[i] )
        if( td[0] ){
            td[0].mapUpdated()
        }
    }
}

// plan a straight path to a solid block
// called in src/blocks/shooter.js
function getTargetAndDistance( x,y,dir ) {
    
    var tx = x
    var ty = y
    var dist = 0
    
    while( true ){
        tx += dir.dx
        ty += dir.dy
        
        if( !isTileOnMap(tx,ty) ) {
            return [null,dist] // no target
        }
        
        var tileObject = tileMap[tx][ty];
        if( tileObject && tileObject.isSolid() ) {
            return [tileObject,dist] // found target
        }
        
        dist += tileSize;
    }
}