import * as ex from 'excalibur';
import { Resources } from '../resources';
import { logo } from '../images/logo';

export const loader = new ex.Loader();
//the logo has to be a base 64 string...
loader.logo = logo;
//the positioning is sensitive, and it seems like the loading bar is parented to the logo.......
loader.logoPosition = ex.vec(450, 20);
loader.loadingBarPosition = ex.vec(250,200)
loader.backgroundColor = '#003494'
loader.playButtonText = 'Play!'


for (const group of Object.values(Resources)) {
  for (const res of Object.values(group)) {
    loader.addResource(res);
  }
}
