
function drawToolbar(){
    
    // Draw the toolbar
    var y = toolbarY;
    var w = toolbarThickness;
    var h = toolbarThickness;
    for ( var i = 0 ; i < toolbarSlotCount ; i++ ) {
        var x = toolbarX + i * toolbarThickness;
        drawToolbarSlot(x,y,w,h,i);
    }

    // highlight hovered slot
    if( hoveredToolbarSlotIndex != null ){
        var x = toolbarX + hoveredToolbarSlotIndex * toolbarThickness;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.strokeRect(x,y,w,h);
    }

    // Draw the selected slot expanded
    var x = toolbarX + selectedToolbarSlotIndex * toolbarThickness;
    var m = .1;
    x -= m*w;
    y -= m*h;
    w += 2*m*w;
    h += 2*m*h;
    drawToolbarSlot(x,y,w,h,selectedToolbarSlotIndex);
}

function drawToolbarSlot(x,y,w,h,i){
    // Draw toolbar item
    if( i < toolbarBlocks.length ){
        var block = toolbarBlocks[i]
        block.dir = allDirections[selectedDirectionIndex]
        block.draw(x,y,w,h)
    } else {
        ctx.fillStyle = "gray";
        ctx.fillRect(x,y,w,h);
    }
    
    // Draw toolbar slot outline
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(x,y,w,h);
}