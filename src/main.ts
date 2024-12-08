
import { select } from "./scenes/select";
import { mainLevel } from "./scenes/level";
import { endScene } from "./scenes/end";
import { loader } from "./resources";
import * as ex from 'excalibur';
import { attract } from "./scenes/attract";

const gravity = 900
class Game extends ex.Engine {
    constructor() {
      super({
        viewport: {width: 1000, height: 540},
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
          end: endScene
        }
      });
    }
    initialize() {
      this.start(loader).then(() => super.goToScene('attract'))
    }
  }
  
  export const game = new Game();
  game.initialize();
  