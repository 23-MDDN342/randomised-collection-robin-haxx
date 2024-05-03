**PROJECT 2: PROCEDURAL EXTINCT NATIVE AVIAN SPECIES NATURAL VARIATION DIGITAL ILLUSTRATION !!**

I'm approaching this project as a programming + data visualization exercise first, rather than a design assignment, so my focus was on finding clear and simple methods of visualizing the systems I was building. <br>
This project is an object- oriented tool for creating "collections" of Moa, distributed according to how rare the best natural historians reckon they were, and illustrating their relative sizes and preferred habitat. <br>
I was the entomologist George Hudson, as he documented his samples of NZ insects with beautiful illustrations and pushed for naturalism to be more accessible to people without formal scientific education. <br>
 ![George Hudson](readme_assets\hudson.jpg)

It later became inspired by the sources I used in researching the Moa <br>

 ![Lost World of the moa](readme_assets\lostworld.png)

My best source of information so far has been this book. Incredibly helpful, well written for how scientific it is and pretty up to date.<br>
Worthy, T. H., and Richard N. Holdaway. The Lost World of the Moa : Prehistoric Life of New Zealand. Indiana University Press, 2002.

For the "size" trait I used their estimated heights - note that this may not translate to head size in the same way for all species.
Most of the information I was referring to after my initial research is the overviews on New Zealand Birds Online.

Moariki:      https://nzbirdsonline.org.nz/species/little-bush-moa <br>
Moa Hakahaka: https://nzbirdsonline.org.nz/species/stout-legged-moa <br>
Moa Nunui:    https://nzbirdsonline.org.nz/species/south-island-giant-moa <br>
Moa Waewae Taumaha: https://nzbirdsonline.org.nz/species/heavy-footed-moa <br>
Moa Momona:         https://nzbirdsonline.org.nz/species/eastern-moa <br>
Moa Koukou:         https://nzbirdsonline.org.nz/species/crested-moa <br>
Moa Pukepuke: https://nzbirdsonline.org.nz/species/upland-moa <br>
Kuranui:      https://nzbirdsonline.org.nz/species/north-island-giant-moa <br>
Moa Ruarangi: https://nzbirdsonline.org.nz/species/mantells-moa <br>


A blog post where I talk about the project + Moa natural history in more detail:
https://ruleofbirds.blog/post/747994168372101120/%F0%9D%9A%8D%F0%9D%9A%8E%F0%9D%9A%9F%F0%9D%9A%95%F0%9D%9A%98%F0%9D%9A%90%F0%9D%9F%B6%F0%9D%9F%B8%F0%9D%9F%B7

The population counts aren't based off of particularly accurate data.


latest updates: 

Population distribution is working! 
I Identified a problem: My logic works under the assumption that generation is random each time, feeding in a random value which I can manipulate.
This doesn't seem to entirely be the case; when the page is loaded, one or two moa on each arrangement will be "set" in place, so regenerating via clicking will only change their size (and whatever other within-species variation I code in.)
I'm not entirely sure how this is happening, but the random seed funtions seem to result in weirdly predictable patterns.

I implemented the system for habitat- based colour during a coworking session with the Protostars cohort 
(Also tried my best at doing an explainer video of the code so far https://www.youtube.com/watch?v=Reh5eLW4csU)

Since then, I've hooked up a simple way to use both variables at once, drawing a colourful "outline" for biome and keeping the Island- dependent base colour. Keeping these two colour sets distinct is the important part, so a more realistic secondary colour may not be the best idea.

initial moa code prototype (does not display anything)
https://editor.p5js.org/verteks/sketches/6kIKr8cT1t




