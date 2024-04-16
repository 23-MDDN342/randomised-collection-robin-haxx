/*
 * This file should contain code that draws your faces.
 *
 * Each function takes parameters and draws a face that is within
 * the bounding box (-10, -10) to (10, 10).
 *
 * These functions are used by your final arrangement of faces as well as the face editor.
 */


/*
 * tilt_value is in degrees
 * eye_value is an integer number of eyes: either 0, 1, 2, or 3
 * mouth_value is how open the mouth is and should generally range from 0.5 to 10
 */
let moariki,
moaHakahaka,
moaNunui,
moaWaewaeTaumaha,
moaMomoua,
moaKoukou,
moaPukepuke,
kuranui,
moaRuarangi;

class Moa {
  constructor (island, habitat, sizeMin, sizeMax, bill, plumage, species){
    
    this.island   = island;
    this.habitat  = habitat;
    this.sizeMin  = sizeMin;
    this.sizeMax  = sizeMax;
    this.bill     = bill;
    this.plumage  = plumage;
    this.species  = species;
  }
  show(x,y){
  //  base colour depends on island
  //  secondary colour depends on habitat
  //  noise mapped between sizemin and sizemax
  let size = random(this.sizeMin, this.sizeMax);
  push();
  noFill();
  stroke(0);
  
  
  for(let i = 0; i < 20; i++){
  strokeWeight(size*.003);
  ellipse(x+(size*.001),y+(size*.001),size * (i*.03),size * (i*.015));
  stroke(255);
  ellipse(x,y,size * (i*.04),size * (i*.03));
  stroke(bg_color1);
  strokeWeight(size*.004);
  ellipse(x,y,size * (i*.041),size * (i*.035));
  ellipse(x,y,size * (i*.041),size * (i*.045));
  //stroke(0);
  ellipse(x-(size*.24),y-(size*.1),size* (i*.01), size * (i*.01));
  ellipse(x+(size*.24),y-(size*.1),size* (i*.01), size * (i*.01));
  }
  pop();
  push();

  fill(0);
  textSize(0.14);
  text(this.species,0,0+(height*.001));
  text("height: " + this.sizeMin + " to " + this.sizeMax + " m",0,0+(height*.0015));
  pop();
  };
}


moariki           = new Moa(  "S+N",  "W",      .40, .50,   "short rounded",    "shaggy",   "Anomalopteryx didiformis"  );
moaHakahaka       = new Moa(  "S+N",  "D",      1.00, 1.20,   "short pointed",    "shaggy",   "Emeus gravis"              );
moaNunui          = new Moa(  "S",    "S+W+D",  2.40, 3.60,   "robust rounded",   "streaky",  "Dinornis robustus"         );
moaWaewaeTaumaha  = new Moa(  "S",    "D",      1.00, 1.20,   "short curved",     "shaggy",   "Pachyornis elephantopus"   );
moaMomoua         = new Moa(  "S",    "D",      0.70, 1.00,   "robust curved",    "shaggy",   "Emeus crassus"             );
moaKoukou         = new Moa(  "S",    "S",      1.20, 1.50,   "robust pointed",   "crested",  "Pachyornis australis"      );
moaPukepuke       = new Moa(  "S",    "S",      0.65, 0.95,   "short curved",     "mottled",  "Megalopteryx didinus"      );
kuranui           = new Moa(  "N",    "W",      2.40, 3.00,   "robust curved",    "shaggy",   "Dinornis novazealandiae"   );
moaRuarangi       = new Moa(  "N",    "D",      0.40, 0.55,   "short pointed",    "shaggy",   "Pachyornis geranoides"     );





