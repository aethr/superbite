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
    this.fixedOffset = new Phaser.Point(x, y);
    this.fixedToCamera = true;
    this.cameraOffset = new Phaser.Point(this.fixedOffset.x, this.fixedOffset.y);
  }

  update () {
    this.tilePosition.x = -(this.game.camera.x * this.moveMultiplier);
    this.cameraOffset.y = -(this.game.camera.y * this.moveMultiplier) + this.fixedOffset.y ;
  }

}
