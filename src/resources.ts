import { ImageSource, SpriteSheet, Loader, Sound } from "excalibur";

//backgrounds
import cathedralSkyline from "./images/cathedralSkyline.png";
import citySkyline from "./images/citySkyline.png";
import cloudscape1 from "./images/Cloudscape1.png";
import cloudscape2 from "./images/Cloudscape2.png";
import cloudscape3 from "./images/Cloudscape3.png";
import cloudscape4 from "./images/Cloudscape4.png";
import noCathedralSkyline from "./images/noCatherdralSkyline.png";

//sfx
import music from "./sounds/music.mp3"
import sound from "./sounds/jump.mp3"

//foregrounds
import fore1 from "./images/floorbuilding1.png"
import fore2 from "./images/floorbuilding2.png"
const foregrounds = [fore1, fore2]

//small obstacles
import crate from "./images/crate.png"
const crates = [crate]


//character sheets here
import playerBlack from "./images/playerSheet.png";
import playerRed from "./images/playerSheetRed.png";
import playerBlue from "./images/playerSheetBlue.png";
const playableCharacters = [playerBlack, playerRed, playerBlue]

//UI assets
import characterFrame from "./images/charframe.png";

export const Resources = {
  sheets: 
    playableCharacters.map(sheet => {return new ImageSource(sheet)}),
  crates:
    crates.map(box => {return new ImageSource(box)}),
  foregrounds: 
    foregrounds.map(fore => {return new ImageSource(fore)}),
    
  background: {
    cathedral: new ImageSource(cathedralSkyline),
    city: new ImageSource(citySkyline),
    cloudscape1: new ImageSource(cloudscape1),
    cloudscape2: new ImageSource(cloudscape2),
    cloudscape3: new ImageSource(cloudscape3),
    cloudscape4: new ImageSource(cloudscape4),
    noCathedral: new ImageSource(noCathedralSkyline),
  },
  sounds: {
    music: new Sound(music),
    jump: new Sound(sound)
  },
  ui:{
    portraitFrame: new ImageSource(characterFrame)
  } 

} as const;

export const playerSheets = Resources.sheets.map(source => {
  return SpriteSheet.fromImageSource({
    image: source,
    grid: {
      columns: 6,
      rows: 1,
      spriteWidth: 39,
      spriteHeight: 34
    }
})
})

export const loader = new Loader();

for (const group of Object.values(Resources)) {
  for (const res of Object.values(group)) {
    loader.addResource(res);
  }
}
