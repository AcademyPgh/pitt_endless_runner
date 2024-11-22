import * as ex from 'excalibur';
export class InputField extends ex.Actor{
    public contents: string
    private textDisplay = new ex.Text({text: ""})
    private maxLength: number
    constructor(pos: ex.Vector, maxLength: number){
        super({pos})
        this.contents = ""
        this.graphics.use(this.textDisplay)
        this.maxLength = maxLength

    }

    onInitialize(engine: ex.Engine): void {
        engine.input.keyboard.on("press", (evt: ex.KeyEvent) => this.readKeyPress(evt));
    }

    readKeyPress(evt: ex.KeyEvent){
        let keyPhrase = evt.key.toString()
        if(evt.key == ex.Keys.Backspace && this.contents.length > 0)
        {
            this.contents = this.contents.substring(0, this.contents.length - 1);
        }
        else if(keyPhrase.includes("Key") && this.contents.length < this.maxLength)
        {
            keyPhrase = keyPhrase.replace("Key", "")
            this.contents += keyPhrase
        }
        this.textDisplay.text = this.contents
    }

    clear(){
        this.contents = ""
        this.textDisplay.text = this.contents
    }
}