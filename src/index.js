
import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH * 0.1, y: HEIGHT/2};
const PIPES_TO_RENDER = 4;
const VELOCITY = 200;
//const INITIATE_BIRD_POSTION = {x: config.width/10, y:config.height/2};
const PIPE_DISTANCE_BETWEEN_RANGE = [100, 250];
const PIPES_HORI_DIST_BW_RANGE = [500, 600];

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
  pipesToRender: PIPES_TO_RENDER,
  pipesVerDistRange: PIPE_DISTANCE_BETWEEN_RANGE,
  pipesHorDistRange: PIPES_HORI_DIST_BW_RANGE
};

const config = {
  //webGL() JS API redering 2d & 3d graphics.
  type: Phaser.AUTO,
  ...SHARED_CONFIG, 
  physics: {
    //Arcade physics - controll the gravity and vlocity.
    default: 'arcade',
    arcade:{
      debug: true,
      gravity:{
        //y: 400
      }
    }
  },
  scene: [new PlayScene(SHARED_CONFIG)]
};
new Phaser.Game(config);
