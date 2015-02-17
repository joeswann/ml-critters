import Main from "./main"

export default class Engine {

  constructor(opts) { 
    this.fps = opts.fps;
    this.raf = opts.raf;

    this.run         = true;
    this.startTime   = 0;
    this.frameNumber = 0;

    this.then     = 0;
    this.interval = 0;
    
    //Start window listener
    window.addEventListener("keyup", (e) => this.keyboardHandler(e), false);

    this.main = new Main(opts.main);

    this.start();
  }

  start() {
    this.then = Date.now();
    this.interval = 1000 / this.fps;

    if(this.raf) {
      this.loop();
    } else {
      setInterval(() => this.update(), 0);
    }
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    var now   = Date.now();
    var delta = now - this.then;
    
    if (delta > this.interval) { 
      this.then = now - (delta % this.interval);
      this.update();
    }
  }

  update() {
    this.main.fps = this.getFps();
    if(this.run) this.main.update();
  }

  getFps() {
    this.frameNumber++;
    var d = new Date().getTime(),
    currentTime = ( d - this.startTime ) / 1000,
    result = Math.floor( ( this.frameNumber / currentTime ) );

    if( currentTime > 1 ){
      this.startTime = new Date().getTime();
      this.frameNumber = 0;
    }
    
    return result;
  } 

  keyboardHandler(e) {
    if(e.keyCode == 32) {
      this.togglePause();
    }
  }

  togglePause() {
    this.run = !this.run;
  }

};