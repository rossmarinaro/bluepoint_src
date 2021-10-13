/* MAIN GAMEPLAY */
import { maps } from './maps.js';
import { Entity } from './objects.js';


export class Main extends Phaser.Scene{
    constructor(){
        super('Main');
    }
    init()
    {
        this.HUD = this.scene.get('HUD'); 
        config.default.init(this, this.HUD);   
    }
    create() 
    {

    //// create map / collisions
        maps.init(this, config.default.gameData.stage);
        
    ////player
        this.player = new Entity.player.init(this, 98, 145, maps.collisions); 
    ////dust
        this.dust = this.add.image(Entity.player.x, Entity.player.y, "dust").setOrigin(0.5, 0.5).setVisible(false).setAlpha(0);
    ////NPCs
        new Entity.NPC.spawn(this, config.default.gameData.stage);

        this.table = this.add.image(234, 96, "table").setDepth(96);
        this.drums = this.add.image(371, 162, "drums").setDepth(162);
        this.speakers = this.add.image(335, 136, "speakers").setDepth(136);
        this.discoball = this.add.sprite(281, 55, "discoBall").play("discoBall");

        this.cameras.main.setZoom(4).startFollow(this.player.avatar, true).setBounds(0, 20, 440, 250).fadeIn(2000, 255, 255, 255);
        
    ////////////////////////////////////music

        this.vol = 0.15; 
        this.music = this.sound.add('no_vision', {delay: 0}).setLoop(true).setVolume(this.vol);
        this.music.play();
        //this.outroMusic = this.sound.add('outro', {delay: 0}).setVolume(0).setLoop(true);

    ////start controls
        config.default.controls.init(this, this.HUD, this.player);
        this.scene.run('HUD', this.player);

    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    update() 
    {
        if (config.default.gameState === true) 
        {
        //// audio bool
            if (this.scene.get('HUD').audioBool === true)
            {
                this.scene.get('HUD').audioIcon.setAlpha(1);
                this.sound.setMute(false);
            }
            else {
                this.scene.get('HUD').audioIcon.setAlpha(0.5);
                this.sound.setMute(true);
            }
        //// set volume of music depending on players position
            this.vol = this.player.avatar.x / 270 * this.player.avatar.y / 270;
            this.music.setVolume(this.vol);
        }
    }
}




