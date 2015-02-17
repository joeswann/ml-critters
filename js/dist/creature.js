"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Creature = (function () {
  function Creature(options) {
    _classCallCheck(this, Creature);

    //Params
    this.maxTurnRate = 0.9;

    //Inputs
    this.lookAt = { x: 0, y: 0 };
    this.foodLastPosition = 0;
    this.foodLastAngle = 0;

    //State
    this.fitness = 0;
    this.rotation = 0;
    this.speed = 0;
    this.inputs = [];
    this.outputs = [];

    this.brain = options.nn;
    this.position = { x: options.x, y: options.y };
    this.lTrack = Math.random();
    this.rTrack = Math.random();
    this.shade = 0;

    //Debug food line
    this.debugLines = [{
      a: this.position,
      b: this.position
    }];
  }

  _prototypeProperties(Creature, null, {
    update: {

      //Called for each tick in the program.  The update function gets inputs for the NN and then sets the track values according to the output.
      value: function update(food) {
        var closestFood = this.normaliseVector(this.getClosestObject(food));

        this.inputs = [closestFood.x, closestFood.y, this.lookAt.x, this.lookAt.y];

        this.brain.inputs = this.inputs;
        this.outputs = this.brain.outputs;

        this.lTrack = this.outputs[0];
        this.rTrack = this.outputs[1];

        var rotationForce = this.clampNumber(this.lTrack - this.rTrack, -this.maxTurnRate, this.maxTurnRate);

        this.rotation += rotationForce;
        this.speed = this.lTrack + this.rTrack;

        this.lookAt.x = Math.sin(this.rotation) * -1;
        this.lookAt.y = Math.cos(this.rotation);

        this.position = this.addVectors(this.position, this.multVector(this.lookAt, this.speed));
      },
      writable: true,
      configurable: true
    },
    getClosestObject: {

      //Returns a vector to the closest food/object
      value: function getClosestObject(food) {
        var closestSoFar = 9999;
        var closestObject = { x: 1, y: 1 };
        var i = food.length;

        while (i--) {
          var lengthToObject = this.lengthVector(this.distVectors(food[i], this.position));
          if (lengthToObject < closestSoFar) {
            closestSoFar = lengthToObject;
            closestObject = this.distVectors(food[i], this.position);
            this.foodLastPosition = i;
          }
        }

        //Set line to food
        this.debugLines[0] = {
          a: this.position,
          b: this.addVectors(this.position, this.multVector(this.normaliseVector(closestObject, 10)))
        };

        //Set line we are facing
        this.debugLines[1] = {
          a: this.position,
          b: this.addVectors(this.position, this.multVector(this.lookAt, 10))
        };

        return closestObject;
      },
      writable: true,
      configurable: true
    },
    checkForFood: {

      //Checks to see if the Creature has found food and returns the index of the food or -1 if not found.
      value: function checkForFood(food, size) {
        var length = this.lengthVector(this.distVectors(this.position, food[this.foodLastPosition]));


        if (length < size + 3) {
          return this.foodLastPosition;
        } else {
          return -1;
        }
      },
      writable: true,
      configurable: true
    },
    reset: {

      //Called after each epoch.  This just resets the fitness score and randomly places the ant on the board.
      value: function reset() {
        this.shade = 0;
        this.fitness = 0;
        this.position = {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        };

        this.rotation = Math.random() * Math.PI * 2;
      },
      writable: true,
      configurable: true
    },
    incrementFitness: {

      //Adds to fitness
      value: function incrementFitness() {
        this.fitness += 1;
        this.shade += 100;
      },
      writable: true,
      configurable: true
    },
    lengthVector: {

      //Get length of vector
      value: function lengthVector(p) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
      },
      writable: true,
      configurable: true
    },
    normaliseVector: {

      //Normalizes the vector to values between -1 and 1
      value: function normaliseVector(p1) {
        var l = this.lengthVector(p1);

        return {
          x: p1.x / l,
          y: p1.y / l
        };
      },
      writable: true,
      configurable: true
    },
    distVectors: {

      //Returns the distance between two points.
      value: function distVectors(p1, p2) {
        return {
          x: p1.x - p2.x,
          y: p1.y - p2.y
        };
      },
      writable: true,
      configurable: true
    },
    multVector: {

      //Multiply vector
      value: function multVector(p1, val) {
        return {
          x: p1.x * val,
          y: p1.y * val
        };
      },
      writable: true,
      configurable: true
    },
    addVectors: {

      //Add vectors
      value: function addVectors(p1, p2) {
        return {
          x: p1.x + p2.x,
          y: p1.y + p2.y
        };
      },
      writable: true,
      configurable: true
    },
    clampNumber: {

      //Just ensures that a value is between the min and max.
      value: function clampNumber(num, min, max) {
        if (num < min) return min;
        if (num > max) return max;
        return num;
      },
      writable: true,
      configurable: true
    },
    weights: {

      //Accessors
      get: function () {
        return this.brain.weights;
      },
      set: function (value) {
        this.brain.weights = value;
      },
      configurable: true
    },
    colour: {
      get: function () {
        return {
          r: this.shade,
          g: this.shade,
          b: this.shade
        };
      },
      configurable: true
    }
  });

  return Creature;
})();

module.exports = Creature;