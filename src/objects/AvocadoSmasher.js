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
    this.walkForce = 80;
    this.jumpForce = 10000;
    this.jumpStarted = false;
    this.jumpCounter = 0;
    this.maxJumps = 2;

    this.gameState.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.mass = 50;
    this.body.maxVelocity = new Phaser.Point(100, 1000);

    this.animations.add('idle', [0, 0, 0, 0, 1, 0, 0, 2, 0], 4, true);
    this.animations.add('walking', [8, 9, 10, 11, 12], 10, true);
    this.animations.add('jumping', [3], 10, true);
    this.animations.add('falling', [5], 10, true);

    this.scale.setTo(this.spriteScale, this.spriteScale);
    this.anchor.setTo(0.5);

    this.animations.play('idle');

    this.cursors = this.gameState.game.input.keyboard.createCursorKeys();
  }

  update () {

    // Apply some acceleration based on player keypresses
    if (this.cursors.right.isDown) {
      // move right
      this.body.acceleration.x += this.walkForce;
    } else
    if (this.cursors.left.isDown) {
      // move left
      this.body.acceleration.x += -this.walkForce;
    } else {
//    if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
      this.body.acceleration.x = 0;
    }

    this.body.acceleration.y = 0;

    if (this.body.onFloor()) {
      // Reset double jump
      this.jumpCounter = 0;
    }
    if (this.cursors.up.isDown && !this.jumpStarted && this.jumpCounter < this.maxJumps) {
      this.body.acceleration.y += -this.jumpForce;
      this.jumpStarted = true;
      this.jumpCounter++;
    }
    if (this.cursors.up.isUp) {
      this.jumpStarted = false;
    }

    // Mirror sprite left/right based on direction of movement
    if (this.body.velocity.x > 0) {
      this.scale.setTo(this.spriteScale, this.spriteScale);
    } else if (this.body.velocity.x < 0) {
      this.scale.setTo(-this.spriteScale, this.spriteScale);
    }

    // Trigger animations based on current movement
    if (this.body.velocity.y < 0) {
      // Moving upwards
      this.animations.play('jumping');
    } else if (this.body.velocity.y > 0) {
      // Falling
      this.animations.play('falling');
    } else if (this.body.velocity.y == 0) {
      if (this.body.velocity.x == 0) {
        // On solid ground, not moving
        this.animations.play('idle');
      } else {
        // On solid ground, moving
        this.animations.play('walking');
      }
    }
  }

}
