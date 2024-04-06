import Phaser from 'phaser';

class LevelExampleClass extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        //this.load.image('cat', 'himalayan_cat.jpg');
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
        this.player = this.physics.add.sprite(200, 465, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.ground)
        this.player.play('walk');

        //  the score
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        // the time
        this.timerValue = 15;
        this.timerText = this.add.text(16, 48, 'time: ' + this.timerValue, { fontSize: '32px', fill: '#000' });
       
        // game end flag
        this.gameOver = false;
    }

    update ()
    {
        if (outOfTime(this.timerValue))
        {
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
            this.player.setVelocityY(-330);
        }
        
    }
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
