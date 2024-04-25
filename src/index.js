
import Phaser from "phaser";
import PreloadScene from "./Scenes/PreloadScene";
import PlaScene from "./Scenes/PlayScene";

const config = {
  //webGL() JS API redering 2d & 3d graphics.
  type: Phaser.AUTO,
  width: 1200,
  height: 300,
  pixelArt: true,
  transparent: true,
  physics: {
    //Arcade physics - controll the gravity and vlocity.
    default: 'arcade',
    arcade:{
      debug: true 
    }
  },
  scene: [PreloadScene, PlaScene]
};

new Phaser.Game(config);
