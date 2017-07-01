var width = 800, height = 600;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'gameDiv');

game.global = {
    score: 0
};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('main', mainState);
game.state.add('score', scoreState)
game.state.start('boot');
