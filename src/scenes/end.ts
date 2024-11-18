
import * as ex from 'excalibur';
import { mainLevel } from './level';
class EndScene extends ex.Scene {

 private gameOverText = new ex.Text({text: 'Game Over!', scale: ex.vec(3, 3)})
 private scoreActor = new ex.Actor({pos: ex.vec(250,200), width: 100, height: 50});
 private replayText = new ex.Text({text: 'Play Again', scale: ex.vec(2, 2)})

  onInitialize(engine: ex.Engine) {
    this.drawGameOver();
    this.drawReplayButton(engine)
    this.add(this.scoreActor)
  }

  drawGameOver() {
    const textActor = new ex.Actor({pos: ex.vec(250,50)});
    textActor.graphics.use(this.gameOverText);
    this.add(textActor);
  }

  drawReplayButton(engine: ex.Engine){
    const buttonActor = new ex.Actor({pos: ex.vec(250,100), width: 100, height: 50, color: ex.Color.Green});
    const replayActor = new ex.Actor({pos: ex.vec(2,0), width: 80, height: 30, color: ex.Color.White});
    replayActor.graphics.use(this.replayText)
    buttonActor.on('pointerdown', () => this.resetGame(engine))
    this.add(buttonActor)
    buttonActor.addChild(replayActor)
  }

  drawFinalScore(){
    const score = Math.round(mainLevel.floors.distance)
    const text = new ex.Text({text: "Your Score: " + score.toString(), scale: ex.vec(1, 1)})
    this.scoreActor.graphics.use(text)
  }

  resetGame(engine: ex.Engine){
    engine.goToScene('start')
  }

  onActivate() {
    this.drawFinalScore()
  }
}

const endScene = new EndScene();
export { endScene };