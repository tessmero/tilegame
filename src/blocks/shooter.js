

class Shooter extends DirectedBlock {  

      constructor(x,y,dir) {
        super(x,y,dir);
        this.cooldown = 0;
        this.target = null;
        this.targetDistance = null;
        this.bullets = [];
        this.bulletSpeed = .5;
      } 
  
    getCopy(x,y,dir){
        return new Shooter(x,y,dir);
    }
    
    draw(x,y,w,h){
        ctx.fillStyle = 'blue';
        ctx.fillRect(x,y,w,h);
        
        ctx.fillStyle='white';
        var a = 1.0 - Math.max(0,this.cooldown) / baseShooterCooldown;
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        drawDirectionIndicator(x,y,w,h,this.dir);
    }
    
    drawChildren(){
        // draw bullets
        ctx.fillStyle='blue';
        for( var i = 0 ; i < this.bullets.length ; i++ ){
            var bxy = this.getBulletPos(this.bullets[i])
            ctx.beginPath();
            ctx.arc(bxy[0],bxy[1], 10, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    getBulletPos(d){
        return [
            this.x*tileSize+tileSize/2 + (d+tileSize/2)*this.dir.dx,
            this.y*tileSize+tileSize/2 + (d+tileSize/2)*this.dir.dy
        ]
    }
    
    justPlaced() {
        this.cooldown = Math.random() * baseShooterCooldown;
        var td = getTargetAndDistance(this.x,this.y,this.dir);
        this.target = td[0];
        this.targetDistance = td[1];
    }
    
    mapUpdated() {
        
        var td = getTargetAndDistance(this.x,this.y,this.dir);
        if( td[0] != this.target ){
            this.target = td[0];
            this.targetDistance = td[1];
            for( var i = 0 ; i < this.bullets.length ; i++ ){
                if( this.bullets[i] >= this.targetDistance ){
                    this.bullets.splice(i,1)
                    i--;
                }
            }
        }
    }
    
    hitByBullet(){
        this.cooldown = Math.max( this.cooldown - bonusShooterCooldown, minShooterCooldown )
    }
    
    update(time_elapsed){
        if( (this.targetDistance != null) || (this.cooldown > 0) ){
            this.cooldown -= time_elapsed;
        }
        if( this.cooldown <= 0 ){
            this.shoot()
        }
        
        // advance bullets
        if( this.targetDistance != null ){
            var d = time_elapsed * this.bulletSpeed
            for( var i = 0 ; i < this.bullets.length ; i++ ){
                
                var bxy = this.getBulletPos(this.bullets[i])
                var oldtilex = Math.floor(bxy[0]/tileSize)
                var oldtiley = Math.floor(bxy[1]/tileSize)
                this.bullets[i] += d;
                
                var bxy = this.getBulletPos(this.bullets[i])
                var tilex = Math.floor(bxy[0]/tileSize)
                var tiley = Math.floor(bxy[1]/tileSize)
                
                if( (oldtilex!=tilex) || (oldtiley!=tiley) ){
                    if( isTileOnMap(tilex,tiley) ){
                        var block = tileMap[tilex][tiley] 
                        if( block ){
                            block.hitByBullet();
                        }
                    }
                }
                
                if( this.bullets[i] >= this.targetDistance ){
                    if( this.target ){
                        this.target.hitByBullet();
                    }
                    this.bullets.splice(i,1)
                    i--;
                }
            }
        }
    }
    
    shoot(){
        if( this.targetDistance == null ){
            return
        }
        this.bullets.push(0)
        this.cooldown += baseShooterCooldown
    }
}