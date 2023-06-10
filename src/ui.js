// handle ui mouse interaction based on
// global mouse vars in src/globals.js

var toolbarUiRect = [
    toolbarX,
    toolbarY,
    toolbarThickness*toolbarSlotCount,
    toolbarThickness
]

function mouseInRect(xywh){
    var [x,y,w,h] = xywh
    return (canvasMouseX>=x) 
        && (canvasMouseX<=x+w) 
        && (canvasMouseY>=y) 
        && (canvasMouseY<=y+h)
}

// update ui elements to reflect mouse hovering
// called in /src/mouse.js : updateMousePos
function uiHovered(){
    hoverToolbar();
    return toolbarHovered;
}

function hoverToolbar(){
    if( mouseInRect(toolbarUiRect) ){
        toolbarHovered = true;
        hoveredToolbarSlotIndex = Math.floor((canvasMouseX-toolbarX)/toolbarThickness)
    } else {
        toolbarHovered = false;
        hoveredToolbarSlotIndex = null;
    }
}

// check if ui element was clicked
// if so, trigger the action adn return true
// called in /src/mouse.js : leftClick
function uiClicked(){
    if( toolbarHovered ){
        selectedToolbarSlotIndex = hoveredToolbarSlotIndex;
        
        return true
    }
    
    return false
}