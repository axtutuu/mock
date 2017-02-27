((win, doc)=>{

  // 1.stageを用意する
  const canvasElem = doc.querySelector('.js-canvas');
  const stage = new createjs.Stage(canvasElem);

  // 2.インスタンスを作成する
  const shape = new createjs.Shape();
  shape.graphics.beginFill("#FFD09B")
                .drawCircle(0,0,50);

  // 3.インスタンスの配置と表示
  shape.x = shape.y = 50;
  stage.addChild(shape);
  stage.update();


  / * Event * /
  const canvasElemEvent = doc.querySelector('.js-canvas-event');
  const stageEvent = new createjs.Stage(canvasElemEvent);

  const shapeEvent = new createjs.Shape();
  shapeEvent.graphics.beginFill("#FFD09B")
                     .drawCircle(0,0,50);

  shapeEvent.x = shapeEvent.y = 50;

  shapeEvent.addEventListener('click', ()=>{ alert('click'); });
  stageEvent.addChild(shapeEvent);
  stageEvent.update();

  /* Move */
  const canvasElemMove = doc.querySelector('.js-canvas-move');
  const stageMove      = new createjs.Stage(canvasElemMove);

  const shapeMove = new createjs.Shape();
  shapeMove.graphics.beginFill('#FFD09B')
                    .drawCircle(0,0,50);
  shapeMove.x = shapeMove.y = 50;
  stageMove.addChild(shapeMove);

  createjs.Ticker.setFPS(30);
  // createjs.Ticker.addEventListener('tick', ()=>{
  //   shapeMove.x = shapeMove.y += 1;
  //   stageMove.update();
  // });

  / * TweenJS */
  const canvasTween = doc.querySelector('.js-canvas-tween');
  const stageTween  = new createjs.Stage(canvasTween);

  const shapeTween  = new createjs.Shape();
  shapeTween.graphics.beginFill('#FFD09B')
                     .drawRect(0,0,150, 150);
  shapeTween.x = shapeTween.y = 50;
  stageTween.addChild(shapeTween);

  createjs.Tween.get(shapeTween).to({x: 150, y: 150}, 3000, createjs.Ease.bounceInOut);
  // createjs.Tween.get(shapeTween, {loop: true}).to({rotation: 360}, 1000);
  // createjs.Tween.get(shapeTween).to({x: 150, y: 150}, 3000, createjs.Ease.bounceInOut)
  //                               .to({rotation: 360}, 1000);
  createjs.Ticker.addEventListener('tick', ()=>{
    stageTween.update();
  });

  / * Preload JS */
  const canvasPreload = doc.querySelector('.js-canvas-preload');
  const stagePreload  = new createjs.Stage(canvasPreload);

  // 1. LoadQueueインスタスを作成
  const queue = new createjs.LoadQueue();
  queue.loadFile('./images/ham-2063533_640.jpg');

  queue.addEventListener('fileload', (e)=>{
    const bitmap = new createjs.Bitmap(e.result);
    stagePreload.addChild(bitmap);
    stagePreload.update();
  });

})(window, document);
