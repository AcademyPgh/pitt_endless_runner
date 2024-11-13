import { Actor, Color, CollisionType, Shape, vec, Engine } from 'excalibur';
import { Queue } from './Queue';

const makeFloor = (x: number, y: number, width: number, height: number) => {
  const floor = new Actor({
    x,
    y,
    width,
    height,
    color: Color.Rose,
    collisionType: CollisionType.Fixed,
    collider: Shape.Box(width, height),
    vel: vec(-100, 0),
    z: 50
  });

  return floor;
}

class Floors extends Actor {
  private floors: Queue<Actor> = new Queue();
  private speed: number = 100;

  constructor() {
    super({
      z: 1
    });
  }

  addFloor(width: number, height: number, gap: number): void {
    // floors should always be added to the right of the last floor
    // they should always go from their given height to the bottom of the screen
    const lastFloor = this.floors.last();
    const x = lastFloor ? lastFloor.pos.x + (lastFloor.width / 2) + (width / 2) + gap : 0 + (width / 2);
    const blockHeight = 270 - height;
    const floor = makeFloor(x, height + blockHeight/2, width, blockHeight);
    floor.vel.x = -this.speed;
    this.floors.push(floor);
    this.addChild(floor);
  }

  onInitialize(): void {
    this.addFloor(400, 180, 50);
    this.addFloor(300, 200, 50);
    this.addFloor(300, 170, 50);
  }

  setSpeed(speed: number): void {
    this.speed = speed;
    for (const floor of this.floors) {
      floor.vel.x = -speed;
    }
  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    if(this.floors.peek()!.pos.x < -250) {
      const floor = this.floors.pop()!;
      floor.kill();
      this.makeRandomFloor(0, this.floors.last()!);
    }
  }

  makeRandomFloor(x: number, lastFloor: Actor): void {
    const width = Math.random() * 100 + 300;
    const height = Math.random() * 100 + 100;
    const gap = Math.random() * 50 + 50;
    this.addFloor(width, height, gap);
  }
}

export { Floors };