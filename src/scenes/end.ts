
import * as ex from 'excalibur';
import { mainLevel } from './level';
class EndScene extends ex.Scene {

 private text = new ex.Text({text: 'Game Over!', scale: ex.vec(3, 3)})
 private scoreActor = new ex.Actor({pos: ex.vec(250,200), width: 100, height: 50});
  onInitialize(engine: ex.Engine) {
    this.drawGameOver();
    this.drawReplayButton(engine)
    this.add(this.scoreActor)
  }

  drawGameOver() {
    const textActor = new ex.Actor({pos: ex.vec(250,100)});
    textActor.graphics.use(this.text);
    this.add(textActor);
  }

  drawReplayButton(engine: ex.Engine){
    const buttonActor = new ex.Actor({pos: ex.vec(250,150), width: 100, height: 50, color: ex.Color.Green});
    buttonActor.on('pointerdown', () => this.resetGame(engine))
    this.add(buttonActor)
  }

  drawFinalScore(){
    const text = new ex.Text({text: "Your Score: " + mainLevel.score.toString(), scale: ex.vec(1, 1)})
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