import BaseScene from "./BaseScene";

class PlayScene extends BaseScene{
    VELOCITY = 200;
    FLAP_VELOCITY = 250;

    constructor(config){
        super('PlayScene', config);
        this.config = config;
        this.bird = null;
        this.pipes = null;
        this.score = 0;
        this.scoreText = '';
    }

    createColloiders(){
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    createScore(){
        this.score = 0;
        const bestScoreText = localStorage.getItem('bestScore');
        this.scoreText = this.add.text(16, 16, `Score: ${0}`, {fontSize: '32px', fill:'#000'});
        this.bestScore = this.add.text(16, 64, `Best Score: ${bestScoreText || 0}`, {fontSize: '18px', fill:'#000'});
    }

    create(){
        super.createBG();
        this.createPauseButton();
        this.createBird();
        this.createPipes();
        this.createScore();
        this.createColloiders();
        this.handleInputs();
    }

    createPauseButton(){
        const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pauseButton')
        .setScale(3)
        .setInteractive()
        .setOrigin(1);

        pauseButton.on('pointerdown', () =>{
            this.physics.pause();
            this.scene.pause();
        });
    }

    createBird(){
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0,0);
        this.bird.body.gravity.y = 400;
        this.bird.setCollideWorldBounds(true );
    }

    increaseScore(){
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
    }
    createPipes(){
        this.pipes = this.physics.add.group();

        for(var i =0; i < this.config.pipesToRender; i++){
            //upperPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0,1);
            //lowerPipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);
            const upperPipe = this.pipes
                .create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0,1);
            const lowerPipe = this.pipes
                .create(0, 0, 'pipe')
                .setImmovable(true)
                .setOrigin(0,0);

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
                    t.increaseScore(); 
                    t.setBestScore();
                }
            }
        }); 
    }

    update(){
        this.checkBirdPosition();
        this.recyclePipes();
    }


    checkBirdPosition(){
        if(this.bird.getBounds().bottom  >=  this.config.height || this.bird.y <= 0){
            this.gameOver(); 
            //this.restartFromStartPosition();
        }
    }

    flap(){
        this.bird.body.velocity.y  = -this.FLAP_VELOCITY  ;
    }


    gameOver(){
        this.physics.pause(); 
        this.bird.setTint(0xF55742);
        //this.restartFromStartPosition();
        this.setBestScore();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.restart()
            },
            loop: false
        });
    }

    setBestScore(){
        const bestScoreText = localStorage.getItem('bestScore');
        const bestScore = parseInt(bestScoreText, 10);
        if(!bestScore || this.score > bestScore){
            localStorage.setItem('bestScore', this.score);
        }
    }

    restartFromStartPosition(){
        this.bird.x = this.config.startPosition.x;
        this.bird.y = this.config.startPosition.y;
        this.bird.body.velocity.y  = 0;
    } 
}

export default PlayScene;