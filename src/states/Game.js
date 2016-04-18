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
    this.world.setBounds(0, 0, 2000, 640);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300;

    this.groups = {};
    this.groups['background'] = this.game.add.group();
    this.groups['ground'] = this.game.add.group();
    this.groups['prefabs'] = this.game.add.group();

    // Add background layers
    this.groups['background'].add(new BgLayer(this.game, 0, 0, 2000,  304, 'bg-layer-sky', 0.1));
    this.groups['background'].add(new BgLayer(this.game, 0, 304, 2000,  96, 'bg-layer-sea', 0.2));

    // Add some sample platforms (added to a group on creation)
    new Ground(this, {x: 10, y: 380}, {width: 1980, height: 21});
    new Ground(this, {x: 160, y: 300}, {width: 32, height: 21});

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
    }
  }
}
