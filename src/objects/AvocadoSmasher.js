/*
 * Logo
 * ====
 *
 * A sample prefab (extended game object class), for displaying the Phaser
 * logo.
 */

import Prefab from '../objects/Prefab';

export default class AvocadoSmasher extends Prefab {

  constructor (gameState, position, properties) {
    properties.texture = 'avocado-smasher';
    super(gameState, position, properties);

    this.spriteScale = 2;
    this.walking_speed = 80;
    this.jumping_speed = 180;
    this.bouncing = 1;

    this.gameState.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.animations.add('idle', [0, 0, 0, 0, 1, 0, 0, 2, 0], 4, true);
    this.animations.add('walking', [8, 9, 10, 11, 12], 10, true);
    this.animations.add('jumping', [5], 10, true);

    this.scale.setTo(this.spriteScale, this.spriteScale);
    this.anchor.setTo(0.5);

    this.animations.play('idle');

    this.cursors = this.gameState.game.input.keyboard.createCursorKeys();
  }

  update () {
    // Mirror animations left/right
    if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
      // move right
      this.body.velocity.x = this.walking_speed;
      this.animations.play('walking');
      this.scale.setTo(this.spriteScale, this.spriteScale);
    } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
      // move left
      this.body.velocity.x = -this.walking_speed;
      this.animations.play('walking');
      this.scale.setTo(-this.spriteScale, this.spriteScale);
    } else {
      // stop
      this.body.velocity.x = 0;
      this.animations.play('idle');
    }


    // Jump only if touching a tile
    if (this.cursors.up.isDown && this.body.blocked.down) {
      this.body.velocity.y = -this.jumping_speed;
    }

    // Jump animation
    if (this.body.velocity.y < 0) {
      this.animations.play('jumping');
    } else if (this.body.velocity.y == 0 && this.animations.currentAnim.name == 'jumping') {
      this.animations.play('idle');
    }
  }

}
