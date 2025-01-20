import * as ex from 'excalibur';
import { scoreProvider } from '../utils/scoreprovider';
import { Leaderboard } from '../actors/ui/leaderboard';
import { drawFullscreenPanel, drawText } from '../utils/helpers';
import InputManager from '../utils/input';
import { Game } from '../main';
import { Resources } from '../resources';

const overlayHeight = 50
const cycleSeconds = 15
class Attract extends ex.Scene
{
    private activeLeaderboard: Leaderboard
    private _input: InputManager;
    private cycleTimer: number = 0;
    private startScreen: ex.Actor;

    onActivate() {
        this._input?.clearAll();
        if(this.activeLeaderboard) this.remove(this.activeLeaderboard);
        this.loadLeaderboard();
        this.startScreen.graphics.opacity = 1;
        this.cycleTimer = 0;
        if(!Resources.sounds.character_select.isPlaying())
        {
          Resources.sounds.character_select.loop = true
          Resources.sounds.character_select.play(.5)
        }
    }

    onInitialize(engine: ex.Engine): void {
        this.drawLowerOverlay(engine)
        this._input = (engine as Game).inputManager;
        this.startScreen = drawFullscreenPanel(engine, Resources.ui.dream)
    }

    drawLowerOverlay(engine: ex.Engine){
        let overlayLower = new ex.Actor({ pos: ex.vec(engine.drawWidth/2, engine.drawHeight - overlayHeight/2), width: engine.drawWidth, height: overlayHeight, color: ex.Color.Black, z: 5 });
        this.add(overlayLower);
        let text = drawText({ text: "Press Space to Play", scale: 2, actor: overlayLower, color: ex.Color.White });
        text.z = 10;
    }
    
    async loadLeaderboard(){
        let scores = await scoreProvider.getHighScores()
        let pos = ex.vec(this.engine.drawWidth/2, 30)
        let leaderboard = new Leaderboard(scores, pos, this.engine.drawWidth/1.2)
        this.add(leaderboard)
        this.activeLeaderboard = leaderboard
    }

    update(engine: ex.Engine, delta: number): void {
        super.update(engine, delta);
        this.cycleTimer += delta;
        if(this.cycleTimer > 100 && this._input?.justPressed('jump')){
          engine.goToScene('select');
        }
        if(this.cycleTimer > cycleSeconds * 1000){
         engine.goToScene('doglogo');
        }
    }

}

export const attract = new Attract();