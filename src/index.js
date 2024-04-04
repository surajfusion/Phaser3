
import Phaser from "phaser";
const config = {
  //webGL() JS API redering 2d & 3d graphics.
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    //Arcade physics - controll the gravity and vlocity.
    default: 'arcade',
    arcade:{
      debug: true,
      gravity:{
        y: 0
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
//Loading Assets: EG- Images, Animation, Music.
function preload () {
  //debugger
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}
let bird = null;
let totalDelta = 0;
let VELOCITY = 200;

//Initialise Instances
function create () {
  //this.add.image(x, y, imageName);
  //Here x,y is the center of the Image, 
  //so, basically we are moving the center of the image.

  //this.add.image(0, 0, 'sky'); 
  //this.add.image(config.width/2, config.height/2, 'sky'); 
  //this.add.image(0, 0, 'sky').setOrigin(0,0); 
  //this.add.image(400, 300, 'sky').setOrigin(0.5,0.5); 
  this.add.image(0, 0, 'sky').setOrigin(0,0); 
  bird = this.physics.add.sprite(config.width/10, config.height/2, 'bird').setOrigin(0,0);
  bird.body.velocity.x = VELOCITY;
  //bird.body.gravity.y = 200;
  //console.log(bird.body);
  //debugger
  
}
//60fps - default.
//60 * 16 ~ 1000, here 16 is the delta time
function update(time, delta){
  totalDelta += delta;
  if(totalDelta >= 1000){
    /*
    console.log('totalDelta', totalDelta);
    console.log(bird.body.velocity.y);
    console.log(bird.body.gravity.y);
    totalDelta = 0;
    */
   //Assignment.
   
  }
  if(bird.x >= config.width - bird.width){
    bird.body.velocity.x = -VELOCITY;
  }else if(bird.x <= 0){
    bird.body.velocity.x = VELOCITY;
  }
  //console.log(bird.body.x);
}

new Phaser.Game(config);
