import Box2D from '../lib/Box2d.min.js'
import EventEmitter from "events";

export default class Physics extends EventEmitter {
  world;
  constructor(opts={}) {
    super();
    const time = 1/24;
    this.canvas              = opts.canvas || createElement('div');
    this.stage               = new createjs.Stage(this.canvas);
    this.gravityVertical     = 10;
    this.velocityIterations  = 8;
    this.positionInterations = 3;

    this.initBox;
    createjs.Ticker.addEventListener('tick', ()=>{
      console.log('tick');
      this.update;
    });
  }

  initBox() {
    const height      = this.canvas.height,
          width       = this.canvas.width,
          b2Vec2      = Box2D.Common.Math.b2Vec2,
          b2World     = Box2D.Dynamics.b2World,
          centerX     = width/2,
          floorWidth  = width*0.8,
          floorHeight = this.boxEdge,
          floorLeft   = (width-floorWidth)/2;
    const floorShape  = this.createFloor(centerX, height-floorHeight,
                                    floorWidth,floorHeight,'#CCC');
    this.world = new b2World(new b2Vec2(0, this.gravityVertical), true);
    this.stage.addChild(floorShape);
    const shape =
      createDynamicBox(centerX,boxEdge,boxEdge,boxEdge,"#0000FF");
    this.stage.addChild(shape);
  }

  createDynamicBox(x,y,width,height,color) {
    const b2Body  = Box2D.Dynamics.b2Body;
    const bodyDef = defineBody(x,y,width,height,color);
    const shape   = createShape(bodyDef,width,height,color);
    createBody(this.world, bodyDef);
    return shape;
  }

  createFloor(x,y,width,height,color) {
    const b2Body = Box2D.Dynamics.b2Body;
    const bodyDef = defineBody(x,y,b2Body.b2_staticBody);
    const shape = createShape(bodyDef,width,height,color);
    createBody(this.world, bodyDef);
  }

  createShape(bodyDef, width, height, color) {
    const shape = new createjs.Shape();
    this.draw(shape.graphics, width, height, color);
    shape.regX = width/2;
    shape.regY = height/2;
    bodyDef.userData = shape;
    return shape;
  }

  createBody(world, bodyDef) {
    world.CreateBody(bodyDef);
  }

  update() {
    this.world.Step(time, velocityIterations, positionInterations);
    let  body = this.world.GetBodyList();
    while(body) {
      const obj = body.GetUserData();
      if(obj) {
        const position = body.GetPosition();
        obj.x = position.x/this.scale;
        obj.y = position.y/this.scale;
        obj.rotation = body.GetAngle()/Matrix2X.DEG_TO_RAD;
      }
      body = body.GetNext();
    }
    this.stage.update();
  }
}
