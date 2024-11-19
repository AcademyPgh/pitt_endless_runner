import * as ex from 'excalibur';

export function drawText(args: TextArgs) : ex.Actor{
    let scale = args.scale == undefined ? 1 : args.scale
    let text = new ex.Text({text: args.text, scale: ex.vec(scale, scale), color: args.color, font: args.font})
    const textActor = new ex.Actor({pos: args.pos});
    textActor.graphics.use(text);
    if(args.scene) args.scene.add(textActor)
    else if(args.actor) args.actor.addChild(textActor)
    return textActor
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