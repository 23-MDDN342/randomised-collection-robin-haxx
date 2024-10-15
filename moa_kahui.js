let kahui = []; let boidCount = 10;

// may need to have a way to refresh canvas at different sizes

const canvasWidth = 600;
const canvasHeight = 600;


// create canvas

// assign elevation to grid


// place moa based on elevation when instantiate is called


let m;




const flock = [];
let alignSlider, cohesionSlider, separationSlider, boidButtonPlus, boidButtonMinus;
let colB = 50;
let xoff = 0;


function setup() {
    colorMode(HSB, 100);
    createCanvas(canvasWidth,canvasHeight);
    alignSlider = createSlider(0, 2, 0.1, 0.1);
    cohesionSlider = createSlider(0, 2, 0.45, 0.1);
    separationSlider = createSlider(0, 2, 0.5, 0.1);
    boidButtonPlus = createButton("+1 Boid");
    boidButtonPlus10 = createButton("+10 Boid");
    boidButtonMinus = createButton("-1 Boid");
    boidClear = createButton("Clear Boids");
    




     for(let i = 0; i < boidCount; i++){ 
     kahui.push(new Boid(random(canvasWidth), random(canvasHeight))); // reminder to place based on environment

    m = new Boid(random(canvasWidth), random(canvasHeight));



  }

}



function draw() {

  // credit to p5xJS user jarivkin for this quick bit of colour interpolation
  // https://editor.p5js.org/jarivkin/sketches/KkuvWGhDv
   colH = map(noise(xoff), 0, 1, 40, 55);
   colS = map(noise(xoff), 0, 1, 60, 80);
   colB = map(noise(xoff), 0, 1, 90, 100);
  
    background(colH, colS, colB, 20);
    
    for (let i = 0; i < boidCount; i++){
        kahui[i].alignment(kahui);
        kahui[i].display();
        kahui[i].update();
    }

    // boidButtonPlus.mousePressed(() => {
    //   flock.push(new Boid());
    // });

    // boidButtonPlus10.mousePressed(() => {
    //   for (let i = 0; i < 10; i++){flock.push(new Boid());};
    // });

    // boidButtonMinus.mousePressed(() => {
    //   flock.pop();
    // });

    // boidClear.mousePressed(() => {
    //   while (flock.length > 0){
    //     flock.pop();
    //   }
    // }
    // )

    // for(let boid of flock) {
    //   boid.flock(flock);
    //   boid.update();
    //   boid.show();  
    //   boid.edges();
    // }

    // xoff+= 0.003;
}


