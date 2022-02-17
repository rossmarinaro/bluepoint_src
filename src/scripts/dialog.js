
import { Entity } from './objects.js';

    export class Dialog 
    {
        constructor(scene)
        {
            this.scene = scene;
        }
        hideDialogue()
        {
        // hide the current dialogue or goes to the next one in a sequential dialog
            if (this.sequentialText)
            {
                this.scene.scene.get('HUD').typingEffect(this.nextText.message);
                this.scene.scene.get('HUD').textTitle.text = this.nextText.title;
                this.sequentialText = false;
            } 
            else 
            {
                config.default.showingDialogue = false;
                this.scene.scene.get('HUD').textTitle.visible = false;
                this.scene.scene.get('HUD').textDialogue.visible = false;
                this.scene.scene.get('HUD').dialogueWindow.visible = false;
                let NPCSpeaking = Entity.NPCS[Entity.NPC.dialogueIndex];
                if (NPCSpeaking !== undefined)
                    if (NPCSpeaking.avatar.anims != undefined) NPCSpeaking.avatar.anims.play("idle" + NPCSpeaking.name);
                Entity.NPC.dialogueIndex = -1;
                config.default.controls.joystickLocked = false;
            }
        }
        endAllDialogs() 
        {
            // hide any dialog when NPCS go to sleep
            this.sequentialText = false;
            config.default.showingDialogue = false;
            this.scene.scene.get('HUD').textTitle.visible = false;
            this.scene.scene.get('HUD').textDialogue.visible = false;
            this.scene.scene.get('HUD').dialogueWindow.visible = false;
            npc.avatar.anims.play("idle" + Entity.NPCS[Entity.NPC.dialogueIndex].name);
            Entity.NPC.dialogueIndex = -1;
        }
        showDialogue(message) 
        { 
        // shows the dialogue window with a specific message
            if (message != null) 
            {
                this.scene.scene.get('HUD').typingEffect(message);
                this.scene.scene.get('HUD').textTitle.text = "Guy Blue"
            }
            config.default.showingDialogue = true;
            this.scene.scene.get('HUD').textTitle.visible = true;
            this.scene.scene.get('HUD').textDialogue.visible = true;
            this.scene.scene.get('HUD').dialogueWindow.visible = true;
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
                    case 'Adam': Entity.NPC.discussions.Adam = true; break;
                    case 'Ryan': Entity.NPC.discussions.Ryan = true; break;
                    case 'Sean': Entity.NPC.discussions.Sean = true; break;
                    case 'Nora': Entity.NPC.discussions.Nora = true; break;
                    case 'Ronayne': Entity.NPC.discussions.Ronayne = true; break;
                    case 'Dave': Entity.NPC.discussions.Dave = true; break;
                    case 'Eric': Entity.NPC.discussions.Eric = true; break;
                    case 'Luke': Entity.NPC.discussions.Luke = true; break;
                    case 'Benny': Entity.NPC.discussions.Benny = true; break;
                    case 'Krissy': Entity.NPC.discussions.Krissy = true; break;
                }
                if (
                    Entity.NPC.discussions.Ryan === true && 
                    Entity.NPC.discussions.Sean === true && 
                    Entity.NPC.discussions.Nora === true && 
                    Entity.NPC.discussions.Ronayne === true && 
                    Entity.NPC.discussions.Dave === true && 
                    Entity.NPC.discussions.Eric === true && 
                    Entity.NPC.discussions.Luke === true &&
                    Entity.NPC.discussions.Benny === true &&
                    Entity.NPC.discussions.Adam === true 
                )
                {
                    this.scene.scene.get('Main').npcGlow.filter(i => {
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

                this.discussion('Krissy'); 

            ///set all to invisible
                if (
                    Entity.NPC.discussions.Ryan === false && 
                    Entity.NPC.discussions.Sean === false && 
                    Entity.NPC.discussions.Nora === false && 
                    Entity.NPC.discussions.Ronayne === false && 
                    Entity.NPC.discussions.Dave === false && 
                    Entity.NPC.discussions.Eric === false && 
                    Entity.NPC.discussions.Luke === false &&
                    Entity.NPC.discussions.Krissy === true
                )
                {
                    this.scene.scene.get('Main').npcGlow.forEach(i => i.setVisible(true));
                    this.scene.scene.get('Main').npcGlow.filter(i => {
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
                                    this.scene.scene.get('Main').npcGlow.filter(i => {
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
                    case 'Adam':   
                        if (Entity.NPC.discussions.Krissy === true) this.discussion('Adam'); 
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
                            if (i.data.list.name === 'Adam') 
                                i.setVisible(false);  
                        });
                    break;
                    case 'Benny': 
                        if (Entity.NPC.discussions.Krissy === true) this.discussion('Benny'); 
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
                            if (i.data.list.name === 'Benny') 
                                i.setVisible(false);
                        });
                    break;
                    case 'Ryan':   
                        if (Entity.NPC.discussions.Krissy === true) this.discussion('Ryan'); 
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
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
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
                            if (i.data.list.name === 'Sean') 
                                i.setVisible(false);
                        });
                    break;
                    case 'Nora': 
                        if (Entity.NPC.discussions.Krissy === true) this.discussion('Nora'); 
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
                            if (i.data.list.name === 'Nora') 
                                i.setVisible(false);
                        });
                    break;
                    case 'Ronayne': 
                        if (Entity.NPC.discussions.Krissy === true) this.discussion('Ronayne'); 
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
                            if (i.data.list.name === 'Ronayne') 
                                i.setVisible(false);
                        });
                    break;
                    case 'Dave': 
                        if (Entity.NPC.discussions.Krissy === true) this.discussion('Dave'); 
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
                            if (i.data.list.name === 'Dave') 
                                i.setVisible(false);
                        });
                    break;
                    case 'Eric': 
                        if (Entity.NPC.discussions.Krissy === true) this.discussion('Eric'); 
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
                            if (i.data.list.name === 'Eric') 
                                i.setVisible(false);
                        });
                    break;
                    case 'Luke': 
                        if (Entity.NPC.discussions.Krissy === true) this.discussion('Luke'); 
                        this.glow = this.scene.scene.get('Main').npcGlow.filter(i => {
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
                    this.scene.scene.get('HUD').textTitle.text = nearest[1]["name"];
                    if (nearest[1].message === 0) 
                    {
                        this.scene.scene.get('HUD').typingEffect(nearest[1]["message1"]);
                    //disregard second dialog if player is:
                        if (nearest[1].message2 !== null && nearest[1].name !== "Guy Blue") nearest[1].message = 1; 
                    } 
                    else if (nearest[1].message === 1) 
                    {
                        this.scene.scene.get('HUD').typingEffect(nearest[1]["message2"]);
                        if (nearest[1].message2 !== null && nearest[1].name !== "Guy Blue") nearest[1].message = 0;
                    }
                } 
                else 
                {
                    this.sequentialText = true;
                    this.scene.scene.get('HUD').textTitle.text = nearest[1]["sequence"]["name1"];
                    this.nextText = {
                        title: nearest[1]["sequence"]["name2"],
                        message: nearest[1]["sequence"]["msg2_1"]
                    }
                    if (nearest[1].sequence.message === 0) 
                    {
                        this.scene.scene.get('HUD').typingEffect(nearest[1]["sequence"]["msg1_1"]);
                        this.nextText = {
                            title: nearest[1]["sequence"]["name2"],
                            message: nearest[1]["sequence"]["msg2_1"]
                        };
                        if (nearest[1].sequence["msg1_2"] !== null) nearest[1].sequence.message = 1;
                    } 
                    else 
                    {
                        this.scene.scene.get('HUD').typingEffect(nearest[1]["sequence"]["msg1_2"]);
                        this.nextText = {
                            title: nearest[1]["sequence"]["name2"],
                            message: nearest[1]["sequence"]["msg2_2"]
                        }
                    }
                }
               
            }
            
        }

}