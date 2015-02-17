"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var NeuronLayer = _interopRequire(require("./neuronlayer"));

var NeuralNetwork = (function () {
  function NeuralNetwork(options) {
    _classCallCheck(this, NeuralNetwork);

    this.inputs = [];
    this.layers = [];

    //Input layer
    var lastLayerSize = options.inputs;
    this.inputLayer = new NeuronLayer({
      neuronNumber: options.inputs,
      weightsPerNeuron: options.inputWeightSize,
      activation: options.activation
    });

    //Hidden layers
    var i1 = options.hiddenLayers;
    while (i1--) {
      this.layers.push(new NeuronLayer({
        neuronNumber: options.neuronsPerHiddenLayer,
        weightsPerNeuron: lastLayerSize,
        activation: options.activation
      }));
      lastLayerSize = options.neuronsPerHiddenLayer;
    }

    //Output layer
    this.outputLayer = new NeuronLayer({
      neuronNumber: options.outputs,
      weightsPerNeuron: lastLayerSize,
      activation: options.activation
    });
  }

  _prototypeProperties(NeuralNetwork, null, {
    weightCount: {
      get: function () {
        var count = 0;
        count += this.inputLayer.weightsCount;
        for (var _iterator = this.layers[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var nl = _step.value;
          count += nl.weightsCount;
        }
        count += this.outputLayer.weightsCount;
        return count;
      },
      configurable: true
    },
    outputs: {

      //Gets the output of the neural network based on the passed in inputs.
      get: function () {
        //run through our neuron layers feeding each layer into the next

        //start with this.inputs
        var inputs = this.inputs;

        //combine layers into single array
        var layers = [this.inputLayer];
        for (var _iterator = this.layers[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var layer = _step.value;
          layers.push(layer);
        }
        layers.push(this.outputLayer);

        //Now run through the layers
        for (var _iterator2 = layers[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
          var layer = _step2.value;
          layer.inputs = inputs;
          inputs = layer.outputs;
        }

        //The output from the last layer is our result
        return inputs;
      },
      configurable: true
    },
    weights: {

      //Accessor method to get and assign weights to the whole neural network.  The weights also include the threshold values
      //so that it is easier to evolve the network with a GA.
      get: function () {
        var brainWeights = [];

        //Input layer
        for (var _iterator = this.inputLayer.weights[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var weight = _step.value;
          brainWeights.push(weight);
        }

        //Hidden layers 
        for (var _iterator2 = this.layers[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
          var layer = _step2.value;
          for (var _iterator3 = layer.weights[Symbol.iterator](), _step3; !(_step3 = _iterator3.next()).done;) {
            var weight = _step3.value;
            brainWeights.push(weight);
          }
        }

        //Output layer
        for (var _iterator4 = this.outputLayer.weights[Symbol.iterator](), _step4; !(_step4 = _iterator4.next()).done;) {
          var weight = _step4.value;
          brainWeights.push(weight);
        }

        return brainWeights;
      },
      set: function (value) {
        //get out hidden layer weightCount
        var hiddenWeightsTotal = this.layers.length ? this.layers.length * this.layers[0].weightsCount : 0;

        //Split our weights into input/hidden/output
        var allWeights = value;
        var inputWeights = allWeights.splice(0, this.inputLayer.weightsCount);
        var hiddenWeights = hiddenWeightsTotal > 0 ? allWeights.splice(0, hiddenWeightsTotal) : false;
        var outputWeights = allWeights;

        //Set input weights
        this.inputLayer.weights = inputWeights;

        //set hidden weights
        if (hiddenWeightsTotal) {
          for (var _iterator = this.layers[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
            var layer = _step.value;
            var layerWeights = hiddenWeights.splice(0, layer.weightsCount);
            layer.weights = layerWeights;
          }
        }

        //Set output weights
        this.outputLayer.weights = outputWeights;
      },
      configurable: true
    }
  });

  return NeuralNetwork;
})();

module.exports = NeuralNetwork;