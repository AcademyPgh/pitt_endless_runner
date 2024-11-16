import { Actor, Color, CollisionType, Shape,  Engine, ImageSource } from 'excalibur';
import { Queue } from './Queue';
import * as ex from 'excalibur';
import { Resources } from '../../resources';

const makeFloor = (x: number, floorHeight: number, image: ImageSource, width: number) => {
  const scale = width/image.width;
  const height = image.height * scale
  const floor = new Actor({
    x,
    y: floorHeight + height/2,
    width,
    height,
    color: Color.Rose,
    collisionType: CollisionType.Fixed,
    collider: Shape.Box(width, height),
    z: 50,
  });
  floor.graphics.use(new ex.Sprite({image, destSize:{width, height}}))

  return floor;
}

const interiorSize = 80;
const interiorChance = .4;

class Floors extends Actor {
  private floors: Queue<Actor> = new Queue();

  constructor() {
    super({
      
    });
  }

  addFloor(width: number, floorHeight: number, image: ImageSource, gap: number, interior: boolean = false): void {
    // floors should always be added to the right of the last floor
    // they should always go from their given height to the bottom of the screen
    

    const lastFloor = this.floors.last();
    const x = lastFloor ? lastFloor.pos.x + (lastFloor.width / 2) + (width / 2) + gap : 0 + (width / 2);
    const floor = makeFloor(x, floorHeight, image, width);
    this.addChild(floor);
    if(interior)
    {
      const ceiling = makeFloor(0, floorHeight, image, width)
      ceiling.pos.y = -(interiorSize + ceiling.height)
      floor.addChild(ceiling)
    }

    this.floors.push(floor);
    
  }

  onInitialize(): void {
    this.addFloor(400, 180, Resources.foregrounds[0], 50);
    this.addFloor(300, 200, Resources.foregrounds[0], 50);
    this.addFloor(300, 170, Resources.foregrounds[0], 50);
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
    const index = Math.floor(Math.random() * Resources.foregrounds.length);
    const foreground = Resources.foregrounds[index]
    this.addFloor(width, height, foreground, gap, interior);
  }
}

export { Floors };