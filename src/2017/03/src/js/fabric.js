((doc, win)=>{
  const canvas = doc.querySelector('.js-canvas');
  const stage  = new fabric.Canvas(canvas);

  const rect  = new fabric.Rect({
    left: 0,
    top:  0,
    fill: 'red',
    width: 100,
    height: 100 
  });

fabric.Object.prototype.customiseCornerIcons({
    settings: {
        borderColor: 'black',
        cornerSize: 25,
        cornerShape: 'rect',
        cornerBackgroundColor: 'black',
        cornerPadding: 10
    },
    tl: {
        icon: 'images/Synchronize-100.png'
    },
    tr: {
        icon: 'icons/resize.svg'
    },
    bl: {
        icon: 'icons/remove.svg'
    },
    br: {
        icon: 'icons/up.svg'
    },
    mb: {
        icon: 'icons/down.svg'
    }
}, function() {
    canvas.renderAll();
} );

  stage.add(rect);

})(document, window);
