import { Engine, Scene, Actor, Keys, World } from 'excalibur';
import { Player } from '../actors/player/player';
import { WorldBackground } from '../actors/level/backgrounds';
import { Floors } from '../actors/level/floor';

class Level extends Scene {
  private baseSpeed = 100;
  private floors = new Floors();
  private speed: number = 100;
  private speedTimer: number = 0;
  private speedInterval: number = 500;
  private maxSpeed: number = 400;
  private player?: Player;
  public score: number = 0;

  onInitialize(engine: Engine) {
    // Initialization code
  }

  onActivate() {
    this.clear()
    var bg = new WorldBackground;
    this.add(bg);
    this.player = new Player();
    this.add(this.player);
    
    this.floors = new Floors()
    this.add(this.floors);
    this.speed = this.baseSpeed
    this.floors.setSpeed(this.speed)
    this.score = 0;
  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    this.speedTimer += delta;
    this.score++;
    if (this.speedTimer > this.speedInterval && this.speed < this.maxSpeed) {
      this.speedTimer = 0;
      this.speed += 10;
      this.floors.setSpeed(this.speed);
      this.player?.setSpeed(this.speed);
    }
    if(this.player?.isOffScreen){
      engine.goToScene('end');
    }
    if(engine.input.keyboard.wasPressed(Keys.D)){
      engine.goToScene('end');
    }
  }
}

const mainLevel = new Level();
export { mainLevel };