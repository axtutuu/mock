const Physic = {
  canvas: "",
  stage:  null,
  gravityVertical: 10,
  boxEdge: 20,
  count: 50,

  set init(canvas) {
    this.canvas = canvas;
    this.stage  = new createjs.Stage(this.canvas);
  },

  initBox: () => {
    const height      = this.canvas.height;
    const width       = this.canvas.width;
    const b2Vec2      = Box2D.Common.Math.b2Vec2,
          b2World     = Box2D.Dynamics.b2World
          world       = new b2World(new b2Vec2(0, this.gravityVertical), true)
          centerX     = width/2
          floorWidth  = width*0.8
          floorHeight = this.boxEdge
          floorLeft   = (width-floorWidth)/2;
    const floorShape  = createFloor(centerX, height-floorHeight,
                                    floorWidth,floorHeight,'#CCC');
    this.stage.addChild(floorShape);
    for(let i=0; i < this.count; i++) {
      const nX = floorWidth * Math.random() + floorLeft;
    }
  }
}

module.exports = Physic;
