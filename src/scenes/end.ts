
import * as ex from 'excalibur';
import { mainLevel } from './level';
import { drawText } from '../utils/helpers';
import { scoreProvider } from '../utils/scoreprovider';
import { InputField } from '../actors/ui/inputfield';
import { profanity } from '@2toad/profanity';

const maxNameLength = 7
class EndScene extends ex.Scene {

 private scoreActor = new ex.Actor({pos: ex.vec(250,200), width: 100, height: 50});
 private textField: InputField
 private submittedScore: boolean

  onInitialize(engine: ex.Engine) {
    drawText({scene: this, text: 'Game Over!', pos: ex.vec(engine.drawWidth/2,50), scale: 3})
    this.add(this.scoreActor)
    this.drawNameField(engine)
  }

  onActivate() {
    this.drawFinalScore(this.getFinalScore())
    this.textField.clear()
    this.submittedScore = false
  }

  drawNameField(engine: ex.Engine){
    drawText({scene: this, text: 'Enter your name, then press space to submit your score!', scale: 1.5, pos: ex.vec(engine.drawWidth/2,100)})
    this.textField = new InputField(ex.vec(engine.drawWidth/2,150), maxNameLength)
    this.add(this.textField)
  }

  drawFinalScore(score: number){
    const text = new ex.Text({text: "Your Score: " + score.toString(), scale: ex.vec(1, 1)})
    this.scoreActor.graphics.use(text)
  }

  getFinalScore() : number{
    return Math.round(mainLevel.floors.distance)
  }

  update(engine: ex.Engine, delta: number): void {
    
    if(!this.submittedScore && engine.input.keyboard.wasPressed(ex.Keys.Space))
    {
      let name = this.textField.contents
      if(name.length < 1){
        //TODO: length warning
      }
      else if(profanity.exists(name)){
        //TODO: profanity warning 
      }
      else{
        this.sendScore(this.getFinalScore(), this.textField.contents)
      }
      
    }
  }

  async sendScore(score: number, name: string){
    this.submittedScore = true
    await scoreProvider.submitScore(score, name)
    this.engine.goToScene('attract')
  }
}

const endScene = new EndScene();
export { endScene };