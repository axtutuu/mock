var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
const img = document.getElementById('img')
var context = canvas.getContext('2d');
var tracker = new tracking.ObjectTracker('face');
tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);
tracking.track('#video', tracker, { camera: true });
let rectObj = {}
tracker.on('track', function(event) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  event.data.forEach(function(rect) {
    context.strokeStyle = '#a64ceb';
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
    context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
    rectObj = rect
  });
});

canvas.addEventListener('click', () => {
    const c = document.createElement('canvas')
    const x = c.getContext('2d')
    c.width = 512
    c.height = 512
    x.clearRect(0, 0, c.width, c.height);
    x.drawImage(video, rectObj.x+rectObj.width, rectObj.y+rectObj.height, rectObj.width*2, rectObj.height*2, 0, 125, 250, 250)
    img.src = c.toDataURL('image/png');
})
