
import * as ex from 'excalibur';
import { mainLevel } from './level';
import { drawText } from '../utils/helpers';
import { scoreProvider } from '../utils/scoreprovider';
import { mainFont } from '../utils/font';
import { ArcadeInput } from '../actors/ui/arcadeinput';

const cratePenalty = 100
const maxNameLength = 3
const submitHeight = 30
const submitWidth = 80
const profanity = [
  "ass", "baw", "bch", "bnt", "bdm", "bft", "btt", "cok", "cnt", "crp", "dck", "dmb",
  "dks", "fag", "fuk", "fgt", "gdi", "hom", "jck", "kfc", "kys", "mth", "nig", "pos", "pxt",
  "rdm", "scm", "sht", "skn", "sht", "twt", "wtf", "wth"
];


class EndScene extends ex.Scene {

 private scoreActor = new ex.Actor({pos: ex.vec(230,200), width: 100, height: 50});
 private arcadeField: ArcadeInput
 private submittedScore: boolean

  onInitialize(engine: ex.Engine) {
    drawText({
      scene: this, 
      text: 'Game Over!', 
      pos: ex.vec(engine.drawWidth/2,50), 
      scale: 3});
    this.add(this.scoreActor);
    this.drawNameField(engine);
    this.drawSubmitButton();
  }

  onActivate() {
    this.drawFinalScore(this.getFinalScore());
    this.arcadeField.clear();
    this.submittedScore = false;
  }

  drawSubmitButton(){
    let button = new ex.Actor({
      width: submitWidth, 
      height: submitHeight, 
      color: ex.Color.Transparent, 
      y: 230, 
      x: 235});
    drawText({text: "Submit", actor: button, scale: 1.5});
    button.on('pointerdown', () => this.trySendScore());
    this.add(button);
  }

  drawNameField(engine: ex.Engine){
    drawText({
      scene: this, 
      text: 'Enter your initials, then press space\nto submit your score!', 
      scale: 1, 
      pos: ex.vec(engine.drawWidth/2,100)
    });
    this.arcadeField = new ArcadeInput(ex.vec(engine.drawWidth/2,150), maxNameLength);
    this.add(this.arcadeField);
  }

  drawFinalScore(score: number){
    const text = new ex.Text({text: "Your Score: " + score.toString(), scale: ex.vec(1, 1), font: mainFont})
    this.scoreActor.graphics.use(text)
  }

  getFinalScore() : number{
    return Math.round(mainLevel.floors.distance) - mainLevel.crateCount * cratePenalty
  }

  update(engine: ex.Engine, delta: number): void {
    super.update(engine, delta)
    if(!this.submittedScore && engine.input.keyboard.wasPressed(ex.Keys.Space))
    {
      this.trySendScore();
    }
  }

  private trySendScore() {
    let name = this.arcadeField.getContents();
    if (profanity.includes(name.toLowerCase())) {
      //TODO: profanity warning 
    }
    else {
      this.sendScore(this.getFinalScore(), name);
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