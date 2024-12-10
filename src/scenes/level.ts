import { Engine, Scene, Keys } from 'excalibur';
import { Player } from '../actors/player/player';
import { WorldBackground } from '../actors/level/backgrounds';
import { Floors } from '../actors/level/floor';
import { select } from './select';
import { Resources } from '../resources';

class Level extends Scene {
  private baseSpeed = 150;
  public floors: Floors;
  public speed: number;
  private speedIncrement = .3;
  public player?: Player;

  onActivate() {
    this.clear()
    var bg = new WorldBackground;
    this.add(bg);
    this.player = new Player(select.playerSkin);
    this.add(this.player);
    
    this.floors = new Floors()
    this.add(this.floors);
    this.speed = this.baseSpeed
    this.floors.setSpeed(this.speed)
    Resources.sounds.music.play(.5)
    Resources.sounds.music.loop = true
  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
      if(this.speed > 0) this.speed += this.speedIncrement;
      this.floors.setSpeed(this.speed);
      this.player?.setSpeed(this.speed);
    if(this.player?.isOffScreen && this.player.pos.y > 0){
      this.gameover(engine)
    }
    if(engine.input.keyboard.wasPressed(Keys.D)){
      this.gameover(engine)
    }
  }

  gameover(engine: ex.Engine){
    engine.goToScene('end');
    Resources.sounds.music.pause()
  }
}

const mainLevel = new Level();
export { mainLevel };