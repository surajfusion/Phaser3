
import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene{

    constructor(config){
        super('ScoreScene', {...config, canGoBack: true});
        this.score = [
            {scene: 'ScoreScene', text: 'Best Score: '+ localStorage.getItem('bestScore')},
            //{scene: 'MenuScene', text: 'Back'},
            //{scene: null, text: 'Exit'}
        ];
    }

    create(){
        this.createBG();
        this.createMenu(this.score, this.setupMenuEvents.bind(this));
    }

    setupMenuEvents(scoreItem){
        const textGO = scoreItem.textGO;
    }
}



export default ScoreScene;