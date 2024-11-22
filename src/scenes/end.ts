
import * as ex from 'excalibur';
import { mainLevel } from './level';
import { drawText } from '../utils/helpers';
import { scoreProvider } from '../utils/scoreprovider';
class EndScene extends ex.Scene {

 private scoreActor = new ex.Actor({pos: ex.vec(250,200), width: 100, height: 50});

  onInitialize(engine: ex.Engine) {
    drawText({scene: this, text: 'Game Over!', pos: ex.vec(engine.drawWidth/2,50), scale: 3})
    this.drawReplayButton(engine)
    this.add(this.scoreActor)
  }

  drawReplayButton(engine: ex.Engine){
    const buttonActor = new ex.Actor({pos: ex.vec(250,100), width: 100, height: 50, color: ex.Color.Green});
    drawText({actor: buttonActor, text: 'Play Again', scale: 1.5})
    buttonActor.on('pointerdown', () => this.resetGame(engine))
    this.add(buttonActor)
  }

  drawFinalScore(score: number){
    const text = new ex.Text({text: "Your Score: " + score.toString(), scale: ex.vec(1, 1)})
    this.scoreActor.graphics.use(text)
  }

  resetGame(engine: ex.Engine){
    engine.goToScene('select')
  }

  onActivate() {
    const score = Math.round(mainLevel.floors.distance)
    this.drawFinalScore(score)
    this.tradeScores(score)
  }

  async tradeScores(score: number){
    await scoreProvider.submitScore(score)
    scoreProvider.getHighScores()
  }
}

const endScene = new EndScene();
export { endScene };