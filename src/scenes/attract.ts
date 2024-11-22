import * as ex from 'excalibur';
import { scoreProvider } from '../utils/scoreprovider';
import { Leaderboard } from '../actors/ui/leaderboard';
import { drawText } from '../utils/helpers';

class Attract extends ex.Scene{
    onActivate() {
        this.clear()
        drawText({text: "Press Space to Play!", pos: ex.vec(this.engine.drawWidth/2, 40), scale: 3, scene: this})
        this.loadLeaderboard()
      }
    
    async loadLeaderboard(){
        let scores = await scoreProvider.getHighScores()
        let pos = ex.vec(this.engine.drawWidth/2, 100)
        let leaderboard = new Leaderboard(scores, pos, this.engine.drawWidth/1.5)
        this.add(leaderboard)
    }

    update(engine: ex.Engine, delta: number): void {
        super.update(engine, delta);
          if(engine.input.keyboard.wasPressed(ex.Keys.Space)) {
            engine.goToScene('select');
          }

      }
}

export const attract = new Attract