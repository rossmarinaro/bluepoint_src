import { Entity } from './objects.js';
import { createSocialMediaMenu } from './socialMedia.js';
import { Controller } from './controls.js';
import { GameObjects } from 'phaser';

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
                        this.hideDialogue();
                    },
                    args: [text]
                });
            },

        this.dialogueWindow = this.add.image(400, 100, "messageBoard").setVisible(false).setScale(3.5, 1.7);
        this.textTitle = this.add.text(400, 40, 'Hello World', {fontFamily: 'ZCOOL QingKe HuangYou'}).setFontSize(35).setOrigin(0.5, 0.5).setVisible(false);

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


        //------------------form
        
        // graphics.fillStyle(0x334fcb, 0.9);

        // this.buttonSubmit = this.add.text(this.buttonSubmitRect.x, this.buttonSubmitRect.y, "Submit", {
        //     fontFamily: 'euroStyle',
        //     fontSize: 25
        // }).setVisible(false).setOrigin(0.5).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        // this.buttonSkip = this.add.text(this.buttonSkipRect.x, this.buttonSkipRect.y, "Skip", {
        //     fontFamily: 'euroStyle',
        //     fontSize: 25
        // }).setVisible(false).setOrigin(0.5).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        // //--------------Hover effect for the buttons
        // this.buttonSubmitRect.on('pointerover', () => this.buttonSubmitRect.setFillStyle(0x334fcb));
        // this.buttonSubmitRect.on('pointerout', () => this.buttonSubmitRect.setFillStyle(0x1f317d));
        // this.buttonSkipRect.on('pointerover', () => this.buttonSkipRect.setFillStyle(0x334fcb));
        // this.buttonSkipRect.on('pointerout', () => this.buttonSkipRect.setFillStyle(0x1f317d));
        // this.validationForm = this.add.text(430, 510, '', {fontFamily: 'euroStyle', fontSize: 15, color: '#f20a0a'}).setOrigin(0.5, 0.5)

        // IMPORTANT! : every font after this gets broken, so it should be at the end
        //this.form = this.add.dom(450, 430).createFromCache('form').setVisible(false);

        // this.buttonSubmitRect.on('pointerdown', () => {

        //     // validate email and name:
        //     // if (this.form.getChildByID('formName').value.length < 2) {
        //     //     this.validationForm.text = "enter a valid name"
        //     //     return;
        //     // }
        //     // if (!ValidateEmail(this.form.getChildByID('formEmail').value)) {
        //     //     this.validationForm.text = "enter a valid email"
        //     //     return;
        //     // }

        //     this.validationForm.text = ""
        //     Entity.player.avatar.setVisible(false);
        //     var inputName = this.form.getChildByID('formName').value;
        //     var inputEmail = this.form.getChildByID('formEmail').value;

        //     this.form.visible = false;
        //     this.rectangleDialog.visible = false;

        //     this.buttonSkip.visible = false;
        //     this.buttonSkipRect.visible = false;
        //     this.buttonSubmit.visible = false;
        //     this.buttonSubmitRect.visible = false;

        //     writeData(inputName, this.score, inputEmail,"scores")
        //     this.scene.launch("loserBoard", {
        //         type: 1,
        //         score: this.score,
        //         name: inputName,
        //         colectionName:"scores",
        //         topMessage:[" Woke Up " , " People: Shea Stadium still closed. "],
        //         level:1
        //     })
        // })


        // ------------------------- Time events
        this.time.delayedCall(50 + config.default.initialTime, () => this.showDialogue("Welcome to Shea. Let's mingle with the crowd and check out the band."));
        this.time.delayedCall(3000 + config.default.initialTime, () => {
            config.default.gameState = true;
            config.default.instructionText.visible = true;
            config.default.controls.joystickLocked = false;
            config.default.controls.buttonsLocked = false;
            // this.time.delayedCall(3000, () => {
            //     config.default.textInstruction.setVisible(false);
            //     config.default.instructionText.setVisible(false);
            //     if (config.default.joyStick !== undefined) 
            //     {
            //         config.default.joyStick.thumb.setVisible(false);
            //         config.default.joyStick.base.setVisible(false);
            //     }
            // });
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
        // scene.hamburguer = scene.add.image(830, 40, "hambugerIcon").setScale(0.4).setInteractive();
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
    hideDialogue()
    { // hide the current dialogue or goes to the next one in a sequential dialog
        if (this.sequentialText)
        {
            //this.textDialogue.text=nextText.message;
            this.typingEffect(this.nextText.message);
            this.textTitle.text = this.nextText.title;
            this.sequentialText = false;
        } 
        else 
        {
            config.default.showingDialogue = false;
            this.textTitle.visible = false;
            this.textDialogue.visible = false;
            //config.default.textInstruction.visible = false;
            this.dialogueWindow.visible = false;
            let NPCSpeaking = Entity.NPCS[Entity.NPC.dialogueIndex];
            if (NPCSpeaking !== undefined)
                if (NPCSpeaking.avatar.anims != undefined) NPCSpeaking.avatar.anims.play("idle" + NPCSpeaking.name);
            Entity.NPC.dialogueIndex = -1;
            config.default.controls.joystickLocked = false;
        }
    }
    endAllDialogs() 
    { // hide any dialog when NPCS go to sleep
        this.sequentialText = false;
        config.default.showingDialogue = false;
        this.textTitle.visible = false;
        this.textDialogue.visible = false;
        //config.default.textInstruction.visible = false;
        this.dialogueWindow.visible = false;
        npc.avatar.anims.play("idle" + Entity.NPCS[Entity.NPC.dialogueIndex].name);
        Entity.NPC.dialogueIndex = -1;
    }
    showDialogue(message) 
    { // shows the dialogue window with a specific message
        if (message != null) 
        {
            this.typingEffect(message);
            this.textTitle.text = "Guy Blue"
        }
        config.default.showingDialogue = true;
        this.textTitle.visible = true;
        this.textDialogue.visible = true;
        this.dialogueWindow.visible = true;
        config.default.controls.joystickLocked = true;
    }
    interact(player) 
    {
        config.default.textInstruction.setVisible(false);
        config.default.instructionText.setVisible(false);
        if (config.default.joyStick !== undefined) 
        {
            config.default.joyStick.thumb.setVisible(false);
            config.default.joyStick.base.setVisible(false);
        }
    ////stop player anims
        player.avatar.anims.stop();
    //// player discussions
        this.discussion = npcName => {
            switch(npcName)
            {
                case 'Ryan': Entity.NPC.discussions.Ryan = true; break;
                case 'Sean': Entity.NPC.discussions.Sean = true; break;
                case 'Nora': Entity.NPC.discussions.Nora = true; break;
                case 'Ronayne': Entity.NPC.discussions.Ronayne = true; break;
                case 'Dave': Entity.NPC.discussions.Dave = true; break;
                case 'Eric': Entity.NPC.discussions.Eric = true; break;
                case 'Luke': Entity.NPC.discussions.Luke = true; break;
                case 'Benny': Entity.NPC.discussions.Benny = true; break;
            }
            if (
                Entity.NPC.discussions.Ryan === true && 
                Entity.NPC.discussions.Sean === true && 
                Entity.NPC.discussions.Nora === true && 
                Entity.NPC.discussions.Ronayne === true && 
                Entity.NPC.discussions.Dave === true && 
                Entity.NPC.discussions.Eric === true && 
                Entity.NPC.discussions.Luke === true &&
                Entity.NPC.discussions.Benny === true
            )
            {
                this.scene.get('Main').npcGlow.filter(i => {
                    if (i.data.list.name === 'Krissy')
                        i.setVisible(true);
                })
            }
        }
        let nearest = Entity.minDistance(player);  
    ////npc discussions 
        switch(nearest[1].name)
        {
            case 'Krissy': 
                if (Entity.NPC.discussions.Krissy === false) 
                { 
                    Entity.NPC.discussions.Krissy = true;
                    this.scene.get('Main').npcGlow.forEach(i => i.setVisible(true));
                    this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Krissy')
                            i.setVisible(false);
                    });
                }
            //// after all npc discussions
                if (
                    Entity.NPC.discussions.Ryan === true && 
                    Entity.NPC.discussions.Sean === true && 
                    Entity.NPC.discussions.Nora === true && 
                    Entity.NPC.discussions.Ronayne === true && 
                    Entity.NPC.discussions.Dave === true && 
                    Entity.NPC.discussions.Eric === true && 
                    Entity.NPC.discussions.Luke === true
                )
                {
                    Entity.NPCS.filter(i => {
                        if (i.name === 'Krissy')
                        {
                            if (player.shirt === 'Red')
                            {
                                i.message1 = "Oh wow that looks so good on you!";
                                i.message2 = i.message1;
                            }
                            else {
                                this.scene.get('Main').npcGlow.filter(i => {
                                    if (i.data.list.name === 'Krissy')
                                        i.setVisible(false);
                                });
                                i.message1 = "Thanks so much, you're a lifesaver. Go talk to my bud at the merch booth and he'll hook you up with something on me.";
                                i.message2 = i.message1;
                                Entity.NPC.discussions.Becca = true;
                            }
                        }
                    });
                }
                break;
                case 'Benny': 
                    if (Entity.NPC.discussions.Krissy === true) this.discussion('Benny'); 
                    this.glow = this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Benny') 
                            i.setVisible(false);
                    });
                break;
                case 'Ryan':   
                    if (Entity.NPC.discussions.Krissy === true) this.discussion('Ryan'); 
                    this.glow = this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Ryan') 
                            i.setVisible(false);  
                    });
                break;
                case 'Becca': 
                    if (Entity.NPC.discussions.Becca === true && player.shirt !== 'Red')
                    {
                        Entity.NPCS.filter(i => {
                            if (i.name === 'Becca')
                            {
                                i.message1 = "Here, have a free T-shirt. On us.";
                                i.message2 = i.message1;
                            }
                        });
                        player.shirt = 'Red';
                        player.avatar.anims.play('idleUpRed', true); 
                    } 
                    else if (player.shirt === 'Red') 
                    {
                        Entity.NPCS.filter(i => {
                            if (i.name === 'Becca')
                            {
                                i.message1 = "Looking good.";
                                i.message2 = i.message1;
                            }
                        });
                    }
                break;
                case 'Sean': 
                    if (Entity.NPC.discussions.Krissy === true) this.discussion('Sean'); 
                    this.glow = this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Sean') 
                            i.setVisible(false);
                    });
                break;
                case 'Nora': 
                    if (Entity.NPC.discussions.Krissy === true) this.discussion('Nora'); 
                    this.glow = this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Nora') 
                            i.setVisible(false);
                    });
                break;
                case 'Ronayne': 
                    if (Entity.NPC.discussions.Krissy === true) this.discussion('Ronayne'); 
                    this.glow = this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Ronayne') 
                            i.setVisible(false);
                    });
                break;
                case 'Dave': 
                    if (Entity.NPC.discussions.Krissy === true) this.discussion('Dave'); 
                    this.glow = this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Dave') 
                            i.setVisible(false);
                    });
                break;
                case 'Eric': 
                    if (Entity.NPC.discussions.Krissy === true) this.discussion('Eric'); 
                    this.glow = this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Eric') 
                            i.setVisible(false);
                    });
                break;
                case 'Luke': 
                    if (Entity.NPC.discussions.Krissy === true) this.discussion('Luke'); 
                    this.glow = this.scene.get('Main').npcGlow.filter(i => {
                        if (i.data.list.name === 'Luke') 
                            i.setVisible(false);
                    });
                break;
        }
    //////////////////////////////////////////////////////////////////////
        if (nearest[0] < player.radiusInteraction) 
        {
            Entity.NPC.dialogueIndex = Entity.NPCS.indexOf(nearest[1]);
            Entity.NPC.lookPlayer(nearest[1], player);
            this.showDialogue();
            if (nearest[1]["sequence"] === undefined) 
            { 
                this.textTitle.text = nearest[1]["name"];
                if (nearest[1].message === 0) 
                {
                    this.typingEffect(nearest[1]["message1"]);
                //disregard second dialog if player is:
                    if (nearest[1].message2 !== null && nearest[1].name !== "Guy Blue") nearest[1].message = 1; 
                } 
                else if (nearest[1].message === 1) 
                {
                    this.typingEffect(nearest[1]["message2"]);
                    if (nearest[1].message2 !== null && nearest[1].name !== "Guy Blue") nearest[1].message = 0;
                }
            } 
            else 
            {
                this.sequentialText = true;
                this.textTitle.text = nearest[1]["sequence"]["name1"];
                this.nextText = {
                    title: nearest[1]["sequence"]["name2"],
                    message: nearest[1]["sequence"]["msg2_1"]
                }
                if (nearest[1].sequence.message === 0) 
                {
                    this.typingEffect(nearest[1]["sequence"]["msg1_1"]);
                    this.nextText = {
                        title: nearest[1]["sequence"]["name2"],
                        message: nearest[1]["sequence"]["msg2_1"]
                    };
                    if (nearest[1].sequence["msg1_2"] !== null) nearest[1].sequence.message = 1;
                } 
                else 
                {
                    this.typingEffect(nearest[1]["sequence"]["msg1_2"]);
                    this.nextText = {
                        title: nearest[1]["sequence"]["name2"],
                        message: nearest[1]["sequence"]["msg2_2"]
                    }
                }
            }
        }
    }
}