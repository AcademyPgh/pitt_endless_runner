
import { select } from "./scenes/select";
import { mainLevel } from "./scenes/level";
import { endScene } from "./scenes/end";
import { gameover } from "./scenes/gameover";
import * as ex from 'excalibur';
import { attract } from "./scenes/attract";
import { loader } from "./scenes/loading";
import InputManager from "./utils/input";

const gravity = 1200
class Game extends ex.Engine {
    public inputManager = new InputManager()

    constructor() {
      super({
        resolution: {width: 500, height: 270},
        pixelArt: true,
        pixelRatio: 2,
        antialiasing: false,
        physics: {
          solver: ex.SolverStrategy.Arcade,
          gravity: ex.vec(0, gravity)
        },
        scenes: {
          attract: attract,
          select: select,
          level: mainLevel,
          gameover: gameover,
          end: endScene
        },
        pointerScope: ex.PointerScope.Document
      });
    }
    initialize() {
      this.input.keyboard.on('press', (evt: ex.KeyEvent) => {
        if(evt.key === ex.Keys.Space) {
          this.inputManager.handleButtonDown('jump', 'space');
        }
        if(evt.key === ex.Keys.Enter) {
          this.inputManager.handleButtonDown('start', 'enter');
        }
      });
      this.input.keyboard.on('release', (evt: ex.KeyEvent) => {
        if(evt.key === ex.Keys.Space) {
          this.inputManager.handleButtonUp('jump', 'space');
        }
        if(evt.key === ex.Keys.Enter) {
          this.inputManager.handleButtonUp('start', 'enter');
        }
      });
      this.input.pointers.on('down', (evt: ex.PointerEvent) => {
        if(evt.button === "Left") {
          this.inputManager.handleButtonDown('jump', 'mouseLeft');
        }
      });
      this.input.pointers.on('up', (evt: ex.PointerEvent) => {
        if(evt.button === "Left") {
          this.inputManager.handleButtonUp('jump', 'mouseLeft');
        }
      });
      this.input.pointers.on('cancel', () => {
        this.inputManager.handleButtonUp('jump', 'mouseLeft');
      });

      this.start(loader).then(() => super.goToScene('attract'))
    }
    onPreUpdate(engine: ex.Engine, delta: number): void {
      this.inputManager.preUpdate();
      super.onPreUpdate(engine, delta);
    }
  }
  
  const game = new Game();
  game.initialize();
  export {game};
  export type { Game };