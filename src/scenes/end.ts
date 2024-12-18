
import * as ex from 'excalibur';
import { mainLevel } from './level';
import { drawText } from '../utils/helpers';
import { scoreProvider } from '../utils/scoreprovider';
import { InputField } from '../actors/ui/inputfield';
import { mainFont } from '../utils/font';

const maxNameLength = 3
const profanity = [
  "ass", "baw", "bch", "bnt", "bdm", "bft", "btt", "c0k", "cnt", "crp", "dck", "dmb",
  "dks", "fag", "fuk", "fgt", "gdi", "gdw", "h3l", "h0e", "hom", "h0m", "jck", "kfc", "kys",
  "lma", "lls", "mth", "n00", "nig", "n00b", "p0s", "phd", "pim", "prk", "pxt",
  "qu3", "rdm", "scm", "sht", "skn", "shk", "sh1", "sht", "twt", "wtf", "wth"
];


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
    drawText({scene: this, text: 'Enter your initials, then press space\nto submit your score!', scale: 1, pos: ex.vec(engine.drawWidth/2,100)})
    this.textField = new InputField(ex.vec(engine.drawWidth/2,150), maxNameLength)
    this.add(this.textField)
  }

  drawFinalScore(score: number){
    const text = new ex.Text({text: "Your Score: " + score.toString(), scale: ex.vec(1, 1), font: mainFont})
    this.scoreActor.graphics.use(text)
  }

  getFinalScore() : number{
    return Math.round(mainLevel.floors.distance)
  }

  update(engine: ex.Engine, _delta: number): void {
    
    if(!this.submittedScore && engine.input.keyboard.wasPressed(ex.Keys.Space))
    {
      let name = this.textField.contents
      if(name.length < 1){
        //TODO: length warning
      }
      else if(profanity.includes(name.toLowerCase())){
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