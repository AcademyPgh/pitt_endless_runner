
import { startScene } from "./scenes/start";
import { mainLevel } from "./scenes/level";
import { endScene } from "./scenes/end";
import { loader } from "./resources";
import * as ex from 'excalibur';

const gravity = 900
class Game extends ex.Engine {
    constructor() {
      super({
        viewport: {width: 1000, height: 540},
        resolution: {width: 500, height: 270},
        pixelArt: true,
        pixelRatio: 2,
        antialiasing: true,
        physics: {
          solver: ex.SolverStrategy.Arcade,
          gravity: ex.vec(0, gravity)
        },
        scenes: {
          start: startScene,
          level: mainLevel,
          end: endScene
        }
      });
    }
    initialize() {
      this.start(loader).then(() => super.goToScene('start'))
    }
  }
  
  export const game = new Game();
  game.initialize();
  