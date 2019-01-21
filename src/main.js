import gt from "../gametin/index.js";
const {Game, KeyControls}  = gt;

import GameScreen from "./screens/GameScreen.js";

const game = new Game(640, 360, '#game');
const controls = new KeyControls();

game.scene = new GameScreen(game, controls);
game.run();