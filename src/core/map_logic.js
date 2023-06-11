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
    updateBlocksThatMayBeEffected(x,y)
    newBlock.justPlaced();
}

function clearMap(){
    for( var x = 0 ; x < mapWidth ; x++ ){
        for( var y = 0 ; y < mapHeight ; y++ ){
            tileMap[x][y] = null
        }
    }
}

// destroy a single block
// called in src/mouse.js : rightClick
// called in src/blocks/wall.js : hitByLaser
function attemptDeleteBlock(x,y){
    tileMap[x][y] = null
    updateBlocksThatMayBeEffected(x,y)
}

// called after block x,y is placed/removed/modified
function updateBlocksThatMayBeEffected(x,y){
    for( var i = 0 ; i < allDirections.length ; i++ ){
        var td = getTargetAndDistance( x,y,allDirections[i] )
        var solidTarget = td[0]
        if( solidTarget ){
            solidTarget.mapUpdated()
        }
        var passedOver = td[2]
        for( var j = 0 ; j < passedOver.length ; j++ ){
            passedOver[j].mapUpdated()
        }
    }
}

// plan a straight path to a solid block
// called in src/blocks/shooter.js
function getTargetAndDistance( x,y,dir ) {
    
    var tx = x
    var ty = y
    var dist = 0
    var passedThrough = []
    
    while( true ){
        tx += dir.dx
        ty += dir.dy
        
        if( !isTileOnMap(tx,ty) ) {
            return [null,dist,passedThrough] // no target
        }
        
        var tileObject = tileMap[tx][ty];
        if( tileObject ){
            if( tileObject.isSolid() ) {
                return [tileObject,dist,passedThrough] // found target
            } else {
                passedThrough.push(tileObject) // passed through object
            }
        }
        
        dist += tileSize;
    }
}