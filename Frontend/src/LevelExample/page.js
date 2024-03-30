import Phaser from 'phaser';

class LevelExample extends Phaser.Scene
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

        const catSprite = this.add.sprite(400, 484, 'cat');
        catSprite.setScale(0.1); 
    }

    update ()
    {
        this.bg.tilePositionX += 2;
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%'
    },
    scene: LevelExample
};

const game = new Phaser.Game(config);

export default LevelExample;
