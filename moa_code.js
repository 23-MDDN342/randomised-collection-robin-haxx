// I'll try to keep all the colours in use up here.
let northIslandCol = [60,60,40];
let southIslandCol = [140,100,70];
let bothIslandsCol = [150,130,0];

let dryForestCol =   [28, 156, 77];
let wetForestCol =   [28, 109, 156];
let supalpineCol =   [178, 46, 255];
let allHabitatsCol = [250, 96, 252];

let bgCol = [255,255,255];



let title;
let georgia,
    georgiaB,
    georgiaI,
    georgiaZ;

    function preload(){
      // TEXT TITLE BLOCK (font: adine kirnberg alternative)
      title =     loadImage('title.png');
      // FONTS
      georgia =   loadFont('fonts/georgia.ttf');
      georgiaB =  loadFont('fonts/georgiab.ttf');
      georgiaI =  loadFont('fonts/georgiai.ttf');
      georgiaZ =  loadFont('fonts/georgiaz.ttf');
    
    }

// declaring variables that will be defined as instances of the Moa class
let moariki,
moaHakahaka,
moaNunui,
moaWaewaeTaumaha,
moaMomona,
moaKoukou,
moaPukepuke,
kuranui,
moaRuarangi;



class Boid {
    constructor (x, y){
        this.size = 1; // this should take value from moa size
        this.position = createVector (x,y);
        this. velocity = p5.Vector.random2D();
        this.velocity.mult(this.size);
        this.acceleration = createVector(0*this.size,0*this.size);
        this.maxSpeed = 1;
        this.maxForce = .2;
    }

    edges(){
        if (this.position.x > canvasWidth){
            this.position.x = 0;
        } else if (this.position.x < 0){
            this.position.x = canvasWidth;
        } else if (this.position.y > canvasHeight){
            this.position.y = 0;
        } else if (this.position.y < 0){
            this.position.y = canvasHeight;
        }
    }

    display(){
        noStroke();
        fill(0);
        ellipse(this.position.x, this.position.y, 10 * this.size ) ;
    }

    alignment(kahui){

        let steering = createVector();
        let total = 0;

        for (let i = 0; i < kahui.length; i++){
            let distance = dist(this.position.x, this.position.y, kahui[i].position.x, kahui[i].position.y);
            if (kahui.i != this && distance < perceptionRadius){
                steering.add(kahui[i].velocity);
                total += 1;
            }

        }

        if (total > 0){
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }

        return steering;

    }
    
    cohesion(kahui){

        let steering = createVector();
        let total = 0;

        for (let i = 0; i < kahui.length; i++){
            let distance = dist(this.position.x, this.position.y, kahui[i].position.x, kahui[i].position.y);
            if (kahui[i] != this && distance < perceptionRadius){
              steering.add(kahui[i].position);
              total += 1;
            }
        }
        if (total > 0){
          steering.div(total);
          steering.sub(this.position);
          steering.setMag(this.maxSpeed);
          steering.sub(this.velocity);
          steering.limit(this.maxForce);
        }
        return steering;
    }


    separation(kahui){

      let steering = createVector();
      let total = 0;
      for (let i = 0; i < kahui.length; i++){
        let distance = dist (this.position.x, this.position.y, kahui[i].position.x, kahui[i].position.y);
        if (kahui[i] != this && distance < perceptionRadius){
          let neighbourVector = p5.Vector.sub(this.position, kahui[i].position);
          neighbourVector.div(distance * distance);
          steering.add(neighbourVector);
          total++;
        }
      
      }

      if (total > 0){
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }

    flock(kahui){
      let alignment = this.alignment(kahui);
      let cohesion = this.cohesion(kahui);
      let separation = this.separation(kahui);
      
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(separation);
    }


    update(){
        this.edges();
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
    }

    display() {
      noStroke();
      fill(0);
      ellipse(this.position.x, this.position.y, 2, 2);
    }
}

class Moa {
  constructor (x = 0, y = 0, _teReo, _english, _island, _habitat, _sizeMin, _sizeMax, _bill, _plumage, _species, _population,
               
  ){
    // It made more sense for me to prefix these temporary variables with an underscore. All they do is pass the "this." properties into the class via the constructor.
    this.teReo      = _teReo;
    this.english    = _english;
    this.island     = _island;
    this.habitat    = _habitat;
    this.sizeMin    = _sizeMin;
    this.sizeMax    = _sizeMax;
    this.bill       = _bill;
    this.plumage    = _plumage;
    this.species    = _species;
    this.population = _population;


  }

  // perhaps we need multiple "show" functions to represent as an illustration or agent
  // for now, instantiate means "show agent"
  show(x,y){
    let islandCol;
    let habitatCol;
    


  //  base colour depends on island
  if (this.island == "N"){
      islandCol = northIslandCol;
  } else if (this.island == "S") {
      islandCol = southIslandCol;
  } else if (this.island == "S+N"){
      islandCol = bothIslandsCol;
  } else {
      islandCol = bgCol;
      console.log("unexpected island value for Moa class!");
  }


  //  secondary colour depends on habitat
  //  feature change based on habitat

  if (this.habitat == "D"){
      habitatCol = dryForestCol;
  } else if (this.habitat == "W") {
      habitatCol = wetForestCol;
  } else if (this.habitat == "S") {
      habitatCol = supalpineCol;
  } else if (this.habitat == "S+W+D"){
      habitatCol = allHabitatsCol;
  } else {
    habitatCol = bgCol;
    console.log("unexpected habitat value for Moa class!");
  }

    //color() and lerpColor() seem to break the code so I wrote this 
    let averageRed =    (islandCol[0] + habitatCol[0]) / 2;
    let averageGreen =  (islandCol[1] + habitatCol[1]) / 2;
    let averageBlue =   (islandCol[2] + habitatCol[2]) / 2;
    let combinedCol = [averageRed, averageGreen, averageBlue]; // island colour "tinted" with habitat colour


  //  noise mapped between sizemin and sizemax
  let size = random(this.sizeMin, this.sizeMax);

  push();
  noFill();
  stroke(0);
  
  for(let i = 0; i < 21; i++){
    strokeWeight(size*.009);
    //ellipse(x+(size*.001),y+(size*.001),size * (i*.03),size * (i*.015));

    stroke(combinedCol);
    //ellipse(x,y,size * (i*.025),size * (i*.03));
    ellipse(x,y-(size*.08),size * (i*.028),size * (i*.017));
    strokeWeight(size*.01);
    stroke(islandCol);

    ellipse(x,y-(size*.08),size * (i*.026),size * (i*.016));
    if(this.plumage == "streaky"){ // this isn't super well resolved but I wanted some plumage-based variation!
      push();
      stroke(bgCol);
      strokeWeight(size*.001);
      ellipse(x,y-(size*.1),size * (i*.026),size * (i*.03));
      pop();
    }

    stroke(255);
    strokeWeight(size*.006);

    let beakMod = 1;
    if (this.bill == "short rounded" || this.bill == "short pointed" || this.bill == "short curved"){
      beakMod = 0.8;
    }
    ellipse(x,y+(size*.22),size * (i*.041)* beakMod,size * (i*.035));
    ellipse(x,y+(size*.29),size * (i*.041)* beakMod,size * (i*.045));//beak btm

    
    push();
    strokeWeight(size*.001);
    ellipse(x,y-(size*.19),size * (i*.010),size * (i*.015));//beak top
    stroke(combinedCol);
    scale(1 + (i*.05));
    
    //ellipse(0,y-(size*.15),size* (i*.02), size * (i*.0003));
    pop();
    
    // eyes
    ellipse(x-(size*.2),y-(size*.15),size* (i*.005), size * (i*.004));
    ellipse(x+(size*.2),y-(size*.15),size* (i*.005), size * (i*.004));
    push();
    strokeWeight(size*.015);
    fill(habitatCol);
    ellipse(x-(size*.205),y-(size*.15),size* (i*.02)*.19, size * (i*.018)*.2);
    ellipse(x+(size*.205),y-(size*.15),size* (i*.02)*.19, size * (i*.018)*.2);
    pop();

  }

  // visual overdraw: this makes a background style I think looks rly dope! 
  // It's not exactly the most visually safe code ever, but I thought it gave the visuals a cool final dimension.
  stroke(combinedCol);
  strokeWeight(size * 0.0004);
  for (let b = 0; b < 600; b+=6){
   //line(b*.01,0-(size*.08),0,size*.01);
   if (b % 24 != 0){
   circle(x,y-(size*.12 ),size*(b*.03));
  }
  }

  
  //BILLS
  if (this.bill == "short pointed" || this.bill == "robust pointed"){
    stroke(islandCol);
    strokeWeight(size * 0.004);
    for (let b = -8; b < 8; b++){
     line(b*.01,0-(size*.16),0,size*.01);
    }
  }else if (this.bill == "short curved" || this.bill == "robust curved"){ 
    //For blocking a shape for curved beaks, I used a pattern that also looks like a moko pattern (te takarangi). 
    // This was not thoroughly considered by any means! Though I couldn't find any glaring problems with associating moa with what essentially represents genealogical time, the spirit and the cosmos.
    stroke(islandCol);
    strokeWeight(size * 0.002);
    for (let b = -8; b < 8; b++){
     ellipse(x+(size*.12),y-(size*.02),size*(b*.02),size*(b*.02));
     ellipse(x-(size*.12),y-(size*.02),size*(b*.022),size*(b*.022));
    }
  }else if (this.bill == "short rounded" || this.bill == "robust rounded"){

  }else {console.log("Bill property unaccounted for: " + this.bill);}

  //EDGE CASE: RARE "CRESTED" MOA !

  if (this.plumage == "crested"){
    stroke(habitatCol);

    for (let j = 0; j < 10; j++){

      push();
      rotate(190);
      translate(-size*.57,size*.2);
      //arc(x,y,size, size * (j*.08), 0, TWO_PI);
      pop();

      push();
      rotate(90);
      translate(-size*.27,size*.09);
      arc(x,y+(size*.05),size*.2, size * (j*.06), 50, 80);
      rotate(0);
      arc(x,y-(size*.23),size*.2, size * (j*.06), 280, 310);
      pop();
    }
    
  }

  pop();
  push();

  fill(0);
  textSize(0.14);
  textFont(georgiaB);
  text(this.teReo, 0,0+ (height * .0009));
  text(this.english, 0,0+ (height * .0012));
  textFont(georgia);
  text("height: " + this.sizeMin + " to " + this.sizeMax + " m",0,0+(height*.0015));
  textFont(georgiaI);
  text(this.species,0,0+ (height * .0018));
  pop();
  };

  instantiate(x,y){
    // if habitat is x, spawn elevation bound to that range

    // place at a random x,y within desired elevation...perhaps decide that outside of this method

    // code for kahui sim for group movement

















    // each species needs a list of foods it will seek




    // threshold for security - food source and lack of predation over time, to initiate mate seeking

    // reproduce function
  }
}

moariki           = new Moa(  "Moariki",            "Little Bush Moa",        "S+N",  "W",      0.55, 1.10,   "short rounded",    "shaggy",   "Anomalopteryx didiformis"  , 0 );
moaHakahaka       = new Moa(  "Moa Hakahaka",       "Stout- Legged Moa",      "S+N",  "D",      1.00, 1.20,   "short pointed",    "shaggy",   "Emeus gravis"              , 11 );
moaNunui          = new Moa(  "Moa Nunui",          "South Island Giant Moa", "S",    "S+W+D",  2.40, 3.60,   "robust rounded",   "streaky",  "Dinornis robustus"         , 38 );
moaWaewaeTaumaha  = new Moa(  "Moa Waewae Taumaha", "Heavy- Footed Moa",      "S",    "D",      1.00, 1.20,   "short curved",     "shaggy",   "Pachyornis elephantopus"   , 10 );
moaMomona         = new Moa(  "Moa Mōmona",         "Eastern Moa",            "S",    "D",      0.70, 1.00,   "robust curved",    "shaggy",   "Emeus crassus"             , 41 );
moaKoukou         = new Moa(  "Moa Koukou",         "Crested Moa",            "S",    "S",      1.20, 1.50,   "robust pointed",   "crested",  "Pachyornis australis"      , 0  );
moaPukepuke       = new Moa(  "Moa Pukepuke",       "Upland Moa",             "S",    "S",      0.65, 0.95,   "short curved",     "mottled",  "Megalopteryx didinus"      , 0 );
kuranui           = new Moa(  "Kuranui",            "North Island Giant Moa", "N",    "W",      2.40, 3.00,   "robust curved",    "shaggy",   "Dinornis novazealandiae"   , 0 );
moaRuarangi       = new Moa(  "Moa Ruarangi",       "Mantell's Moa",          "N",    "D",      0.55, 1.30,   "short pointed",    "shaggy",   "Pachyornis geranoides"     , 0  );

let allMoa = [moariki,moaHakahaka,moaNunui, moaWaewaeTaumaha, moaMomona, moaKoukou, moaPukepuke, kuranui, moaRuarangi];


let totalPopulation = 0;

  // what it says on the tin, iterates through all moa and adds up a total population count.
  for (let i = 0; i < allMoa.length; i++){
    totalPopulation += allMoa[i].population;
    console.log(allMoa[i].teReo + " population: " + allMoa[i].population)
  }

  console.log("total: " + totalPopulation);

  // appends a "percentage" chance to each Moa that represents its percentage in relation to total population.
  for (let i = 0; i < allMoa.length; i++){
    allMoa[i].percentage = (allMoa[i].population / totalPopulation) * 100;
    console.log(allMoa[i].teReo + " makes up " + allMoa[i].percentage + "% of total Moa");
  }
  

// function to use to map percentages to with conditional statements
function percentage(){
  return (int (random(1,100)));
}

// Note for a potential scalability improvement:
// If the species "spreadsheet" was kept as an array, I could use its index/ length to map cumulative values.
// For example, a "population" property for each species that could be added up and converted to the 1-100 value that defines distribution.
// This would mean if I realise a population is more common, I can update its "population" value without having to rewrite the math for its 1-100 "chance".


// function to show species based on generated 1-9 value

function modeSelect(mode){

switch (mode){
  case 1: case '1':  // the editor slider is converting these int values to single-character strings
    moariki.show(0,0);
    break;
  case 2: case '2':
    moaHakahaka.show(0,0);
    break;
  case 3: case '3':
    moaNunui.show(0,0);
    break;
  case 4: case '4':
    moaWaewaeTaumaha.show(0,0);
    break;
  case 5: case '5':
    moaMomona.show(0,0);
    break;
  case 6: case '6':
    moaKoukou.show(0,0);
    break;
  case 7: case '7':
    moaPukepuke.show(0,0);
    break;
  case 8: case '8':
    kuranui.show(0,0);
    break;
  case 9: case '9':
    moaRuarangi.show(0,0);
    break;
  default: 
    console.log("for some reason, the randomness generator for species selection returned a really weird value: " + mode);
    // this debug message was a very good call. The amount of times I've been spammed with it in the console output..
}

}




// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM

// class Boid {
//     constructor() {
//       this.position = createVector(random(width), random(height));
//       this.velocity = p5.Vector.random2D();
//       this.velocity.setMag(random(0.5, 3));
//       this.acceleration = createVector();
//       this.maxForce = 0.1;
//       this.maxSpeed = 1;
//     }
  
//     edges() {
//       if (this.position.x > width) {
//         this.position.x = 0;
//       } else if (this.position.x < 0) {
//         this.position.x = width;
//       }
//       if (this.position.y > height) {
//         this.position.y = 0;
//       } else if (this.position.y < 0) {
//         this.position.y = height;
//       }
//     }
  
//     align(boids) {
//       let perceptionRadius = 30;
//       let steering = createVector();
//       let total = 0;
//       for (let other of boids) {
//         let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
//         if (other != this && d < perceptionRadius) {
//           steering.add(other.velocity);
//           total++;
//         }
//       }
//       if (total > 0) {
//         steering.div(total);
//         steering.setMag(this.maxSpeed);
//         steering.sub(this.velocity);
//         steering.limit(this.maxForce);
//       }
//       return steering;
//     }
  
//     separation(boids) {
//       let perceptionRadius = 60;
//       let steering = createVector();
//       let total = 0;
//       for (let other of boids) {
//         let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
//         if (other != this && d < perceptionRadius) {
//           let diff = p5.Vector.sub(this.position, other.position);
//           diff.div(d * d);
//           steering.add(diff);
//           total++;
//         }
//       }
//       if (total > 0) {
//         steering.div(total);
//         steering.setMag(this.maxSpeed);
//         steering.sub(this.velocity);
//         steering.limit(this.maxForce);
//       }
//       return steering;
//     }
  
//     cohesion(boids) {
//       let perceptionRadius = 60;
//       let steering = createVector();
//       let total = 0;
//       for (let other of boids) {
//         let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
//         if (other != this && d < perceptionRadius) {
//           steering.add(other.position);
//           total++;
//         }
//       }
//       if (total > 0) {
//         steering.div(total);
//         steering.sub(this.position);
//         steering.setMag(this.maxSpeed);
//         steering.sub(this.velocity);
//         steering.limit(this.maxForce);
//       }
//       return steering;
//     }
  
//     flock(boids) {
//       let alignment = this.align(boids);
//       let cohesion = this.cohesion(boids);
//       let separation = this.separation(boids);
  
//       alignment.mult(alignSlider.value());
//       cohesion.mult(cohesionSlider.value());
//       separation.mult(separationSlider.value());
  
//       this.acceleration.add(alignment);
//       this.acceleration.add(cohesion);
//       this.acceleration.add(separation);
//     }
  
//     update() {
//       this.position.add(this.velocity);
//       this.velocity.add(this.acceleration);
//       this.velocity.limit(this.maxSpeed);
//       this.acceleration.mult(0);
//     }
  

//     show() {

//         strokeWeight(4);
//         stroke(255,80);
//         square(this.position.x, this.position.y, 25, 10, 55, 50, 5);
//         point(this.position.x, this.position.y);
//     }
    
// }







