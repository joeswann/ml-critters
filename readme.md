#Critters
A javascript port of the AI junkie neural network tutorial (converted from VB)

http://www.ai-junkie.com/ann/evolved/nnt8.html

#Uses
- ES6 (6to5)
- Grunt
- Bower
- Less (not really, it's pretty much plain CSS)

#Todo
- Web workers? One per creature?
- Resize world when screen resizes
- More keyboard controls (spacebar == pause)
- More stats
- See how much I can clean up JS using ES6 functionality
- Use fastest out of i-- to for(let in x) speed
- Ways to debug/visualise brains
- GA brain structure aswell as weights/threshold
- requestAnimationFrame seems to be stuck at 30/60fps down from 180+, probably due calling this.main.update from engine
- Broken in firefox, untested in !ff !chrome
- Avoiding food
- Seeking food but avoiding other objects
- More effective crossOver operator
- Simplify to the smallest brain possible (fewer inputs/outputs)
