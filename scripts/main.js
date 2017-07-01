var mainState = {
    create: function () {
        game.global.score = 0;

        this.chutiyaBackground = game.add.tileSprite(0, 0, 3072, 1536, 'chutiyabg');
        this.chutiyaBackground.scale.setTo(0.4, 0.4);

        this.chutiya = game.add.sprite(20, game.world.centerY, 'chutiya');
        this.chutiya.anchor.setTo(0, 1);
        this.chutiya.scale.setTo(0.5, 0.5);
        this.chutiya.frame = 1;
        this.chutiya.alive = true;

        this.chutiyaJumpSound = game.add.audio('chutiyajump');
        this.chutiyaDeadSound = game.add.audio('chutiyadead');

        this.chutiyaScoreSound = game.add.audio('chutiyahorn');

        game.physics.arcade.enable(this.chutiya);
        //this.chutiya.body.gravity.y = 800;
        this.chutiya.body.setSize((this.chutiya.width - 4) / this.chutiya.scale.x, (this.chutiya.height - 4) / this.chutiya.scale.y);

        this.chutiya.animations.add('flying', [1,2,3,4,5,6,7,8], 10, true);
        this.upTween = game.add.tween(this.chutiya).to({ angle: -10 }, 400);

        if (game.device.desktop) {
            var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(this.jump, this);
        } else {
            game.input.onTap.add(this.jump, this);
        }

        this.pipeGroup = game.add.group();

        this.holeSize = this.chutiya.height + 30;
        this.minPipeHeight = 100;
        this.maxPipeHeight = game.height - this.holeSize - this.minPipeHeight;

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {
                        font: "35px Impact",
                        fill: "#ffffff",
                        stroke: "#000000",
                        strokeThickness: 8
        });

        this.addPipe();
        this.pipeTimer = game.time.events.loop(2000, this.addPipe, this);

        this.collisionFlag = false;
    },

    addPipe: function () {
        var upPipeHeight, downPipeHeight, upPipe, downPipe;

        var randChoice = Math.random() < 0.5 ? 0 : 1;
        if (randChoice === 0){
            upPipeHeight = Math.random() * [(this.maxPipeHeight + 1) - this.minPipeHeight] + this.minPipeHeight;
            downPipeHeight = game.height - this.holeSize - upPipeHeight;

            upPipe = game.add.sprite(game.width, 0, 'pipe');
            this.pipeGroup.add(upPipe);
            upPipe.height = upPipeHeight;

            downPipe = game.add.sprite(game.width, game.height - downPipeHeight, 'pipe');
            this.pipeGroup.add(downPipe);
            downPipe.height = downPipeHeight;
        } else {
            downPipeHeight = Math.random() * ((this.maxPipeHeight + 1) - this.minPipeHeight) + this.minPipeHeight;
            upPipeHeight = game.height - this.holeSize - downPipeHeight;

            downPipe = game.add.sprite(game.width, game.height - downPipeHeight, 'pipe');
            this.pipeGroup.add(downPipe);
            downPipe.height = downPipeHeight;

            upPipe = game.add.sprite(game.width, 0, 'pipe');
            this.pipeGroup.add(upPipe);
            upPipe.height = upPipeHeight;
        }


        upPipe.scale.x = 0.7;
        downPipe.scale.x = 0.7;

        game.physics.arcade.enable(upPipe);
        game.physics.arcade.enable(downPipe);
        upPipe.body.allowGravity = false;
        downPipe.body.allowGravity = false;

        upPipe.body.offset.y = -1;
        downPipe.body.offset.y = 1;

        upPipe.checkWorldBounds = true;
        upPipe.outOfBoundsKill = true;
        downPipe.checkWorldBounds = true;
        downPipe.outOfBoundsKill = true;

        upPipe.events.onKilled.add(this.onPipeKilled, this);

        if (this.chutiya.frame === 0) {
            upPipe.body.immovable = true;
            upPipe.body.moves = false;
            downPipe.body.immovable = true;
            downPipe.body.moves = false;
        } else {
            upPipe.body.velocity.x = -250;
            downPipe.body.velocity.x = -250;
        }
        console.log(this.chutiya.frame);
    },

    update: function () {
        if (this.chutiya.alive) {
            this.chutiya.animations.play('flying');
            this.chutiyaBackground.tilePosition.x -= 0.7;
        } else {
            this.chutiya.frame = 0;
            this.chutiyaBackground.tilePosition.x -= 0.0;
            this.pipeGroup.forEachAlive(function (member) {
                member.body.velocity.x = 0;
                member.body.immovable = true;
                member.body.moves = false;
            }, this);
        }


        if (this.chutiya.y < 0 || this.chutiya.y > height){
            this.chutiyaMarGaya();
        }

        if (this.chutiya.angle < 15 && this.chutiya.frame !== 0) {
            this.chutiya.angle += 0.5;
        }

        game.physics.arcade.collide(this.chutiya, this.pipeGroup, this.chutiyaMarGaya, null, this);
    },

    /*render: function() {
        this.pipeGroup.forEachAlive(function(member) {
            game.debug.body(member, '#ff0000', false);
        }, this);
        game.debug.body(this.chutiya, '#ff0000', false);
    },*/

    jump: function () {
        this.chutiya.body.velocity.y = -200;
        this.chutiyaJumpSound.play();
        this.upTween.start();
    },

    chutiyaMarGaya: function () {
        this.chutiya.body.velocity.y = 0;
        this.pipeGroup.forEach(function(member) {
                member.body.velocity.x = 0;
                member.body.immovable = true;
                member.body.moves = false;
        }, this, true);
        if (!this.collisionFlag) {
            this.collisionFlag = true;
            this.chutiya.alive = false;
            this.chutiya.frame = 0;
            this.chutiyaDeadSound.play();

            game.global.score = this.score;

            game.time.events.add(1000, this.nextState);
        }
    },

    nextState: function () {
        game.state.start('score');
    },

    onPipeKilled: function(){
        this.score += 1;
        this.labelScore.text = this.score;
        this.chutiyaScoreSound.play();
    }
};
