import Neuron from "./neuron";

// Neuron Layer organizes the neurons into distinct layers.  It aggregates the weights and output properties of the neurons.
export default class NeuronLayer {
  constructor(options) {
    //neuronNumber,weightsPerNeuron,activation
    this.weightsPerNeuron = options.weightsPerNeuron;
    this.inputs  = [];
    this.neurons = [];

    var n  = false;
    var i1 = options.neuronNumber;

    while(i1--) {
      n = new Neuron(options.weightsPerNeuron,options.activation);
      this.neurons.push(n);
    };
  }

  get weightsCount() {
    return this.weightsPerNeuron * this.neurons.length;
  }

  //All the weights for this layer of neurons
  get weights() {
    //loop through each neurons weights copying them into our ret value.
    var layerWeights = [];
    //for neurons in layer
    for(let neuron of this.neurons) {
      //for weights of neuron
      for(let weight of neuron.weights) {
        layerWeights.push(weight);
      }
    }
    return layerWeights;

  }

  set weights(val) {
    for(let neuron of this.neurons) {
      var weights = val.splice(0,this.weightsPerNeuron);
      neuron.weights = weights;
    }
  }

  // Aggregates the outputs of each neuron into one big return array.  The inputs
  // array is sent to each neuron and the output is stored in an element of the array.
  get outputs() {
    var inputs  = this.inputs;
    var outputs = [];
    for(let n of this.neurons) {
      n.inputs = inputs;
      outputs.push(n.output);
    } 
    this.inputs  = [];
    //somehow our outputs are getting  merged after generation 1
    return outputs;
  }
}