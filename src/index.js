
import Phaser, { Scene } from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import ScoreScene from "./scenes/ScoreScene";
import PauseScene from "./scenes/PauseScene";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH * 0.1, y: HEIGHT/2};
const PIPES_TO_RENDER = 4;
const SCENES = [ PreloadScene, MenuScene, ScoreScene, PlayScene, PauseScene];
const difficulties = {
  'easy':{
    pipesVerDistRange: [250, 350],
    pipesHorDistRange: [500, 600]
  },
  'medium':{
    pipesVerDistRange: [150, 250],
    pipesHorDistRange: [500, 600]
  },
  'hard':{
    pipesVerDistRange: [100, 150],
    pipesHorDistRange: [500, 600]
  },
  'veryhard':{
    pipesVerDistRange: [50, 100],
    pipesHorDistRange: [500, 600]
  }
};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION,
  pipesToRender: PIPES_TO_RENDER,
  difficulties: difficulties
};
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => SCENES.map(createScene);

const config = {
  //webGL() JS API redering 2d & 3d graphics.
  type: Phaser.AUTO,
  ...SHARED_CONFIG, 
  pixelArt: true,
  physics: {
    //Arcade physics - controll the gravity and vlocity.
    default: 'arcade',
    arcade:{
      //debug: true,
      gravity:{
        //y: 400
      }
    }
  },
  scene: initScenes()
};
new Phaser.Game(config);
