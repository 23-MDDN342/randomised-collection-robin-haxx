/*
 * This program draws your arrangement of faces on the canvas.
 */
const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 20000;

// global variables for colors
const bg_color1 = [52, 110, 69];

function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(random(0, 1000));

  // rotation in degrees
  angleMode(DEGREES);

  textAlign(CENTER);
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
    for(let j=0; j<6; j++) {
      let y = h/2 + h*i;
      let x = w/2 + w*j;
     

        push();
        translate(x, y);
        scale(w * .5, h * .5);
        

        // I should have all these Moa instantiations in an array to just pull length from
        // this statement has to be updated as well anyway unless I want to think reeeeally hard
        // the amount of known moa species isn't changing before handin..
        let mode = ceil(random(0,9));
        modeSelect(mode);
        
        pop();
      
    }
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
