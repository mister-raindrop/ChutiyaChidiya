var bootState = {
    preload: function () {
        game.load.image('progressBar', '../assets/progressBar.png');
    },

    create: function () {
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 900;

        if (!game.device.desktop) {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        }

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.state.start('load');
    }
};
