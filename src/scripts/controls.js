/* CONTROLLER */
import { Entity } from './objects.js';


export const Controller = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    upKey: null,
    downKey: null,
    leftKey: null,
    rightKey: null,
    AKey: null,
    SKey: null,
    DKey: null,
    WKey: null,
    buttonInteract: null,
    buttonStartText: null,
    init: function (scene, hud, player)
    {
        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.AKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.WKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //// ------------------------- Button interact
        this.buttonInteract = hud.add.image(880, 470, "interactButton").setOrigin(1, 1).setInteractive()
        .on('pointerdown', () => {
            if (!config.default.showingDialogue) hud.interact(player);
            else if (!config.default.controls.buttonsLocked) 
            {
                if (hud.textDialogue.text !== hud.messageToShow) 
                {
                    hud.textDialogue.text = hud.messageToShow;
                    if (hud.eventTyping !== undefined) hud.eventTyping.remove(false);
                } 
                else hud.hideDialogue();
            }
        })
        .on('pointerover', () => this.buttonInteract.setScale(1.1, 1.1).setPosition(885, 475))
		.on('pointerout', () => this.buttonInteract.setScale(1, 1).setPosition(880, 470));
        this.buttonStartText = hud.add.text(790, 450, "talk to", {fontFamily: 'ZCOOL QingKe HuangYou'}).setFontSize(17).setOrigin(0.5, 0.5);
////////////////////////////////////////////////////////// keyboard 
        scene.input.keyboard.clearCaptures()
       .on('keyup', () => {
            if (!config.default.controls.joystickLocked) Entity.player.returnToIdle(player);
            player.direction = null;
            player.moving = false;
        })
        .on('keydown_ENTER', () => {
            if (!config.default.showingDialogue) hud.interact(player);
            else if (!config.default.controls.buttonsLocked) 
            {
                if (hud.textDialogue.text !== hud.messageToShow) 
                {
                    hud.textDialogue.text = hud.messageToShow;
                    if (hud.eventTyping !== undefined) hud.eventTyping.remove(false);
                } 
                else hud.hideDialogue();
            }
        })
        .on('keydown_SPACE', () => {
            if (!config.default.showingDialogue) hud.interact(player);
            else if (!config.default.controls.buttonsLocked) 
            {
                if (hud.textDialogue.text !== hud.messageToShow) 
                {
                    hud.textDialogue.text = hud.messageToShow;
                    if (hud.eventTyping !== undefined) hud.eventTyping.remove(false);
                } 
                else hud.hideDialogue();
            }
        });
    /////////////////////////////////////////////////// check device
        let check;
        this.checkDevice = () => {
            return new Promise(res => setTimeout(() => {
                if (config.default.mobileAndTabletCheck()) 
                {
                    check = true;
                    Controller.joyStick(hud);
                }
                else check = false;
                res(check);
            }), 3000);
        }
        this.checkDevice().then(()=> scene.events.on('update', () => check === true ? Controller.dumpJoyStickState(player) : Controller.dumpKeyState(player)));
    },
    //// --------------------------------------------------------- Joystick
    joyStick: function(hud)
    {
        hud.load.plugin('rexvirtualjoystickplugin', this.url, true);
        config.default.controls.joyStick = hud.plugins.get('rexvirtualjoystickplugin').add(hud, {
            forceX: 0,
            forceY: 0,
            x: 100,
            y: 400,
            radius: 80,
            base: hud.add.circle(0, 0, 80, 0xCF000000).setAlpha(0.5),
            thumb: hud.add.circle(0, 0, 40, 0xcccccc)
        });
    },
    dumpKeyState: function(player)
    {
        if (Controller.downKey.isDown || Controller.SKey.isDown) Entity.player.move(player, Controller.down);
        if (Controller.upKey.isDown || Controller.WKey.isDown) Entity.player.move(player, Controller.up);
        if (Controller.rightKey.isDown || Controller.DKey.isDown) Entity.player.move(player, Controller.right);
        if (Controller.leftKey.isDown || Controller.AKey.isDown) Entity.player.move(player, Controller.left);
        if (!Controller.downKey.isDown && !Controller.SKey.isDown && !Controller.leftKey.isDown && !Controller.AKey.isDown
            && !Controller.upKey.isDown && !Controller.WKey.isDown && !Controller.rightKey.isDown && !Controller.DKey.isDown) Entity.player.returnToIdle(player);
    },
    dumpJoyStickState: function(player)
    {
        if (config.default.controls.joyStick !== null)
        {
            if (Math.abs(config.default.controls.joyStick.forceX) > 40 || Math.abs(config.default.controls.joyStick.forceY) > 40) 
            {
                if (!config.default.controls.joyStickPressed) 
                {
                    if (config.default.controls.joyStick.forceX > 40) Controller.right;
                    else if (config.default.controls.joyStick.forceX < -40) Controller.left;
                    else if (config.default.controls.joyStick.forceY < -40) Controller.up;
                    else if (config.default.controls.joyStick.forceY > 40) Controller.down;
                }
                config.default.controls.joyStickPressed = true;
            }
            else config.default.controls.joyStickPressed = false;
            if (!config.default.controls.joystickLocked) Entity.player.moveJoyStick(player, config.default.controls.joyStick.forceX, config.default.controls.joyStick.forceY);
        }
    }
}





