import { Actor, Color, CollisionType, Shape, vec, Engine } from 'excalibur';

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

class Queue<T> {
  private head: QueueItem<T> | null = null;
  private tail: QueueItem<T> | null = null;
  private _length: number = 0;

  push(value: T): void {
    const item = new QueueItem(value);
    if (this.head === null) {
      this.head = item;
      this.tail = item;
    } else {
      item.prev = this.tail;
      this.tail!.next = item;
      this.tail = item;
    }
    this._length += 1;
  }

  pop(): T | null {
    if (this.head === null) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head !== null) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this._length -= 1;
    return value;
  }

  peek(): T | null {
    return this.head?.value ?? null;
  }

  last(): T | null {
    return this.tail?.value ?? null;
  }

  get length(): number {
    return this._length;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if (current === null) {
          return { done: true, value: null };
        }
        const value = current.value;
        current = current.next;
        return { done: false, value };
      }
    };
  }
}

class QueueItem<T> {
  value: T;
  next: QueueItem<T> | null = null;
  prev: QueueItem<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
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

const floors = new Floors();
export { floors };