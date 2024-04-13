
import BaseScene from "./BaseScene";

class MenuScene extends BaseScene{

    constructor(config){
        super('MenuScene', config);
        this.menu = [
            {scene: 'PlayScene', text: 'Play'},
            {scene: 'ScoreScene', text: 'Score'},
            {scene: null, text: 'exit'}
        ];
    }

    create(){
        this.createBG();
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
            menuItem.scene && this.scene.start(menuItem.scene);

            if(!menuItem.scene){
                this.game.destroy(true);
            }
        });
    }
}
export default MenuScene;