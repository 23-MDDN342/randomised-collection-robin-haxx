// I'll try to keep all the colours in use up here.
let northIslandCol = [60,60,40];
let southIslandCol = [140,100,70];
let bothIslandsCol = [150,130,0];

let dryForestCol =   [28, 156, 77];
let wetForestCol =   [28, 109, 156];
let supalpineCol =   [178, 46, 255];
let allHabitatsCol = [250, 96, 252];

let bgCol = [255,255,255];


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

class Moa {
  constructor (_teReo, _english, _island, _habitat, _sizeMin, _sizeMax, _bill, _plumage, _species, _population){
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
    stroke(255);
    strokeWeight(size*.006);
    ellipse(x,y+(size*.22),size * (i*.041),size * (i*.035));
    ellipse(x,y+(size*.29),size * (i*.041),size * (i*.045));//beak btm
    
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
    fill(combinedCol);
    ellipse(x-(size*.205),y-(size*.15),size* (i*.02)*.19, size * (i*.018)*.2);
    ellipse(x+(size*.205),y-(size*.15),size* (i*.02)*.19, size * (i*.018)*.2);
    pop();

  }

  stroke(combinedCol);
  strokeWeight(size * 0.002);
  for (let b = -8; b < 1000; b+=3){
   //line(b*.01,0-(size*.08),0,size*.01);
   circle(x,y-(size*.12 ),size*(b*.03));
  }


  //BILLS
  if (this.bill == "short pointed" || this.bill == "robust pointed"){
    stroke(islandCol);
    strokeWeight(size * 0.004);
    for (let b = -8; b < 8; b++){
     line(b*.01,0-(size*.16),0,size*.01);
    }
  }else if (this.bill == "short curved" || this.bill == "robust curved"){

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
    
    

    //rect(0,0,size* (i*.01), size * (i*.01));
    //ellipse(0,y-(size*.25),size* (i*.012), size * (i*.008));
   
    // stroke(bgCol);
    
    
    // push();
    // strokeWeight(size * .01);
    // stroke(0);

    // arc(x,y-(size*.2),size*i*.05, size*i*.005, 0, TWO_PI );
    // //ellipse(x+(size*.2),y-(size*.15),size* (i*.005), size * (i*.004));
    // pop();
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
}

moariki           = new Moa(  "Moariki",            "Little Bush Moa",        "S+N",  "W",      0.55, 1.10,   "short rounded",    "shaggy",   "Anomalopteryx didiformis"  , 400 );
moaHakahaka       = new Moa(  "Moa Hakahaka",       "Stout- Legged Moa",      "S+N",  "D",      1.00, 1.20,   "short pointed",    "shaggy",   "Emeus gravis"              , 120 );
moaNunui          = new Moa(  "Moa Nunui",          "South Island Giant Moa", "S",    "S+W+D",  2.40, 3.60,   "robust rounded",   "streaky",  "Dinornis robustus"         , 800 );
moaWaewaeTaumaha  = new Moa(  "Moa Waewae Taumaha", "Heavy- Footed Moa",      "S",    "D",      1.00, 1.20,   "short curved",     "shaggy",   "Pachyornis elephantopus"   , 210 );
moaMomona         = new Moa(  "Moa Mōmona",         "Eastern Moa",            "S",    "D",      0.70, 1.00,   "robust curved",    "shaggy",   "Emeus crassus"             , 270 );
moaKoukou         = new Moa(  "Moa Koukou",         "Crested Moa",            "S",    "S",      1.20, 1.50,   "robust pointed",   "crested",  "Pachyornis australis"      , 10  );
moaPukepuke       = new Moa(  "Moa Pukepuke",       "Upland Moa",             "S",    "S",      0.65, 0.95,   "short curved",     "mottled",  "Megalopteryx didinus"      , 100 );
kuranui           = new Moa(  "Kuranui",            "North Island Giant Moa", "N",    "W",      2.40, 3.00,   "robust curved",    "shaggy",   "Dinornis novazealandiae"   , 310 );
moaRuarangi       = new Moa(  "Moa Ruarangi",       "Mantell's Moa",          "N",    "D",      0.55, 1.30,   "short pointed",    "shaggy",   "Pachyornis geranoides"     , 14  );

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
  case 1: case '1': // I really really hate JavaScript for this sometimes. 
            // the editor slider is converting these int values to single-character strings
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







