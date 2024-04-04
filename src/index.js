
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
        y: 400
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
const totalDelta = 0;
const VELOCITY = 200;
let INITIATE_BIRD_POSTION = {x: config.width/10, y:config.height/2};

//Initialise Instances
function create () {
  this.add.image(0, 0, 'sky').setOrigin(0,0); 
  bird = this.physics.add.sprite(
    INITIATE_BIRD_POSTION.x, 
    INITIATE_BIRD_POSTION.y, 'bird')
    .setOrigin(0,0);
  //bird.body.velocity.x  = VELOCITY;
  //Working with events.
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}
//60fps - default.
//60 * 16 ~ 1000, here 16 is the delta time
function update(time, delta){
  //console.log(bird.body.x);
  if(bird.y >=  config.height || bird.y < 0){
    restartFromStartPosition();
  }
}

function restartFromStartPosition(){
  bird.x = INITIATE_BIRD_POSTION.x;
  bird.y = INITIATE_BIRD_POSTION.y;
  bird.body.velocity.y  = 0;
}
function flap(){
  bird.body.velocity.y  = -VELOCITY;
}
new Phaser.Game(config);
