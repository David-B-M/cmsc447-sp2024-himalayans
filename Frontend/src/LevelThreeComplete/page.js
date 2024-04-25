import Phaser from 'phaser';

class LevelThreeCompleteScreen extends Phaser.Scene
{x
    constructor ()
    {
        super({ key: 'LevelThreeCompleteScreen'});
    }

    preload ()
    {
        this.load.image('viewLeaderboardBtn', 'ViewLeaderboardBtn.png');
        this.load.image('backToMainMenuBtn', 'BackToMainMenuBtn.png');
        this.load.image('resetLevelBtn', 'resetLevelBtn.png');
    }

    create ()
    {
        this.text = this.add.text(500, 150, 'Level Complete', { font: 'bold 64px Arial' });

        this.resetLevelBtn = this.add.sprite(560, 220, 'resetLevelBtn').setOrigin(0, 0);
        this.resetLevelBtn.setInteractive({ useHandCursor: true });
        this.resetLevelBtn.setScale(0.5);
        this.resetLevelBtn.tint = 0xFF7777;

        this.viewLeaderboardBtn = this.add.sprite(475, 340, 'viewLeaderboardBtn').setOrigin(0, 0);
        this.viewLeaderboardBtn.setInteractive({ useHandCursor: true });
        this.viewLeaderboardBtn.setScale(0.5);
        this.viewLeaderboardBtn.tint = 0xFF7777;

        this.backToMainMenuBtn = this.add.sprite(505, 440, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);
        this.backToMainMenuBtn.tint = 0xFF7777;

        this.resetLevelBtn.on('pointerdown', () =>
        {
            this.scene.start('LevelThree');
            this.scene.stop();
        });

        this.viewLeaderboardBtn.on('pointerdown', () =>
        {
            window.location.href = '/ViewLeaderboard'
        });

        this.backToMainMenuBtn.on('pointerdown', () =>
        {
            window.location.href = '/';
        });
    }
}

export default LevelThreeCompleteScreen;