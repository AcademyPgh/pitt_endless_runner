import { ImageSource, SpriteSheet, Sound } from "excalibur";
import { BuildingCounts, generateBuildingArrays } from "./utils/resourcehelpers";

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
import alarm from "./sounds/alarm.mp3"

//foregrounds

// import foreTSA from "./images/foregroundbuildings/TopStart_A.png"
// import foreTSB from "./images/foregroundbuildings/TopStart_B.png"
// import foreTSC from "./images/foregroundbuildings/TopStart_C.png"

// import foreBSA from "./images/foregroundbuildings/BotStart_A.png"

// import foreTMA from "./images/foregroundbuildings/TopMid_A.png"
// import foreTMB from "./images/foregroundbuildings/TopMid_B.png"
// import foreTMC from "./images/foregroundbuildings/TopMid_C.png"
// import foreTMD from "./images/foregroundbuildings/TopMid_D.png"
// import foreTME from "./images/foregroundbuildings/TopMid_E.png"

// import foreBMA from "./images/foregroundbuildings/BotMid_A.png"
// import foreBMB from "./images/foregroundbuildings/BotMid_B.png"
// import foreBMC from "./images/foregroundbuildings/BotMid_C.png"


// import foreTEA from "./images/foregroundbuildings/TopEnd_A.png"
// import foreTEB from "./images/foregroundbuildings/TopEnd_B.png"
// import foreTEC from "./images/foregroundbuildings/TopEnd_C.png"

// import foreBEA from "./images/foregroundbuildings/BotEnd_A.png"

// const topStarts = [foreTSA, foreTSB, foreTSC]
// const botStarts = [foreBSA]
// const topMids = [foreTMA, foreTMA, foreTMA, foreTMB, foreTMC, foreTMD, foreTME]
// const botMids = [foreBMA, foreBMA, foreBMB, foreBMC]
// const topEnds = [foreTEA, foreTEB, foreTEC]
// const botEnds = [foreBEA]

const greenCounts: BuildingCounts = {
  topStart: 3, // A, B, C
  botStart: 1, // A
  topMid: 5,   // A, B, C, D, E
  botMid: 3,   // A, B, C
  topEnd: 3,   // A, B, C
  botEnd: 1    // A
};
const brickCounts: BuildingCounts = {
  topStart: 1, 
  botStart: 4, 
  topMid: 2,   
  botMid: 4,   
  topEnd: 1,   
  botEnd: 4    
};

const basePath = "./images/buildings/";
const greenBuildings = generateBuildingArrays(basePath + "type_01", greenCounts);
const brickBuildings = generateBuildingArrays(basePath + "type_02", brickCounts);



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
import dream from "./images/dreamroom.png";
import startScreen from "./images/startScreen.png";
import dayofGiving from "./images/dayofGiving.png";
import fbi from "./images/fbi.png";

export const Resources = {
  sheets: 
    playableCharacters.map(sheet => {return new ImageSource(sheet)}),
  crates:
    crates.map(box => {return new ImageSource(box)}),
  birds:
    [new ImageSource(birdsheet)],
  floors: [
    {
      topStarts: mapToImageArray(greenBuildings.topStarts),
      botStarts: mapToImageArray(greenBuildings.botStarts),
      topMids: mapToImageArray(greenBuildings.topMids),
      botMids: mapToImageArray(greenBuildings.botMids),
      topEnds: mapToImageArray(greenBuildings.topEnds),
      botEnds: mapToImageArray(greenBuildings.botEnds),
    },
    {
      topStarts: mapToImageArray(brickBuildings.topStarts),
      botStarts: mapToImageArray(brickBuildings.botStarts),
      topMids: mapToImageArray(brickBuildings.topMids),
      botMids: mapToImageArray(brickBuildings.botMids),
      topEnds: mapToImageArray(brickBuildings.topEnds),
      botEnds: mapToImageArray(brickBuildings.botEnds),
    },
  ],
  blerk: mapToImageArray(greenBuildings.topMids),
    
    
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
    jump: new Sound(sound),
    alarm: new Sound(alarm),
  },
  ui:{
    portraitFrame: new ImageSource(characterFrame),
    mainFont: new ImageSource(fontImage),
    characterSelect: new ImageSource(characterSelect),
    gradient: new ImageSource(gradient),
    arrow: new ImageSource(arrow),
    dream: new ImageSource(dream),
    startScreen: new ImageSource(startScreen),
    dayofGiving: new ImageSource(dayofGiving),
    fbi: new ImageSource(fbi)
  }

} as const;

function mapToImageArray(array: any[]){
  const temp = array.map(fore => {return new ImageSource(fore)})
  return temp;
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
