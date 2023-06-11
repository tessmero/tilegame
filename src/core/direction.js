class Direction {
  static Up = new Direction('Up',0,-1);
  static Down = new Direction('Down',0,1);
  static Left = new Direction('Left',-1,0);
  static Right = new Direction('Right',1,0);

  constructor(name,dx,dy) {
    this.name = name;
    this.dx = dx;
    this.dy = dy;
  }
  
  toString(){
    return this.name;
  }
}

var allDirections = [Direction.Up,Direction.Right,Direction.Down,Direction.Left];

var directionsByName = {}
for( var i = 0 ; i < allDirections.length ; i++ ){
    var dir = allDirections[i];
    directionsByName[dir.name] = dir;
}