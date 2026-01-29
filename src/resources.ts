import { ImageSource, SpriteSheet, Sound } from "excalibur";
import { BuildingCounts, generateBuildingArrays, InteriorCounts, generateInteriorArrays } from "./utils/resourcehelpers";

//backgrounds
// import cathedralSkyline from "./images/cathedralSkyline.png";
import bigBuilding1 from "./images/bigBuilding1.png";
import bigBuilding2 from "./images/bigBuilding2.png";
import bigBuilding3 from "./images/bigBuilding3.png";
import citySkyline from "./images/citySkyline1.png";
// import cityBuildings from "./images/cityBuildings.png";
import cityBuildings1 from "./images/front1.png";
import cityBuildings2 from "./images/front2.png";
import cityBuildings3 from "./images/front3.png";
import cloudscape1 from "./images/Cloudscape1.png";
import cloudscape2 from "./images/Cloudscape2.png";
import cloudscape3 from "./images/Cloudscape3.png";
import cloudscape4 from "./images/Cloudscape4.png";
// import noCathedralSkyline from "./images/noCatherdralSkyline.png";
const bigBuildings = [bigBuilding1, bigBuilding2, bigBuilding3];
const cityBuildings = [cityBuildings1, cityBuildings2, cityBuildings3];


//sfx
import music from "./sounds/music.mp3"
import character_select_music from "./sounds/characterselect.mp3"
import sound from "./sounds/jump.mp3"
import alarm from "./sounds/alarm.mp3"

//foregrounds
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
const interiorCounts: InteriorCounts = {
  topStart: 1, 
  botStart: 3, 
  topMid: 2,   
  botMid: 4,   
  topEnd: 1,   
  botEnd: 3,
  styles: [
    {intStart: 1, intMid: 4, intEnd: 1},
    {intStart: 1, intMid: 4, intEnd: 1},
    {intStart: 1, intMid: 12, intEnd: 1},
  ]
}
const basePath = "./images/buildings/";
const greenBuildings = generateBuildingArrays(basePath + "type_01", greenCounts);
const brickBuildings = generateBuildingArrays(basePath + "type_02", brickCounts);
const interiorBuildings = generateInteriorArrays(basePath + "type_10", interiorCounts);

//small obstacles
const crates = [
  "./images/props/small_crate_01.png", 
  "./images/props/small_crate_02.png", 
  // "./images/props/large_crate_01.png",
  // "./images/props/large_crate_02.png",
]


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
  interiors: [
    {
      topStarts: mapToImageArray(interiorBuildings.topStarts),
      botStarts: mapToImageArray(interiorBuildings.botStarts),
      topMids: mapToImageArray(interiorBuildings.topMids),
      botMids: mapToImageArray(interiorBuildings.botMids),
      topEnds: mapToImageArray(interiorBuildings.topEnds),
      botEnds: mapToImageArray(interiorBuildings.botEnds),
      interiors: interiorBuildings.styles.map(style => {
        return {
          intStarts: mapToImageArray(style.intStarts),
          intMids: mapToImageArray(style.intMids),
          intEnds: mapToImageArray(style.intEnds)
        }
      })
    }
  ],
    
    
  background: {
    city: mapToImageArray(cityBuildings),
    citySkyline: new ImageSource(citySkyline),
    cloudscape1: new ImageSource(cloudscape1),
    cloudscape2: new ImageSource(cloudscape2),
    cloudscape3: new ImageSource(cloudscape3),
    cloudscape4: new ImageSource(cloudscape4),
    bigBuildings: mapToImageArray(bigBuildings),
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
