import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Game } from '../main';
import InputManager from '../utils/input';

class DogLogo extends ex.Scene {
    private timer: number = 0;
    private _input: InputManager;
    private background: ex.Actor;
    private fbi: ex.Actor;
    private cycleSeconds = 3;
    private activation = 1;

  onInitialize(engine: ex.Engine) {
    this.background = new ex.Actor({
        pos: ex.vec(250, 135),
        width: engine.drawWidth,
        height: engine.drawHeight
    });
    this._input = (engine as Game).inputManager;
    this.background.graphics.use(Resources.ui.dayofGiving.toSprite());
    this.fbi = new ex.Actor({
        pos: ex.vec(250, 135),
        width: engine.drawWidth,
        height: engine.drawHeight
        });
    this.fbi.graphics.use(Resources.ui.fbi.toSprite());
    this.add(this.background);
    this.add(this.fbi);
  }

  onActivate() {
    this.timer = 0;
    this.activation += 1;
    this.fbi.graphics.opacity = 0;
    this.background.graphics.opacity = 0;
    // Remove FBI Logo
    // if(this.activation % 3 === 0) {
    //     this.fbi.actions.fade(1, 500);
    // }
    // else {
    //     this.background.actions.fade(1, 500);
    // }
    this.background.actions.fade(1, 500);
    this._input?.clearAll();
    if(!Resources.sounds.character_select.isPlaying())
    {
      Resources.sounds.character_select.loop = true
      Resources.sounds.character_select.play(.5)
    }
  }

  update(engine: ex.Engine, elapsed: number): void {
    super.update(engine, elapsed);
    this.timer += elapsed;
    if(this.timer > 100 && this._input.justPressed('jump')) {
        engine.goToScene('select');
    }
    if(this.timer > this.cycleSeconds * 1000){
        engine.goToScene('start');
    }
  }
}

const dogLogo = new DogLogo();
export { dogLogo };