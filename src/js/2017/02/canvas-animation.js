((win, doc)=>{
  const canvas = doc.querySelector('.js-canvas');
  const stage  = new createjs.Stage(canvas);
  const shape  = new createjs.Shape();
  canvas.width = canvas.offsetWidth*2;
  canvas.height = canvas.offsetHeight*2;
  shape.x      = 50;
  shape.y      = 50;
  stage.addChild(shape);
  draw(shape.graphics);
  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener('tick', rotate);

  function draw(graphic) {
    graphic
      .beginStroke('blue')
      .beginFill('#3817a3')
      .drawPolyStar(0,0,40,5,0.6,-90);
  }

  function rotate() {
    shape.rotation += 5;
    stage.update();
  }

})(window, document);
