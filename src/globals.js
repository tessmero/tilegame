
// graphics context
var canvas;
var ctx;

// src/core/game_state.js
var gameState = GameState.StartMenu;
var startMenuSim = null;

// gameplay settings
var baseShooterCooldown = 2000;
var bonusShooterCooldown = 1000;
var minShooterCooldown = -3000;
var bonusLaserTime = 10; 
var maxLaserTime = 1000;



// map variables
var tileSize = 32; // Size of each tile in virtual units
var mapWidth = 100;//map size in tiles
var mapHeight = 100;//map size in tiles
var tileMap = []
for (var i = 0; i < mapWidth; i++) {
  tileMap[i] = new Array(mapHeight);
}

// Camera variables
var cameraX = 0;
var cameraY = 0;
var zoomLevel = 1;
var cameraSpeed = .01; 
var zoomSpeed = 0.1; 
var minZoom = .5;


// Mouse variables
var mouseTileX = 0;
var mouseTileY = 0;
var canvasMouseX = 0;
var canvasMouseY = 0;  
var virtualMouseX = 0;
var virtualMouseY = 0;
var hoveredBlock = null;

// Keyboard input
var keys = {};

// Toolbar variables
var toolbarSlotCount = 10;
var selectedToolbarSlotIndex = 0;
var toolbarHovered = false;
var selectedDirectionIndex = 0;
var toolbarBlocks = [
    new Wall(0,0),
    new Shooter(0,0,Direction.Up),
    new Laser(0,0,Direction.Up)
]

//hud layout specs
var toolbarThickness = 40;
var toolbarX;
var toolbarY;