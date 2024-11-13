import { Engine, Scene, Actor } from 'excalibur';
import { Player } from '../actors/player/player';
import { Background } from '../actors/level/backgrounds';
import { floors } from '../actors/level/floor';

class Level extends Scene {
  private floors: Actor[] = [];
  private speed: number = 100;
  private speedTimer: number = 0;
  private speedInterval: number = 500;
  private maxSpeed: number = 400;
  private player?: Player;

  onInitialize(engine: Engine) {
    // Initialization code
    this.player = new Player();
    engine.add(Background);
    engine.add(this.player);
    engine.add(floors);
  }

  onActivate() {
    // Activation code
    // reset any state

  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    this.speedTimer += delta;
    if (this.speedTimer > this.speedInterval && this.speed < this.maxSpeed) {
      this.speedTimer = 0;
      this.speed += 10;
      floors.setSpeed(this.speed);
      this.player?.setSpeed(this.speed);
    }
  }
}

const mainLevel = new Level();
export { mainLevel };