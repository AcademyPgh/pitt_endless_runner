import { Actor, vec, Animation, CollisionType, Collider, CollisionContact, Side, Shape, Engine, Keys, SpriteSheet } from "excalibur";

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



const jumpMax = 250
const jumpStrength = 200
const gravityStrength = 600;

export class Player extends Actor {
  private animations: Record<States, Animation>
  constructor(playerSpriteSheet: SpriteSheet) {
    super({
      z: 100,
      collisionType: CollisionType.Active,
      collider: Shape.Box(39, 34)
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
    this.pos = vec(50, 200)
    this.vel = vec(0, 10)
  }

  private state = States.run;

  onInitialize() {
    this.graphics.use(this.animations[this.state]);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    this.vel.y += gravityStrength * (delta/1000);
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
      }
      else if(engine.input.keyboard.wasReleased(Keys.Space))
        {
          this.jumpTimer = jumpMax;
      }

      if(this.jumpTimer < jumpMax && engine.input.keyboard.isHeld(Keys.Space)){
        this.vel.y = -jumpStrength;
        this.jumpTimer += delta
      }
  }

  setSpeed(speed: number): void {
    const multiplier = speed / 100;
    this.animations[States.run].speed = multiplier;
  }

  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (side === Side.Bottom) {
      this.playerRun()
    }
    if (side === Side.Left || side === Side.Right) {
      this.vel.x = 0;
    }
  }

  playerRun(){
    this.state = States.run;
      this.graphics.use(this.animations[this.state]);
      this.vel.y = 0;
  }

  onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
    if (this.state === States.run && side === Side.Bottom) {
      this.state = States.fall;
      this.graphics.use(this.animations[this.state]);
    }    
  }
}
