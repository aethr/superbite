/*
 * Game state
 * ==========
 *
 * Experimenting with parallax backgrounds.
 */

import BgLayer from '../objects/BgLayer';
import AvocadoSmasher from '../objects/AvocadoSmasher';

export default class Game extends Phaser.State {

  create () {
//    const { centerX: x, centerY: y } = this.world;
    this.world.setBounds(0, 0, 2000, 2000);

    this.groups = {};
    this.groups['players'] = this.game.add.group();

    this.prefabs = {
      'bg-sky':          new BgLayer(this.game, 0, 0, 2000,  304, 'bg-layer-sky', 0.1),
      'bg-layer-sea':    new BgLayer(this.game, 0, 304, 2000,  96, 'bg-layer-sea', 0.2),
      'avocado-smasher': new AvocadoSmasher(this, {x: 100, y: 290}, {group: 'players'})
    };

    this.add.existing(this.prefabs['bg-sky']);
    this.add.existing(this.prefabs['bg-layer-sea']);
    this.add.existing(this.prefabs['avocado-smasher']);


    this.camera.follow(this.prefabs['avocado-smasher']);

  }

  update() {
    // if (this.cursors.left.isDown) {
    //   this.camera.x = this.camera.x - 1;
    // }
    // else if (this.cursors.right.isDown) {
    //   this.camera.x = this.camera.x + 1;
    // }
  }

  render () {
    if (this.game.DEBUG) {
      this.game.debug.cameraInfo(this.camera, 16, 54);
    }
  }
}
