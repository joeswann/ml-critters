"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

//Main
var Engine = _interopRequire(require("./js/dist/engine"));

new Engine({
  fps: 200,
  raf: false,
  main: {
    creatureCount: 80,
    foodCount: 20,
    tickMax: 1000,
    generationMax: 10000,
    debugLines: false,
    brain: {
      inputs: 4,
      outputs: 2,
      hiddenLayers: 0,
      neuronsPerHiddenLayer: 4,
      inputWeightSize: 4,
      activation: "afsigmoid"
    },
    genome: {
      mutationRate: 0.01,
      crossOverRate: 0.05
    }
  }
});