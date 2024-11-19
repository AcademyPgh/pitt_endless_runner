
import * as ex from 'excalibur';
import { playerSheets, Resources } from '../resources';
import { drawText } from '../tools';
class StartScene extends ex.Scene {

public playerSkin: ex.SpriteSheet;
  onInitialize(engine: ex.Engine) {
    drawText({scene: this, text: 'GAME NAME HERE', pos: ex.vec(engine.drawWidth/2, 50), color: ex.Color.White, scale: 3})
    drawText({scene: this, text: 'Choose your Character', pos: ex.vec(engine.drawWidth/2, 100), color: ex.Color.White, scale: 2})
    this.drawSelectOptions(playerSheets, engine)
  }

  drawSelectOptions(skins: ex.SpriteSheet[], engine: ex.Engine){
    const height = 180;
    const deadZone = 200
    const xOffset = (engine.drawWidth - deadZone)/skins.length
    for(let i = 0; i < skins.length; i++){
        let finalX = i * xOffset + xOffset/2 + deadZone/2
        this.drawSelectButton(skins[i], ex.vec(finalX, height), engine)
    }

  }

  drawSelectButton(skin: ex.SpriteSheet, pos: ex.Vector, engine: ex.Engine)
  {
    let width = 60
    let height = 60
    let buttonActor = new ex.Actor({
        pos,
        width,
        height,
        color: ex.Color.Orange
    })
    let sprite = skin.sprites[0].clone()
    sprite.destSize.height = height
    sprite.destSize.width = width
    buttonActor.graphics.use(sprite)
    buttonActor.on('pointerdown', () => this.beginGameWithSkin(skin, engine))
    this.drawSelectFrame(pos)
    this.add(buttonActor)
  }

  drawSelectFrame(pos: ex.Vector){
    let width = 80
    let height = 80
    let frameActor = new ex.Actor({
      pos,
      width,
      height,
    })
    let image = Resources.ui.portraitFrame
    frameActor.graphics.use(new ex.Sprite({image, destSize:{width, height}}))
    this.add(frameActor)
  }

  beginGameWithSkin(skin: ex.SpriteSheet, engine: ex.Engine){
    this.playerSkin = skin
    engine.goToScene('level')
  }
}

const startScene = new StartScene();
export { startScene };