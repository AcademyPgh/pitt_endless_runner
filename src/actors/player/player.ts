import { Actor, vec, Animation, CollisionType, Collider, CollisionContact, Side, Shape, Engine, Keys } from "excalibur";
import { playerSpriteSheet } from "../../resources";

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

const animations: {[key in States]: Animation} = {
  [RUN]: Animation.fromSpriteSheet(playerSpriteSheet, [0, 1, 2, 3, 4, 5], 150),
  [JUMP]: Animation.fromSpriteSheet(playerSpriteSheet, [1], 150),
  [FALL]: Animation.fromSpriteSheet(playerSpriteSheet, [0], 150),
  [LAND]: Animation.fromSpriteSheet(playerSpriteSheet, [3, 4, 5], 150)
} 

export class Player extends Actor {
  constructor() {
    super({
      z: 100,
      collisionType: CollisionType.Active,
      collider: Shape.Box(39, 34)
    });
    this.resetPlayer()
  }

  resetPlayer(){
    this.pos = vec(50, 200)
    this.vel = vec(0, 10)
  }

  private state = States.run;

  onInitialize() {
    this.graphics.add(animations[RUN]);
    this.graphics.add(animations[JUMP]);
    this.graphics.add(animations[FALL]);
    this.graphics.add(animations[LAND]);
    this.graphics.use(animations[this.state]);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    this.vel.y += 300 * (delta/1000);
    if (this.state === States.jump && this.vel.y >= 0) {
      this.state = States.fall;
      this.graphics.use(animations[this.state]);
    }
  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    //if(this.state === States.run){
      if(engine.input.keyboard.wasPressed(Keys.Space)) {
        this.vel.y = -160;
        this.state = States.jump;
        this.graphics.use(animations[this.state]);
      }
    //}
  }

  setSpeed(speed: number): void {
    const multiplier = speed / 100;
    animations[States.run].speed = multiplier;
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
      this.graphics.use(animations[this.state]);
      this.vel.y = 0;
  }

  onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
    if (this.state === States.run && side === Side.Bottom) {
      this.state = States.fall;
      this.graphics.use(animations[this.state]);
    }    
  }
}
