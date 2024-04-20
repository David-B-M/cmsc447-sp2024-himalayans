import Phaser from 'phaser';

class LevelOneCompleteScreen extends Phaser.Scene
{x
    constructor ()
    {
        super({ key: 'LevelOneCompleteScreen'});
    }

    preload ()
    {
        this.load.image('viewLeaderboardBtn', 'ViewLeaderboardBtn.png');
        this.load.image('backToMainMenuBtn', 'BackToMainMenuBtn.png');
        this.load.image('nextLevelBtn', 'nextLevelBtn.png');
    }

    create ()
    {
        this.text = this.add.text(500, 150, 'Level Complete', { font: 'bold 64px Arial' });

        this.nextLevelBtn = this.add.sprite(560, 230, 'nextLevelBtn').setOrigin(0, 0);
        this.nextLevelBtn.setInteractive({ useHandCursor: true });
        this.nextLevelBtn.setScale(0.5);

        this.viewLeaderboardBtn = this.add.sprite(475, 320, 'viewLeaderboardBtn').setOrigin(0, 0);
        this.viewLeaderboardBtn.setInteractive({ useHandCursor: true });
        this.viewLeaderboardBtn.setScale(0.5);

        this.backToMainMenuBtn = this.add.sprite(505, 420, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);

        this.nextLevelBtn.on('pointerdown', () =>
        {
            // go to level 2
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

export default LevelOneCompleteScreen;