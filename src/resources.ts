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

import foreTSA from "./images/foregroundbuildings/TopStart_A.png"
import foreTSB from "./images/foregroundbuildings/TopStart_B.png"
import foreTSC from "./images/foregroundbuildings/TopStart_C.png"

import foreBSA from "./images/foregroundbuildings/BotStart_A.png"

import foreTMA from "./images/foregroundbuildings/TopMid_A.png"
import foreTMB from "./images/foregroundbuildings/TopMid_B.png"
import foreTMC from "./images/foregroundbuildings/TopMid_C.png"
import foreTMD from "./images/foregroundbuildings/TopMid_D.png"
import foreTME from "./images/foregroundbuildings/TopMid_E.png"

import foreBMA from "./images/foregroundbuildings/BotMid_A.png"
import foreBMB from "./images/foregroundbuildings/BotMid_B.png"
import foreBMC from "./images/foregroundbuildings/BotMid_C.png"


import foreTEA from "./images/foregroundbuildings/TopEnd_A.png"
import foreTEB from "./images/foregroundbuildings/TopEnd_B.png"
import foreTEC from "./images/foregroundbuildings/TopEnd_C.png"

import foreBEA from "./images/foregroundbuildings/BotEnd_A.png"

const topStarts = [foreTSA, foreTSB, foreTSC]
const botStarts = [foreBSA]
const topMids = [foreTMA, foreTMA, foreTMA, foreTMB, foreTMC, foreTMD, foreTME]
const botMids = [foreBMA, foreBMA, foreBMB, foreBMC]
const topEnds = [foreTEA, foreTEB, foreTEC]
const botEnds = [foreBEA]

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

//birds
import birdsheet from "./images/birds.png"

//UI assets
import characterFrame from "./images/charframe.png";
import fontImage from "./images/font/12pt.png";
import characterSelect from "./images/characterSelect.png";
import gradient from "./images/gradient.png";
import arrow from "./images/arrow.png";

export const Resources = {
  sheets: 
    playableCharacters.map(sheet => {return new ImageSource(sheet)}),
  crates:
    crates.map(box => {return new ImageSource(box)}),
  birds:
    [new ImageSource(birdsheet)],
  topStarts: mapToImageArray(topStarts),
  botStarts: mapToImageArray(botStarts),
  topMids: mapToImageArray(topMids),
  botMids: mapToImageArray(botMids),
  topEnds: mapToImageArray(topEnds),
  botEnds: mapToImageArray(botEnds),
    
    
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
    gradient: new ImageSource(gradient),
    arrow: new ImageSource(arrow)
  }

} as const;

function mapToImageArray(array: any[]){
  return array.map(fore => {return new ImageSource(fore)})
}

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

export const birdSheets = 
  SpriteSheet.fromImageSource({
    image: Resources.birds[0],
    grid: {
      columns: 4,
      rows: 12,
      spriteWidth: 16,
      spriteHeight: 16
    }
})
