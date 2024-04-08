import Phaser from 'phaser';

class LevelExampleClass extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.atlas('player', 'cat_sprite.png', 'cat_sprite.json');
        this.load.image('background', 'snowy_mountains.jpg');
        this.load.image('ground', 'platform.jpg');
        this.load.image('rock', 'snowy_rock.png')
        this.load.image('tree', 'snowy_tree.png')
        this.load.image('fish', 'fish.png')
    }

    create ()
    {  
        // create background
        const { width, height } = this.sys.game.canvas;
        this.bg = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0);
        this.bg.setTileScale(2);

        // create ground
        this.ground = this.add.tileSprite(0, 525, width, height, 'ground').setOrigin(0, 0);
        this.ground.setTileScale(3);
        this.physics.add.existing(this.ground, true);

        // user input
        this.cursors = this.input.keyboard.createCursorKeys();

        // player animation
        this.anims.create({ 
            key:'walk', 
            frames: this.anims.generateFrameNames('player', {
                prefix:'cat_sprite', 
                end: 2, 
                zeroPad: 1
            }),
            repeat: -1
        });

        // create player
        this.player = this.physics.add.sprite(200, 475, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground)
        this.player.play('walk');

        //  the score
        this.scoreValue = 0;
        this.scoreText = this.add.text(16, 16, 'score: ' + this.scoreValue, { fontSize: '32px', fill: '#000' });

        // the time
        this.timerValue = 15;
        this.timerText = this.add.text(16, 48, 'time: ' + this.timerValue, { fontSize: '32px', fill: '#000' });
       
        // game end flag
        this.gameOver = false;

        // create fish to collect
        this.fish = this.physics.add.group({
            key: 'fish',
            repeat: 4,
            setXY: { x: 500, y: getRandomY(), stepX: 225 }
        });
        this.fish.children.iterate(function (child) {
            child.setScale(0.05)
            child.body.setAllowGravity(false)
            child.y = getRandomY();
        });
        this.fishVelocityX = -100; 
        this.physics.add.collider(this.fish, this.ground);
        this.physics.add.overlap(this.player, this.fish, collectFish, null, this);

        // create rock obstacles
        this.rocks = this.physics.add.group({
            key: 'rock',
            repeat: 2,
            setXY: { x: 600, y: 510, stepX: 450 }
        });
        this.rocks.children.iterate(function (child) {
            child.setScale(1.5)
        });
        this.rocksVelocityX = -100; 
        this.physics.add.collider(this.rocks, this.ground);
        this.physics.add.collider(this.player, this.rocks, hitObstacle, null, this);

    }

    update ()
    {
        // check if time is left
        outOfTime(this.timerValue);

        if (this.gameOver)
        {
            this.player.anims.stop();
            return;
        }

        // update background and ground
        this.bg.tilePositionX += 2;
        this.ground.tilePositionX += 2;

        // update timer
        this.timerText.setText('time: ' + this.timerValue.toFixed(0));
        this.timerValue -= 0.025;

        
       // player jumping
        if (this.cursors.up.isDown && this.player.body.onFloor())
        {
            this.player.setVelocityY(-350);
        }
        
        // spawn more fish
        if (Math.abs(this.timerValue % 2.5) < 0.025) {
            spawnFish(this);
        }

        // fish moving
        this.fish.children.iterate(function (child) {
            child.x -= 2;
        });

        // rocks moving
        this.rocks.children.iterate(function (child) {
            child.x -= 3;
        });

        this.rocks.children.iterate(function (child) {
            if (child.x < -60) {
                child.x = 1400;
                child.y = 510;
            }
        });
    
    }
}

function getRandomY()
{
    return Math.random() * (510 - 350) + 350;
}

function hitObstacle (player, rock)
{
    this.physics.pause();
    this.gameOver = true;
}

function spawnFish(scene)
{
    const aFish = scene.fish.create(1400, getRandomY(), 'fish');
    aFish.setScale(0.05);
    aFish.body.setAllowGravity(false);
}

function collectFish (player, fish)
{
    fish.disableBody(true, true);

    //  add and update the score
    this.scoreValue += 10;
    this.scoreText.setText('Score: ' + this.scoreValue);
}

function outOfTime (timerValue)
{
    if (timerValue <= 0)
    {
    this.physics.pause();
    this.gameOver = true;
    }
}

function LevelExample()
{
    const config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.RESIZE,
            width: '100%',
            height: '100%'
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        backgroundColor: '#304858',
        scene: LevelExampleClass
    };

    const game = new Phaser.Game(config);
    return game;
}

export default LevelExample;
