// #112024

/*
 * Ground
 * ======
 *
 * A tiled ground sprite for the player to walk on.
 */

//import Prefab from '../../../objects/Prefab';

export default class Ground extends Phaser.TileSprite {

  constructor (gameState, position, properties) {
    properties.texture = 'grass-fill';
    properties.group = 'ground';
    properties.scale = 2;

    // Initialize using the Prefab constructor, taking sprite scaling into account
    super(gameState.game, position.x, position.y, properties.width / properties.scale, properties.height / properties.scale, properties.texture);

    this.spriteScale = properties.scale;

    this.gameState = gameState;

    // Scale the sprite (we like the pixelated look)
    this.scale.setTo(this.spriteScale, this.spriteScale);

    // Setup physics
    this.gameState.game.physics.arcade.enable(this);
    this.body.setSize(this.width, this.height);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.offset = new Phaser.Point(0, 8);
    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;

    // Add the sprite to the 'ground' group, and to the game world
    this.gameState.groups[properties.group].add(this);
  }

  static collide(prefab, ground) {
    if (typeof prefab.body != "undefined") {
      prefab.body.blocked.down = true;

      // If no force is being applied, add some drag to slow down prefabs
      if (prefab.body.acceleration.x == 0) {
        // Add some negative velocity
        prefab.body.velocity.x -= prefab.body.velocity.x / 4;
        if (Math.abs(prefab.body.velocity.x) < 1) {
          prefab.body.velocity.x = 0;
        }
      }
    }
  }
}
