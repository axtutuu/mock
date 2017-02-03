import $ from "jquery";
import EventEmitter from "events";

const FRAMES = {};
const DEFAULT = "http://placehold.it/300x200/719b3b/fff.jpg/?text=Default";

class Canvas extends EventEmitter {
  constructor(opts={}){
    super();
    this.$canvas   = opts.$canvas;
    this.canvasCxt = opts.$canvas[0].getContext('2d');

    this.init();
  }

  init() {
    const defaultImage= new Image();
    defaultImage.src = DEFAULT;

    defaultImage.onload = () => {
      console.log(defaultImage);
      this.canvasCxt.drawImage(defaultImage, 0, 0);
    };
  };
}


(()=>{
  const canvas = new Canvas({
    $canvas: $(".canvas")
  });
})();
