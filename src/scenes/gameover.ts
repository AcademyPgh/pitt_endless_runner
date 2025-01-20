import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Game } from '../main';
import InputManager from '../utils/input';

class GameOver extends ex.Scene {
    private timer: number = 0;
    private _input: InputManager;
    private background: ex.Actor;
  onInitialize(engine: ex.Engine) {
    this.background = new ex.Actor({
        pos: ex.vec(250, 135),
        width: engine.drawWidth,
        height: engine.drawHeight
    });
    this._input = (engine as Game).inputManager;
    this.background.graphics.use(Resources.ui.dream.toSprite());
    this.add(this.background);
  }

  onActivate() {
    this.timer = 0;
    this.background.graphics.opacity = 0;
    this.background.actions.fade(1, 1000);
  }

  update(engine: ex.Engine, elapsed: number): void {
    super.update(engine, elapsed);
    this.timer += elapsed;
    if(this.timer > 4000 || this._input.justPressed('jump')) {
        engine.goToScene('end');
    }
  }
}

const gameover = new GameOver();
export { gameover };