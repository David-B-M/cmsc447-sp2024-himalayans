import Phaser from 'phaser';

class LevelExampleClass extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('cat', 'himalayan_cat.jpg');
        this.load.image('background', 'snowy_mountains.jpg');
        this.load.image('platform', 'platform.jpg');
    }

    create ()
    {  
        // Create background
        const { width, height } = this.sys.game.canvas;
        //this.bg = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0);
        //this.bg.setTileScale(2);

        this.platform = this.add.tileSprite(0, 0, width, height/3, 'platform').setOrigin(0, .5);
        
        //this.platform.create(400, 568, 'ground').setScale(2).refreshBody();

        this.cursors = this.input.keyboard.createCursorKeys();

        this.catSprite = this.physics.add.sprite(200, 484, 'cat');
        this.catSprite.setScale(0.05); 
        this.catSprite.setBounce(0.2);
        this.catSprite.setCollideWorldBounds(true);
    
    }

    update ()
    {
       //this.bg.tilePositionX += 2;
       this.platform.tilePositionX += 2;

        if (this.cursors.up.isDown && this.catSprite.body.onFloor())
        {
            this.catSprite.setVelocityY(-330);
        }
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
