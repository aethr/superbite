// https://gamedevacademy.org/platformer-tutorial-with-phaser-and-tiled/

export default class Prefab extends Phaser.Sprite {

    constructor (gameState, position, properties) {
        super(gameState.game, position.x, position.y, properties.texture);

        this.gameState = gameState;

        this.gameState.groups[properties.group].add(this);
    }

}