import { Entity } from './objects.js';
import { createSocialMediaMenu } from './socialMedia.js';
import { Controller } from './controls.js';
import { Dialog } from './dialog.js';

export class HUD extends Phaser.Scene{
    constructor(){
        super('HUD');
    }
    create(player) 
    {
        this.player = player;
        this.playTime = 0;
        this.score = 0;
        this.textToShow = "";
        this.sequentialText = false;
        this.nextText = '';
        this.eventTyping = undefined;
        this.messageToShow = "";
        this.dialog = new Dialog(this);

    ////audio icon
        this.audioBool = true;
        this.audioIcon = this.add.sprite(800, 70, 'audio_icon').setScale(0.5)
            .setInteractive().on('pointerdown', ()=> this.audioBool = this.audioBool === true ? false : true);


        this.textDialogue = this.add.text(190, 70, "", { //text showing the message of the NPC or Guy Blue
            fontFamily: 'ZCOOL QingKe HuangYou',
            wordWrap: { width: 430, useAdvancedWrap: true},
            align: 'left'
        }).setFontSize(25).setDepth(2).setVisible(false);

    //------------------ Final text
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x1f317d, 0.6);
        this.rectangleDialog = this.graphics.fillRect(200, 400, 500, 110).setVisible(false);

        this.buttonSubmitRect = this.add.rectangle(340, 485, 200, 30).setVisible(false).setFillStyle(0x1f317d, 0.6).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
        this.buttonSkipRect = this.add.rectangle(560, 485, 200, 30).setVisible(false).setFillStyle(0x1f317d, 0.6).setStrokeStyle(1, 0x616161, 1.0).setInteractive();

        this.finalTypingMessage = (text) => {
            let i = 0;
            this.textToShow = "";
            this.eventTyping = this.time.addEvent({ // create the event that makes the typing effect
                delay: 50,
                callback: (text) => {
                    this.textToShow += text[i]
                    i++
                },
                args: [text],
                repeat: text.length - 1
            });

            this.eventCloseDialog = this.time.addEvent({ // create the event that closes the dialog box after 2 seconds of finished
                delay: text.length * 50 + 2000,
                callback: () => this.hideDialogue(),
                args: [text]
            });
        }
    /////////////////////////////////////////////////////////////////////////////////////////////////////
        this.typingEffect = (text) => {
                this.messageToShow = text;
                let i = 0;
                this.textToShow = "";
                this.textDialogue.text = this.textToShow;
                if (this.eventTyping !== undefined) this.eventTyping.remove(false); //stop all the typing events, if exist
                this.eventTyping = this.time.addEvent({ // create the event that makes the typing effect
                    delay: 50,
                    callback: (text) => {
                        this.textToShow += text[i]
                        this.textDialogue.text = this.textToShow;
                        i++
                    },
                    args: [text],
                    repeat: text.length - 1
                });

                if (this.eventCloseDialog !== undefined) this.eventCloseDialog.remove(false); //stop all the timer events, if exist
                this.eventCloseDialog = this.time.addEvent({ // create the event that closes the dialog box after 2 seconds of finished
                    delay: text.length * 50 + 2000,
                    callback: () => {
                        this.dialog.hideDialogue();
                    },
                    args: [text]
                });
            },

        this.dialogueWindow = this.add.image(400, 100, "messageBoard").setVisible(false).setScale(3.5, 1.7);
        this.textTitle = this.add.text(400, 40, '', {fontFamily: 'ZCOOL QingKe HuangYou'}).setFontSize(35).setOrigin(0.5, 0.5).setVisible(false);

    ///////social media icons
        createSocialMediaMenu(this, "Shea%20Stadium%20still%20exists%20in%20%23Bluepoint-"); // create the social media menu for facebook, twiter and copy link
        this.createMenu(this, ["Restart ", "Menu "/*, "Loser Board "*/], [
            () => {
                this.game.sound.stopAll();
                this.scene.stop("HUD");
                //resetGame();
                this.scene.stop("main");
                this.scene.start("main");
            },
            () => {
                this.game.sound.stopAll();
                this.scene.stop("main");
                this.scene.stop();
                this.scene.start("map");
            }
            // () => {
            //     this.game.sound.stopAll();
            //     this.scene.stop("main");
            //     this.scene.stop();
            //     this.scene.start("loserBoard", {type: 3, name: null, score: 0, colectionName: "scores", level: 1});
            // }
        ], 250, 40, 750, 40);


        // ----------------- Score
        this.scoreText = this.add.text(750, 55, this.score, {fontFamily: 'ZCOOL QingKe HuangYou'}).setFontSize(30).setShadow(3, 3, 'rgba(0,0,0,0.5)', 4).setVisible(false);
        this.scoreTitleText = this.add.text(700, 10, "SCORE", {fontFamily: 'ZCOOL QingKe HuangYou'}).setFontSize(35).setShadow(3, 3, 'rgba(0,0,0,0.5)', 4).setVisible(false);

        // ------------------------- Time events
        this.time.delayedCall(50 + config.default.initialTime, () => this.dialog.showDialogue("Welcome to Shea. Let's mingle with the crowd and check out the band."));
        this.time.delayedCall(3000 + config.default.initialTime, () => {
            config.default.gameState = true;
            config.default.instructionText.visible = true;
            config.default.controls.joystickLocked = false;
            config.default.controls.buttonsLocked = false;
        });
    }
    update(t, delta) 
    {
        this.playTime += delta;
        let nearest = Entity.minDistance(this.player); 
        if (nearest[0] < this.player.radiusInteraction && nearest[1].sleeping !== 2) 
        {
            Controller.buttonInteract.setVisible(true);
            Controller.buttonStartText.setVisible(true);
            if (nearest[1].sleeping === 1) 
            {
                if (nearest[1].name !== "Guy Blue") 
                    Controller.buttonStartText.text = "wake up " + nearest[1]["name"] + "!";
            } 
            else {
                if (nearest[1].name !== "Guy Blue") 
                {
                    if (nearest[1].sequence !== undefined) Controller.buttonStartText.text = "talk to " + nearest[1].sequence.sequentialName;
                    else Controller.buttonStartText.text = "talk to " + nearest[1]["name"];
                } 
                else Controller.buttonStartText.text = "Open door";
            }
        } 
        else 
        {
            Controller.buttonInteract.setVisible(false);
            Controller.buttonStartText.setVisible(false);
        }
        Entity.NPCS.forEach((el, index, object) => {
            if (el.timeToDisappear < this.playTime + 5000 && el.sleeping && !el["tween"].isPlaying()) el["tween"].play();
            if (el.timeToDisappear < this.playTime && el.sleeping === 1) {
                el.visible = false;
                el.avatar.visible = false;
                el["zzz"].visible = false;
                el["tween"].stop();
                object.splice(index, 1);
            }
        });
    }
    ////------------ create menu
    createMenu (scene, names, callbacks, width, height, posX, posY)
    {

        let buttons = [], texts = [];
        names.forEach((element,index) => {
            let button = scene.add.rectangle(posX, posY+(index+1)*60, width, height).setFillStyle(0x4063FF, 0.6).setInteractive().setVisible(false);
        //// add interactivity to the button
            button
            .on('pointerover', () => button.setFillStyle(0x4063FF, 1))
            .on('pointerout', () => button.setFillStyle(0x4063FF, 0.6))
            .on('pointerdown', () => callbacks[index]())
            // add tweens in and tween out to the button
            .tweenIn = scene.tweens.add({
                targets: button,
                y: {
                    from: posY,
                    to: posY+(index+1)*60
                },
                duration: 200,
                ease: 'Linear',
                loop: 0,
            }).stop()
            .tweenOut = scene.tweens.add({
                targets: button,
                y: {
                    from: posY+(index+1)*60,
                    to: posY
                },
                duration: 200,
                ease: 'Linear',
                loop: 0,
            }).stop();

            //add the text
            let text = scene.add.text(button.x, button.y, element, {
                fontFamily: 'euroStyle',
                fontSize: 30
            }).setOrigin(0.5, 0.5).setVisible(false);

            //add the text and buttons to the array
            texts.push(text);
            buttons.push(button);
        });
        //-------------hamburger icon
        // scene.hamburguer = scene.add.image(830, 40, "hamburgerIcon").setScale(0.4).setInteractive();
        // scene.hamburguer.on('pointerover', () => scene.hamburguer.setScale(0.45));
        // scene.hamburguer.on('pointerout', () => scene.hamburguer.setScale(0.4));
        // scene.hamburguer.on('pointerdown', () => {
        //     if (!buttons[0].visible) { // show the icons
        //         buttons.forEach(el=>{
        //             el.visible = true;
        //             el.tweenIn.play();
        //         })
        //         scene.time.delayedCall(200, () => texts.forEach(el=> el.setVisible(true)));
        //     } else { //hide the icons
        //         texts.forEach(el=> el.setVisible(false));
        //         scene.time.delayedCall(200, () => buttons.forEach(el=> el.visible = false));
        //         buttons.forEach(el=> el.tweenOut.play());
        //     }
        // });
    }
    
}