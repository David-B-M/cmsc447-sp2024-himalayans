import Phaser from 'phaser';

class LevelCompleteScreen extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'LevelCompleteScreen'});
    }

    preload ()
    {
        this.load.image('viewLeaderboardBtn', 'ViewLeaderboardBtn.png');
        this.load.image('backToMainMenuBtn', 'BackToMainMenuBtn.png');
    }

    create ()
    {
        this.text = this.add.text(500, 150, 'Level Complete', { font: 'bold 64px Arial' });

        this.viewLeaderboardBtn = this.add.sprite(475, 300, 'viewLeaderboardBtn').setOrigin(0, 0);
        this.viewLeaderboardBtn.setInteractive({ useHandCursor: true });
        this.viewLeaderboardBtn.setScale(0.5);

        this.backToMainMenuBtn = this.add.sprite(505, 400, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);

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

export default LevelCompleteScreen;