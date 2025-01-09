import * as ex from 'excalibur';
import { birdSheets } from '../../resources';
import { randomBetween } from '../../utils/helpers';
import { mainLevel } from '../../scenes/level';

const animLength = 8
const frameMinDuration = 200
const frameMaxDuration = 400
const triggerDistance = 200
const flightAngle = 10
const minFlyVel = 100
const maxFlyVel = 200
const random = new ex.Random
export class Bird extends ex.Actor
{
    private idleAnimation: ex.Animation
    private flyAnimation: ex.Animation
    private flying = false
    constructor(x: number)
    {
        super({
            x,
            z: 10,
            
        })
        this.getColorAnimations();
        this.idle()
    }

    private getColorAnimations() {
        let colorPick = Math.round(randomBetween(0, 5));
        this.idleAnimation = this.getAnimation(colorPick, 0)
        this.flyAnimation = this.getAnimation(colorPick, animLength / 2)
    }

    getAnimation(colorPick: number, offset: number) : ex.Animation
    {
        let baseFrame = colorPick * animLength;
        let numbers: number[] = [];
        for (let i = 0; i < 4; i++) {
            numbers.push(baseFrame + i + offset);
        }
        let frameOffset = Math.round(randomBetween(0, 4))
        for(let i = 0; i < frameOffset; i++) {
            let number = numbers.pop()
            numbers.push(number!)
        }
        let animation = ex.Animation.fromSpriteSheet(birdSheets, numbers, randomBetween(frameMinDuration, frameMaxDuration))
        if(frameOffset > 1) animation.flipHorizontal = true
        return animation;
    }

    update(engine: ex.Engine, delta: number): void {
        let xDistance = Math.abs(mainLevel.player!.getGlobalPos().x - this.getGlobalPos().x)
        if(xDistance < triggerDistance && !this.flying) this.fly()
    }

    idle()
    {
        this.graphics.use(this.idleAnimation)
    }

    public fly()
    {
        this.graphics.use(this.flyAnimation)
        let direction = random.bool() ? 1 : -1
        this.flyAnimation.flipHorizontal = direction < 0
        this.rotation = -direction * flightAngle * Math.PI/180
        this.vel = ex.vec(direction * random.floating(minFlyVel, maxFlyVel), -1 * random.floating(minFlyVel, maxFlyVel))
        this.flying = true
    }
    
}