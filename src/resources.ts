import { ImageSource, SpriteSheet, Loader } from "excalibur";
import playerSheet from "./images/playerSheet.png";
import cathedralSkyline from "./images/cathedralSkyline.png";
import citySkyline from "./images/citySkyline.png";
import cloudscape1 from "./images/Cloudscape1.png";
import cloudscape2 from "./images/Cloudscape2.png";
import cloudscape3 from "./images/Cloudscape3.png";
import cloudscape4 from "./images/Cloudscape4.png";
import noCathedralSkyline from "./images/noCatherdralSkyline.png";

export const Resources = {
  player: {
    Sheet: new ImageSource(playerSheet)
  },
  background: {
    cathedral: new ImageSource(cathedralSkyline),
    city: new ImageSource(citySkyline),
    cloudscape1: new ImageSource(cloudscape1),
    cloudscape2: new ImageSource(cloudscape2),
    cloudscape3: new ImageSource(cloudscape3),
    cloudscape4: new ImageSource(cloudscape4),
    noCathedral: new ImageSource(noCathedralSkyline),
  }
} as const;

export const playerSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.player.Sheet,
  grid: {
    columns: 6,
    rows: 1,
    spriteWidth: 39,
    spriteHeight: 34
  }
})

export const loader = new Loader();

for (const group of Object.values(Resources)) {
  for (const res of Object.values(group)) {
    loader.addResource(res);
  }
}
