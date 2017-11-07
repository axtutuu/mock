let el = document.querySelector('.box');
let mc = new Hammer(el);
mc.get('pinch').set({ enable: true });

let scale = 1;
mc.on('pinchstart', evt => {
  console.log(evt);
  console.log(evt.target.offsetLeft);
  $(el).children().css({transformOrigin: ''+ ((-1*evt.target.x)+evt.center.x)+'px '+ ((-1*evt.target.y)+evt.center.y)+'px'});
});

mc.on('pinchmove', evt => {
  console.log(evt, scale, scale+(evt.scale-1))
  let s;
  if(evt.scale<0) {
      s = scale-evt.scale
  } else {
    s = scale+(evt.scale-1)
  }
  console.log(s)
  $(el).children().css({transform: 'scale('+s+')'});
});

mc.on('pinchend', evt => {
  console.log(evt)
  if(evt.scale<0) {
    scale = scale-evt.scale
  } else {
    scale = scale+(evt.scale-1)
  }
  $(el).children().css({transformOrigin: ''+ ((-1*evt.target.x)+evt.center.x)+'px '+ ((-1*evt.target.y)+evt.center.y)+'px'});
});
