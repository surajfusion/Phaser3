

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
    }

    createMenu(menu, setupMenuEvents){
        menu.forEach(menuItem => {
            const menuPosition = [...this.screenCenter];
            menuItem.textGO = this.add.text(
                ...menuPosition,
                menuItem.text, 
                FONT_STYLE_DEFAULT
            ).setOrigin(0.5,1);
            this.screenCenter[1] += 30;

            setupMenuEvents(menuItem);
        });
    }
}

export default BaseScene;