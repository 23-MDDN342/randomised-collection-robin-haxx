/*
 * This program draws your arrangement of faces on the canvas.
 */


const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 3000;



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

// global variables for colors
const bg_color1 = [71, 122, 89]

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
  background(bg_color1);
  noStroke();

  // draw a 7x4 grid of faces
  let w = canvasWidth / 7;
  let h = canvasHeight / 4;
  for(let i=0; i<4; i++) {
    for(let j=0; j<7; j++) {
      let y = h/2 + h*i;
      let x = w/2 + w*j;
      if (i == 0) {
        push();
        translate(x, y);
        scale(w/2, h/2);
        fill(0,255,100);
        moaWaewaeTaumaha.show(0,0);
        pop();
      }
      else if (i > 0) {
        // all other faces
        push();
        translate(x, y);
        scale(w/2, h/2);
        
        if((i+j)%2 == 0) {
          fill(0,100,255);
          moariki.show(0,0);
          //stroke(0);

        }
        else {
          
          moaNunui.show(0,0);
          
        }
        pop();
      }
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
