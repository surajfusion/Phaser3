
import BaseScene from "./BaseScene";

class PreloadScene extends BaseScene{

    constructor(config){
        super('PreloadScene', config);
    }

    preload(){
        this.load.image('sky', 'assets/bg.png');
        this.load.spritesheet('bird', 'assets/birdSprite.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('pauseButton', 'assets/pause.png');
        this.load.image('backButton', 'assets/back.png');
    }

    create(){
        this.scene.start('MenuScene');
    }
}

export default PreloadScene;