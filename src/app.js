/*
 * The `app` module
 * ================
 *
 * Provides the game initialization routine.
 */

// Required: import the Babel runtime module.
import 'babel-polyfill';

// Import game states.
import * as states from './states';

export function init () {
  const game = new Phaser.Game(640, 480, Phaser.AUTO);

  // Dynamically add all required game states.
  Object
    .entries(states)
    .forEach(([key, state]) => game.state.add(key, state));

  // Enable debug mode for development
  if (window.location.hostname == 'localhost') {
    game.DEBUG = true;
  }

  game.state.start('Boot');

  return game;
}
