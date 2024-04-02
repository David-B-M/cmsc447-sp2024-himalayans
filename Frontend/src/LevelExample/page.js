import Phaser from 'phaser';

class LevelExampleClass extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        //this.load.atlas('walker', 'assets/animations/walker.png', 'assets/animations/walker.json');
        this.load.image('cat', 'himalayan_cat.jpg');
        this.load.image('background', 'snowy_mountains.jpg');
    }

    create ()
    {  
        const { width, height } = this.sys.game.canvas;

        // Create background
        this.bg = this.add.tileSprite(0, 0, width/2, height/2, 'background').setOrigin(0, 0);
        this.bg.setScale(width / this.bg.width, height / this.bg.height);
       
        /*
        const animConfig = {
            key: 'walk',
            frames: 'walker',
            frameRate: 60,
            repeat: -1
        };

        this.anims.create(animConfig);

        const sprite = this.add.sprite(400, 484, 'walker', 'frame_0000');

        sprite.play('walk');
        */

        this.cursors = this.input.keyboard.createCursorKeys();

        const catSprite = this.add.sprite(400, 484, 'cat');
        catSprite.setScale(0.1); 


        // The player and its settings
        //this.player = this.physics.add.sprite(100, 450, 'cat');
        //this.player.setDepth(1);
/*
        //  Player physics properties. 
        this.catSprite.setBounce(0.2);
        this.catSprite.setCollideWorldBounds(true);
        this.catSprite.setScale(0.1);
        */
    
    }

    update ()
    {
        this.bg.tilePositionX += 2;
/*
        if (this.cursors.up.isDown && this.catSprite.body.touching.down)
        {
            this.catSprite.setVelocityY(-330);
        }*/
    }
}


function LevelExample()
{
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        scale: {
            mode: Phaser.Scale.RESIZE,
            width: '100%',
            height: '100%'
        },
        scene: LevelExampleClass
    };

    const game = new Phaser.Game(config);
    return game;
}

export default LevelExample;
