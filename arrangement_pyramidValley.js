

const canvasWidth = 1920;
const canvasHeight = 1000;
let curRandomSeed = 0;


let lastSwapTime = 0;
const millisPerSwap = 20000;



const islandsReo = ["Aotearoa", "Te Ika-a-Māui", "Te Waipounamu"];
const islandsEng = ["All New Zealand", "North Island", "South Island"];
const habitatEng = ["Widespread", "Subalpine", "Podocarp Forest", "Bush/ Wetland"];
// I'm basically using key:value pairs for the colour variables here, this isn't *best* practise for how to do that.


// Colours specific for this arrangement mode
const keyBorderCol = [70,70,70];
const keyTextCol =   [40,40,40];
const islandArray =  [bothIslandsCol, northIslandCol, southIslandCol];
const habitatArray = [allHabitatsCol, supalpineCol, wetForestCol, dryForestCol];
// colour variables are global - moa colours are stored at the top of face_code.js
// for the key, I favoured using an array to call from than entering specific variable- assigned values.
// This makes sense to me but the better practise would probably to have this more organised approach be standardized across the codebase.




function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');
  curRandomSeed = int(random(0, 1000));

  // rotation in degrees
  angleMode(DEGREES);
  textAlign(CENTER);
  rectMode(CORNER);
  textFont(georgia);



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
  background(bgCol);
  noStroke();


  // draw a 6x3 grid of faces
  let w = canvasWidth / 8;
  let h = canvasHeight / 4;
  for(let i=0; i<8; i++) {
    for(let j=0; j<7; j++) {
      let y = h/2 + h*i;
      let x = w/2 + w*j;

        push();
        translate(x, y);
        scale(w * .5, h * .5);
        
        let mode;
        // grab a random 1-100 int percentage
        let speciesChance = percentage(); 
        let totalChance = 0;

        for (let k = 0; k < allMoa.length; k++){                    // if the right condition is met, set the mode and STOP THE LOOP!
          if (speciesChance < totalChance + allMoa[k].percentage){  // (e.g. 32 will increment totalChance by 17, then 5, then 35 (total 57) then condition will be met and mode 3 will be drawn)
            mode = k+1;                                             // arrays count from 0, my "mode selector" ranges from 1 to 9
            break;
          } else {
            totalChance += allMoa[k].percentage;                    // update total chance and continue the loop process
          }
        }

        modeSelect(mode); // when finished finding "mode" value, this calls the "show" function for the corresponding "mode"
        
        pop();
      
    }
  }


  const lineSpace = (height * 0.006);
  const islandsCount = islandsEng.length;
  const habitatCount = habitatEng.length;

  image(keyPV, width- (w) + (lineSpace * 3), lineSpace * 16, height * .175, height *.3);

  // code for drawing the key
  push();
    textAlign(LEFT);
    stroke(keyBorderCol);
    fill(255,100);
    translate(width - (w), h * 1.67);  //  overall placement of key
    translate(0,lineSpace);     //  padding
    rect(0,0, (w) - (lineSpace*2), (h*1.3) - (lineSpace * 2));
    translate(lineSpace,lineSpace);
    rect(0,0, (w) - (lineSpace*4), (h*1.3) - (lineSpace * 4));

    translate(lineSpace*4,lineSpace*6);
    // a better approach would be to store colours in an array, and draw these elements via a for loop using the arrays' lengths
    // (if I wanted to support quick scalability with more colours)
    noStroke();
    
    // push();
    //   for(let i = 0; i <= islandsCount; i++){
    //     if(i == 0){
    //       textFont(georgiaB);
    //       fill(0);
    //       text("ISLAND",lineSpace*10,lineSpace*4);
    //     }else{
    //       textFont(georgia);
    //       translate(0, lineSpace * 12); //colour sample spacing
    //       fill(keyTextCol);
    //       text(islandsReo[i-1],lineSpace*10,lineSpace*4);
    //       text(islandsEng[i-1],lineSpace*10,lineSpace*8);
    //       fill(islandArray[i-1]);
    //       rect(0,0,lineSpace*8,lineSpace*8);
    //     }
    //   }
    // pop();

    push();
      translate (lineSpace,0);
      for(let i = 0; i <= habitatCount; i++){
        if (i == 0){
          textFont(georgiaB);
          fill(0);
          text("HABITAT", lineSpace * 10, lineSpace * 4);
        } else {
          textFont(georgia);
          translate(0, lineSpace * 8)
          fill(keyTextCol);
          text(habitatEng[i-1],lineSpace*10,lineSpace*4);
          fill(habitatArray[i-1]);
          rect(0,0,lineSpace*6,lineSpace*6);
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
