// handle ui mouse interaction based on
// global mouse vars in src/globals.js

var toolbarUiRect = [
    toolbarX,
    toolbarY,
    toolbarThickness*toolbarSlotCount,
    toolbarThickness
]

var menuUiRect = [
    200,200,400,200
]

function playButton(){
    gameState = GameState.Playing
}

function quitButton(){
    gameState = GameState.StartMenu
}

function importButton(){
    var ta = document.getElementById("gameTextArea");
    importTilemapFromString( ta.value );
}

function exportButton(){
    var ta = document.getElementById("gameTextArea");
    ta.value = exportTilemapToString();
}

var menuClickAction = null;
var startMenuButtons = [
    {
        rect:[300,250,200,25],
        action:playButton,
        label: "Play",
        hovered: false,
    }
]

var pauseMenuButtons = [
    {
        rect:[300,250,200,25],
        action:playButton,
        label: "Continue",
        hovered: false,
    },
    {
        rect:[300,300,200,25],
        action:importButton,
        label: "Import Map",
        hovered: false,
    },
    {
        rect:[300,325,200,25],
        action:exportButton,
        label: "Export Map",
        hovered: false,
    },
    {
        rect:[300,350,200,25],
        action:quitButton,
        label: "Quit",
        hovered: false,
    }
]


function getCurrentMenuButtonSet(){
    if (gameState == GameState.StartMenu) {
        return startMenuButtons
    } else if (gameState == GameState.PauseMenu) {
        return pauseMenuButtons
    } else {
        return []
    }
}

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
    var hovered = false;
    if( hoverToolbar() ){ hovered = true}
    if( hoverMenu() ){ hovered = true}
    return hovered;
}

function hoverToolbar(){
    if( (gameState == GameState.Playing) && mouseInRect(toolbarUiRect) ){
        toolbarHovered = true;
        hoveredToolbarSlotIndex = Math.floor((canvasMouseX-toolbarX)/toolbarThickness)
    } else {
        toolbarHovered = false;
        hoveredToolbarSlotIndex = null;
    }
    return toolbarHovered;
}

function hoverMenu(){
    if( (gameState != GameState.Playing) && mouseInRect(menuUiRect) ){
        menuClickAction = null;
        var buttonSet = getCurrentMenuButtonSet();
        for( var i = 0 ; i < buttonSet.length ; i++ ){
            var btn = buttonSet[i]
            btn.hovered = mouseInRect(btn.rect)
            if( btn.hovered ){
                menuClickAction = btn.action;
            }
        }
        
        return true
    }
    
}

// check if ui element was clicked
// if so, trigger the action and return true
// called in /src/mouse.js : leftClick
function uiClicked(){
    
    if( (gameState == GameState.Playing) && toolbarHovered ){
        selectedToolbarSlotIndex = hoveredToolbarSlotIndex;
        //console.log('clicked consumed by toolbar ui')
        return true
        
    } else if ( (gameState != GameState.Playing) && menuClickAction){
        menuClickAction()
        //console.log('click consumed by menu ui')
        return true
    }
    
    //console.log('clicked passed through ui')
    return false
}