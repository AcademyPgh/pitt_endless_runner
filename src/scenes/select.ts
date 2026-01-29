
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
  private selectedChar: number = 0;
  private charButtons: ex.Actor[] = [];
  public playerSkin: ex.SpriteSheet;

  onInitialize(engine: ex.Engine) {
    this.gradient = new ex.Actor({
      pos: ex.vec(250, 135),
      width: 500,
      height: 270,
      z: -2
    });
    this.gradient.graphics.use(Resources.ui.gradient.toSprite());
    this.add(this.gradient);

    this.gradient.vel = ex.vec(10, 20);

    this.background = new ex.Actor({
      pos: ex.vec(250, 135),
      width: 500,
      height: 270,
      z: -1
    });
    this.background.graphics.use(Resources.ui.characterSelect.toSprite());
    this.add(this.background);
    this.drawSelectOptions(engine);
    drawText({scene: this, text: 'Choose your Character!', pos: ex.vec(engine.drawWidth/2, 70), color: ex.Color.White, scale: 1.5})
    this.selectCharacter(0);
  }

  onActivate(_context: ex.SceneActivationContext<unknown>): void {
    if(!Resources.sounds.character_select.isPlaying())
    {
      Resources.sounds.character_select.loop = true
      Resources.sounds.character_select.play(.5)
    }
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

  drawSelectOptions(engine: ex.Engine){
    this.drawSelectButton(0, ex.vec(63, 171), engine);
    drawText({scene: this, text: 'PJ', pos: ex.vec(63, 235), color: ex.Color.White, scale: 1});
    drawText({scene: this, text: 'UPJ', pos: ex.vec(63, 250), color: ex.Color.White, scale: 1});
    this.drawSelectButton(1, ex.vec(153, 171), engine);
    drawText({scene: this, text: 'Bruiser', pos: ex.vec(153, 235), color: ex.Color.White, scale: 1});
    drawText({scene: this, text: 'UPG', pos: ex.vec(153, 250), color: ex.Color.White, scale: 1});
    this.drawSelectButton(2, ex.vec(243, 171), engine);
    drawText({scene: this, text: 'Pounce', pos: ex.vec(243, 235), color: ex.Color.White, scale: 1});
    drawText({scene: this, text: 'UPT', pos: ex.vec(243, 250), color: ex.Color.White, scale: 1});
    this.drawSelectButton(3, ex.vec(333, 171), engine);
    drawText({scene: this, text: 'Piper', pos: ex.vec(333, 235), color: ex.Color.White, scale: 1});
    drawText({scene: this, text: 'UPB', pos: ex.vec(333, 250), color: ex.Color.White, scale: 1});
    this.drawSelectButton(4, ex.vec(423, 171), engine);
    drawText({scene: this, text: 'Roc', pos: ex.vec(423, 235), color: ex.Color.White, scale: 1});
    drawText({scene: this, text: 'Oakland', pos: ex.vec(423, 250), color: ex.Color.White, scale: 1});

  }

  selectCharacter(char: number) {
    this.selectedChar = char;
    this.charButtons.forEach((button, index) => {
      if (index === char) {
        button.color = new ex.Color(255, 255, 255, 0.25);
        button.children.forEach(child => {
          if (child instanceof ex.Actor) {
            child.graphics.use('active');
          }
        });
      } else {
        button.color = ex.Color.Transparent;
        button.children.forEach(child => {
          if (child instanceof ex.Actor) {
            child.graphics.use('idle');
          }
        });
      }
    });
  }

  drawSelectButton(char: number, pos: ex.Vector, engine: ex.Engine)
  {
    let width = 79
    let height = 104
    let buttonActor = new ex.Actor({
        pos,
        width,
        height,
        z: 5,
        color: ex.Color.Transparent
    });
    this.charButtons[char] = buttonActor;
    const skin = playerSheets[char];
    buttonActor.on('pointerdown', () => this.beginGameWithSkin(skin, engine));
    buttonActor.on('pointerenter', () => {
      this.selectCharacter(char);       
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
      50,
      ex.AnimationStrategy.Loop    
    );
    activeAnimation.frames[12].duration = 400;

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
    Resources.sounds.character_select.pause()
    engine.goToScene('level')
    scoreProvider.openSession()
  }

  update(engine: ex.Engine, delta: number) {
    super.update(engine, delta);
    if(engine.input.keyboard.wasPressed(ex.Keys.Space)){
      this.beginGameWithSkin(playerSheets[this.selectedChar], engine)
    }
  }
}

export const select = new StartScene();