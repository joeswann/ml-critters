"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Neuron = _interopRequire(require("./neuron"));

// Neuron Layer organizes the neurons into distinct layers.  It aggregates the weights and output properties of the neurons.
var NeuronLayer = (function () {
  function NeuronLayer(options) {
    _classCallCheck(this, NeuronLayer);

    //neuronNumber,weightsPerNeuron,activation
    this.weightsPerNeuron = options.weightsPerNeuron;
    this.inputs = [];
    this.neurons = [];

    var n = false;
    var i1 = options.neuronNumber;

    while (i1--) {
      n = new Neuron(options.weightsPerNeuron, options.activation);
      this.neurons.push(n);
    };
  }

  _prototypeProperties(NeuronLayer, null, {
    weightsCount: {
      get: function () {
        return this.weightsPerNeuron * this.neurons.length;
      },
      configurable: true
    },
    weights: {

      //All the weights for this layer of neurons
      get: function () {
        //loop through each neurons weights copying them into our ret value.
        var layerWeights = [];
        //for neurons in layer
        for (var _iterator = this.neurons[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var neuron = _step.value;
          //for weights of neuron
          for (var _iterator2 = neuron.weights[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
            var weight = _step2.value;
            layerWeights.push(weight);
          }
        }
        return layerWeights;
      },
      set: function (val) {
        for (var _iterator = this.neurons[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var neuron = _step.value;
          var weights = val.splice(0, this.weightsPerNeuron);
          neuron.weights = weights;
        }
      },
      configurable: true
    },
    outputs: {

      // Aggregates the outputs of each neuron into one big return array.  The inputs
      // array is sent to each neuron and the output is stored in an element of the array.
      get: function () {
        var inputs = this.inputs;
        var outputs = [];
        for (var _iterator = this.neurons[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var n = _step.value;
          n.inputs = inputs;
          outputs.push(n.output);
        }
        this.inputs = [];
        //somehow our outputs are getting  merged after generation 1
        return outputs;
      },
      configurable: true
    }
  });

  return NeuronLayer;
})();

module.exports = NeuronLayer;