/*
 * This program draws your arrangement of faces on the canvas.
 */
const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 20000;

let title;

const islandsReo = ["Aotearoa", "Te Ika-a-Māui", "Te Waipounamu"];
const islandsEng = ["All New Zealand", "North Island", "South Island"];
const habitatEng = ["Widespread", "Subalpine / Highland", "Wet forest / Podocarp", "Dry forest / Lowland"];
// I'm basically using key:value pairs for the colour variables here, this isn't *best* practise for how to do that.


// Colours specific for this arrangement mode
const keyBorderCol = [70,70,70];
const keyTextCol =   [40,40,40];
const islandArray =  [bothIslandsCol, northIslandCol, southIslandCol];
const habitatArray = [allHabitatsCol, supalpineCol, wetForestCol, dryForestCol];
// colour variables are global - moa colours are stored at the top of face_code.js
// for the key, I favoured using an array to call from than entering specific variable- assigned values.
// This makes sense to me but the better practise would probably to have this more organised approach be standardized across the codebase.

function preload(){
  // TEXT TITLE BLOCK (font: adine kirnberg alternative)
  title = loadImage('title.png');
}

function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(random(0, 1000));

  // rotation in degrees
  angleMode(DEGREES);
  textAlign(CENTER);
  rectMode(CORNER);
}

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
}



function mouseClicked() {
  changeRandomSeed();
}

function draw () {
  if(millis() > lastSwapTime + millisPerSwap) {
    changeRandomSeed();
  }

  // reset the random number generator each time draw is called
  randomSeed(curRandomSeed);

  // clear screen
  background(255);
  noStroke();

  // draw a 7x4 grid of faces
  let w = canvasWidth / 6;
  let h = canvasHeight / 3;
  for(let i=0; i<3; i++) {
    for(let j=0; j<4; j++) {
      let y = h/2 + h*i;
      let x = w/2 + w*j;
     

        push();
        translate(x, y);
        scale(w * .5, h * .5);
        
        let mode;
        // pull a 1-100 percentage
        let speciesChance = percentage();
        let popSoFar;
        
        // for (let m = 0; m < allMoa.length; m++){
        //   popSoFar += allMoa[i].percentage;
        //   if (speciesChance < popSoFar){
        //     mode = m + 1;
        //   } else {
        //     return;
        //   }
        // }
          
        // for (let m = 0; m < allMoa.length; m++){
        //   popSoFar += allMoa [m].percentage;
        //   if (speciesChance < popSoFar + allMoa[m].percentage){
        //        mode = m + 1;
        //   }else {
        //     popSoFar += allMoa [m].percentage;
        //   }

        // }

        // this feels hacky but I got the code working for species chance!
        // I basically want to rewrite this as a small block of code that iterates through allMoa, adds percentage chance, sets mode.
        if (speciesChance < moariki.percentage){
          mode = 1;

        }else if (speciesChance < moariki.percentage + moaHakahaka.percentage){
          mode = 2;
        }else if (speciesChance < moariki.percentage + moaHakahaka.percentage + moaNunui.percentage){
          mode = 3;
        }else if (speciesChance < moariki.percentage + moaHakahaka.percentage + moaNunui.percentage + moaWaewaeTaumaha.percentage){
          mode = 4;
        }else if (speciesChance < moariki.percentage + moaHakahaka.percentage + moaNunui.percentage + moaWaewaeTaumaha.percentage + moaMomona.percentage){
          mode = 5;
        }else if (speciesChance < moariki.percentage + moaHakahaka.percentage + moaNunui.percentage + moaWaewaeTaumaha.percentage + moaMomona.percentage + moaKoukou.percentage){
          mode = 6;
        }else if (speciesChance < moariki.percentage + moaHakahaka.percentage + moaNunui.percentage + moaWaewaeTaumaha.percentage + moaMomona.percentage + moaKoukou.percentage + moaPukepuke.percentage ){
          mode = 7;
        }else if (speciesChance < moariki.percentage + moaHakahaka.percentage + moaNunui.percentage + moaWaewaeTaumaha.percentage + moaMomona.percentage + moaKoukou.percentage + moaPukepuke.percentage + kuranui.percentage){
          mode = 8;
        }else if (speciesChance <= moariki.percentage + moaHakahaka.percentage + moaNunui.percentage + moaWaewaeTaumaha.percentage + moaMomona.percentage + moaKoukou.percentage + moaPukepuke.percentage + kuranui.percentage +moaRuarangi.percentage){
          mode = 9;
        }else {
          console.log ("unexpected speciesChance variable entered!");
        }


        



        modeSelect(mode);
        
        pop();
      
    }
  }


  const lineSpace = (height * 0.006);
  const islandsCount = islandsEng.length;
  const habitatCount = habitatEng.length;

  image(title,width- (w*2) + (lineSpace * 3),lineSpace * 16, height * .6, height *.4);

  // code for drawing the key
  push();
  textAlign(LEFT);
  stroke(keyBorderCol);
  translate(width - (w*2), h * 1.6);
  translate(lineSpace,lineSpace);
  rect(0,0, (w*2) - (lineSpace*2), (h*1.4) - (lineSpace * 2));
  translate(lineSpace,lineSpace);
  rect(0,0, (w*2) - (lineSpace*4), (h*1.4) - (lineSpace * 4));

  translate(lineSpace*4,lineSpace*6);
  // a better approach would be to store colours in an array, and draw these elements via a for loop using the arrays' lengths
  // (if I wanted to support quick scalability with more colours)
  noStroke();
  push();
  for(let i = 0; i <= islandsCount; i++){
    if(i == 0){
      text("ISLAND",lineSpace*10,lineSpace*4);
    }else{

      translate(0, lineSpace * 12); //colour sample spacing
      fill(keyTextCol);
      text(islandsReo[i-1],lineSpace*10,lineSpace*4);
      text(islandsEng[i-1],lineSpace*10,lineSpace*8);
      fill(islandArray[i-1]);
      rect(0,0,lineSpace*8,lineSpace*8);
    }
  }
  pop();

  push();
  translate (lineSpace*46,0);
  for(let i = 0; i <= habitatCount; i++){
    if (i == 0){
      text("HABITAT", lineSpace * 10, lineSpace * 4);
    } else {
      
      translate(0, lineSpace * 12)
      fill(keyTextCol);
      text(habitatEng[i-1],lineSpace*10,lineSpace*4);
      fill(habitatArray[i-1]);
      rect(0,0,lineSpace*8,lineSpace*8);
    }

  }
  pop();


  pop();


}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
