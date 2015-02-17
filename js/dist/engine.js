"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Main = _interopRequire(require("./main"));

var Engine = (function () {
  function Engine(opts) {
    var _this = this;
    _classCallCheck(this, Engine);

    this.fps = opts.fps;
    this.raf = opts.raf;

    this.run = true;
    this.startTime = 0;
    this.frameNumber = 0;

    this.then = 0;
    this.interval = 0;

    //Start window listener
    window.addEventListener("keyup", function (e) {
      return _this.keyboardHandler(e);
    }, false);

    this.main = new Main(opts.main);

    this.start();
  }

  _prototypeProperties(Engine, null, {
    start: {
      value: function start() {
        var _this = this;
        this.then = Date.now();
        this.interval = 1000 / this.fps;

        if (this.raf) {
          this.loop();
        } else {
          setInterval(function () {
            return _this.update();
          }, 0);
        }
      },
      writable: true,
      configurable: true
    },
    loop: {
      value: function loop() {
        var _this = this;
        requestAnimationFrame(function () {
          return _this.loop();
        });
        var now = Date.now();
        var delta = now - this.then;

        if (delta > this.interval) {
          this.then = now - delta % this.interval;
          this.update();
        }
      },
      writable: true,
      configurable: true
    },
    update: {
      value: function update() {
        this.main.fps = this.getFps();
        if (this.run) this.main.update();
      },
      writable: true,
      configurable: true
    },
    getFps: {
      value: function getFps() {
        this.frameNumber++;
        var d = new Date().getTime(),
            currentTime = (d - this.startTime) / 1000,
            result = Math.floor(this.frameNumber / currentTime);

        if (currentTime > 1) {
          this.startTime = new Date().getTime();
          this.frameNumber = 0;
        }

        return result;
      },
      writable: true,
      configurable: true
    },
    keyboardHandler: {
      value: function keyboardHandler(e) {
        if (e.keyCode == 32) {
          this.togglePause();
        }
      },
      writable: true,
      configurable: true
    },
    togglePause: {
      value: function togglePause() {
        this.run = !this.run;
      },
      writable: true,
      configurable: true
    }
  });

  return Engine;
})();

module.exports = Engine;