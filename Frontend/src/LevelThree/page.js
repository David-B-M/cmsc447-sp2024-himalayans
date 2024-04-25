import Phaser from 'phaser';
import {useEffect} from 'react';
import LevelThreePauseMenu from "../LevelThreePauseMenu/page"
import LevelThreeCompleteScreen from '../LevelThreeComplete/page';
import LevelThreeFailScreen from '../LevelThreeFail/page';

const powerUpTime = 10;
const levelTime = 30;
const velocityX = -100
let timeConst = 0;

class LevelThreeClass extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'LevelThree' });
    }

    preload()
    {
        this.load.atlas('player', 'cat_sprite.png', 'cat_sprite.json');
        this.load.atlas('hawk', 'hawk_sprite.png', 'hawk_sprite.json');
        this.load.image('background', 'snowy_mountains.jpg');
        this.load.image('ground', 'platform.jpg');
        this.load.image('fish', 'fish.png');
        this.load.image('pauseBtn', 'pause.png');
        this.load.image('jumpBoost', 'jump_boost.png');
        this.load.image('speedBoost', 'speed_boost.png');
        this.load.image('clock', 'clock.png');
        this.load.image('shield', 'shield.png');
        this.load.audio('collect', 'collect.mp3');
        this.load.audio('jump', 'jump.mp3');
        this.load.audio('gameOver', 'game_over.mp3');
        this.load.audio('pickUpJumpBoost', 'Yippee.wav');
        this.load.audio('pickUpShield', 'shield.mp3');
        this.load.audio('pickUpSpeedBoost', 'speed.mp3');
        this.load.audio('pickUpClock', 'clock.mp3');
        this.load.audio('time', 'time.mp3');
    }

    create()
    {
        // create background
        const { width, height } = this.sys.game.canvas;
        this.bg = this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0, 0);
        this.bg.setTileScale(2);
        this.bg.tint = 0xFF0000;

        // create ground
        this.ground = this.add.tileSprite(0, 525, width, height, 'ground').setOrigin(0, 0);
        this.ground.setTileScale(3);
        this.ground.tint = 0xFF0000;
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
        this.player = this.physics.add.sprite(200, 375, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.play('walk');
        this.player.setDepth(2);

        this.physics.add.collider(this.player, this.ground, hitObstacle, null, this);

        //  the score
        this.scoreValue = 0;
        this.scoreText = this.add.text(100, 16, 'Score: ' + this.scoreValue, { fontSize: '32px', fill: '#000' });

        // the time
        this.timerValue = levelTime;
        this.timerText = this.add.text(100, 48, 'Time: ' + this.timerValue, { fontSize: '32px', fill: '#000' });
       
        // game end flag
        this.gameOver = false;

        // create fish to collect
        this.fish = this.physics.add.group({
            key: 'fish',
            repeat: 4,
            setXY: { x: 500, y: getRandomY(), stepX: 225 }
        });
        this.fish.children.iterate(function (child) {
            child.setScale(0.05);
            child.body.setAllowGravity(false);
            child.y = getRandomY();
        });
        this.fishVelocityX = velocityX; 
        this.physics.add.collider(this.fish, this.ground);
        this.physics.add.overlap(this.player, this.fish, collectFish, null, this);

        // pause button 
        this.isGamePaused = false;
      
        this.pauseBtn = this.add.sprite(13, 10, 'pauseBtn').setOrigin(0, 0);
        this.pauseBtn.setScale(.12);
        this.pauseBtn.setInteractive({ useHandCursor: true });

        this.pauseBtn.on('pointerdown', () =>
        {
            this.scene.sendToBack('LevelThree');
            this.scene.pause('LevelThree');
            this.scene.launch('LevelThreePauseMenu');

            this.pauseBtn.setVisible(false);
        });

        // powerups

        this.jumpBoostActive = false;
        this.speedBoostActive = false;
        this.shieldActive = false;

        this.jumpBoostTimeLeft = 0;
        this.speedBoostTimeLeft = 0;
        this.shieldTimeLeft = 0;

        this.jumpBoostImg = this.add.sprite(45, 130, 'jumpBoost').setScale(0.35);
        this.jumpBoostTimeLeftText = this.add.text(75, 125, ': ' + this.jumpBoostTimeLeft, { fontSize: '32px', fill: '#000' });

        this.speedBoostImg = this.add.sprite(45, 200, 'speedBoost').setScale(0.25);
        this.speedBoostTimeLeftText = this.add.text(75, 185, ': ' + this.speedBoostTimeLeft, { fontSize: '32px', fill: '#000' });

        this.shieldImg = this.add.sprite(43, 270, 'shield').setScale(0.1);
        this.shieldTimeLeftText = this.add.text(75, 250, ': ' + this.shieldTimeLeft, { fontSize: '32px', fill: '#000' });


        this.jumpBoosts = this.physics.add.group();
        this.physics.add.overlap(this.player, this.jumpBoosts, collectJumpBoost, null, this);
        this.jumpBoostsVelocityX = velocityX; 

        this.speedBoosts = this.physics.add.group();
        this.physics.add.overlap(this.player, this.speedBoosts, collectSpeedBoost, null, this);
        this.speedBoostsVelocityX = velocityX; 

        this.shields = this.physics.add.group();
        this.physics.add.overlap(this.player, this.shields, collectShield, null, this);
        this.shieldsVelocityX = velocityX; 
        
        this.clocks = this.physics.add.group();
        this.physics.add.overlap(this.player, this.clocks, collectClock, null, this);
        this.clocksVelocityX = velocityX; 

        // more platforms
        this.platforms = this.physics.add.group({
            key: 'ground',
            repeat: 2,
            setXY: { x: 400, y: 450, stepX: 600 }
        });
        this.platforms.children.iterate(function (child) {
            child.body.setAllowGravity(false);
            child.body.setImmovable(true);
            child.displayWidth /= 2
            child.tint = 0xFF7777;
        });
        this.physics.add.collider(this.player, this.platforms);

        // hawk animation
        this.anims.create({ 
            key:'fly', 
            frames: this.anims.generateFrameNames('hawk', {
                prefix:'hawk_sprite', 
                end: 2, 
                zeroPad: 1
            }),
            frameRate: 10,
            repeat: -1
        });

        this.hawks = this.physics.add.group({
            key: 'hawk', 
            repeat: 1,   
            setXY: { x: 700, y: 200, stepX: 600 }
        });

        this.hawks.children.iterate(function(child) {
            child.anims.play('fly', true);
            child.setScale(0.75);
            child.body.setAllowGravity(false);
        });

        this.physics.add.collider(this.player, this.hawks, hitObstacle, null, this);

    }

    update()
    {
        // check if time is left
        if (this.timerValue <= 0)
        {
            this.gameOver = true;
            this.scene.launch('LevelThreeCompleteScreen');
        }

        if (this.timerValue <= 5 && timeConst == 0){
            this.sound.play('time');
            timeConst = 1;
        }

        if (this.gameOver)
        {
            this.physics.pause();
            this.player.anims.stop();
            this.hawks.children.iterate(function(child) {
                child.anims.stop();
            });
            this.pauseBtn.disableInteractive();
            return;
        }

        // update background and ground
        if (this.speedBoostActive)
        {
            this.bg.tilePositionX += 8;
            this.ground.tilePositionX += 8;
        }
        else
        {
            this.bg.tilePositionX += 6;
            this.ground.tilePositionX += 6;
        }

        // update timer
        this.timerText.setText('Time: ' + this.timerValue.toFixed(0));
        this.timerValue -= 0.025;

        
       // player jumping
        if (this.cursors.up.isDown && this.player.body.onFloor())
        {
            this.sound.play('jump');

            if (this.jumpBoostActive)
            {
                this.player.setVelocityY(-350);
            }
            else
            {
                this.player.setVelocityY(-275);
            }
        }
        
        // spawn more fish
        if (Math.abs(this.timerValue % 2.5) < 0.025) {
            spawnFish(this);
        }

        // fish moving
        this.fish.children.iterate(function (child) {
            child.x -= 3;
        });

        // spawn powerup
        if (Math.abs(this.timerValue % 10) < 0.025) {
            spawnPowerup(this);
        }

        // speed boosts moving
        this.speedBoosts.children.iterate(function (child) {
            child.x -= 3;
        });

        // jump boosts moving
        this.jumpBoosts.children.iterate(function (child) {
            child.x -= 3;
        });

        // shields moving
        this.shields.children.iterate(function (child) {
            child.x -= 3;
        });

        // clocks moving
        this.clocks.children.iterate(function (child) {
            child.x -= 3;
        });

        if (this.jumpBoostTimeLeft <= 0)
        {
            this.jumpBoostTimeLeft = 0;
            this.jumpBoostActive = false;
        }

        if (this.speedBoostTimeLeft <= 0)
        {
            this.speedBoostTimeLeft = 0;
            this.speedBoostActive = false;
        }

        if (this.shieldTimeLeft <= 0)
        {
            this.shieldTimeLeft = 0;
            this.shieldActive = false;
        }

        if (this.jumpBoostActive)
        {
            this.jumpBoostTimeLeftText.setText(': ' + this.jumpBoostTimeLeft.toFixed(0));
            this.jumpBoostTimeLeft -= 0.025;
        }

        if (this.speedBoostActive)
        {
            this.speedBoostTimeLeftText.setText(': ' + this.speedBoostTimeLeft.toFixed(0));
            this.speedBoostTimeLeft -= 0.025;
        }

        if (this.shieldActive)
        {
            this.shieldTimeLeftText.setText(': ' + this.shieldTimeLeft.toFixed(0));
            this.shieldTimeLeft -= 0.025;
        }

        // platforms moving
        this.platforms.children.iterate(function (child) {
            child.x -= 3;
        });

        // reset platform position when it goes off screen
        this.platforms.children.iterate(function (child) {
            if (child.x < -100) {
                child.x = 1500;
                child.y = getRandomYPlatform();
            }
        });

        // platforms moving
        this.hawks.children.iterate(function (child) {
            child.x -= 4;
        });

        // reset platform position when it goes off screen
        this.hawks.children.iterate(function (child) {
            if (child.x < -60) {
                child.x = 1350;
                child.y = getRandomYHawk();
            }
        });

    }
}

function spawnPowerup(scene)
{
    const powerup = Math.floor(Math.random() * 4) + 1;;
    if (powerup === 1)
    {
        const jumpBoost = scene.jumpBoosts.create(1400, getRandomY(), 'jumpBoost');
        jumpBoost.setScale(0.5);
        jumpBoost.body.setAllowGravity(false);
    }
    else if (powerup === 2)
    {
        const speedBoost = scene.speedBoosts.create(1400, getRandomY(), 'speedBoost');
        speedBoost.setScale(0.25);
        speedBoost.body.setAllowGravity(false);
    }
    else if (powerup === 3)
    {
        const shield = scene.shields.create(1400, getRandomY(), 'shield');
        shield.setScale(0.1);
        shield.body.setAllowGravity(false);
    }
    else if (powerup === 4)
    {
        const clock = scene.clocks.create(1400, getRandomY(), 'clock');
        clock.setScale(0.05);
        clock.body.setAllowGravity(false);
    }
}

function collectClock(player, clock)
{
    this.sound.play('pickUpClock');
    clock.disableBody(true, true);
    this.timerValue += 5;
    timeConst = 0;
}

function collectShield(player, shield)
{
    this.sound.play('pickUpShield');
    shield.disableBody(true, true);
    this.shieldActive = true;
    this.shieldTimeLeft = powerUpTime;
}

function collectSpeedBoost(player, speedBoost)
{
    this.sound.play('pickUpSpeedBoost');
    speedBoost.disableBody(true, true);
    this.speedBoostActive = true;
    this.speedBoostTimeLeft = powerUpTime;
}

function collectJumpBoost(player, jumpBoost)
{
    this.sound.play('pickUpJumpBoost');
    jumpBoost.disableBody(true, true);
    this.jumpBoostActive = true;
    this.jumpBoostTimeLeft = powerUpTime;
}

// gets a y position 
function getRandomY()
{
    return Math.random() * (510 - 200) + 200;
}

function getRandomYPlatform()
{
    return Math.random() * (450 - 350) + 350;
}

function getRandomYHawk()
{
    return Math.random() * (475 - 200) + 200;
}

function hitObstacle (player, rock)
{
    if (!this.shieldActive)
    {
        this.sound.play('gameOver');
        this.gameOver = true;
        this.scene.launch('LevelThreeFailScreen');
    }
}

function spawnFish(scene)
{
    const aFish = scene.fish.create(1400, getRandomY(), 'fish');
    aFish.setScale(0.05);
    aFish.body.setAllowGravity(false);
}

function collectFish (player, fish)
{
    this.sound.play('collect');

    fish.disableBody(true, true);

    //  add and update the score
    this.scoreValue += 10;
    this.scoreText.setText('Score: ' + this.scoreValue);
}

function LevelThree()
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
        scene: [LevelThreeClass, LevelThreePauseMenu, LevelThreeCompleteScreen, LevelThreeFailScreen]
    };

    const game = new Phaser.Game(config);
    return game;
}

function Game() {
    useEffect(() => {
        const game = LevelThree();
        return () => {
            game.destroy(true); 
        };
    }, []);
    return <div id={"Level-Three"}/>;
}

export default Game;