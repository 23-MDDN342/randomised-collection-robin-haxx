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
moaMomona,
moaKoukou,
moaPukepuke,
kuranui,
moaRuarangi;

class Moa {
  constructor (_teReo, _english, _island, _habitat, _sizeMin, _sizeMax, _bill, _plumage, _species){
    
    this.teReo    = _teReo;
    this.english  = _english;
    this.island   = _island;
    this.habitat  = _habitat;
    this.sizeMin  = _sizeMin;
    this.sizeMax  = _sizeMax;
    this.bill     = _bill;
    this.plumage  = _plumage;
    this.species  = _species;
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
    strokeWeight(size*.004);
    //ellipse(x+(size*.001),y+(size*.001),size * (i*.03),size * (i*.015));
    stroke(bg_color1);
    //ellipse(x,y,size * (i*.025),size * (i*.03));
    ellipse(x,y-(size*.08),size * (i*.028),size * (i*.018));
    stroke(255);
    strokeWeight(size*.006);
    ellipse(x,y+(size*.22),size * (i*.041),size * (i*.035));
    
    ellipse(x,y+(size*.29),size * (i*.041),size * (i*.045));//beak btm
    
    push();
    strokeWeight(size*.001);
    ellipse(x,y-(size*.19),size * (i*.010),size * (i*.015));//beak top
    pop();
    //stroke(0);
    ellipse(x-(size*.2),y-(size*.15),size* (i*.005), size * (i*.004));
    ellipse(x+(size*.2),y-(size*.15),size* (i*.005), size * (i*.004));
  }
  pop();
  push();

  fill(0);
  textSize(0.14);
  text(this.teReo, 0,0+ (height * .001));
  text(this.english, 0,0+ (height * .0013));
  
  text("height: " + this.sizeMin + " to " + this.sizeMax + " m",0,0+(height*.0017));
  text(this.species,0,0+ (height * .002));
  pop();
  };
}


moariki           = new Moa(  "Moariki",            "Little Bush Moa",        "S+N",  "W",      0.55, 1.10,   "short rounded",    "shaggy",   "Anomalopteryx didiformis"  );
moaHakahaka       = new Moa(  "Moa Hakahaka",       "Stout- Legged Moa",      "S+N",  "D",      1.00, 1.20,   "short pointed",    "shaggy",   "Emeus gravis"              );
moaNunui          = new Moa(  "Moa Nunui",          "South Island Giant Moa", "S",    "S+W+D",  2.40, 3.60,   "robust rounded",   "streaky",  "Dinornis robustus"         );
moaWaewaeTaumaha  = new Moa(  "Moa Waewae Taumaha", "Heavy- Footed Moa",      "S",    "D",      1.00, 1.20,   "short curved",     "shaggy",   "Pachyornis elephantopus"   );
moaMomona         = new Moa(  "Moa Momona",         "Eastern Moa",            "S",    "D",      0.70, 1.00,   "robust curved",    "shaggy",   "Emeus crassus"             );
moaKoukou         = new Moa(  "Moa Koukou",         "Crested Moa",            "S",    "S",      1.20, 1.50,   "robust pointed",   "crested",  "Pachyornis australis"      );
moaPukepuke       = new Moa(  "Moa Pukepuke",       "Upland Moa",             "S",    "S",      0.65, 0.95,   "short curved",     "mottled",  "Megalopteryx didinus"      );
kuranui           = new Moa(  "Kuranui",            "North Island Giant Moa", "N",    "W",      2.40, 3.00,   "robust curved",    "shaggy",   "Dinornis novazealandiae"   );
moaRuarangi       = new Moa(  "Moa Ruarangi",       "Mantell's Moa",          "N",    "D",      0.55, 1.30,   "short pointed",    "shaggy",   "Pachyornis geranoides"     );

function modeSelect(mode){
switch (mode){
  case 1:
  case '1': // I really really hate JavaScript for this sometimes. 
              // the editor slider is converting these int values to single-character strings
    moariki.show(0,0);
    break;
  case 2:
  case '2':
    moaHakahaka.show(0,0);
    break;
  case 3:
  case '3':
    moaNunui.show(0,0);
    break;
  case 4:
  case '4':
    moaWaewaeTaumaha.show(0,0);
    break;
  case 5:
  case '5':
    moaMomona.show(0,0);
    break;
  case 6:
  case '6':
    moaKoukou.show(0,0);
    break;
  case 7:
  case '7':
    moaPukepuke.show(0,0);
    break;
  case 8:
  case '8':
    kuranui.show(0,0);
    break;
  case 9:
  case '9':
    moaRuarangi.show(0,0);
    break;
  default: 
    console.log("for some reason, the randomness generator for species selection returned a really weird value");
    //this debug message was a very good call
}

}



