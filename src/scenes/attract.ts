import * as ex from 'excalibur';
import { scoreProvider } from '../utils/scoreprovider';
import { Leaderboard } from '../actors/ui/leaderboard';
import { drawText } from '../utils/helpers';
import InputManager from '../utils/input';

const overlayHeight = 50
class Attract extends ex.Scene
{
    private activeLeaderboard: Leaderboard
    private _input: InputManager | null = null;

    onActivate() {
        if(this.activeLeaderboard) this.remove(this.activeLeaderboard)
        this.loadLeaderboard()
    }

    onInitialize(engine: ex.Engine): void {
        this.drawLowerOverlay(engine)
        this._input = (engine as any).inputManager;
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
          if(this._input?.justPressed('jump')){
            engine.goToScene('select');
          }

      }
}

export const attract = new Attract();