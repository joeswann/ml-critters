export default class Genome {
  constructor(options) {
    //creatures,chromosomeLength,mutationRate,crossOverRate
    this.totalFitness = 0;
    this.bestFitness  = 0;
    this.avgFitness   = 0;
    this.worstFitness = 0;
    this.fittest      = 0;

    this.creatures        = options.creatures;
    this.populationSize   = options.creatures.length;
    this.reset();
    this.mutationRate     = options.mutationRate;
    this.crossOverRate    = options.crossOverRate;
    this.chromosomeLength = options.chromosomeLength;
  }

  //The main work horse of a Genetic Algorithm
  epoch() {
    this.reset();
    this.creatures = this.sortCreatures(this.creatures);

    this.calcStats();

    //Store new pop
    var top    = Math.floor(this.creatures.length * 0.1) + 1;
    var newPop = this.grabNBest(top); 
    newPop     = this.naturalSelection(newPop,top);

    //Set new weights
    var i2 = this.creatures.length;
    while(i2--) { 
      this.creatures[i2].weights = newPop[i2];
    }
  }

  naturalSelection(population, top) {
    var newPop = [];
    var i1 = this.creatures.length - top + 2;
    while(i1 > 0) { 
      var p1 = this.rouletteSelection().weights;
      var p2 = this.rouletteSelection().weights;

      var family = this.crossOver({
        p1:p1,
        p2:p2,
        c1:[],
        c2:[]
      });

      family.c1  = this.mutate(family.c1);
      family.c2  = this.mutate(family.c2);

      newPop.push(family.c1);
      newPop.push(family.c2);
      i1 -= 2;
    }

    return population.concat(newPop);
  }

  //Simple single point cross over function.
  crossOver(family) {
    if(Math.random() > this.crossOverRate) {
      //just return clones
      var i1 = family.p1.length;
      while(i1--) {
        family.c1[i1] = family.p1[i1];
        family.c2[i1] = family.p2[i1];
      }
      return family;
    }

    var crossPoint = Math.floor(Math.random() * family.p1.length);
    var i2 = crossPoint;
    while(i2--) {
      family.c1[i2] = family.p1[i2];
      family.c2[i2] = family.p2[i2];
    }

    //switch chromosomes
    var i3 = family.p1.length;
    while(i3--) {
      family.c1[i3] = family.p2[i3];
      family.c2[i3] = family.p1[i3];
    }

    return {
      p1:family.p1,
      p2:family.p2,
      c1:family.c1,
      c2:family.c2
    }
  }

  //Loops over each gene in the chromosome and decides whether to mutate it or not. 
  //No max mutation rate has been set for this function.
  mutate(c) {
    var i1 = c.length;
    while(i1--) {
      if(Math.random() < this.mutationRate) {
        c[i1] += Math.random();
      }
    }
    return c;
  }

  //Use roulette selection to return a creature.

  rouletteSelection() {
    var i1        = this.creatures.length;
    var slice     = Math.random() * this.totalFitness;
    var fitsofar  = 0;
    var chosenOne = false;

    while(i1--) {
      fitsofar += this.creatures[i1].fitness;
      if(fitsofar > slice) {
        chosenOne = this.creatures[i1];
        i1 = 0; //break loop
      }
    }

    if(!chosenOne) {
      chosenOne = this.creatures[1];
    }

    return chosenOne;
  }

  sortCreatures(creatures) {
    return creatures.sort(function(a,b) {
      if(b.fitness < a.fitness) return 1;
      if(b.fitness > a.fitness) return -1;
      return 0;
    });
  }

  //Elitist function
  grabNBest(num) {
    var pop = []; 
    while(num--) {
      pop.push(this.creatures[num].weights);
    }
    return pop; 
  }

  //Get some population statistics
  calcStats() {
    var i1 = this.creatures.length;
    var highest = 0;
    var lowest  = 999999;

    while(i1--) {
      var creatureFitness = this.creatures[i1].fitness;

      this.totalFitness += creatureFitness;

      if(creatureFitness > highest) {
        highest = creatureFitness;
        this.fittest = i1;
      }

      if(creatureFitness < lowest) {
        lowest = creatureFitness;
      }
    }

    this.worstFitness = lowest;
    this.bestFitness  = highest;
    this.avgFitness   = this.totalFitness / this.creatures.length - 1;
  }

  //Reset stats
  reset() {
    this.totalFitness = 0;
    this.bestFitness  = 0;
    this.avgFitness   = 0;
    this.worstFitness = 0;
    this.fittest      = 0;
  }
}