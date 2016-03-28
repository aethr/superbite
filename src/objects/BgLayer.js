/*
 * Logo
 * ====
 *
 * A sample prefab (extended game object class), for displaying the Phaser
 * logo.
 */


export default class BgLayer extends Phaser.TileSprite {

  constructor (game, x, y, width, height, key, moveMultiplier) {
    super(game, x, y, width, height, key);

    this.moveMultiplier = moveMultiplier;

  }

  update () {
    this.tilePosition.x = this.game.camera.x * this.moveMultiplier;
  }

}
