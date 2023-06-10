function keyDown(event) {
  keys[event.keyCode] = true;
  
  // Check if a number key is pressed (49-57 corresponds to keys 1-9)
  if (event.keyCode >= 49 && event.keyCode <= 57) {
    selectedToolbarSlotIndex = event.keyCode - 49;
  }
  else if (event.keyCode == 48 ) { // 0 key
    selectedToolbarSlotIndex = 9;
  }
  
  // r key
  else if (event.keyCode == 82 ) {
    selectedDirectionIndex = (selectedDirectionIndex+1)%allDirections.length;
  }
  
}

function keyUp(event) {
  delete keys[event.keyCode];
}