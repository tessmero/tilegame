var allBackgroundSims = [
    bg_sim_1,
    bg_sim_2,
    bg_sim_3,
]

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
allBackgroundSims = shuffle(allBackgroundSims);
backgroundSimIndex = 0;

function resetStartMenuSim(){
    backgroundSimIndex = (backgroundSimIndex+1)%allBackgroundSims.length
    startMenuSim = allBackgroundSims[backgroundSimIndex];
    startMenuSim.simtime = 0;
    
    var start = startMenuSim.camCheckpoints[0]
    cameraX = start[1]
    cameraY = start[2]
    zoomLevel = start[3]
    importTilemapFromString( startMenuSim.mapString );
}