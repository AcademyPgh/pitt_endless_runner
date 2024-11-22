import * as ex from 'excalibur';
import { LeaderboardEntry } from '../../utils/scoreprovider';
import { drawText } from '../../utils/helpers';

const textScale = 2
export class Leaderboard extends ex.Actor {
    private headerSpacing = 1.5;
    private headerScale = 2.5;
    private entryOffset = 30;
    private boardWidth: number
    constructor(data: LeaderboardEntry[], pos: ex.Vector, width: number){
        super({pos})
        this.boardWidth = width
        this.addEntries(data)
    }

    addEntries(data: LeaderboardEntry[]){
        data.sort(entry => entry.score)
        let positions = this.getElementPositions(3)
        let header = ["Rank", "Name", "Score"]
        this.addEntry(header, positions, 0, this.headerScale)
        for(let i = 0; i < data.length; i++){
            let entryText = [(i+1).toString(), data[i].name, data[i].score.toString()]
            this.addEntry(entryText, positions, i + this.headerSpacing, textScale);
        }
    }

    private addEntry(entryText: string[], positions: ex.Vector[], height: number, scale: number) {
        let entry = new ex.Actor
        for(let i = 0; i < entryText.length; i++){
            drawText({actor: entry, text: entryText[i], pos: positions[i], scale})
        }
        this.addChild(entry);
        entry.pos = ex.vec(0, this.entryOffset * height);
    }

    getElementPositions(count: number) : ex.Vector[]{
        let positions: ex.Vector[] = []
        let startX = -this.boardWidth/2
        let offset = this.boardWidth/count
        for(let i = 0; i < count; i++){
            positions.push(ex.vec(startX + i * offset, 0))
        }
        return positions
    }
}