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


  fabric.Canvas.prototype.customiseControls({
      tl: {
          action: 'rotate',
          cursor: 'pointer'
      },
      tr: {
          action: 'scale'
      },
      bl: {
          action: 'remove',
          cursor: 'pointer'
      },
      //  br: {
      //      action: 'moveUp',
      //      cursor: 'pointer'
      //  },
      //  mb: {
      //      action: 'moveDown',
      //      cursor: 'pointer'
      //  },
      // mt: {
      //     action: {
      //         'rotateByDegrees': 45
      //     }
      // },
      // mr: {
      //     action: function( e, target ) {
      //         target.set( {
      //             left: 200
      //         } );
      //         stage.renderAll();
      //     }
      //  }
  }, function() {
      stage.renderAll();
  } );

fabric.Object.prototype.customiseCornerIcons( {
    settings: {
        borderColor: '#0094dd',
        cornerSize: 50,
        cornerShape: 'rect',
        // cornerBackgroundColor: 'black'
    },
    tl: {
        icon: 'images/rotate.png'
    },
    tr: {
        icon: 'images/resize.png'
    },
    bl: {
      icon: 'images/trash.png'
    }
}, function() {
    stage.renderAll();
} );

  stage.add(rect);
  stage.item(0)['hasRotatingPoint'] = false;
 

})(document, window);
