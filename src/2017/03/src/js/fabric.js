const fabric = require('fabric').fabric;

console.log(fabric);

((doc, win)=>{
  const canvas = doc.querySelector('.js-canvas');
  const stage  = new fabric.Canvas(canvas);

  const rect  = new fabric.Rect({
    left: 100,
    top:  100,
    fill: 'red',
    width: 20,
    height: 20
  });

  stage.add(rect);
})(document, window);
