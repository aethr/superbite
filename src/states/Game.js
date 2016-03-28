/*
 * Game state
 * ==========
 *
 * Experimenting with parallax backgrounds.
 */

import BgLayer from '../objects/BgLayer';

export default class Game extends Phaser.State {

  create () {
    const { centerX: x, centerY: y } = this.world;
    this.world.setBounds(0, 0, 2000, 2000);

    this.add.existing(new BgLayer(this.game, 0, 0, 2000,  304, 'bg-layer-sky', 0.1));
    this.add.existing(new BgLayer(this.game, 0, 304, 2000,  96, 'bg-layer-sea', 0.2));

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.camera.x = this.camera.x - 1;
    }
    else if (this.cursors.right.isDown) {
      this.camera.x = this.camera.x + 1;
    }
  }

  render () {
    if (this.game.DEBUG) {
      this.game.debug.text('left.isDown:  ' + this.cursors.left.isDown, 16, 18);
      this.game.debug.text('right.isDown: ' + this.cursors.right.isDown, 16, 36);
      this.game.debug.cameraInfo(this.camera, 16, 54);
    }
  }
}
