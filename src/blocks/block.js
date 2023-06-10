class Block {

  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  isSolid(){
    return true;
  }
  
  drawChildren(){}
  
  justPlaced(){}
  
  mapUpdated(){}
  
  update(time_elapsed){}
  
  hitByBullet(){}
  hitByLaser( timeElapsed ){}
}