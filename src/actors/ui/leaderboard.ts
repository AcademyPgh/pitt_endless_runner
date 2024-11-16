import * as ex from 'excalibur';

const textScale = ex.vec(.5,.5)
class Leaderboard extends ex.Actor {
    private entryOffset = 10;
    constructor(){
        super()
    }

    addEntries(data: LeaderboardData[]){
        for(let i = 0; i < data.length; i++){
            let entry = this.addEntry(data[i])
            this.addChild(entry)
            entry.pos = ex.vec(0, this.entryOffset * i)
        }
    }

    addEntry(data: LeaderboardData) : ex.Actor
    {
        let entry = new LeaderboardEntry
        entry.addTextToEntry(data.place.toString(), 0)
        entry.addTextToEntry(data.name, 5)
        entry.addTextToEntry(data.score.toString(), 15)
        return entry
    }
}

class LeaderboardData{
    public place: number;
    public name: string;
    public score: number;
}

class LeaderboardEntry extends ex.Actor{
    addTextToEntry(contents: string, offset: number){
        let text = new ex.Text({text: contents, scale: textScale})
        let actor = new ex.Actor({pos: ex.vec(offset, 0)})
        actor.graphics.use(text)
        this.addChild(actor)
    }
}