import * as ex from 'excalibur';
import { mainFont } from '../../utils/font';
import { loopClamp } from '../../utils/helpers';
import { Resources } from '../../resources';

const letterSpacing = 30;
const arrowHeight = 25
const arrowSize = 30
const buttonHeight = 40
const buttonWidth = 30
const charScale = 2

export class ArcadeInput extends ex.Actor{
    private fields: InputLetter[] = []
    private activeIndex = 0
    constructor(pos: ex.Vector, maxLength: number){
            super({pos, height: 100, width: 100})
            this.generateLetters(maxLength)
        }
    
    generateLetters(maxLength: number){
        let halfWidth = maxLength * letterSpacing/2
        for(let i = 0; i < maxLength; i++){
            let letter = new InputLetter(i * letterSpacing - halfWidth)
            letter.on('pointerdown', () => this.setActive(i))
            this.fields.push(letter)
            this.addChild(letter)
        }
        this.setActive(0)
    }
    
    public getContents(){
        let output = ""
        for(let i = 0; i < this.fields.length; i++){
            output += this.fields[i].getCharacter()
        }
        return output
    }

    public clear(){
        for(let i = 0; i < this.fields.length; i++){
            this.fields[i].reset()
        }
        this.setActive(0)
    }
    
    setActive(index: number){
        this.activeIndex = loopClamp(index, 0, this.fields.length - 1)
        for(let i = 0; i < this.fields.length; i++){
            this.fields[i].toggleActive(i == this.activeIndex)
        }
    }

    onInitialize(engine: ex.Engine): void {
            engine.input.keyboard.on("press", (evt: ex.KeyEvent) => this.readKeyPress(evt));
    }
    
    readKeyPress(evt: ex.KeyEvent){
        let keyPhrase = evt.key.toString()
        if(evt.key == ex.Keys.Backspace)
        {
            this.setActive(this.activeIndex - 1)
        }
        else if(keyPhrase.includes("Key"))
        {
            keyPhrase = keyPhrase.replace("Key", "")
            this.fields[this.activeIndex].forceCharacter(keyPhrase)
            this.setActive(this.activeIndex + 1)
        }
    }
}



const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
class InputLetter extends ex.Actor{
    private charIndex = 0
    private numberText: ex.Text
    private arrows: ex.Actor[] = []
    
    constructor(x: number){
        super({pos: ex.vec(x, 0), height: buttonHeight, width: buttonWidth})
        this.addArrow(1)
        this.addArrow(-1)
        this.numberText = new ex.Text({text: "A", font: mainFont, scale: ex.vec(charScale, charScale)})
        this.changeCharacter(0)
        this.graphics.use(this.numberText)
        
        this.setActorInteractions(this)
    }

    addArrow(direction: number){
        let arrow = new ex.Actor({y: arrowHeight * direction, height: arrowSize, width: arrowSize})
        let sprite = new ex.Sprite({image: Resources.ui.arrow, destSize: {width: arrowSize, height: arrowSize}})
        sprite.flipVertical = direction > 0
        arrow.graphics.use(sprite)
        arrow.on('pointerdown', () => this.changeCharacter(direction))
        this.setActorInteractions(arrow)
        this.arrows.push(arrow)
        this.addChild(arrow)
        this.toggleActive(false)
    }

    setActorInteractions(actor: ex.Actor){
        actor.on('pointerenter', () => this.arrowFlash(actor))
        actor.on('pointerup', () => this.arrowFlash(actor))
        actor.on('pointerleave', () => {actor.actions.clearActions(); actor.graphics.opacity = 1})
    }

    arrowFlash(arrow: ex.Actor){
        arrow.actions.repeatForever((context) => context.fade(0, 300).fade(1, 300))
    }

    changeCharacter(direction: number = 0){
        this.charIndex += direction
        this.charIndex = loopClamp(this.charIndex, 0, characters.length - 1)
        this.numberText.text = this.getCharacter()
    }

    public getCharacter(){
        return characters[this.charIndex]
    }

    public reset(){
        this.charIndex = 0
        this.changeCharacter()
    }

    public toggleActive(setting: boolean){
        this.arrows.forEach(element => {
            this.removeChild(element)
            element.actions.clearActions()
            element.graphics.opacity = 1
            if(setting) this.addChild(element)
        });
    }

    public forceCharacter(char: string){
        let index = characters.indexOf(char)
        if(index < 0) return
        this.charIndex = index
        this.changeCharacter()
    }
}