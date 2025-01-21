import { Actor, CollisionType, Engine } from 'excalibur';
import { Queue } from './Queue';
import * as ex from 'excalibur';
import { Resources } from '../../resources';
import { Crate } from './crate';
import { mainLevel } from '../../scenes/level';
import { randomBetween } from '../../utils/helpers';
import { Flock } from './flock';

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
    let height = topHeight + botHeight;
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
    width -= 1;
    const style = random.integer(0, Resources.floors.length-1);
    const resource = Resources.floors[style];
    let members = [];

    members.push(this.getGrouping(resource.topStarts, ex.vec(0,0)));
    members.push(this.getGrouping(resource.botStarts, ex.vec(0, topHeight)));
    for(let i = 1; i < width; i++){
      let x = i * chunkWidth;
      members.push(this.getGrouping(resource.topMids, ex.vec(x, 0)));
      members.push(this.getGrouping(resource.botMids, ex.vec(x, topHeight)));
    }
    let endX = width * chunkWidth
    members.push(this.getGrouping(resource.topEnds, ex.vec(endX, 0)));
    members.push(this.getGrouping(resource.botEnds, ex.vec(endX, topHeight)));
    return new ex.GraphicsGroup({members});
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

class Interior extends Actor {
  private top: Actor;
  private mid: Actor;
  private bot: Actor;

  constructor(x: number, floorHeight: number, unitWidth: number){
    const width = unitWidth * chunkWidth;
    super({
      x,
      y: floorHeight - 192,
      width,
      height: 192 + 96 + 96,
      // color: ex.Color.Red
    });

    this.top = new Actor({
      x: 0,
      y: 48,
      width,
      height: 96,
      collisionType: CollisionType.Fixed
    });
    this.mid = new Actor({
      x: 0,
      y: 144,
      width,
      height: 96,
      collisionType: CollisionType.PreventCollision
    });
    this.bot = new Actor({
      x: 0,
      y: 288,
      width,
      height: 192,
      collisionType: CollisionType.Fixed
    });

    const style = random.integer(0, Resources.interiors[0].interiors.length-1);
    const {topGraphics, midGraphics, botGraphics} = this.generateGraphics(unitWidth, style);
    this.top.graphics.use(new ex.GraphicsGroup({members: topGraphics}));
    this.mid.graphics.use(new ex.GraphicsGroup({members: midGraphics}));
    this.bot.graphics.use(new ex.GraphicsGroup({members: botGraphics}));

    this.addChild(this.top);
    this.addChild(this.mid);
    this.addChild(this.bot);

    this.top.on("collisionstart", (evt: ex.CollisionStartEvent<ex.Collider>) => this.buildingCollider(evt.self, evt.other, evt.side, evt.contact));
    this.bot.on('collisionstart', (evt: ex.CollisionStartEvent<ex.Collider>) => this.buildingCollider(evt.self, evt.other, evt.side, evt.contact));
  }

  buildingCollider(_self: ex.Collider, other: ex.Collider, side: ex.Side, _contact: ex.CollisionContact): void {
    if (side === ex.Side.Left && other.owner == mainLevel.player) {
      mainLevel.speed = 0
      mainLevel.player.vel.x = 0;
      mainLevel.player.pos.x -= 3
    }
  }

  generateGraphics(width: number, style: number){
    const resource = Resources.interiors[0];
    const topGraphics = this.getRowOfGraphics(resource.topStarts, resource.topMids, resource.topEnds, width);
    const midGraphics = this.getRowOfGraphics(resource.interiors[style].intStarts, resource.interiors[style].intMids, resource.interiors[style].intEnds, width);
    const botGraphics = this.getRowOfGraphics(resource.botStarts, resource.botMids, resource.botEnds, width);
    return {topGraphics, midGraphics, botGraphics};
  }

  getRowOfGraphics(start: ex.ImageSource[], middle: ex.ImageSource[], end: ex.ImageSource[], count: number) : ex.GraphicsGrouping[]{
    const set = [];
    const width = 32;
    let current = 0;
    for(current = 0; current < count-1; current++){
      if(current === 0){
        set.push({
          graphic: new ex.Sprite({image: start[random.integer(0, start.length-1)]}),
          offset: new ex.Vector(current * width, 0)
        });
        continue;
      }
      if(current % 3 === 0)
      {
        set.push({
          graphic: new ex.Sprite({image: middle[random.integer(0, middle.length-1)]}),
          offset: new ex.Vector(current * width, 0)
        });
        continue;
      }
      set.push({
        graphic: new ex.Sprite({image: middle[0]}),
        offset: new ex.Vector(current * width, 0)
      });
    }
    set.push({
      graphic: new ex.Sprite({image: end[random.integer(0, end.length-1)]}),
      offset: new ex.Vector(current * width, 0)
    });
    return set;
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
    if(interior)
    {
      const newInterior = new Interior(x, floorHeight, width);
      this.addChild(newInterior);
      this.floors.push(newInterior);
      return
    }

    const newFloor = new Floor(x, floorHeight, width);
    this.addChild(newFloor);
    if(random.bool(birdChance)) this.addBirds(newFloor);
    this.addCrates(newFloor);
    this.floors.push(newFloor);
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
    this.addFloor(20, startHeight, 50, true);
    this.addFloor(10, 200, 100);
    this.addFloor(10, 200, 100);
  }

  setSpeed(speed: number): void {
    this.vel.x = -speed
  }

  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    const pik = this.floors.peek();
    if(pik && ((pik.pos.x + pik.width / 2) + this.pos.x) < 0){
      const floor = this.floors.pop()!;
      floor.kill();
      this.makeRandomFloor();
    }
    this.distance = Math.abs(this.pos.x)
  }

  makeRandomFloor(): void {
    const interior = Math.random() < interiorChance;
    this.addFloor(
      random.integer(minPlatformWidth, maxPlatformWidth), 
      randomBetween(minPlatformHeight, maxPlatformHeight), 
      randomBetween(minGap, maxGap), 
      interior
    );
  }

  
}



export { Floors };