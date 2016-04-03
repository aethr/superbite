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
//    const { centerX: x, centerY: y } = this.world;
    this.world.setBounds(0, 0, 2000, 640);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 200;

    this.groups = {};
    this.groups['level'] = this.game.add.group();
    this.groups['players'] = this.game.add.group();

    this.prefabs = {
      'bg-sky':          new BgLayer(this.game, 0, 0, 2000,  304, 'bg-layer-sky', 0.1),
      'bg-layer-sea':    new BgLayer(this.game, 0, 304, 2000,  96, 'bg-layer-sea', 0.2),
      'level-grass':     new Ground(this, {x: 10, y: 380}, {width: 2000, height: 22}),
      'avocado-smasher': new AvocadoSmasher(this, {x: 100, y: 290}, {group: 'players'})
    };

    this.add.existing(this.prefabs['bg-sky']);
    this.add.existing(this.prefabs['bg-layer-sea']);
    this.add.existing(this.prefabs['level-grass']);
    this.add.existing(this.prefabs['avocado-smasher']);


    this.camera.follow(this.prefabs['avocado-smasher']);

  }

  update() {

    this.game.physics.arcade.collide(this.prefabs['avocado-smasher'], this.prefabs['level-grass'], this.tileCollision);

  }

  tileCollision(actor, tile) {
    actor.body.blocked.down = true;
  }

  render () {
    if (this.game.DEBUG) {
      this.game.debug.text(' vx: ' + this.prefabs['avocado-smasher'].body.velocity.x + '  vy: ' + this.prefabs['avocado-smasher'].body.velocity.y, 16, 16);
      this.game.debug.text('nvx: ' + this.prefabs['avocado-smasher'].body.newVelocity.x + ' nvy: ' + this.prefabs['avocado-smasher'].body.newVelocity.y, 16, 32);
      this.game.debug.cameraInfo(this.camera, 16, 54);
    }
  }
}
