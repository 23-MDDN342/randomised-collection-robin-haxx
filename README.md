
 ![Lost World of the moa](readme_assets\lostworld.png)
 





For the "size" trait I used their estimated heights - note that this may not translate to head size in the same way for all species.
Most of the information I was referring to after my initial research is the overviews on New Zealand Birds Online.

Moariki:      https://nzbirdsonline.org.nz/species/little-bush-moa
Moa Hakahaka: https://nzbirdsonline.org.nz/species/stout-legged-moa
Moa Nunui:    https://nzbirdsonline.org.nz/species/south-island-giant-moa
Moa Waewae Taumaha: https://nzbirdsonline.org.nz/species/heavy-footed-moa
Moa Momona:         https://nzbirdsonline.org.nz/species/eastern-moa
Moa Koukou:         https://nzbirdsonline.org.nz/species/crested-moa
Moa Pukepuke: https://nzbirdsonline.org.nz/species/upland-moa
Kuranui:      https://nzbirdsonline.org.nz/species/north-island-giant-moa
Moa Ruarangi: https://nzbirdsonline.org.nz/species/mantells-moa







latest updates: 

Population distribution is working! 
I Identified a problem: My logic works under the assumption that generation is random each time, feeding in a random value which I can manipulate.
This doesn't seem to entirely be the case; when the page is loaded, one or two moa on each arrangement will be "set" in place, so regenerating via clicking will only change their size (and whatever other within-species variation I code in.)
I'm not entirely sure how this is happening, but the random seed funtions seem to result in weirdly predictable patterns.

I implemented the system for habitat- based colour during a coworking session with the Protostars cohort 
(Also tried my best at doing an explainer video of the code so far https://www.youtube.com/watch?v=Reh5eLW4csU)

Since then, I've hooked up a simple way to use both variables at once, drawing a colourful "outline" for biome and keeping the Island- dependent base colour. Keeping these two colour sets distinct is the important part, so a more realistic secondary colour may not be the best idea.

Also, I got rid of the two rightmost columns for a title and key! Most aspects of which are tied directly to the existing data structure, so for example colour changes and item rearrangement will be directly reflected by the key, and adding more entries to the key will only need minor formatting changes. Feeling like a proper web dev here.

Initial stages!
This project is an object-oriented system of randomly arranged/ naturally varying illustrations of NZ's 9 moa species. 


initial moa code prototype
https://editor.p5js.org/verteks/sketches/6kIKr8cT1t

early "kahui" flock array prototype (did not end up working)
https://editor.p5js.org/verteks/sketches/MvoV6HDCg


