
export const maps = {
        collisions: null,
        init: (scene, key) => {
            switch (key)
            {
                case 'Shea Stadium' : 
                    scene.add.image(0, 0, "background_1").setOrigin(0, 0);
                //// polygon for the floor boundaries
                    maps.collisions = new Phaser.Geom.Polygon([
                        new Phaser.Geom.Point(0, 257.33), new Phaser.Geom.Point(0, 210.39), 
                        new Phaser.Geom.Point(5.22, 204.13), new Phaser.Geom.Point(14.95, 204.13),
                        new Phaser.Geom.Point(39.3, 180.13), new Phaser.Geom.Point(43.82, 180.13),
                        new Phaser.Geom.Point(63.64, 160.66), new Phaser.Geom.Point(52.86, 157.88), 
                        new Phaser.Geom.Point(95.98, 114.76), new Phaser.Geom.Point(119.28, 128.67),
                        new Phaser.Geom.Point(146.4, 114.76), new Phaser.Geom.Point(148.14, 97.02),
                        new Phaser.Geom.Point(199.95, 98.06), new Phaser.Geom.Point(199.95, 113.36),
                        new Phaser.Geom.Point(269.16, 112.32), new Phaser.Geom.Point(269.5, 98.06), 
                        new Phaser.Geom.Point(316.45, 98.06), new Phaser.Geom.Point(353.66, 132.84), 
                        new Phaser.Geom.Point(296.28, 132.84), new Phaser.Geom.Point(295.58, 143.27), 
                        new Phaser.Geom.Point(374.52, 222.56), new Phaser.Geom.Point(440.59, 220.82), 
                        new Phaser.Geom.Point(443.03, 223.25), new Phaser.Geom.Point(443.03, 258.03), 
                        new Phaser.Geom.Point(0, 257.33)
                    ]);
                break;
            }
        }
    }