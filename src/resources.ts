import { ImageSource, SpriteSheet, Sound } from "excalibur";

//backgrounds
import cathedralSkyline from "./images/cathedralSkyline.png";
import citySkyline from "./images/citySkyline.png";
import cityBuildings from "./images/cityBuildings.png";
import cloudscape1 from "./images/Cloudscape1.png";
import cloudscape2 from "./images/Cloudscape2.png";
import cloudscape3 from "./images/Cloudscape3.png";
import cloudscape4 from "./images/Cloudscape4.png";
import noCathedralSkyline from "./images/noCatherdralSkyline.png";

//sfx
import music from "./sounds/music.mp3"
import character_select_music from "./sounds/characterselect.mp3"
import sound from "./sounds/jump.mp3"

//foregrounds
import fore1 from "./images/floorbuilding1.png"
import fore2 from "./images/floorbuilding2.png"
const foregrounds = [fore1, fore2]

//small obstacles
import crate from "./images/crate.png"
const crates = [crate]


//character sheets here
import pj from "./images/pjSheet.png";
import pounce from "./images/pounceSheet.png";
import upb from "./images/upbSheet.png";
import bruiser from "./images/bruiserSheet.png";
import roc from "./images/rocSheet.png";
const playableCharacters = [pj, bruiser, pounce, upb, roc]

//UI assets
import characterFrame from "./images/charframe.png";
import fontImage from "./images/font/12pt.png";
import characterSelect from "./images/characterSelect.png";
import gradient from "./images/gradient.png";

export const Resources = {
  sheets: 
    playableCharacters.map(sheet => {return new ImageSource(sheet)}),
  crates:
    crates.map(box => {return new ImageSource(box)}),
  foregrounds: 
    foregrounds.map(fore => {return new ImageSource(fore)}),
    
  background: {
    cathedral: new ImageSource(cathedralSkyline),
    city: new ImageSource(cityBuildings),
    citySkyline: new ImageSource(citySkyline),
    cloudscape1: new ImageSource(cloudscape1),
    cloudscape2: new ImageSource(cloudscape2),
    cloudscape3: new ImageSource(cloudscape3),
    cloudscape4: new ImageSource(cloudscape4),
    noCathedral: new ImageSource(noCathedralSkyline),
  },
  sounds: {
    music: new Sound(music),
    character_select: new Sound(character_select_music),
    jump: new Sound(sound)
  },
  ui:{
    portraitFrame: new ImageSource(characterFrame),
    mainFont: new ImageSource(fontImage),
    characterSelect: new ImageSource(characterSelect),
    gradient: new ImageSource(gradient)
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
