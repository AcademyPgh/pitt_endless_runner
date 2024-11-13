import { Actor, ImageSource, vec, Sprite, Engine, Vector } from "excalibur";
import { Resources } from "../../resources";

class BackgroundPane extends Actor {
  private image: Sprite;

  constructor(image: ImageSource, width: number, height: number) {
    super({
      width,
      height,
      pos: vec(0, 0)
    });
    this.image = image.toSprite();
  }

  onInitialize() {
    this.graphics.add(this.image);
    this.graphics.use(this.image);
  }

}

class LevelBackground extends Actor {
  private backgrounds: BackgroundPane[];
  private speed: Vector;

  constructor(backgrounds: ImageSource[]) {
    super({
      width: 500,
      height: 270,
      pos: vec(0, 0),
      z: 0
    });
    this.backgrounds = this.createPanes(backgrounds, 500, 270);
    this.speed = vec(0, 0);
  }

  setSpeed(vel: Vector): void {
    this.speed = vel;
    for(let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].vel = vel;
    }
  }

  createPanes(backgrounds: ImageSource[], width: number, height: number): BackgroundPane[] {
    if(backgrounds.length === 1) {
      backgrounds.push(backgrounds[0]);
    }
    return backgrounds.map((background) => new BackgroundPane(background, width, height));
  }

  onInitialize(engine: Engine): void {
    for(let i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].pos.x = i * this.width;
      this.backgrounds[i].vel = this.speed;
      this.addChild(this.backgrounds[i]);
    }
  }

  onPostUpdate(engine: Engine, delta: number): void {
    for (const background of this.backgrounds) {
      if(background.pos.x <= -this.width) {
        background.pos.x = this.width * (this.backgrounds.length - 1);
      }
    }
  }
}

class WorldBackground extends Actor {
  private layers: LevelBackground[];
  private speed: number;

  constructor(layers: LevelBackground[], speed: number) {
    super({
      width: 500,
      height: 270,
      pos: vec(250, 135),
      z: 0
    });
    this.layers = layers;
    this.speed = speed;
  }

  setSpeed(speed: number): void {
    this.speed = speed;
    for(let i = 0; i < this.layers.length; i++) {
      this.layers[i].setSpeed(vec(speed / (this.layers.length - i), 0));
    }
  }

  onInitialize(engine: Engine): void {
    this.setSpeed(this.speed);
    for(let i = 0; i < this.layers.length; i++) {
      this.layers[i].z = i;
      this.addChild(this.layers[i]);
    }
  }
}

const clouds = [
  Resources.background.cloudscape1,
  Resources.background.cloudscape2,
  Resources.background.cloudscape3,
  Resources.background.cloudscape4
]
const cloudlayer = new LevelBackground(clouds);
const city = [
  Resources.background.city
]
const citylayer = new LevelBackground(city);
const cathedral = [
  Resources.background.cathedral,
  Resources.background.noCathedral
]
const cathedrallayer = new LevelBackground(cathedral);

const Background = new WorldBackground([cloudlayer, citylayer, cathedrallayer], -60);
// const Background = new WorldBackground([cloudlayer], 1);

export { Background };
