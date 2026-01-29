import * as ex from 'excalibur';
import { Resources } from '../resources';
import { Game } from '../main';
import InputManager from '../utils/input';
import { drawText } from '../utils/helpers';

class StartScreen extends ex.Scene {
    private timer: number = 0;
    private _input: InputManager;
    private background: ex.Actor;
    private cycleSeconds = 8;

  onInitialize(engine: ex.Engine) {
    this.background = new ex.Actor({
        pos: ex.vec(250, 135),
        width: engine.drawWidth,
        height: engine.drawHeight
    });
    this._input = (engine as Game).inputManager;
    this.background.graphics.use(Resources.ui.startScreen.toSprite());
    this.add(this.background);
    drawText({
        scene: this, 
        text: 'Day of Giving', 
        pos: ex.vec(engine.drawWidth/2, 30), 
        color: ex.Color.White, 
        scale: 1.5
    })
    drawText({
        scene: this, 
        text: '10th ANNIVERSARY DASH', 
        pos: ex.vec(engine.drawWidth/2, 90), 
        color: ex.Color.White, 
        scale: 2
    })
    drawText({
        scene: this, 
        text: 'Touch Screen Or', 
        pos: ex.vec(engine.drawWidth/2, 220), 
        color: ex.Color.White, 
        scale: 1
    });
    drawText({
        scene: this, 
        text: 'Press Space to Start', 
        pos: ex.vec(engine.drawWidth/2, 240), 
        color: ex.Color.White, 
        scale: 1
    });
    const hurryText = drawText({
        scene: this, 
        text: 'YOU ARE LATE!!!', 
        pos: ex.vec(engine.drawWidth/2, 170), 
        color: ex.Color.White, 
        scale: 2
    });
    hurryText.actions.repeatForever(ctx => {
        ctx.scaleTo(new ex.Vector(1, 1), new ex.Vector(1, 1));
        ctx.scaleTo(new ex.Vector(1.4, 1.4), new ex.Vector(1, 1));
        ctx.delay(250);
    });
  }

  onActivate() {
    this.timer = 0;
    this.background.graphics.opacity = 0;
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
    if(this.timer < 100 && this.timer + elapsed > 100) {
        this._input?.clearAll();
    }
    this.timer += elapsed;
    if(this.timer > 100 && this._input.justPressed('jump')) {
        engine.goToScene('select');
    }
    if(this.timer > this.cycleSeconds * 1000){
        engine.goToScene('attract');
    }
  }
}

const startScreen = new StartScreen();
export { startScreen };