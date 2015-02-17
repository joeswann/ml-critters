"use strict";

exports.drawFood = drawFood;
exports.drawCreature = drawCreature;
exports.drawLines = drawLines;
exports.clearView = clearView;
function drawFood(context, opts) {
  context.fillStyle = "#6a6";
  context.beginPath();
  context.arc(opts.x, opts.y, opts.r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

function drawCreature(context, opts) {
  context.fillStyle = "rgb(" + opts.c.r + "," + opts.c.g + "," + opts.c.b + ")";
  context.beginPath();
  context.arc(opts.p.x, opts.p.y, opts.r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

function drawLines(context, lines) {
  context.strokeStyle = "#f44";
  for (var _iterator = lines[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    var line = _step.value;
    context.beginPath();
    context.moveTo(line.a.x, line.a.y);
    context.lineTo(line.b.x, line.b.y);
    context.closePath();
    context.stroke();
  }
}

function clearView(context, width, height) {
  context.fillStyle = "#111";
  context.fillRect(0, 0, width, height);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});