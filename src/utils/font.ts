import * as ex from 'excalibur';
import { Resources } from '../resources';


const font12pt = ex.SpriteSheet.fromImageSource({
  image: Resources.ui.mainFont,
  grid: {
    rows: 6,
    columns: 16,
    spriteWidth: 12,
    spriteHeight: 12
  }
});

const mainFont = new ex.SpriteFont({
  alphabet: `!"#$%&'()*+,-./ 0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_ abcdefghijklmnopqrstuvwxyz{|}~ `,
  caseInsensitive: true,
  spriteSheet: font12pt
});

console.log(mainFont);

export {mainFont};