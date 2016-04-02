/*
 * The `assets` module
 * ===================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package:
 * https://github.com/photonstorm/phaser/blob/master/resources/Asset%20Pack%20JSON%20Format/assetPack.json
 */

export default {
  // -- The splash screen assets, displayed during the 'Preload' state.
  boot: [{
    key: 'splash-screen',
    type: 'image'
  }, {
    key: 'progress-bar',
    type: 'image'
  }],

  // -- General game assets
  game: [
    {
      key: 'phaser',
      type: 'image'
    },
    {
      type: 'image',
      key: 'bg-layer-sky',
      url: 'stages/magic-cliffs/sky.png'
    },
    {
      type: 'image',
      key: 'bg-layer-sea',
      url: 'stages/magic-cliffs/sea.png'
    },
    {
      type: 'image',
      key: 'bg-layer-clouds',
      url: 'stages/magic-cliffs/clouds.png'
    },
    {
      type: 'image',
      key: 'bg-layer-ground',
      url: 'stages/magic-cliffs/far-grounds.png'
    },
    {
      type: 'spritesheet',
      key: 'avocado-smasher',
      url: 'characters/green-bot.png',
      frameWidth: 16,
      frameHeight: 16,
      frameMax: 24,
      margin: 0,
      spacing: 0
    }
  ]
};

