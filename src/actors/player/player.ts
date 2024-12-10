import { Actor, vec, Animation, CollisionType, Collider, CollisionContact, Side, Shape, Engine, Keys, SpriteSheet } from "excalibur";
import { Resources } from "../../resources";
import { startHeight } from "../level/floor";

const RUN = "RUN";
const JUMP = "JUMP";
const FALL = "FALL";
const LAND = "LAND";

const enum States {
  run = "RUN",
  jump = "JUMP",
  fall = "FALL",
  land = "LAND"
}

const jumpMax = 200
const jumpStrength = 350
const playerXtarget = 50;
const recoveryVelocity = 10;

export class Player extends Actor {
  private animations: Record<States, Animation>
  constructor(playerSpriteSheet: SpriteSheet) {
    super({
      z: 100,
      collisionType: CollisionType.Active,
      collider: Shape.Box(25, 34)
    });
    this.resetPlayer()
    this.animations = this.buildAnimationDictionary(playerSpriteSheet)
  }
  
  
  buildAnimationDictionary(playerSpriteSheet: SpriteSheet) : Record<States, Animation>
  {
    return {
      [RUN]: Animation.fromSpriteSheet(playerSpriteSheet, [0, 1, 2, 3, 4, 5], 150),
      [JUMP]: Animation.fromSpriteSheet(playerSpriteSheet, [1], 150),
      [FALL]: Animation.fromSpriteSheet(playerSpriteSheet, [0], 150),
      [LAND]: Animation.fromSpriteSheet(playerSpriteSheet, [3, 4, 5], 150)
    }
  }

  resetPlayer(){
    this.pos = vec(playerXtarget, startHeight + 20)
    this.vel = vec(0, 10)
  }

  private state = States.run;

  onInitialize() {
    this.graphics.use(this.animations[this.state]);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.state === States.jump && this.vel.y >= 0) {
      this.state = States.fall;
      this.graphics.use(this.animations[this.state]);
    }
  }

  private jumpTimer: number = 0


  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
      if(this.state === States.run && engine.input.keyboard.wasPressed(Keys.Space)) {
        this.state = States.jump;
        this.graphics.use(this.animations[this.state]);
        this.jumpTimer = 0;
        Resources.sounds.jump.play(.5)
      }
      else if(engine.input.keyboard.wasReleased(Keys.Space))
        {
          this.jumpTimer = jumpMax;
      }

      if(this.jumpTimer < jumpMax && engine.input.keyboard.isHeld(Keys.Space)){
        this.vel.y = -jumpStrength;
        this.jumpTimer += delta
      }

      // if(this.pos.x != playerXtarget){
      //   let direction = Math.sign(playerXtarget - this.pos.x)
      //   this.vel.x = direction * recoveryVelocity
      // }
  }

  setSpeed(speed: number): void {
    const multiplier = speed / 200;
    this.animations[States.run].speed = multiplier;
  }

  onCollisionStart(_self: Collider, _other: Collider, side: Side, _contact: CollisionContact): void {
    if (side === Side.Bottom) {
      this.playerRun()
    }
  }

  playerRun(){
    this.state = States.run;
      this.graphics.use(this.animations[this.state]);
      this.vel.y = 0;
  }

  onCollisionEnd(_self: Collider, _other: Collider, side: Side, _lastContact: CollisionContact): void {
    if (this.state === States.run && side === Side.Bottom) {
      this.state = States.fall;
      this.graphics.use(this.animations[this.state]);
    }    
  }
}
