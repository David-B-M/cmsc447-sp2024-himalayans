import Phaser from 'phaser';

class PauseScreen extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'PauseScreen'});
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

        this.resumeLevelBtn = this.add.sprite(450, 110, 'resumeLevelBtn').setOrigin(0, 0);
        this.resumeLevelBtn.setInteractive({ useHandCursor: true });
        this.resumeLevelBtn.setScale(0.5);

        this.resetLevelBtn = this.add.sprite(560, 230, 'resetLevelBtn').setOrigin(0, 0);
        this.resetLevelBtn.setInteractive({ useHandCursor: true });
        this.resetLevelBtn.setScale(0.5);

        this.quitLevelBtn = this.add.sprite(535, 350, 'quitLevelBtn').setOrigin(0, 0);
        this.quitLevelBtn.setInteractive({ useHandCursor: true });
        this.quitLevelBtn.setScale(0.5);

        this.backToMainMenuBtn = this.add.sprite(505, 450, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);

        this.resumeLevelBtn.on('pointerdown', () =>
        {
            this.scene.resume('LevelExample');
            this.scene.stop();
            
            const levelExampleScene = this.scene.get('LevelExample');
            levelExampleScene.pauseBtn.setVisible(true); 
            
        });

        this.resetLevelBtn.on('pointerdown', () =>
        {
            this.scene.start('LevelExample');
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

export default PauseScreen;