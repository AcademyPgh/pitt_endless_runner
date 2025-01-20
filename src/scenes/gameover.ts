import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Game } from '../main';
import InputManager from '../utils/input';

class GameOver extends ex.Scene {
    private timer: number = 0;
    private _input: InputManager;
  onInitialize(engine: ex.Engine) {
    const bg = new ex.Actor({
        pos: ex.vec(250, 135),
        width: engine.drawWidth,
        height: engine.drawHeight
    });
    this._input = (engine as Game).inputManager;
    bg.graphics.use(Resources.ui.dream.toSprite());
    this.add(bg);
  }

  onActivate() {
    this.timer = 0;
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