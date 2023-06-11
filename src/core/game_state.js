class GameState {
  static StartMenu = new GameState('StartMenu');
  static PauseMenu = new GameState('PauseMenu');
  static Playing = new GameState('Playing');

  constructor(name,dx,dy) {
    this.name = name;
  }
  
  toString(){
    return this.name;
  }
}