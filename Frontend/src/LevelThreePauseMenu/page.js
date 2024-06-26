import Phaser from 'phaser';

class LevelThreePauseMenu extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'LevelThreePauseMenu'});
    }

    preload ()
    {
        this.load.image('quitLevelBtn', 'QuitLevelBtn.png');
        this.load.image('resetLevelBtn', 'ResetLevelBtn.png');
        this.load.image('resumeLevelBtn', 'ResumeLevelBtn.png');
        this.load.image('backToMainMenuBtn', 'BackToMainMenuBtn.png');
    }

    create ()
    {
        this.text = this.add.text(530, 100, 'Pause Menu', { font: 'bold 64px Arial' });

        this.resumeLevelBtn = this.add.sprite(450, 160, 'resumeLevelBtn').setOrigin(0, 0);
        this.resumeLevelBtn.setInteractive({ useHandCursor: true });
        this.resumeLevelBtn.setScale(0.5);
        this.resumeLevelBtn.tint = 0xFF7777;

        this.resetLevelBtn = this.add.sprite(560, 280, 'resetLevelBtn').setOrigin(0, 0);
        this.resetLevelBtn.setInteractive({ useHandCursor: true });
        this.resetLevelBtn.setScale(0.5);
        this.resetLevelBtn.tint = 0xFF7777;

        this.quitLevelBtn = this.add.sprite(535, 400, 'quitLevelBtn').setOrigin(0, 0);
        this.quitLevelBtn.setInteractive({ useHandCursor: true });
        this.quitLevelBtn.setScale(0.5);
        this.quitLevelBtn.tint = 0xFF7777;

        this.backToMainMenuBtn = this.add.sprite(505, 500, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);
        this.backToMainMenuBtn.tint = 0xFF7777;

        this.resumeLevelBtn.on('pointerdown', () =>
        {
            this.scene.resume('LevelThree');
            this.scene.stop();
            
            const levelThreeScene = this.scene.get('LevelThree');
            levelThreeScene.pauseBtn.setVisible(true); 
            
        });

        this.resetLevelBtn.on('pointerdown', () =>
        {
            this.scene.start('LevelThree');
            this.scene.stop();
        });

        this.quitLevelBtn.on('pointerdown', () =>
        {
            window.location.href = '/ChooseLevel'
        });

        this.backToMainMenuBtn.on('pointerdown', () =>
        {
            window.location.href = '/';
        });
    }
}
export default LevelThreePauseMenu;