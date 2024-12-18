
import * as ex from 'excalibur';
import { playerSheets, Resources } from '../resources';
// import { drawText } from '../utils/helpers';
import { scoreProvider } from '../utils/scoreprovider';
import { randomBetween } from '../utils/helpers';

class StartScene extends ex.Scene {
  private background: ex.Actor;
  private gradient: ex.Actor;
  public playerSkin: ex.SpriteSheet;

  onInitialize(engine: ex.Engine) {
    //drawText({scene: this, text: 'Choose your Character!', pos: ex.vec(engine.drawWidth/2, 70), color: ex.Color.White, scale: 1.5})
    this.gradient = new ex.Actor({
      pos: ex.vec(250, 135),
      width: 500,
      height: 270
    });
    this.gradient.graphics.use(Resources.ui.gradient.toSprite());
    this.add(this.gradient);

    this.gradient.vel = ex.vec(10, 20);

    this.background = new ex.Actor({
      pos: ex.vec(250, 135),
      width: 500,
      height: 270
    });
    this.background.graphics.use(Resources.ui.characterSelect.toSprite());
    this.add(this.background);
    this.drawSelectOptions(playerSheets, engine);
  }

  onActivate(_context: ex.SceneActivationContext<unknown>): void {
    Resources.sounds.character_select.loop = true
    Resources.sounds.character_select.play(.5)
  }

  onPreDraw(_ctx: ex.ExcaliburGraphicsContext, _delta: number): void {
    if(this.gradient.pos.y > 245){
      this.gradient.vel = ex.vec(this.gradient.vel.x, -20);
    }
    if(this.gradient.pos.y < 115){
      this.gradient.vel = ex.vec(this.gradient.vel.x, 20);
    }
    if(this.gradient.pos.x > 270){
      this.gradient.vel = ex.vec(randomBetween(-2, -10), this.gradient.vel.y);
    }
    if(this.gradient.pos.x < 230){
      this.gradient.vel = ex.vec(randomBetween(2, 10), this.gradient.vel.y);
    }
  }

  drawSelectOptions(skins: ex.SpriteSheet[], engine: ex.Engine){
    this.drawSelectButton(skins[0], ex.vec(63, 171), engine);
    this.drawSelectButton(skins[1], ex.vec(153, 171), engine);
    this.drawSelectButton(skins[2], ex.vec(243, 171), engine);
    this.drawSelectButton(skins[0], ex.vec(333, 171), engine);
    this.drawSelectButton(skins[1], ex.vec(423, 171), engine);

  }

  drawSelectButton(skin: ex.SpriteSheet, pos: ex.Vector, engine: ex.Engine)
  {
    let width = 75
    let height = 100
    let buttonActor = new ex.Actor({
        pos,
        width,
        height
    })
    buttonActor.on('pointerdown', () => this.beginGameWithSkin(skin, engine))
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
    Resources.sounds.character_select.stop()
    engine.goToScene('level')
    scoreProvider.openSession()
  }
}

export const select = new StartScene();