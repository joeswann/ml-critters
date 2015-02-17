import {drawFood,drawCreature,drawLines,clearView} from "./draw";

import Creature from "./creature";
import Genome from "./genome";
import NeuralNetwork from "./neuralnetwork";

export default class Main {

  constructor(options) {
    this.creatureNumber = options.creatureCount;
    this.foodNumber     = options.foodCount;
    this.tickMax        = options.tickMax;
    this.generationMax  = options.generationMax;
    this.debugLines     = options.debugLines;

    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.fastRender = false;
    this.generation = 0;
    this.tickNumber = 0;

    this.shouldRun  = true;

    this.fittest   = 0;
    this.highscore = 0;

    //Add creatures
    this.creatures = [];
    var i1 = this.creatureNumber;
    while(i1--) {
      this.creatures.push(new Creature({
        nn: new NeuralNetwork(options.brain), 
        x: Math.random() * this.width,
        y: Math.random() * this.height
      }));
    }

    //Add food
    this.food = [];
    var i2    = this.foodNumber;
    while(i2--) {
      this.food.push({x:Math.random() * this.width,y:Math.random() * this.height});
    }

    //Init genome
    this.genome = new Genome({
      creatures : this.creatures,
      chromosomeLength : this.creatures[0].weightsNumber,
      mutationRate : options.mutationRate,
      crossOverRate: options.crossOverRate
    });

    //Start your engines
    this.initView();
  }

  update() {
    var i1 = 0;
    if(this.tickNumber < this.tickMax) {
      var i2 = this.creatures.length;
      while(i2--) {
        var creature = this.creatures[i2];
        //Update creature
        creature.update(this.food);

        //Are we on food?
        var hit = creature.checkForFood(this.food,5);
        if(hit > -1) {
          creature.incrementFitness();
          this.food[hit] = { 
            x : Math.random() * this.width,
            y : Math.random() * this.height 
          };
        }

        //Wrap creature around
        var p1 = creature.position;
        if(p1.x > this.width)  p1.x = 0;
        if(p1.x < 0)           p1.x = this.width;
        if(p1.y > this.height) p1.y = 0;
        if(p1.y < 0)           p1.y = this.height;
        creature.position = p1; 

        //Update high score
        if(creature.fitness > this.highscore) {
          this.fittest   = i2;
          this.highscore = creature.fitness;
        }
      }
      this.updateView();
      this.tickNumber ++;
    } else {
      if(this.generation < this.generationMax) {
        this.generation++;
        this.genome.epoch();
        this.tickNumber = 0;
        this.highscore  = 0;
        this.fittest    = -1;
        for(let creature of this.creatures) {
          creature.reset(this.width,this.height);
        }
      }
    }
  }

  initView() {
    this.viewInfo   = $('#info');
    this.viewMain   = $('#view');
    this.viewCanvas = $('<canvas />').prependTo(this.viewMain);

    this.viewCanvas.attr('width',  this.width);
    this.viewCanvas.attr('height', this.height);
    this.viewContext = this.viewCanvas[0].getContext("2d");

    this.updateView();
  }

  updateView() {
    //draw stats
    var view_info = '<p>';
    view_info += 'Tick: ' + this.tickNumber + '<br />';
    view_info += 'Generation: ' + this.generation + '<br />';
    view_info += 'High Score: ' + this.highscore + '<br />';
    view_info += 'FPS: ' + this.fps + ' ';  

    this.viewInfo.html(view_info);

    //clear canvas
    clearView(this.viewContext,this.width,this.height);

    //draw food
    for(let food of this.food) {
      drawFood(this.viewContext,{
        x:food.x,
        y:food.y,
        r:3
      });
    }

    //draw creatures
    for(let [i,creature] of this.creatures.entries()) {
      drawCreature(this.viewContext,{
        p:creature.position,
        c:(i == this.fittest) ? {r:255,g:0,b:0} : creature.colour,
        r:3
      });
 
      //draw debug
      if(this.debugLines) drawLines(this.viewContext,creature.debugLines);
    }
  }
};  