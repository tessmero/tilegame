class DirectedBlock extends Block {

  constructor(x,y,dir) {
    super(x,y);
    this.dir = dir;
  }  
  
  toString(){
      return this.constructor.name + "," + this.dir
  }
}