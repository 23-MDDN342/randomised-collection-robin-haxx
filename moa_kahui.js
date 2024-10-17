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

let quadtree;
let boundary;
let capacity = 3;
let perceptionRadius = 30;

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
    

    boundary = new Rect(width/2, height/2, width/2, height/2);
    quadtree = new QuadTree(boundary, capacity);


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

    quadtree.clearQuadtree();


    

    
    for (let i = 0; i < boidCount; i++){

        let p = new Point(kahui[i].position.x, kahui[i].position.y, kahui[i]);
        quadtree.insert(p);
        
        let range = new Circle(kahui[i].position.x, kahui[i].position.y, perceptionRadius);
        let neighbours = [];
        quadtree.query(range, neighbours);
        console.log(neighbours)

        console.log(neighbours);



        // kahui[i].flock(kahui);
        // kahui[i].display();
        // kahui[i].update();
    }

    
boidButtonPlus.mousePressed(() => {
  kahui.push(new Boid());
});

boidButtonPlus10.mousePressed(() => {
  for (let i = 0; i < 10; i++){kahui.push(new Boid());};
});

boidButtonMinus.mousePressed(() => {
  kahui.pop();
});

boidClear.mousePressed(() => {
  while (kahui.length > 0){
    kahui.pop();
    neighbours.pop();
  }
}
)
    quadtree.display();



    for(let boid of kahui) {
      boid.flock(kahui);
      boid.update();
      boid.display();  
      boid.edges();
    }

    // xoff+= 0.003;
}



