export function drawFood(context,opts) {
  context.fillStyle = '#6a6';
  context.beginPath();
  context.arc(opts.x, opts.y, opts.r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

export function drawCreature(context,opts) {
  context.fillStyle = 'rgb(' + opts.c.r + ',' + opts.c.g + ',' + opts.c.b + ')'; 
  context.beginPath();
  context.arc(opts.p.x, opts.p.y, opts.r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

export function drawLines(context,lines) {
  context.strokeStyle = '#f44';
  for(let line of lines) {
    context.beginPath(); 
    context.moveTo(line.a.x, line.a.y);
    context.lineTo(line.b.x, line.b.y);
    context.closePath();
    context.stroke();
  }
}

export function clearView(context,width,height) {
  context.fillStyle = '#111';
  context.fillRect(0, 0, width, height);
}