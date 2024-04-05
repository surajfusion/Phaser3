
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
        //y: 400
      }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
const VELOCITY = 200;
const INITIATE_BIRD_POSTION = {x: config.width/10, y:config.height/2};
const PIPE_DISTANCE_BETWEEN_RANGE = [100, 250];
let pipeHorizontalDistance = 0;
const PIPES_TO_RENDER = 4;

//Loading Assets: EG- Images, Animation, Music.
function preload () {
  //debugger
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}
let bird = null;
let upperPipe = null;
let lowerPipe = null;

//Initialise Instances
function create () {
  this.add.image(0, 0, 'sky').setOrigin(0,0); 
  bird = this.physics.add.sprite(
    INITIATE_BIRD_POSTION.x, 
    INITIATE_BIRD_POSTION.y, 'bird')
    .setOrigin(0,0);
  bird.body.gravity.y = 400;

  for(var i =0; i < PIPES_TO_RENDER; i++){
    upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0,1);
    lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);
    placePipes(upperPipe, lowerPipe);
  }

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

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

function placePipes(uPipe, lPipe){
  pipeHorizontalDistance += 400;
  let pipeVerticalDistance = Phaser.Math.Between(...PIPE_DISTANCE_BETWEEN_RANGE);
  let pipeVerticalPostion = Phaser.Math.Between(0 + 30, config.height - 30 - pipeVerticalDistance);
  
  uPipe.x = pipeHorizontalDistance;
  uPipe.y = pipeVerticalPostion;
  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;

  uPipe.body.velocity.x = -200;
  lPipe.body.velocity.x = -200;
}
new Phaser.Game(config);
