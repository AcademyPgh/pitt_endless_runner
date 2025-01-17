import * as ex from 'excalibur';
import { mainLevel } from '../../scenes/level';
import { Resources } from '../../resources';

const crateHeight = 16;
const crateWidth = 16;
const kickVelocity = 300;
const kickAngular = 1;
const speedPenalty = .8;
const noCollide = ex.CollisionGroup.collidesWith([])
export class Crate extends ex.Actor
{
    constructor(x: number, floorHeight: number)
    {
        super({
            x,
            y: floorHeight- crateHeight/2,
            z: 5,
            color: ex.Color.Blue,
            height: crateHeight,
            width: crateWidth,
            collisionType: ex.CollisionType.Active
        })
        this.collider.useBoxCollider(1, crateHeight);
        this.graphics.use(new ex.Sprite({image: Resources.crates[0], destSize: {height: crateHeight, width: crateWidth }}))
    }

    onCollisionStart(_self: ex.Collider, other: ex.Collider, _side: ex.Side, _contact: ex.CollisionContact): void {
        if(other.owner != mainLevel.player) return
        mainLevel.speed *= speedPenalty;
        mainLevel.crateCount++
        this.vel = ex.vec(mainLevel.speed * 1.5, -kickVelocity)
        this.angularVelocity = kickAngular
        this.body.group = noCollide
    }
}