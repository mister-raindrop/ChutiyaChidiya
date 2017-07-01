var menuState = {
    create: function () {
        this.chutiyaBackground = game.add.tileSprite(0, 0, 3072, 1536, 'chutiyabg');
        this.chutiyaBackground.scale.setTo(0.4, 0.4);

        var logo = game.add.image(game.world.centerX, -50, 'chutiyalogo');
        logo.anchor.setTo(0.5, 0.5);

        var chutiyaStar = game.add.image(game.world.centerX - 170, game.world.height - 50, 'star');
        chutiyaStar.anchor.setTo(0.5, 0.5);
        chutiyaStar.scale.setTo(0.2, 0.2);

        game.add.tween(logo).to({ y: game.world.centerY - 200 }, 1000)
                .easing(Phaser.Easing.Bounce.InOut).start();

        this.menuwalaChutiya = game.add.sprite(game.world.centerX, game.world.centerY, 'chutiya');
        this.menuwalaChutiya.frame = 1;
        this.menuwalaChutiya.anchor.setTo(0.5, 0.5);
        //this.menuwalaChutiya.scale.setTo(0.1, 0.1);
        this.menuwalaChutiya.animations.add('flyingmenu', [1,2,3,4,5,6,7,8], 15, true);

        if (!game.device.desktop) {
            var startText = "Tap to start!";
            var instructText = "Tap to jump.";
        } else {
            var startText = "Press Space to start!";
            var instructText = "Press Space to jump.";
        }
        var startLabel = game.add.text(game.world.centerX, game.world.centerY + 100, startText, {
            font: "30px 'Comic Sans MS'",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8
        });
        startLabel.anchor.setTo(0.5, 0.5);

        var instructLabel = game.add.text(game.world.centerX, game.world.centerY + 140, instructText, {
            font: "16px 'Comic Sans MS'",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5
        });
        instructLabel.anchor.setTo(0.5, 0.5);




        if (game.device.desktop) {
            var spaceStart = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceStart.onDown.add(this.startGame, this);
        } else {
            game.input.onTap.addOnce(this.startGame, this);
        }

        if (!localStorage.getItem('chutiyaChidiyaKaSabseBadaChutiyapa')) {
            localStorage.setItem('chutiyaChidiyaKaSabseBadaChutiyapa', 0);
        }

        if (game.global.score > localStorage.getItem('chutiyaChidiyaKaSabseBadaChutiyapa')) {
            localStorage.setItem('chutiyaChidiyaKaSabseBadaChutiyapa', game.global.score);
        }

        var bestScoreLabel = game.add.text(game.world.centerX - 30, game.world.height - 50, "Best Score: ", {
            font: "35px 'Comic Sans MS'",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8
        });
        bestScoreLabel.anchor.setTo(0.5, 0.5);

        var actualBestScoreLabel = game.add.text(game.world.centerX + 90, game.world.height - 50, "20", {
            font: "35px Impact",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8
        });
        actualBestScoreLabel.anchor.setTo(0.5, 0.5);
        actualBestScoreLabel.text = localStorage.getItem('chutiyaChidiyaKaSabseBadaChutiyapa');

        this.muteButtons = game.add.button(10, 10, 'muteButtons', this.soundButtonClicked, this);
        this.muteButtons.frame = game.sound.mute ? 0 : 1;
        this.muteButtons.input.useHandCursor = true;

    },

    soundButtonClicked: function () {
        game.sound.mute = !game.sound.mute;
        this.muteButtons.frame = game.sound.mute ? 0 : 1;
    },

    update: function () {
        this.menuwalaChutiya.animations.play('flyingmenu');
        this.chutiyaBackground.tilePosition.x -= 1;
    },

    startGame: function () {
        game.state.start('main');
    }
};
