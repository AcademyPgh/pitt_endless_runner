
import * as ex from 'excalibur';
import { playerSheets } from '../resources';
class StartScene extends ex.Scene {

public playerSkin: ex.SpriteSheet;
 private selectText = new ex.Text({text: 'Choose your Character', scale: ex.vec(2, 2)})
  onInitialize(engine: ex.Engine) {
    this.drawSelectText();
    this.drawSelectOptions(playerSheets, engine)
  }

  drawSelectText() {
    const textActor = new ex.Actor({pos: ex.vec(250, 50)});
    textActor.graphics.use(this.selectText);
    this.add(textActor);
  }

  drawSelectOptions(skins: ex.SpriteSheet[], engine: ex.Engine){
    const height = 100;
    const xOffset = 50;
    for(let i = 0; i < skins.length; i++){
        let finalX = (i + 1) * xOffset
        this.drawSelectButton(skins[i], ex.vec(finalX, height), engine)
    }

  }

  drawSelectButton(skin: ex.SpriteSheet, position: ex.Vector, engine: ex.Engine)
  {
    let buttonActor = new ex.Actor({
        pos: position,
        width: 30,
        height: 30,
        color: ex.Color.Orange
    })
    buttonActor.on('pointerdown', () => this.beginGameWithSkin(skin, engine))
    this.add(buttonActor)
  }

  beginGameWithSkin(skin: ex.SpriteSheet, engine: ex.Engine){
    this.playerSkin = skin
    engine.goToScene('level')
  }
}

const startScene = new StartScene();
export { startScene };