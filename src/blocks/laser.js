

class Laser extends DirectedBlock {  

      constructor(x,y,dir) {
        super(x,y,dir);
        this.laserTime = 0;
        this.target = null;
        this.targetDistance = null;
        this.laserActiveLastUpdate = false;
      } 
  
    getCopy(x,y,dir){
        return new Laser(x,y,dir);
    }
    
    isSolid(){
        return false;
    }
    
    draw(x,y,w,h){
        ctx.fillStyle = 'red';
        ctx.fillRect(x,y,w,h);
        
        ctx.fillStyle='white';
        var a = 1.0 - Math.max(0,this.cooldown) / baseShooterCooldown;
        drawDirectionIndicator(x,y,w,h,this.dir);
        
    }
    
    drawChildren(){
        if( this.laserActiveLastUpdate ){
            
            var x = this.x * tileSize
            var y = this.y * tileSize
            var w = tileSize;
            var h = tileSize;
            
            ctx.strokeStyle='red';
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(x+w/2,y+h/2);
            ctx.lineTo(
                x+w/2 + this.targetDistance*this.dir.dx,
                y+h/2 + this.targetDistance*this.dir.dy
            );
            ctx.stroke();
        }
    }
    
    justPlaced() {
        var td = getTargetAndDistance(this.x,this.y,this.dir);
        this.target = td[0];
        this.targetDistance = td[1];
    }
    
    mapUpdated() {
        var td = getTargetAndDistance(this.x,this.y,this.dir);
        this.target = td[0];
        this.targetDistance = td[1];
    }
    
    hitByBullet(){
        var oldlt = this.laserTime;
        this.laserTime = Math.max( bonusLaserTime, Math.min( this.laserTime + bonusLaserTime, maxLaserTime ) )
        this.laserActiveLastUpdate = true;
    }
    
    update(time_elapsed){
        if( this.laserTime > 0 ){
            this.laserActiveLastUpdate = true;
            var targetHitTime = Math.max(this.laserTime,time_elapsed)
            this.laserTime -= targetHitTime
            if( this.target ) {
                this.target.hitByLaser(targetHitTime)
            }
        } else {
            this.laserActiveLastUpdate = false;
        }
    }
}