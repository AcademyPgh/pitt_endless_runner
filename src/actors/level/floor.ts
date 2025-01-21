import { Actor, CollisionType, Engine } from 'excalibur';
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
const minPlatformWidth = 10
const maxPlatformWidth = 25;
const minPlatformHeight = 100
const maxPlatformHeight = 200;
const minGap = 100;
const maxGap = 200;
const maxCrates = 2;
const random = new ex.Random

export const startHeight = 100;

const topHeight = 64
const botHeight = 192
const chunkWidth = 32

class Floor extends Actor {
  constructor(x: number, floorHeight: number, unitWidth: number){
    let height = topHeight + botHeight
    let width = unitWidth * chunkWidth
    super({
    x,
    y: floorHeight + height/2,
    width,
    height,
    collisionType: CollisionType.Fixed,
     });
    this.graphics.use(this.buildFloorGraphic(unitWidth))
  }

  buildFloorGraphic(width: number)
  {
    width -= 1
    const style = random.integer(0, Resources.floors.length-1);
    let members = [this.getGrouping(Resources.floors[style].topStarts, ex.vec(0,0))]
    members.push(this.getGrouping(Resources.floors[style].botStarts, ex.vec(0, topHeight)))
    for(let i = 1; i < width; i++){
      let x = i * chunkWidth
      members.push(this.getGrouping(Resources.floors[style].topMids, ex.vec(x, 0)))
      members.push(this.getGrouping(Resources.floors[style].botMids, ex.vec(x, topHeight)))
    }
    let endX = width * chunkWidth
    members.push(this.getGrouping(Resources.floors[style].topEnds, ex.vec(endX, 0)))
    members.push(this.getGrouping(Resources.floors[style].botEnds, ex.vec(endX, topHeight)))
    return new ex.GraphicsGroup({members})
  }

  getGrouping(graphics: ex.ImageSource[], offset: ex.Vector) : ex.GraphicsGrouping{
    let index = random.integer(0, graphics.length-1)
    let graphic = new ex.Sprite({image: graphics[index]})
    return {graphic, offset}
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

  addFloor(width: number, floorHeight: number, gap: number, interior: boolean = false): void {
    // floors should always be added to the right of the last floor
    // they should always go from their given height to the bottom of the screen
    const lastFloor = this.floors.last();

    const x = lastFloor ? lastFloor.pos.x + (lastFloor.width / 2) + (width * chunkWidth / 2) + gap : width * chunkWidth / 2;
    const newFloor = new Floor(x, floorHeight, width);
    this.addChild(newFloor);
    if(interior) this.addInterior(floorHeight, width, newFloor);
    else if(random.bool(birdChance)) this.addBirds(newFloor)
    this.addCrates(newFloor);
    
    this.floors.push(newFloor);
    
  }

  private addInterior(floorHeight: number, width: number, floor: Floor) {
    const ceiling = new Floor(0, floorHeight, width);
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
    this.addFloor(20, startHeight,  50, true);
    this.addFloor(10, 200, 100);
    this.addFloor(10, 200, 100);
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
    this.addFloor(random.integer(minPlatformWidth, maxPlatformWidth), 
    randomBetween(minPlatformHeight, maxPlatformHeight), 
    randomBetween(minGap, maxGap), interior);
  }

  
}



export { Floors };