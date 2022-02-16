/* ENTITIES */
import { loadAnimationsPlayer } from './anims.js';
import { Controller } from './controls.js';
import { Dialog } from './dialog.js';

export const Entity = {
    dialog: Dialog,
    NPCS: [],
    player: {
        init: function(scene, x, y, poly)
        {
            loadAnimationsPlayer(scene);
            this.moving = false,
            this.direction = null,
            this.speed = 0.8;
            this.radiusInteraction = 30;
            this.shirt = 'Blue';
            this.poly = poly;
            this.avatar = scene.add.sprite(x, y, "blueGuy", 0).play("idleDownBlue");
            this.avatar.depth = this.avatar.y;
        },
        ////move player
        move: (player, params) => {
            if (!config.default.controls.joystickLocked)
            {
                if (params === Controller.left) 
                {
                    if (Phaser.Geom.Polygon.Contains(player.poly, player.avatar.x - player.speed, player.avatar.y + 16) &&
                        !Entity.checkCollisionNPCS(player.avatar.x - player.speed, player.avatar.y + 16))
                        player.avatar.x -= player.speed;
                    if (!player.moving) 
                    {
                        player.direction = Controller.left;
                        player.avatar.play("walkLeft" + player.shirt);
                    }
                    player.moving = true;
                }
                if (params === Controller.right) 
                {
                    if (Phaser.Geom.Polygon.Contains(player.poly, player.avatar.x + player.speed, player.avatar.y + 16) &&
                        !Entity.checkCollisionNPCS(player.avatar.x + player.speed, player.avatar.y + 16))
                        player.avatar.x += player.speed;
                    if (!player.moving) 
                    {
                        player.avatar.play("walkRight" + player.shirt);
                        player.direction = Controller.right;
                    }
                    player.moving = true;
                }
                if (params === Controller.up) 
                {
                    if (Phaser.Geom.Polygon.Contains(player.poly, player.avatar.x, player.avatar.y - player.speed + 16) &&
                        !Entity.checkCollisionNPCS(player.avatar.x, player.avatar.y + 16 - player.speed))
                        player.avatar.y -= player.speed;
                    if (player.direction != Controller.up) player.avatar.play("walkUp" + player.shirt);
                    player.direction = Controller.up;
                    player.moving = true;
                    player.avatar.depth = player.avatar.y;
                }
                if (params === Controller.down) 
                {
                    if (Phaser.Geom.Polygon.Contains(player.poly, player.avatar.x, player.avatar.y + player.speed + 16) &&
                        !Entity.checkCollisionNPCS(player.avatar.x, player.avatar.y + 16 + player.speed))
                        player.avatar.y += player.speed;
                    if (player.direction != Controller.down) player.avatar.play("walkDown" + player.shirt);
                    player.direction = Controller.down;
                    player.moving = true;
                    player.avatar.depth = player.avatar.y;
                }
            }
            else Entity.player.returnToIdle(player);
        },
        moveJoyStick: (player, x, y) => { 
            if (x > 30 && Phaser.Geom.Polygon.Contains(player.poly, player.avatar.x + player.speed, player.avatar.y + 16) &&
                !Entity.checkCollisionNPCS(player.avatar.x + player.speed, player.avatar.y + 16)) player.avatar.x += player.speed * 1.2;
            if (x < -30 && Phaser.Geom.Polygon.Contains(player.poly, player.avatar.x - player.speed, player.avatar.y + 16) &&
                !Entity.checkCollisionNPCS(player.avatar.x - player.speed, player.avatar.y + 16))  player.avatar.x -= player.speed * 1.2;
            if (y < -30 && Phaser.Geom.Polygon.Contains(player.poly, player.avatar.x, player.avatar.y + 16 - player.speed) &&
                !Entity.checkCollisionNPCS(player.avatar.x, player.avatar.y + 16 - player.speed)) 
            {
                player.avatar.y -= player.speed;
                player.avatar.depth = player.avatar.y;
            }
            if (y > 30 && Phaser.Geom.Polygon.Contains(player.poly, player.avatar.x, player.avatar.y + 16 + player.speed) &&
            !Entity.checkCollisionNPCS(player.avatar.x, player.avatar.y + 16 + player.speed)) 
            {
                player.avatar.y += player.speed;
                player.avatar.depth = player.avatar.y;
            }
            //// direction
            if (Math.abs(x) > 20 || Math.abs(y) > 20) 
            {
                player.moving = true;
                if (Math.abs(x) > Math.abs(y)) 
                {
                    if (x > 0) {
                        player.direction = Controller.right;
                        if (player.avatar.anims.currentAnim.key !== "walkRight" + player.shirt) player.avatar.play("walkRight" + player.shirt);
                    } else {
                        player.direction = Controller.left;
                        if (player.avatar.anims.currentAnim.key !== "walkLeft" + player.shirt) player.avatar.play("walkLeft" + player.shirt);
                    }
                } 
                else 
                {
                    if (y > 0) 
                    {
                        player.direction = Controller.down;
                        if (player.avatar.anims.currentAnim.key !== "walkDown" + player.shirt) player.avatar.play("walkDown" + player.shirt);
                    } 
                    else 
                    {
                        player.direction = Controller.up;
                        if (player.avatar.anims.currentAnim.key !== "walkUp" + player.shirt) player.avatar.play("walkUp" + player.shirt);
                    }
                }
            } 
            else Entity.player.returnToIdle(player);
        },
    /////////////////////////////////////////////// idle
        returnToIdle: player => {
            player.moving = false;
            switch (player.direction) 
            {
                case Controller.up: player.avatar.play("idleUp" + player.shirt); break;
                case Controller.down: player.avatar.play("idleDown" + player.shirt); break;
                case Controller.right: player.avatar.play("idleRight" + player.shirt); break;
                case Controller.left: player.avatar.play("idleLeft" + player.shirt); break;
            }
        }
    },
///////////////////////////////////////////////////////////////////////// NPC bots
    NPC: {
        discussions: null,
        dialogueIndex: null,
        init: function(name, x, y, message1, message2, numberSprite, glow, spritesheet, anims, scene) 
        {
            this.x = x;
            this.y = y;
            this.message1 = message1;
            this.message2 = message2;
            this.name = name;
            this.numberSprite = numberSprite;
            this.message = 0;
            this.sleeping = 0; //0--> normal , 1-->slept , 2-->awaken
            this.timeToSleep = 999999.9;
            this.timeToDisappear = Math.random() * 74000 + 112000;
            this.visible = true;
            this.glow = glow;
            this.avatar = scene.add.sprite(this.x, this.y, spritesheet, 0).anims.play(anims, true).setDepth(y);
        },
        lookPlayer: function(npc, player) 
        {
            if (npc.numberSprite != null) 
            {
                let lookDirection, x = npc.avatar.x - player.avatar.x, y = npc.avatar.y - player.avatar.y;
                if (Math.abs(x) > Math.abs(y)) lookDirection = (x > 0) ? npc.avatar.anims.currentAnim.frames[0].frame.name - 3 : npc.avatar.anims.currentAnim.frames[0].frame.name - 4;
                else lookDirection = (y > 0) ? npc.avatar.anims.currentAnim.frames[0].frame.name - 2 : npc.avatar.anims.currentAnim.frames[0].frame.name - 5;
                npc.avatar.anims.stop();
                setTimeout(()=> {
                    npc.avatar.setTexture(npc.avatar.texture.key, lookDirection);
                    //console.log(npc.avatar.anims.currentAnim.frames[0].frame.name, npc.avatar.texture.key, npc.numberSprite, npc);
                }, 100);
           }
        },
        spawn: function(scene, stage)
        {
            switch (stage)
            {
                case 'Shea Stadium' :
                    Entity.NPCS.push(
                    ////employees
                        new Entity.NPC.init("Benny", 140, 100, "I don't care what anyone says, This couch is comfy.", null, null, true, 'NPC1', "idleBenny", scene),
                        new Entity.NPC.init("Adam", 250, 190, "I'm standing in the sonic sweet spot. The mix sounds perfect right here.", null, 1, true, 'adam_sprites', "idleAdam", scene),
                        new Entity.NPC.init("Ryan", 50, 200, "Who are all these people?", null, 1, true, 'NPC2', "idleRyan", scene),
                        new Entity.NPC.init("Becca", 235, 85, "Heyyy! Line for the bar starts here.", "You're actually waiting for the bathroom.", null, true, 'NPC2', "idleBecca", scene),
                        new Entity.NPC.init("Sean", 235, 135, "What's up guapo?", "You need anything?", 1, true, 'NPC2', "idleSean", scene),
                        new Entity.NPC.init("Nora", 290, 145, "Are you in the last band?", "They are still not here yet.", 1, true, 'NPC2', "idleNora", scene),
                        new Entity.NPC.init("Ronayne", 275, 90, "If I hear someone order a Bud Heavy one more time...", null, null, true, 'NPC2', "idleRodanyne", scene),
                        new Entity.NPC.init("Dave", 180, 190, "Did you catch the last set?", "They were AMAZING!!! Even better than last night.", 23, true, 'NPC2', "idleDave", scene),
                        new Entity.NPC.init("Eric", 293, 117, "Wanna play chess after the show?", null, 1, true, 'NPC2', "idleEric", scene),
                        new Entity.NPC.init("Krissy", 100, 115, "Oh no! I can't remember if I stamped everyone... I would go check, but I can't leave the door...Do you mind checking everyone for me?", "Do you mind checking everyone for me?", 1, true, 'NPC2', "idleKrissy", scene),
                        new Entity.NPC.init("Luke", 290, 170, "First time at Shea?", "Don't think I've seen you around.", 1, true, 'NPC2', "idleLuke", scene),
                    ////band
                        new Entity.NPC.init("Drummer", 380, 150, "*pat! pa' pat!*", null, null, false, 'NPC1', "idleDrummer", scene),
                        new Entity.NPC.init("Bassist", 400, 185, "slap* slap", null, null, false, 'NPC1', "idleBassist", scene),
                        new Entity.NPC.init("Guitarist", 330, 140, "Can't you see I'm shredding?", null, null, false, 'NPC1', "idleGuitarist", scene)
                    );
                    Entity.NPC.discussions = {
                        Adam: false,
                        Benny: false,
                        Ryan: false,
                        Becca: false,
                        Sean: false,
                        Nora: false,
                        Ronayne: false,
                        Dave: false,
                        Eric: false,
                        Krissy: false,
                        Luke: false
                    }
                break;
            }
        //// set interactive
            for (let npc in Entity.NPCS) 
            {
                Entity.NPCS[npc].avatar.setInteractive().on('pointerdown', ()=> { 
                    if (!config.default.showingDialogue) 
                        scene.scene.get('HUD').interact(scene.player);
                });
            }
        }
    },
//////////////////////////////////////////////////////////////////// create more players (socket io)
    spawnPlayers: function(playerTexture, playerName, playerMessage)
    {
        this.newPlayer = new Entity.NPC(playerTexture, 150, 50, null, null);
        this.newPlayer.sequence = {
            name: playerName,
            msg1_1: playerMessage,
            // msg2_1: "",
            // msg1_2: "",
            // msg2_2: "",
            // message: 0,
            // sequentialName: "new user"
        }
        Entity.NPCS.push(this.newPlayer);
    },
    checkCollisionNPCS: function(X, Y) 
    {
        return Entity.NPCS.some((el) => {
            let X1 = el.x, Y1 = el.y + 16;
            return (X > X1 - 10 && X < X1 + 10 && Y < Y1 + 5 && Y > Y1 - 5)
        });
    },
    hideAllCharacters: function() 
    {
        if (Entity.NPCS.length > 0) 
        {
            Entity.NPCS.forEach((el, index, object) => {
                el.visible = false;
                el.avatar.visible = false;
                if (el.zzz !== undefined) el["zzz"].visible = false;
                if (el.tween !== undefined) el["tween"].stop();
            });
        }
    },
    minDistance: function(player) // compute the min distance between the player and the NPCS from the npc array
    {   
        return Entity.NPCS.reduce((acc, val) => {
            if (Math.sqrt((player.avatar.x - val.x) ** 2 + (player.avatar.y - val.y) ** 2) < acc[0] && val.visible) 
            {
                acc[0] = Math.sqrt((player.avatar.x - val.x) ** 2 + (player.avatar.y - val.y) ** 2);
                acc[1] = val;
            }
            return acc;
        }, [999])
    },
    distance: function(x1, y1, x2, y2) 
    {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    },
    getRandomInt: function(max) 
    {
        return Math.floor(Math.random() * Math.floor(max));
    },
    createDust: function(numberParticles)
    {
        let dustParticles = [];
        for (let i = 0; i < numberParticles; i++) dustParticles.push({x: Math.random() * 888, y: Math.random() * 250, alpha: 1})
        return dustParticles;
    }
}
