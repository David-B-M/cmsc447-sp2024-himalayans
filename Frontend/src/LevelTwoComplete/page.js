import Phaser from 'phaser';
import axios from "axios";
import querystring from "qs";

class LevelTwoCompleteScreen extends Phaser.Scene
{x
    constructor ()
    {
        super({ key: 'LevelTwoCompleteScreen'});
    }

    preload ()
    {
        this.load.image('viewLeaderboardBtn', 'ViewLeaderboardBtn.png');
        this.load.image('backToMainMenuBtn', 'BackToMainMenuBtn.png');
        this.load.image('nextLevelBtn', 'nextLevelBtn.png');
    }
    apiCallsMade = false;

    create (data)
    {
        const navigate = data.navigate
        const userName = data.userName;
        const scoreValue = data.scoreValue;
        this.text = this.add.text(500, 150, 'Level Complete', { font: 'bold 64px Arial' });

        this.nextLevelBtn = this.add.sprite(560, 230, 'nextLevelBtn').setOrigin(0, 0);
        this.nextLevelBtn.setInteractive({ useHandCursor: true });
        this.nextLevelBtn.setScale(0.5);
        this.nextLevelBtn.tint = 0xFF9999;

        this.viewLeaderboardBtn = this.add.sprite(475, 320, 'viewLeaderboardBtn').setOrigin(0, 0);
        this.viewLeaderboardBtn.setInteractive({ useHandCursor: true });
        this.viewLeaderboardBtn.setScale(0.5);
        this.viewLeaderboardBtn.tint = 0xFF9999;

        this.backToMainMenuBtn = this.add.sprite(505, 420, 'backToMainMenuBtn').setOrigin(0, 0);
        this.backToMainMenuBtn.setInteractive({ useHandCursor: true });
        this.backToMainMenuBtn.setScale(0.5);
        this.backToMainMenuBtn.tint = 0xFF9999;

        this.nextLevelBtn.on('pointerdown', () =>
        {
             navigate('/LevelThree')
        });

        this.viewLeaderboardBtn.on('pointerdown', () => {
            navigate('/ViewLeaderboard')
        });

        this.backToMainMenuBtn.on('pointerdown', () => {
            navigate('/');
        });

        if(userName != 'NULL' && !this.apiCallsMade) {
            this.apiCallsMade = true;
            const config1 = {
                username: userName,
                levelScore: "lv2Score",
                score: scoreValue
            }

            axios.post('http://localhost:5000/increment_score', querystring.stringify(config1), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            axios.post('http://localhost:5000/increment_user_level', querystring.stringify({
                username: userName,
            }), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}

export default LevelTwoCompleteScreen;