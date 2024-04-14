

import Phaser from "phaser";
const FONT_STYLE_DEFAULT = {fontSize: '32px', fill:'#CD00FF'};

class BaseScene extends Phaser.Scene{
    
    constructor(key, config){
        super(key);
        this.config = config;
        this.screenCenter = [this.config.width/2, this.config.height/2];
    }

    preload(){
    }

    createBG(){
        this.add.image(0, 0, 'sky').setOrigin(0);
        if(this.config.canGoBack){
            this.createBackButton();
        }
    }

    createBackButton(){
        const batckButton = this.add.image(this.config.width/2, this.config.height/2 + 40, 'backButton')
            .setOrigin(0.5)
            .setInteractive()
            .setScale(3);
        batckButton.on('pointerup', () =>{
            this.scene.start('MenuScene');
        });
    }

    createMenu(menu, setupMenuEvents){
        let menuVerticlePosition = 0;
        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + menuVerticlePosition];
            menuItem.textGO = this.add.text(
                ...menuPosition,
                menuItem.text, 
                FONT_STYLE_DEFAULT
            ).setOrigin(0.5,1);

            menuVerticlePosition += 40;
            setupMenuEvents(menuItem);
        });
    }
}

export default BaseScene;