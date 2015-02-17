export default class Neuron {
  //Constructor for the neuron.  It will setup an array for the weights and tell us what activation function to use.
  constructor(weightsNumber,activation) {
    this.output  = 0;
    this.weights = [];
    this.inputs  = [];

    //Enumerator
    this.activation = activation;

    var i1 = weightsNumber;
    while(i1--) {
      this.weights.push(Math.random());
    }

  }

  set output(val) {
    return val;
  }

  get output() {
    var total     = 0;
    var threshold = 0;
    var inputs    = this.inputs;

    //inputs should be 1 less than the number of weights since the last weight is the threshold for activation.
    var i1 = inputs.length - 1;
    while(i1--) {
      total += inputs[i1] * this.weights[i1];
    }

    threshold   = this.weights[inputs.length - 1];
    this.inputs = []; // reset inputs

    //Step or sigmoid
    return (this.activation == 'afstep') ? ((threshold < total) ? 1 : 0) : (1 / (1 + Math.exp((-total) / threshold)));
  } 
}