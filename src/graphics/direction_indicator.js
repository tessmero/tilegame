

// https://stackoverflow.com/a/36805543
function canvas_arrow(context, fromx, fromy, tox, toy, r){
	var x_center = tox;
	var y_center = toy;
	
	var angle;
	var x;
	var y;
	
	context.beginPath();
	
	angle = Math.atan2(toy-fromy,tox-fromx)
	x = r*Math.cos(angle) + x_center;
	y = r*Math.sin(angle) + y_center;

	context.moveTo(x, y);
	
	angle += (1/3)*(2*Math.PI)
	x = r*Math.cos(angle) + x_center;
	y = r*Math.sin(angle) + y_center;
	
	context.lineTo(x, y);
	
	angle += (1/3)*(2*Math.PI)
	x = r*Math.cos(angle) + x_center;
	y = r*Math.sin(angle) + y_center;
	
	context.lineTo(x, y);
	
	context.closePath();
	
	context.fill();
}

// draw blocky arrow that fills a tile
function drawDirectionIndicator(x,y,w,h,dir) {
    
    var hp = [x+w/2, y+h/2]
    var tp = [x+w/2 - dir.dx*w/2, y+h/2 - dir.dy*h/2]
    var r = Math.min(w,h)/4
    canvas_arrow(ctx, tp[0], tp[1], hp[0], hp[1], r);
}