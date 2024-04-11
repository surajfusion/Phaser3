import Phaser from "phaser";

class PlayScene extends Phaser.Scene{
    VELOCITY = 200;

    constructor(config){
        super('PlayScene');
        this.config = config;
        this.bird = null;
        this.pipes = null;
        
    }

    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe', 'assets/pipe.png');
    }

    create(){
        this.createBG();
        this.createBird();
        this.createPipes();
        this.handleInputs();
    }

    createBG(){
        this.add.image(0, 0, 'sky').setOrigin(0,0);
    }

    createBird(){
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0,0);
        this.bird.body.gravity.y = 400;
    }

    createPipes(){
        this.pipes = this.physics.add.group();

        for(var i =0; i < this.config.pipesToRender; i++){
            //upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0,1);
            //lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);
            const upperPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0,1);
            const lowerPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0,0);

            this.placePipes(upperPipe, lowerPipe);
        }

        this.pipes.setVelocityX(-200);
    }

    handleInputs(){
        this.input.on('pointerdown', this.flap, this);
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
    }

    placePipes(uPipe, lPipe){

        const rightMostX = this.getRightMostPipes();
        const pipeVerticalDistance = Phaser.Math.Between(...this.config.pipesVerDistRange);
        const pipeHorizontalDistance = Phaser.Math.Between(...this.config.pipesHorDistRange);
        const pipeVerticalPostion = Phaser.Math.Between(0 + 30, this.config.height - 30 - pipeVerticalDistance);
        
        uPipe.x = rightMostX + pipeHorizontalDistance;
        uPipe.y = pipeVerticalPostion;
        lPipe.x = uPipe.x;
        lPipe.y = uPipe.y + pipeVerticalDistance;
    }
    
    getRightMostPipes(){
        let rightMostX = 0;
        
        this.pipes.getChildren().forEach(function(pipe){
            rightMostX = Math.max(pipe.x, rightMostX);
        });
        
        return rightMostX;
    }

    recyclePipes(){
        const tempPipes = [];
        let t = this;
        t.pipes.getChildren().forEach(function(pipe){
            if(pipe.getBounds().right <= 0){
                //recycle the pipe.
                tempPipes.push(pipe);
                if(tempPipes.length === 2){
                    t.placePipes(...tempPipes);
                }
            }
        }); 
    }

    update(){
        this.checkBirdPosition();
        this.recyclePipes();
    }


    checkBirdPosition(){
        if(this.bird.y >=  this.config.height || this.bird.y < 0){
            this.restartFromStartPosition();
        }
    }

    restartFromStartPosition(){
        this.bird.x = this.config.startPosition.x;
        this.bird.y = this.config.startPosition.y;
        this.bird.body.velocity.y  = 0;
    }

    flap(){
        this.bird.body.velocity.y  = -this.VELOCITY;
    }
}

export default PlayScene;