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
    properties.scale = 2;

    super(gameState, position, properties);

    // Internal properties we'll use for movement / animation
    this.drawScale  = properties.scale;
    this.walkForce = 80;
    this.jumpForce = 10000;
    this.jumpStarted = false;
    this.jumpCounter = 0;
    this.maxJumps = 2;

    // Initial drawing parameters
    this.scale.setTo(this.drawScale, this.drawScale);
    this.anchor.setTo(0.5);

    // Setup physics
    this.gameState.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
    this.body.mass = 50;
    this.body.maxVelocity = new Phaser.Point(160, 1000);

    // Don't use the full sprite width for bounding, so that platform clipping
    // appears to use the sprites feet
//    this.body.setSize(this.width, this.height);
//    this.body.setSize((this.body.sourceWidth * this.drawScale), this.body.sourceHeight);
    this.body.setSize(this.body.sourceWidth - 6, this.body.sourceHeight);

    // Define animations based on sprite sheet
    this.animations.add('idle', [0, 0, 0, 0, 1, 0, 0, 2, 0], 4, true);
    this.animations.add('walking', [8, 9, 10, 11, 12], 10, true);
    this.animations.add('jumping', [3], 10, true);
    this.animations.add('falling', [5], 10, true);

    this.animations.play('idle');

    // Allow for this sprite to respond to keyboard controls
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
      this.body.acceleration.x = 0;
    }

    this.body.acceleration.y = 0;

    if (this.body.onFloor()) {
      // Reset double jump
      this.jumpCounter = 0;
    }
    // Jump!
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
      this.scale.setTo(this.drawScale, this.drawScale);
    } else if (this.body.velocity.x < 0) {
      this.scale.setTo(-this.drawScale, this.drawScale);
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

  render () {
    this.gameState.game.debug.body(this, 'rgba(255, 255, 0, 0.4)');
  }
}
