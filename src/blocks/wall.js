class Wall extends Block {
    getCopy(x,y,dir){
        return new Wall(x,y,dir);
    }
    
    draw(x,y,w,h){
        ctx.fillStyle = 'gray';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = .5;
        ctx.fillRect(x,y,w,h);
        
        // brick pattern
        var xs = [x,x+w/4,x+2*w/4,x+3*w/4,x+w]
        var ys = [y,y+h/4,y+2*h/4,y+3*h/4,y+h]
        var lines = [
           [[0,0],[4,0]],
           [[0,1],[4,1]],
           [[0,2],[4,2]],
           [[0,3],[4,3]],
           [[0,4],[4,4]],
           [[1,0],[1,1]],
           [[3,0],[3,1]],
           [[1,2],[1,3]],
           [[3,2],[3,3]],
           [[2,1],[2,2]],
           [[2,3],[2,4]],
        ]
        for( var i = 0 ; i < lines.length ; i++ ){
            
            ctx.beginPath()
            ctx.moveTo(xs[lines[i][0][0]],ys[lines[i][0][1]])
            ctx.lineTo(xs[lines[i][1][0]],ys[lines[i][1][1]])
            ctx.stroke()
        }
    }
}