
function drawMenu(){
    
    // draw outline
    drawMenuRect(menuUiRect)
    
    // draw buttons
    var buttonSet = (gameState == GameState.StartMenu ? startMenuButtons : pauseMenuButtons )
    for( var i = 0 ; i < buttonSet.length ; i++ ){
        drawMenuButton(buttonSet[i])
    }
    
}

function drawMenuButton(btn){
    var r = btn.rect
    var fillStyle = (btn.hovered ? 'white' : 'gray')
    drawMenuRect(r,fillStyle)
    
    ctx.textAlign = "center";
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(btn.label, r[0]+r[2]/2, r[1]+r[3]-5);
}

function drawMenuRect(r,fillStyle="gray"){
    
    ctx.fillStyle = fillStyle;
    ctx.fillRect(r[0],r[1],r[2],r[3]);
    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(r[0],r[1],r[2],r[3]);
}