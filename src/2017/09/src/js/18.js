// link: http://www.lessmilk.com/tutorial/flappy-bird-phaser-1
const main = {
  preload: function() {
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
  },

  create: function() {
    game.state.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    const spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    // pipes
    this.pipes = game.add.group();
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
  },

  update: function() {
    if(this.bird.y < 0 || this.bird.y > 490) {
      this.restartGame();
    }
  },

  jump: function() {
    this.bird.body.velocity.y = -350;
  },

  restartGame: function() {
    game.state.start('main');
  },

  addOnePipe: function(x, y) {
    const pipe = game.add.sprite(x, y, 'pipe')
    this.pipes.add(pipe);

    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function () {
    const hole = Math.floor(Math.random()*5) + 1;

    console.log(hole)

    for(let i=0; i<8; i++) {
        if(i != hole && i != hole+1) {
          this.addOnePipe(400, i*60 + 10);
        }
    }
  }
}

const game = new Phaser.Game(400, 490);
game.state.add('main', main);
game.state.start('main');
