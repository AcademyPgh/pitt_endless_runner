import { Actor, Color, CollisionType, Shape,  Engine, ImageSource } from 'excalibur';
import { Queue } from './Queue';
import * as ex from 'excalibur';
import { Resources } from '../../resources';
import { Crate } from './crate';
import { mainLevel } from '../../scenes/level';
import { randomBetween } from '../../utils/helpers';
import { Flock } from './flock';

const interiorSize = 90;
const interiorChance = .25;
const birdChance = .4
const minPlatformWidth = 600
const maxPlatformWidth = 1400;
const minPlatformHeight = 100
const maxPlatformHeight = 200;
const minGap = 100;
const maxGap = 200;
const maxCrates = 2;
const random = new ex.Random

export const startHeight = 100;

class Floor extends Actor {
  constructor(x: number, floorHeight: number, image: ImageSource, width: number){
    const scale = width/image.width;
    const height = image.height * scale
    super({
    x,
    y: floorHeight + height/2,
    width,
    height,
    color: Color.Rose,
    collisionType: CollisionType.Fixed,
    collider: Shape.Box(width, height),
    });
    this.graphics.use(new ex.Sprite({image, destSize:{width, height}}))
  }

  onCollisionStart(_self: ex.Collider, other: ex.Collider, side: ex.Side, _contact: ex.CollisionContact): void {
    if (side === ex.Side.Left && other.owner == mainLevel.player) {
      mainLevel.speed = 0
      mainLevel.player.vel.x = 0;
      mainLevel.player.pos.x -= 3
    }
  }
}

class Floors extends Actor {
  private floors: Queue<Actor> = new Queue();
  public distance = 0;

  constructor() {
    super({
      
    });
  }

  addFloor(image: ImageSource, width: number, floorHeight: number, gap: number, interior: boolean = false): void {
    // floors should always be added to the right of the last floor
    // they should always go from their given height to the bottom of the screen
    const lastFloor = this.floors.last();
    const x = lastFloor ? lastFloor.pos.x + (lastFloor.width / 2) + (width / 2) + gap : 0 + (width / 2);
    const floor = new Floor(x, floorHeight, image, width);
    this.addChild(floor);
    if(interior) this.addInterior(floorHeight, image, width, floor);
    else if(random.bool(birdChance)) this.addBirds(floor)
    this.addCrates(floor);
    
    

    this.floors.push(floor);
    
  }

  private addInterior(floorHeight: number, image: ImageSource, width: number, floor: Floor) {
    const ceiling = new Floor(0, floorHeight, image, width);
    ceiling.pos.y = -(interiorSize + ceiling.height);
    floor.addChild(ceiling);
  }

  private addCrates(floor: Floor) {
    let crateCount = randomBetween(-2, maxCrates);
    crateCount < 0 ? crateCount = 0 : crateCount = crateCount;
    for (let i = 0; i < crateCount; i++) {
      let crateX = floor.width / (crateCount + 1) * (i + 1);
      crateX -= floor.width / 2;
      const crate = new Crate(crateX, -floor.height / 2);
      floor.addChild(crate);
    }
  }

  private addBirds(floor: Floor){
    let flock = new Flock(floor)
    floor.addChild(flock)
  }

  onInitialize(): void {
    this.addFloor(Resources.foregrounds[0], 700, startHeight,  50, true);
    this.addFloor(Resources.foregrounds[0], 800, 200, 50);
    this.addFloor(Resources.foregrounds[0], 500, 200,  50);
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
    this.distance = Math.abs(this.pos.x)
  }

  makeRandomFloor(): void {
    const interior = Math.random() < interiorChance;
    const index = Math.floor(Math.random() * Resources.foregrounds.length);
    const foreground = Resources.foregrounds[index]
    this.addFloor(foreground, randomBetween(minPlatformWidth, maxPlatformWidth), 
    randomBetween(minPlatformHeight, maxPlatformHeight), 
    randomBetween(minGap, maxGap), interior);
  }

  
}



export { Floors };