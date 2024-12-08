import * as ex from 'excalibur';
import { LeaderboardEntry } from '../../utils/scoreprovider';
import { drawText } from '../../utils/helpers';

const textScale = 2
const headerSpacing = 2.5;
const headerScale = 2.5;
const entryOffset = 30;
const scrollSpeed = 20;

export class Leaderboard extends ex.Actor {
    
    private boardWidth: number
    private totalHeight: number
    private scroller: ex.Actor
    constructor(data: LeaderboardEntry[], pos: ex.Vector, width: number){
        super({pos})
        this.boardWidth = width
        this.buildScroller(data);
        let overlayUpper = this.drawUpperOverlay(width);
        this.addEntries(data, overlayUpper)
    }

    private drawUpperOverlay(width: number) {
        let overlayUpper = new ex.Actor({ width: width * 2, height: 100, color: ex.Color.Black, z: 5 });
        this.addChild(overlayUpper);
        let text = drawText({ text: "HIGH SCORES", scale: 3, actor: overlayUpper, color: ex.Color.White });
        text.z = 10;
        return overlayUpper;
    }

    private buildScroller(data: LeaderboardEntry[]) {
        this.totalHeight = data.length * entryOffset;
        this.scroller = new ex.Actor({ vel: ex.vec(0, -scrollSpeed) });
        this.addChild(this.scroller);
    }

    addEntries(data: LeaderboardEntry[], overlay: ex.Actor){
        let positions = this.getElementPositions(3)
        let headerText = ["Rank", "Name", "Score"]
        let header = this.addEntry(headerText, positions, 1, headerScale, 5)
        overlay.addChild(header)
        
        for(let i = 0; i < data.length; i++){
            let entryText = [(i+1).toString(), data[i].name, data[i].score.toString()]
            let entry = this.addEntry(entryText, positions, i + headerSpacing, textScale);
            this.scroller.addChild(entry);
        }
    }

    private addEntry(entryText: string[], positions: ex.Vector[], height: number, scale: number, z: number = 0) {
        let entry = new ex.Actor
        for(let i = 0; i < entryText.length; i++){
            drawText({actor: entry, text: entryText[i], pos: positions[i], scale, color: ex.Color.White}).z = z
        }
        entry.pos = ex.vec(0, entryOffset * height);
        return entry
    }

    getElementPositions(count: number) : ex.Vector[]{
        let positions: ex.Vector[] = []
        let startX = -this.boardWidth/3
        let offset = this.boardWidth/count
        for(let i = 0; i < count; i++){
            positions.push(ex.vec(startX + i * offset, 0))
        }
        return positions
    }

    update(_engine: ex.Engine, _delta: number): void {
        if(this.scroller.pos.y < -this.totalHeight || this.scroller.pos.y > 0) 
            this.scroller.vel.y *= -1
    }
}