class BackgroundSimulation {

  constructor( camCheckpoints, mapString ) {
    this.camCheckpoints = camCheckpoints;
    this.mapString = mapString;
    this.simtime = 0;
  }
  
  toString(){
      return this.constructor.name;
  }
  
  update(time_elapsed){
    this.simtime += time_elapsed
    
    if( this.simtime >= this.camCheckpoints[this.camCheckpoints.length-1][0] ){
        resetStartMenuSim();
    }
    
    // identify neighboring checkpoints
    var prev = null
    var next = null
    for( var i = 1 ; i < this.camCheckpoints.length ; i++ ){
        prev = this.camCheckpoints[i-1]
        next = this.camCheckpoints[i]
        if( next[0] > this.simtime ){
            break
        }
    }
    
    // update camera position
    var dt = this.simtime-prev[0]
    if( dt == 0 ){
        return;
    }
    var r = dt/(next[0]-prev[0])
    cameraX = prev[1] + r*(next[1]-prev[1])
    cameraY = prev[2] + r*(next[2]-prev[2])
    zoomLevel = prev[3] + r*(next[3]-prev[3])
  }
}