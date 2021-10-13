function loadLevel2(scene) 
{
    scene.anims.create({
        key: "level2_blueguy_drop_beer",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_drop_beer', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        })
    });
    scene.anims.create({
        key: "level2_blueguy_sleeping",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_sleeping', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        })
    });
    scene.anims.create({
        key: "level2_redguy_drink_beer",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_drink_beer', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        })
    });
    scene.anims.create({
        key: "level2_redguy_looking_down",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_looking_down', {
            frames: [0, 1, 2]
        })
    });
    scene.anims.create({
        key: "level2_blueguy_drinking",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_drinking', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        })
    });
    scene.anims.create({
        key: "level2_blueguy_falling",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_falling', {
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
        })
    });
    scene.anims.create({
        key: "level2_redguy_poke",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_poke', {
            frames: [0, 1, 2, 3, 4, 5, 6]
        })
    });
    scene.anims.create({
        key: "level2_blueguy_talking",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_blueguy_talking', {
            frames: [0, 1, 2, 3, 4, 5]
        })
    });
    scene.anims.create({
        key: "level2_redguy_talking_no_beer",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_talking_no_beer', {
            frames: [0, 1, 2, 3, 4, 5]
        })
    });
    scene.anims.create({
        key: "level2_redguy_talking_beer",
        repeat: -1,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_redguy_talking_beer', {
            frames: [0, 1, 2, 3, 4, 5]
        })
    });
    //----other animations
    scene.anims.create({
        key: "level2_beerCrane",
        repeat: 0,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_beerCrane', {
            frames: [0, 1, 0]
        })
    });
    scene.anims.create({
        key: "level2_beer_fill",
        repeat: 0,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_beer', {
            frames: [0, 1]
        })
    });
    scene.anims.create({
        key: "level2_beer_drop",
        repeat: 0,
        frameRate: 2,
        frames: scene.anims.generateFrameNumbers('level2_beer', {
            frames: [2, 3]
        })
    });
}