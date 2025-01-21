import * as ex from 'excalibur';
import { drawText } from '../utils/helpers';
import InputManager from '../utils/input';

const entrySeconds = 1
const lineGap = 20
const headerScale = 1.5
const cycleSeconds = 5
class Credits extends ex.Scene
{
    private _input: InputManager;
    private cycleTimer: number
    private contents = [
    [''],
    ['Created By\nACADEMY PITTSBURGH', ''],
    ['PROJECT MANAGEMENT','John Lange', ''],
    ['PROGRAMMING AND DESIGN','Eduardo Korb', ''],
    ['ART','Mason Trosky', 'Ash Sewell', 'Drew Hawk', 'Jose Luna', 'Matt Weekes', ''],
    ['INITIAL DEVELOPMENT', 'Ariel Allen-Trosky', 'Mason Trosky', 'Juno Antley', 'Sadie Ackerman', 'Teddy Baston', 'Ryan Parent', 'Ash Sewell', ''],
    ['Thanks for playing!']]
    

    onInitialize(engine: ex.Engine): void 
    {
        this.buildCredits(engine)
        
    }
    update(engine: ex.Engine, delta: number): void {
        super.update(engine, delta);
        if(this._input?.justPressed('jump')){
            engine.goToScene('select');
          }
        if(this.cycleTimer > cycleSeconds * 1000){
            //TODO: add to sequence
            engine.goToScene('doglogo');
        }
    }

    buildCredits(engine: ex.Engine){
        let scroller = new ex.Actor()
        let totalSpacing = 0
        let totalDuration = 0
        this.add(scroller)
        for(let x = 0; x < this.contents.length; x++){
            for(let y = 0; y < this.contents[x].length; y++){
                let scale = y == 0 ? headerScale : 1
                totalSpacing += lineGap * scale
                totalDuration += entrySeconds
                drawText({text: this.contents[x][y], actor: scroller, scale, pos: ex.vec(engine.drawWidth/2, totalSpacing)})
                
            }
        }
        totalDuration *= 1000
        scroller.actions.repeatForever(context => 
            context.moveTo({pos: ex.vec(0, -totalSpacing), duration: totalDuration})
                    .moveTo({pos: ex.vec(0, engine.drawHeight), duration: 0}))
    }        
}



export const credits = new Credits();