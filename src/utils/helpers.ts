import * as ex from 'excalibur';
import { mainFont } from './font';

export function randomBetween(min: number, max: number) : number{
    return Math.random() * (max-min) + min
  }
export function drawText(args: TextArgs) : ex.Actor{
    let scale = args.scale == undefined ? 1 : args.scale
    let text = new ex.Text({text: args.text, scale: ex.vec(scale, scale), color: args.color, font: mainFont, maxWidth: 480})
    const textActor = new ex.Actor({pos: args.pos});
    textActor.graphics.use(text);
    if(args.scene) args.scene.add(textActor)
    else if(args.actor) args.actor.addChild(textActor)
    return textActor
}

export function loopClamp(x: number, min: number, max: number){
    if(x < min) return max
    else if(x > max) return min
    return x
}

export function drawFullscreenPanel(engine: ex.Engine, image: ex.ImageSource) {
    let height = engine.canvasHeight;
    let width = engine.canvasWidth;
    let screen = new ex.Actor({ height, width, z: 100, x: width / 2, y: height / 2 });
    let sprite = new ex.Sprite({ image, destSize: { height, width } });
    screen.graphics.use(sprite);
    return screen;
  }

export interface TextArgs{

    text: string,
    scene?: ex.Scene,
    actor?: ex.Actor,
    pos?: ex.Vector,
    scale?: number,
    color?: ex.Color,
    font?: ex.Font
}

