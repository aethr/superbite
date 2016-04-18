/*
 * Game state
 * ==========
 *
 * Experimenting with parallax backgrounds.
 */

import BgLayer from '../objects/BgLayer';
import Ground from '../objects/prefabs/scenery/Ground';
import AvocadoSmasher from '../objects/AvocadoSmasher';

export default class Game extends Phaser.State {

  create () {
    this.world.setBounds(0, 0, 1024, 640);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;

    this.groups = {};
    this.groups['background'] = this.game.add.group();
    this.groups['ground'] = this.game.add.group();
    this.groups['prefabs'] = this.game.add.group();

    // Add background layers
    this.groups['background'].add(new BgLayer(this.game, 0, 0, 1024,  304, 'bg-layer-sky', 0.1));
    this.groups['background'].add(new BgLayer(this.game, 0, 304, 1024,  96, 'bg-layer-sea', 0.2));

    // Add some sample platforms (added to a group on creation)
    new Ground(this, {x: 10, y: 380}, {width: 1004, height: 42});
    new Ground(this, {x: 320, y: 280}, {width: 128, height: 42});
    new Ground(this, {x: 640, y: 280}, {width: 128, height: 42});
    new Ground(this, {x: 512, y: 140}, {width: 64, height: 42});

    // Prefabs that we need to keep track of (added to a group on creation)
    this.prefabs = {
      'avocado-smasher': new AvocadoSmasher(this, {x: 64, y: 290}, {group: 'prefabs'})
    };

    // Simple camera follow on the player
    this.camera.follow(this.prefabs['avocado-smasher']);
  }

  update() {
    // Handle player colliding with a ground tile
    this.game.physics.arcade.collide(this.prefabs['avocado-smasher'], this.groups['ground'], Ground.collide);
  }

  render () {
    if (this.game.DEBUG) {
      this.game.debug.text(' vx: ' + this.prefabs['avocado-smasher'].body.velocity.x + '  vy: ' + this.prefabs['avocado-smasher'].body.velocity.y, 16, 16);
      this.game.debug.cameraInfo(this.camera, 16, 54);

      this.game.debug.body(this.prefabs['avocado-smasher'], 'rgba(0, 128, 0, 0.7)', false);
      this.groups['ground'].forEachAlive(function(sprite) {
        this.game.debug.body(sprite, 'rgba(128, 0, 0, 0.7)', false);
      }, this);
    }
  }
}
