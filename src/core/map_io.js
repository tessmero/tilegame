// import/export map strings


function exportTilemapToString(){
    
    // compile tile data
    var td = []
    for( var x = 0 ; x < mapWidth ; x++ ){
        td[x] = []
        for( var y = 0 ; y < mapHeight ; y++ ){
            if( tileMap[x][y] ){
                td[x][y] = tileMap[x][y].toString()
            } else {
                td[x][y] = ''
            }
        }
    }
    
    return LZString.compressToBase64(JSON.stringify(td))
}


function importTilemapFromString(s){
    td = JSON.parse(LZString.decompressFromBase64(s))
    
    // replace all map tiles
    var all_new_blocks = [];
    for( var x = 0 ; x < mapWidth ; x++ ){
        for( var y = 0 ; y < mapHeight ; y++ ){
            var newBlock = importTileFromString(td[x][y],x,y)
            tileMap[x][y] = newBlock
            if( newBlock != null ){
                all_new_blocks.push(newBlock)
            }
        }
    }
    
    // init all blocks on the map
    for( var i = 0 ; i < all_new_blocks.length ; i++ ){
        all_new_blocks[i].justPlaced();
    }
    
}

function importTileFromString(s,x,y){
    if( s == '' ){
        return null
    }
    
    var parts = s.split(',')
    var structor = getConstructor(parts[0])
    if( parts.length == 1 ){
        return new structor(x,y)
    }
    
    var dir = directionsByName[parts[1]];
    return new structor(x,y,dir)   
}

// poopy
function getConstructor(name){
    if( name == "Wall" ){
        return Wall
    }
    if( name == "Shooter" ){
        return Shooter
    }
    if( name == "Laser" ){
        return Laser
    }
    throw Error(`unrecognized block constructor name: ${name}`)
}