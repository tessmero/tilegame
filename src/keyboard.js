function keyDown(event) {
  keys[event.keyCode] = true;
  var k = event.keyCode;
  
  // Check if a number key is pressed (49-57 corresponds to keys 1-9)
  if (k >= 49 && k <= 57) {
    selectedToolbarSlotIndex = k - 49;
  }
  else if (k == 48 ) { // 0 key
    selectedToolbarSlotIndex = 9;
  }
  
  // r key: cycle directions
  else if (k == 82 ) {
    selectedDirectionIndex = 
        (selectedDirectionIndex+1)%allDirections.length;
  }
  
  // escape
  else if ( k == 27 ){
      
    if( gameState == GameState.PauseMenu ){
        gameState = GameState.Playing
        
    } else if ( gameState == GameState.Playing ){
        gameState = GameState.PauseMenu
    }
  }
  
}

function keyUp(event) {
  delete keys[event.keyCode];
}