(() => {
  console.log('10');
  const canvas = document.querySelector('.day-10');
  const context = canvas.getContext('2d');
  let i = 0;
  const config = {
    unit: 5,
    width: 600,
    height: 300,
    x: 300,
    y: 150,
    defaultSize: 20,
    size: 0,
  }
  canvas.width = config.width;
  canvas.height = config.height;

  function init() {
    console.log('init');
    setInterval(move, 50);
  }

  function move() {
    i += config.unit;

    const sin = Math.sin(i/360*2*Math.PI);
    const cos = Math.cos(i/360*2*Math.PI);
    config.x = sin * config.width/2 - 50 + config.width/2;
    config.y = sin * config.height/2 - 50 + config.height/2;
    config.size = (cos+2)/2 * config.defaultSize

    draw();
  }

  function draw() {
    context.clearRect(0,0,config.width, config.height);

    // circle
    context.beginPath();
    context.globalAlpha = 1;
    context.fillStyle = '#CC0000';
    context.arc(config.x, config.y, config.size, 0, Math.PI*2, false);
    context.fill();

    // text
    context.fillStyle = '#666666';
    context.fillText(`x: ${config.x}`, 5, 12)
    context.fillText(`y: ${config.y}`, 5, 24)
  }
  init();

})();
