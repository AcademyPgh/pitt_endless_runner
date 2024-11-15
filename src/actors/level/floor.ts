import { Actor, Color, CollisionType, Shape,  Engine } from 'excalibur';
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
    z: 50,
  });

  return floor;
}

const interiorSize = 80;
const blockHeight = 400;
const interiorChance = .4;

class Floors extends Actor {
  private floors: Queue<Actor> = new Queue();

  constructor() {
    super({
      
    });
  }

  addFloor(width: number, height: number, gap: number, interior: boolean = false): void {
    // floors should always be added to the right of the last floor
    // they should always go from their given height to the bottom of the screen
    const lastFloor = this.floors.last();
    const x = lastFloor ? lastFloor.pos.x + (lastFloor.width / 2) + (width / 2) + gap : 0 + (width / 2);
    const floor = makeFloor(x, height + blockHeight/2, width, blockHeight);
    this.addChild(floor);
    if(interior)
    {
      const ceilingHeight = interiorSize + blockHeight;
      const ceiling = makeFloor(0, -ceilingHeight, width, blockHeight)
      floor.addChild(ceiling)
    }

    this.floors.push(floor);
    
  }

  onInitialize(): void {
    this.addFloor(400, 180, 50);
    this.addFloor(300, 200, 50);
    this.addFloor(300, 170, 50);
  }

  setSpeed(speed: number): void {
    this.vel.x = -speed
  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    if(this.floors.peek()!.isOffScreen) {
      const floor = this.floors.pop()!;
      floor.kill();
      this.makeRandomFloor();
    }
  }

  makeRandomFloor(): void {
    const width = Math.random() * 100 + 300;
    const height = Math.random() * 100 + 100;
    const gap = Math.random() * 50 + 50;
    const interior = Math.random() < interiorChance;
    this.addFloor(width, height, gap, interior);
  }
}

export { Floors };