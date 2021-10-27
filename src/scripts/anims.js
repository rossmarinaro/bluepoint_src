//---------------------------------------- load animations of the player 

export function loadAnimationsPlayer (scene) 
{
    scene.anims.create({
        key: "walkRightBlue",
        repeat: -1,
        frameRate: 7,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [14, 15]
        })
    });
    scene.anims.create({
        key: "walkLeftBlue",
        repeat: -1,
        frameRate: 7,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [12, 13]
        })
    });
    scene.anims.create({
        key: "walkDownBlue",
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [4, 5, 6, 7]
        })
    });
    scene.anims.create({
        key: "walkUpBlue",
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [8, 9, 10, 11]
        })
    });
    scene.anims.create({
        key: "idleDownBlue",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [0]
        })
    });
    scene.anims.create({
        key: "idleLeftBlue",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [1]
        })
    });
    scene.anims.create({
        key: "idleRightBlue",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [3]
        })
    });
    scene.anims.create({
        key: "idleUpBlue",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('blueGuy', {
            frames: [2]
        })
    });

    //----------------------------------------     Player Red shirt
    scene.anims.create({
        key: "walkRightRed",
        repeat: -1,
        frameRate: 7,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [14, 15]
        })
    });
    scene.anims.create({
        key: "walkLeftRed",
        repeat: -1,
        frameRate: 7,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [12, 13]
        })
    });
    scene.anims.create({
        key: "walkDownRed",
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [4, 5, 6, 7]
        })
    });
    scene.anims.create({
        key: "walkUpRed",
        repeat: -1,
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [8, 9, 10, 11]
        })
    });
    scene.anims.create({
        key: "idleDownRed",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [0]
        })
    });
    scene.anims.create({
        key: "idleLeftRed",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [1]
        })
    });
    scene.anims.create({
        key: "idleRightRed",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [3]
        })
    });
    scene.anims.create({
        key: "idleUpRed",
        repeat: -1,
        frameRate: 5,
        frames: scene.anims.generateFrameNumbers('redGuy', {
            frames: [2]
        })
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////NPCs
//////////////// shea stadium

    scene.anims.create({key: "idleBenny",repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [121, 122, 123]})});
    ////
    scene.anims.create({key: "idleBassist", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [143, 144, 145]})});
    scene.anims.create({key: "idleGuitarist", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [154, 155, 156]})});
    scene.anims.create({key: "idleDrummer", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC1', {frames: [165, 166]})});
    ////
    scene.anims.create({key: "idleRyan", repeat: -1, frameRate: 1, frames: scene.anims.generateFrameNumbers('NPC2', {start: 5, end: 8})});
    scene.anims.create({key: "idleBecca", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC2', {start: 14, end: 17})});
    scene.anims.create({key: "idleSean", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC2', {start: 77, end: 80})});
    scene.anims.create({key: "idleNora",repeat: -1, frameRate: 1, frames: scene.anims.generateFrameNumbers('NPC2', {start: 59, end: 62})});
    scene.anims.create({key: "idleRodanyne", repeat: -1, frameRate: 2, frames: scene.anims.generateFrameNumbers('NPC2', {start: 68, end: 71})});
    scene.anims.create({key: "idleDave", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC2', {start: 23, end: 26})});
    scene.anims.create({key: "idleEric", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC2', {start: 32, end: 35})});
    scene.anims.create({key: "idleKrissy", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC2', {start: 41, end: 44})});
    scene.anims.create({key: "idleLuke", repeat: -1, frameRate: 5, frames: scene.anims.generateFrameNumbers('NPC2', {start: 50, end: 53})});


///////////////////////////////////////////////////////////////////////////////////////
}
