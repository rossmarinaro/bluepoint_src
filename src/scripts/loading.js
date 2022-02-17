
    import main_resources from './resources.json';
    import pluginUrl from /* 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js' */ '../plugins/joystick.js';
    

export class Boot extends Phaser.Scene {
    constructor(){
        super('Boot');
    }
    preload() 
    {
        this.load.json('main_resources', main_resources);
    }
    create()
    {
        this.scene.start('Loading');
        this.scene.stop('Boot');
    }
}

//////////////////////////////////////////////////////////////////////////////
export class Loading extends Phaser.Scene{
    constructor(){
        super('Loading');
    }
    preload()    
    { 

        this.parseResources(this.cache.json.get('main_resources')); 
        this.load.plugin('rexvirtualjoystickplugin', pluginUrl, true);
        
        this.loadingText = this.add.text(444, 260, "Loading Bluepoint ", {fontFamily: 'euroStyle', fontSize: 50}).setOrigin(0.5);
        this.loadingTween = this.tweens.add({targets: this.loadingText,alpha: 0, duration: 2000, ease: 'Sine.easeInOut', loop: -1, yoyo: true});
    }
    create()
    {
        this.loadingText.destroy();
        this.loadingTween.stop();

        this.rect = new Phaser.Geom.Rectangle(0, 0, this.cameras.main.width, this.cameras.main.height);
        this.add.graphics({fillStyle: {color: 0x000000}}).fillRectShape(this.rect);

        this.description = `                    This game was created in collaboration with Shea Stadium.
                The characters you interact with are based on staff and regulars,
                    with dialogue contributed by their real life counterparts.
                This game is a love letter to the DIY spaces we've loved and lost.\n\n\n
                                    We hope it leaves you missing them more.`;

        this.descriptionText = this.add.text(400, 260, this.description, {fontFamily: 'ZCOOL QingKe HuangYou', fontSize: 25, fontColor: 0xffffff}).setOrigin(0.5);
        this.tweens.add({targets: this.descriptionText, alpha: 0, duration: 1000, ease: 'Sine.easeInOut', delay: 11000, onComplete: ()=> this.start()}); 
        this.add.graphics({fillStyle: {color: 0xC6C6C6, alpha: 1}}).fillRoundedRect(380, 420, 120, 50, 20);
        this.add.graphics({lineStyle: {width: 3, color: 0x595959, alpha: 1}}).strokeRoundedRect(380, 420, 120, 50, 20);
        this.add.text(400, 432, 'START', {fontFamily: 'euroStyle', fontSize: 24, fontColor: 0x000000});
        this.add.zone(400, 432).setSize(380, 420).setInteractive().on('pointerdown', ()=> this.start());
    }

//---------------------------------------- parse project from json asset resource file

    parseResources(json)
    { 
    //images (png)
        if (json.hasOwnProperty('image')) 
        {
            for (let key in json.image) 
            {
                let keys = Object.keys(json.image[key]).find(i => i); 
                for (let value in json.image[key]) 
                {
                    let values = json.image[key][value];
                    this.load.image(keys, values); 
                }
            }
        }
    //audio (mp3)
        if (json.hasOwnProperty('audio')) 
        {
            for (let key in json.audio) 
            {
                let keys = Object.keys(json.audio[key]).find(i => i); 
                for (let value in json.audio[key]) 
                {
                    let values = json.audio[key][value];
                    this.load.audio(keys, values); 
                }
            }
        }
    //spritesheet
        if (json.hasOwnProperty('spritesheet'))
        {
            for (let key in json.spritesheet) 
            {
                let keys = Object.keys(json.spritesheet[key]).find(i => i);
                for (let key2 in json.spritesheet[key]) 
                {
                    let img = json.spritesheet[key][key2][0],
                        data = json.spritesheet[key][key2][1];
                    this.load.spritesheet(keys, img, {frameWidth: data.frameWidth, frameHeight: data.frameHeight}); 
                }
            }
        }
    }

    //------------------------------------------ init game

    start()
    {
        this.game.sound.stopAll();
        this.scene.start('Main');
        this.scene.stop('Loading');
    }
} 


