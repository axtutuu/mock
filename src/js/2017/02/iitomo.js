window.onload = function() {
  var img = document.getElementById('img');
  var tracker = new tracking.ObjectTracker(['face']);
  tracking.track('#img', tracker);
  tracker.on('track', function(event) {
    event.data.forEach(function(rect) {
      const canvas = document.getElementById('canvas');
      const canvasCxt = canvas.getContext('2d');
      canvasCxt.beginPath();
      canvasCxt.arc(65, 65, 45, 0, Math.PI*2, false);
      canvasCxt.clip();

      var img4 = new Image();
      img4.onload = function() {
        canvasCxt.drawImage(img4, 98, 187, 90, 90, 20, 20, 90, 90);
      };
      img4.src = img.src;

      console.log(rect);
    });
  });
};
