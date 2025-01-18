import { Engine, Scene, Keys } from 'excalibur';
import { Player } from '../actors/player/player';
import { WorldBackground } from '../actors/level/backgrounds';
import { Floors } from '../actors/level/floor';
import { select } from './select';
import { Resources } from '../resources';
import InputManager from '../utils/input';
import { Game } from '../main';
import * as ex from 'excalibur';
import { drawFullscreenPanel } from '../utils/helpers';

class Level extends Scene {
  private baseSpeed = 150;
  public floors: Floors;
  public speed: number;
  private speedIncrement = .3;
  public player?: Player;
  public crateCount: number;
  private _input: InputManager | null = null;

  onInitialize(engine: Engine): void {
    this._input = (engine as Game).inputManager;
  }

  onActivate() {
    this._input?.clearAll();
    this.clear()
    this.crateCount = 0
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
    let screen = drawFullscreenPanel(engine, Resources.ui.dream);
    screen.graphics.opacity = 0
    this.add(screen)
    let height = engine.canvasHeight
    let width = engine.canvasWidth
    let screen = new ex.Actor({height, width, z: 100, x: width/2, y: height/2})
    let sprite = new ex.Sprite({image: Resources.ui.dream, destSize: {height, width}})
    screen.graphics.use(sprite)
    screen.graphics.opacity = 0
    this.add(screen)
    Resources.sounds.music.pause()
    screen.actions.fade(1, 1000).delay(3000).callMethod(() => engine.goToScene('end'))
  }
}

const mainLevel = new Level();
export { mainLevel };