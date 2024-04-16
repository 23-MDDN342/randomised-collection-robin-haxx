/*
 * This program draws your arrangement of faces on the canvas.
 */
const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 5000;

// global variables for colors
const bg_color1 = [71, 122, 89];

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
  background(bg_color1);
  noStroke();

  // draw a 7x4 grid of faces
  let w = canvasWidth / 7;
  let h = canvasHeight / 4;
  for(let i=0; i<4; i++) {
    for(let j=0; j<7; j++) {
      let y = h/2 + h*i;
      let x = w/2 + w*j;
     

        push();
        translate(x, y);
        scale(w * .5, h * .5);
        

        // I should have all these Moa instantiations in an array to just pull length from
        // this statement has to be updated as well anyway unless I want to think reeeeally hard
        // the amount of known moa species isn't changing before handin..
        switch (ceil(random(0,9))){
          case 1:
            moariki.show(0,0);
            break;
          case 2:
            moaHakahaka.show(0,0);
            break;
          case 3:
            moaNunui.show(0,0);
            break;
          case 4:
            moaWaewaeTaumaha.show(0,0);
            break;
          case 5:
            moaMomoua.show(0,0);
            break;
          case 6:
            moaKoukou.show(0,0);
            break;
          case 7:
            moaPukepuke.show(0,0);
            break;
          case 8:
            kuranui.show(0,0);
            break;
          case 9:
            moaRuarangi.show(0,0);
            break;
          default: 
            console.log("for some reason, the randomness generator for species selection returned a really weird value");
        }
        
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
