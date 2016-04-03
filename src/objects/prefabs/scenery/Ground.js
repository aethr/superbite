// #112024

/*
 * Ground
 * ======
 *
 * A tiled ground sprite for the player to walk on.
 */

import Prefab from '../../../objects/Prefab';

export default class Ground extends Phaser.TileSprite {

    constructor (gameState, position, properties) {
        properties.texture = 'grass-fill';
        properties.group = 'level';

        super(gameState.game, position.x, position.y, properties.width, properties.height, properties.texture);

        this.spriteScale = 2;

        this.gameState = gameState;

        this.gameState.groups[properties.group].add(this);

        this.scale.setTo(this.spriteScale, this.spriteScale);

        this.gameState.game.physics.arcade.enable(this);

        this.body.allowGravity = false;
        this.body.immovable = true;
        this.body.offset = new Phaser.Point(0, 4);
        this.body.checkCollision.down = false;
        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;
    }

}
