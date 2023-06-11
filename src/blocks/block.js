class Block {

  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  isSolid(){
    return true;
  }
  
  toString(){
      return this.constructor.name;
  }
  
  getBaseExportCharacter(){
    throw new Error('not implemented');
  }
  
  drawChildren(){}
  
  justPlaced(){}
  
  mapUpdated(){}
  
  update(time_elapsed){}
  
  hitByBullet(){}
  hitByLaser( timeElapsed ){}
}