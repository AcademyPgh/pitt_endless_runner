
import * as ex from 'excalibur';
import { playerSheets, Resources } from '../resources';
import { drawText } from '../utils/helpers';
import { scoreProvider } from '../utils/scoreprovider';
import { randomBetween } from '../utils/helpers';

const frameSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.ui.portraitFrame,
  grid: {
    rows: 1,
    columns: 13,
    spriteWidth: 79,
    spriteHeight: 104,
  },
  spacing: {
    originOffset: {x: 1, y: 1},
    margin: {x: 1, y: 1}
  }
});

class StartScene extends ex.Scene {
  private background: ex.Actor;
  private gradient: ex.Actor;
  public playerSkin: ex.SpriteSheet;

  onInitialize(engine: ex.Engine) {
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
    drawText({scene: this, text: 'Choose your Character!', pos: ex.vec(engine.drawWidth/2, 70), color: ex.Color.White, scale: 1.5})
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
    let width = 79
    let height = 104
    let buttonActor = new ex.Actor({
        pos,
        width,
        height,
        color: ex.Color.Transparent
    });
    buttonActor.on('pointerdown', () => this.beginGameWithSkin(skin, engine));
    buttonActor.on('pointerenter', () => {
      buttonActor.color = new ex.Color(255, 255, 255, 0.25);
      buttonActor.children.forEach(child => {
        if (child instanceof ex.Actor) {
          child.graphics.use('active');
        }
      });
    });
    buttonActor.on('pointerleave', () => {
      buttonActor.color = ex.Color.Transparent;
      buttonActor.children.forEach(child => {
        if (child instanceof ex.Actor) {
          child.graphics.use('idle');
        }
      });
    });
    this.drawSelectFrame(buttonActor);
    this.add(buttonActor)
  }

  drawSelectFrame(button: ex.Actor){
    let width = 79;
    let height = 104;
    let frameActor = new ex.Actor({
      //pos: new ex.Vector(button.pos.x, button.pos.y),
      pos: ex.vec(-1, 0),
      width,
      height,
    });
    const activeAnimation = ex.Animation.fromSpriteSheet(
      frameSheet, 
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 
      100,
      ex.AnimationStrategy.Loop    
    );
    const idleAnimation = ex.Animation.fromSpriteSheet(
      frameSheet, 
      [12], 
      100,
      ex.AnimationStrategy.Freeze    
    );
    frameActor.graphics.add('idle', idleAnimation);
    frameActor.graphics.add('active', activeAnimation);
    frameActor.graphics.use('idle');
    button.addChild(frameActor);
  }

  beginGameWithSkin(skin: ex.SpriteSheet, engine: ex.Engine){
    this.playerSkin = skin
    Resources.sounds.character_select.stop()
    engine.goToScene('level')
    scoreProvider.openSession()
  }
}

export const select = new StartScene();