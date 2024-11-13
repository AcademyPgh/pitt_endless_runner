import { Engine, Actor } from "excalibur";
import { mainLevel } from "./scenes/level";
import { endScene } from "./scenes/end";
import { loader } from "./resources";

class Game extends Engine {
    constructor() {
      super({
        viewport: {width: 1000, height: 540},
        resolution: {width: 500, height: 270},
        pixelArt: true,
        pixelRatio: 2,
        scenes: {
          level: mainLevel,
          end: endScene
        }
      });
    }
    initialize() {
      this.start(loader).then(() => super.goToScene('level'))
    }
  }
  
  export const game = new Game();
  game.initialize();
  