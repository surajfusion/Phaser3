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
        this.timeToResume = 3;
        this.timedEvent = null;
        this.pauseState = false;
        this.currectDifficulty = 'easy';
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

    listenToEvents(){
        if(this.pauseEvent){
            return;
        }
        this.pauseEvent = this.events.on('resume', () => {
            this.timeToResume = 3;

            this.countDownText = this.add.text(...this.screenCenter, 
                'FLY IN: ' + this.timeToResume,
                {fontSize: '32px', fill:'#FFF'}
            ).setOrigin(0.5); 

            this.timedEvent = this.time.addEvent({
                delay: 1000,
                callback: this.countDown,
                callbackScope: this,
                loop: true
            });
        });
    }

    countDown(){
        this.timeToResume-- ;
        this.countDownText.setText('FLY IN: ' + this.timeToResume); 

        if(this.timeToResume <= 0){
            this.pauseState = false;
            this.countDownText.setText('');
            this.physics.resume();
            this.timedEvent.remove();
        }
    }

    create(){
        super.createBG();
        this.createPauseButton();
        this.createBird();
        this.createPipes();
        this.createScore();
        this.createColloiders();
        this.handleInputs();
        this.listenToEvents();

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', {start:9, end:15}),
            //24fps is default.
            frameRate: 8,
            //-1 =  infinite
            repeat: -1
        });

        this.bird.play('fly');
    }

    createPauseButton(){
        this.pauseState = false;
        const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pauseButton')
        .setScale(3)
        .setInteractive()
        .setOrigin(1);

        pauseButton.on('pointerdown', () =>{
            this.pauseState = true;
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene');
        });
    }

    createBird(){
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
        .setScale(3)
        .setFlipX(true)
        .setOrigin(0,0);
        this.bird.setBodySize(this.bird.width, this.bird.height-8);
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
        const pipeVerticalDistance = Phaser.Math.Between(...this.config.difficulties[this.currectDifficulty].pipesVerDistRange);
        const pipeHorizontalDistance = Phaser.Math.Between(...this.config.difficulties[this.currectDifficulty].pipesHorDistRange);
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
                    t.increaseDifficulty();
                }
            }
        }); 
    }

    increaseDifficulty(){
        if(this.score === 5){
            this.currectDifficulty = 'medium';
        }else if(this.score === 15){
            this.currectDifficulty = 'hard';
        }else if(this.score === 25){
            this.currectDifficulty = 'veryhard';
        }else if(this.score < 5){
            this.currectDifficulty = 'easy';
        }
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
        if(this.pauseState){ return ; }

        this.bird.body.velocity.y  = -this.FLAP_VELOCITY;
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