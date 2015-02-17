import NeuronLayer from "./neuronlayer";

export default class NeuralNetwork {
  constructor(options) {
    this.inputs     = [];
    this.layers     = [];

    //Input layer
    var lastLayerSize = options.inputs;
    this.inputLayer = new NeuronLayer({
      neuronNumber : options.inputs,
      weightsPerNeuron : options.inputWeightSize,
      activation : options.activation
    });

    //Hidden layers
    var i1 = options.hiddenLayers;
    while(i1--) {
      this.layers.push(new NeuronLayer({
        neuronNumber : options.neuronsPerHiddenLayer,
        weightsPerNeuron : lastLayerSize,
        activation : options.activation
      }));
      lastLayerSize = options.neuronsPerHiddenLayer;
    }

    //Output layer
    this.outputLayer = new NeuronLayer({
      neuronNumber : options.outputs,
      weightsPerNeuron : lastLayerSize,
      activation : options.activation
    });
  }

  get weightCount() {
    var count = 0;
    count += this.inputLayer.weightsCount;
    for(let nl of this.layers) {
      count += nl.weightsCount;
    }
    count += this.outputLayer.weightsCount;
    return count;
  }

  //Gets the output of the neural network based on the passed in inputs.
  get outputs() {
    //run through our neuron layers feeding each layer into the next

    //start with this.inputs
    var inputs = this.inputs;

    //combine layers into single array
    var layers = [this.inputLayer];
    for(let layer of this.layers) {
      layers.push(layer);
    }
    layers.push(this.outputLayer);

    //Now run through the layers
    for(let layer of layers) {
      layer.inputs = inputs;
      inputs = layer.outputs;
    }

    //The output from the last layer is our result
    return inputs;
  }

  //Accessor method to get and assign weights to the whole neural network.  The weights also include the threshold values
  //so that it is easier to evolve the network with a GA.
  get weights() {
    var brainWeights = [];

    //Input layer
    for(let weight of this.inputLayer.weights) {
      brainWeights.push(weight);
    }

    //Hidden layers  
    for(let layer of this.layers) {
      for(let weight of layer.weights) {
        brainWeights.push(weight);
      }
    }

    //Output layer
    for(let weight of this.outputLayer.weights) {
      brainWeights.push(weight);
    }

    return brainWeights;
  }

  set weights(value) {
    //get out hidden layer weightCount
    var hiddenWeightsTotal = (this.layers.length) ? this.layers.length * this.layers[0].weightsCount : 0;

    //Split our weights into input/hidden/output
    var allWeights    = value;
    var inputWeights  = allWeights.splice(0,this.inputLayer.weightsCount);
    var hiddenWeights = (hiddenWeightsTotal > 0) ? allWeights.splice(0,hiddenWeightsTotal) : false;
    var outputWeights = allWeights;

    //Set input weights
    this.inputLayer.weights = inputWeights;

    //set hidden weights
    if(hiddenWeightsTotal) {
      for(let layer of this.layers) {
        var layerWeights = hiddenWeights.splice(0,layer.weightsCount);
        layer.weights    = layerWeights;
      }    
    }

    //Set output weights
    this.outputLayer.weights = outputWeights;

  }
}