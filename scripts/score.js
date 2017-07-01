var scoreState = {
    create: function () {
        this.chutiyaBackground = game.add.tileSprite(0, 0, 3072, 1536, 'chutiyabg');
        this.chutiyaBackground.scale.setTo(0.4, 0.4);

        if (game.global.score > localStorage.getItem('chutiyaChidiyaKaSabseBadaChutiyapa')) {
            localStorage.setItem('chutiyaChidiyaKaSabseBadaChutiyapa', game.global.score);
        }

        this.scorewalaChutiya = game.add.sprite(game.world.centerX, game.world.centerY, 'chutiya');
        this.scorewalaChutiya.frame = 1;
        this.scorewalaChutiya.anchor.setTo(0.5, 0.5);
        this.scorewalaChutiya.scale.setTo(1.5, 1.5);
        this.scorewalaChutiya.animations.add('flyingscore', [1,2,3,4,5,6,7,8], 15, true);

        this.star = game.add.sprite(120, game.world.height - 200, 'star');
        this.star.anchor.setTo(0.5, 0.5);
        this.star.scale.setTo(0.5, 0.5);

        if (game.device.desktop) {
            this.restartString = "Press Space to play again.";
        } else {
            this.restartString = "Swipe right to play again.";
            //game.input.onTap.add(this.spacePressed, this);
        }
        this.restartLabel = game.add.text(game.world.centerX, 30, this.restartString, {
                font: "30px 'Comic Sans MS'",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8
        });
        this.restartLabel.anchor.x = 0.5;

        game.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC, Phaser.Keyboard.SPACEBAR]);
        var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        escKey.onDown.add(this.escPressed, this);

        var spacek = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spacek.onDown.add(this.spacePressed, this);


        if (game.device.desktop) {
            this.mainMenuString = "Press Esc for Main Menu.";
        } else {
            this.mainMenuString = "Swipe left for Main Menu.";
        }

        this.mainMenuLabel = game.add.text(game.world.centerX, 100, this.mainMenuString, {
                font: "30px 'Comic Sans MS'",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8
        });
        this.mainMenuLabel.anchor.x = 0.5;

        this.bestScoreLabel = game.add.text(30, game.world.height - 150, "Best Score", {
                font: "40px 'Comic Sans MS'",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8
        });
        this.bestScoreLabel2 = game.add.text(100, game.world.height - 90, "20", {
                font: "35px Impact",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8
        });
        this.bestScoreLabel2.text = localStorage.getItem('chutiyaChidiyaKaSabseBadaChutiyapa');

        this.yourScoreLabel = game.add.text(game.world.width - 250, game.world.height - 150, "Your Score", {
                font: "40px 'Comic Sans MS'",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8
        });
        this.yourScoreLabel2 = game.add.text(game.world.width - 170, game.world.height - 90, "20", {
                font: "35px Impact",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8
        });
        this.yourScoreLabel2.text = game.global.score;

        if (!game.device.desktop) {
            this.touchedDown = false;
            game.input.onUp.add(this.touchUp, this);
            game.input.onDown.add(this.touchDown, this);
        }
    },

    update: function () {
        this.scorewalaChutiya.animations.play('flyingscore');
        this.chutiyaBackground.tilePosition.x -= 2;

        if (this.touchedDown === true) {
            if (Math.abs(game.input.x - this.pointX) > 50) {
                this.userSwiped();
            }
        }
    },

    spacePressed: function () {
        game.state.start('main');
    },

    escPressed: function () {
        game.state.start('menu');
    },

    touchDown: function () {
        this.touchedDown = true;
        this.pointX = game.input.x;
    },

    touchUp: function () {
        this.touchedDown = false;
    },

    userSwiped: function () {
        if (game.input.x < this.pointX) {
            this.escPressed();
        } else {
            this.spacePressed();
        }
    }
};
