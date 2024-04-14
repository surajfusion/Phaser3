
import BaseScene from "./BaseScene";

const CONTINUE_TXT = 'Continue';
const MENU_TXT = 'Menu';

class PauseScene extends BaseScene{

    constructor(config){
        super('PauseScene', config);
        this.menu = [
            {scene: 'PlayScene', text: CONTINUE_TXT},
            {scene: 'MenuScene', text: MENU_TXT}
        ];
    }

    create(){
        //this.createBG();
        this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    }

    setupMenuEvents(menuItem){
        const textGO = menuItem.textGO;
        textGO.setInteractive();

        textGO.on('pointerover', () => {
             textGO.setStyle({fill: '#fff'});
        });

        textGO.on('pointerout', () => {
            textGO.setStyle({fill: '#CD00FF'});
        });

        textGO.on('pointerup', () => { 
            if(menuItem.scene && menuItem.text === CONTINUE_TXT){
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            }else if(menuItem.scene && menuItem.text === MENU_TXT){
                this.scene.stop('PlayScene');
                this.scene.start(menuItem.scene);
            }
        });
    }
}

export default PauseScene;