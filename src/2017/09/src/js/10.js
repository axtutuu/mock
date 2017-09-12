const main = {
  preload: function() {
    game.load.image('bird', 'assets/bird.png')
  },

  create: function() {
    game.state.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    const spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
  },

  update: function() {
    if(this.bird.y < 0 || this.bird.y > 600) {
      this.restartGame();
    }
  },

  jump: function() {
    this.bird.body.velocity.y = -350;
  },

  restartGame: function() {
    game.state.start('main');
  }
}

const game = new Phaser.Game(600, 600);
game.state.add('main', main);
game.state.start('main');
