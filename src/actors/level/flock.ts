import * as ex from 'excalibur';
import { Bird } from './bird';
import { randomBetween } from '../../utils/helpers';

const size = 5
const birdHeight = 5
const birdMinGap = 8
const birdMaxGap = 20
export class Flock extends ex.Actor
{
    constructor(floor: ex.Actor)
    {
        super({
            y: -floor.height/2 - birdHeight,
            z: 10
        })
        
        let i = 0
        let totalGap = 0
        while(i < size){
            let bird = new Bird(totalGap)
            this.addChild(bird)
            i++
            totalGap += randomBetween(birdMinGap, birdMaxGap)
        }       
    }
}