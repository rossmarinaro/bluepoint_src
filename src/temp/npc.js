    
        //  this.Sally = new Entity.NPC("Sally", 100, 110, "You shouldn't sit on this couch. It's disgusting.", null, 11, 13);
    
    // // without rotation , with sequential interaction
    //     this.Anna = new Entity.NPC("Anna", 240, 160, "", "", null, 68);
    //     this.Anna.sequence = {
    //         name1: "Anna",
    //         name2: "Dillon",
    //         msg1_1: "Have you noticed companies are hiring people to graffiti their warehouses? Just be a fucking warehouse, man!",
    //         msg2_1: "Huh. I guess I haven't really noticed.",
    //         msg1_2: "Corporate jocks desperately trying to appeal to the youth. It's pathetic",
    //         msg2_2: "ok...",
    //         message: 0,
    //         sequentialName: "Anna and Dillon"
    //     };
    //     this.Dillon = new Entity.NPC("Dillon", 255, 150, "Huh. I guess I haven't really noticed.", null, null, 24);
    //     this.Dillon.sequence = this.Anna.sequence;

    //     this.Sam = new Entity.NPC("Sam", 50, 200, "*why is this guy creeping?*", "Piss off, creep", null, 110);
    //     this.Sam.sequence = {
    //         name1: "Sam",
    //         name2: "Aaron",
    //         msg1_1: "*why is this guy creeping?*",
    //         msg2_1: "...and so with the coupon it only ended up being--hey, can I help you asshole?",
    //         msg1_2: " *he's still here…*",
    //         msg2_2: "Piss off, creep",
    //         message: 0,
    //         sequentialName: "Sam and Aaron"
    //     };
    //     this.Aaron = new Entity.NPC("Aaron", 65, 190, "", '', null, 100);
    //     this.Aaron.sequence = this.Sam.sequence;

    //     this.Alex = new Entity.NPC("Alex", 235, 87, "You wanna buy a shirt? Sure thing.", "You already have a shirt.", null, 132);

    // scene.anims.create({key: "idleJon", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [5, 6]})});
    // scene.anims.create({key: "idleSally", repeat: -1, frameRate: 2, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [16, 17]})});
    // scene.anims.create({key: "idleDillon", repeat: -1,frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [27, 28, 29]})});
    // scene.anims.create({key: "idleChester", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [38, 39, 40]})});
    // scene.anims.create({key: "idleElla", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [49, 50, 51]})});
    // scene.anims.create({key: "idleBela",repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [60, 61, 62, 63]})});
    // scene.anims.create({key: "idleAnna", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [71, 72, 73, 74]})});
    // scene.anims.create({key: "idleTyler", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [82, 83, 84, 85]})});
    // scene.anims.create({key: "idleNick", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [93, 94, 95]})});
    // scene.anims.create({key: "idleAaron", repeat: -1, frameRate: 1, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [104, 104, 104, 105]})});
    // scene.anims.create({key: "idleSam",repeat: -1, frameRate: 1, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [115, 116, 115, 115]})});
    // scene.anims.create({key: "idleAlex", repeat: -1, frameRate: 2, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [137, 138, 139, 140]})});

    
        // this.Ella = new Entity.NPC("Ella", 210, 190, "All my friends are out on the balcony but this bassist can really hold it down.", null, 44, 46);
    //     this.Chester = new Entity.NPC("Chester", 270, 200, "It's not that crowded tonight. I'm gonna graffiti the bathroom while I have the chance.", null, 33, 35);
    //     this.Tyler = new Entity.NPC("Tyler", 350, 200, "Did you see Future Islands on Letterman? Crazy. I saw them play here back in 2010.", null, 77, 79);
    //     this.Bela = new Entity.NPC("Bela", 310, 110, "Did you know that Titus Andronicus practices here? The lead singer took my ticket at the door.", null, 55, 56);
    //     this.Nick = new Entity.NPC("Nick", 300, 150, "Shhh... I hear they record the shows here. Don't want to mess it up.", null, 88, 90);
    //     this.Jon = new Entity.NPC("Jon", 330, 180, "I threw up last time I saw these guys.", "Don't worry, it probably won't happen this time", 0, 2);
        
        // this.NPCS.Jon.avatar = this.add.sprite(this.NPCS.Jon.x, this.NPCS.Jon.y, "NPC", 0).setDepth(this.NPCS.Jon.y).play("idleJon");
        // this.NPCS.Sally.avatar = this.add.sprite(this.NPCS.Sally.x, this.NPCS.Sally.y, "NPC", 0).setDepth(this.NPCS.Sally.y).play("idleSally");
        // this.NPCS.Dillon.avatar = this.add.sprite(this.NPCS.Dillon.x, this.NPCS.Dillon.y, "NPC", 0).setDepth(this.NPCS.Dillon.y).play("idleDillon");
        // this.NPCS.Chester.avatar = this.add.sprite(this.NPCS.Chester.x, this.NPCS.Chester.y, "NPC", 0).setDepth(this.NPCS.Chester.y).play("idleChester");
        // this.NPCS.Bela.avatar = this.add.sprite(this.NPCS.Bela.x, this.NPCS.Bela.y, "NPC", 0).setDepth(this.NPCS.Bela.y).play("idleBela");
        // this.NPCS.Anna.avatar = this.add.sprite(this.NPCS.Anna.x, this.NPCS.Anna.y, "NPC", 0).setDepth(this.NPCS.Anna.y).play("idleAnna");
        // this.NPCS.Tyler.avatar = this.add.sprite(this.NPCS.Tyler.x, this.NPCS.Tyler.y, "NPC", 0).setDepth(this.NPCS.Tyler.y).play("idleTyler");
        // this.NPCS.Nick.avatar = this.add.sprite(this.NPCS.Nick.x, this.NPCS.Nick.y, "NPC", 0).setDepth(this.NPCS.Nick.y).play("idleNick");
        // this.NPCS.Aaron.avatar = this.add.sprite(this.NPCS.Aaron.x, this.NPCS.Aaron.y, "NPC", 0).setDepth(this.NPCS.Aaron.y).play("idleAaron");
        // this.NPCS.Sam.avatar = this.add.sprite(this.NPCS.Sam.x, this.NPCS.Sam.y, "NPC", 0).setDepth(this.NPCS.Sam.y).play("idleSam");
        // this.NPCS.Alex.avatar = this.add.sprite(this.NPCS.Alex.x, this.NPCS.Alex.y, "NPC", 0).setDepth(this.NPCS.Alex.y).play("idleAlex");